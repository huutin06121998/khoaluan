const express = require("express");
const routerhocsinh = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize=process.env.PAGESIZE || 5; 
routerhocsinh.get('/',async(req,res)=>{
    try {
       let dulieu = req.flash('dulieu');
       let sqlpage = squel.select()
        .from("tbl_hocsinh")
        .field("*")
        .toString();
        // Xử lý phân trang
       let kq = await query(sqlpage);
       let tongsorecord = kq.rows[0].count;
       let Sizepage = process.env.PAGESIZE||5;
       let tongsotrang = parseFloat(tongsorecord/Sizepage);
       tongsotrang = Math.ceil(tongsotrang)
       let sql = squel.select()
       .from("tbl_hocsinh","t1")
       .field("t1.ma_hs")
       .field("t1.ten_hs")
       .field("to_char(t1.ngaysinh,'DD/MM/YYYY')","ngaysinht1")
       .field("t1.gioitinh")
       .field("t1.khoi")
       .field("t1.diachi")
       .field("t1.nienkhoa")
       .field("t1.stt")
       .join("tbl_lop","t2","t1.ma_lop = t2.ma_lop")
       .field("t2.ten_lop")
       .where("t1.hoiphuc not in(0)")
       .where(dulieu == "" || dulieu == null ? "" : "t1.stt = '"+dulieu+"'")
       .limit(pagesize)
       .order("t1.stt",true)
       .toString();
       let sql_lop = squel.select()
       .from("tbl_lop")
       .field("ma_lop")
       .field("ten_lop") 
       .order("ten_lop",true)
       .toString();
       let sql_hoiphuc = squel.select()
       .from("tbl_hocsinh","t1")
       .field("t1.ma_hs")
       .field("t1.ten_hs")
       .field("to_char(t1.ngaysinh,'DD/MM/YYYY')","ngaysinht1_hp")
       .field("t1.gioitinh")
       .field("t1.khoi")
       .field("t1.diachi")
       .field("t1.nienkhoa")
       .field("t1.stt")
       .join("tbl_lop","t2","t1.ma_lop = t2.ma_lop")
       .field("t2.ten_lop")
       .where("t1.hoiphuc = 0")
       .toString();
       let ketqua = await query(sql);
       let kq_lop = await query(sql_lop);
       let tongtrang = Math.ceil(kq.rowCount/Sizepage);
       let hoiphuc = await query(sql_hoiphuc);
       let view = {
        ketqua: ketqua.rows,
        kq_lop: kq_lop.rows,
        message: req.flash('SuccessMessage'),
        page :"1",
        tongtrang: tongtrang,
        hoiphuc: hoiphuc.rows
        }
       res.render("./hocsinh/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocsinh.post("/insert",async(req,res)=>{
    try {
        let {ma_hs,ten_hs,lop,khoi_lop,ngaysinh,gioitinh,diachi,nienkhoa} = req.body;
        let sql = squel.insert()
        .into("tbl_hocsinh")
        .set("ma_hs",ma_hs)
        .set("ten_hs",ten_hs)
        .set("ngaysinh",ngaysinh)
        .set("gioitinh",gioitinh == "null" ? "null" : gioitinh)
        .set("diachi",diachi)
        .set("khoi",khoi_lop)
        .set("nienkhoa",nienkhoa)
        .set("ma_lop",lop == "null" ? "null" : lop)
        .returning("stt")
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',ketqua.rows[0].stt);
        req.flash('SuccessMessage','Thêm thành công')
        res.redirect("/hocsinh");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocsinh.post("/chitiet",async(req,res)=>{
    try {
        let {id_hs} = req.body;
        let sql = squel.select()
       .from("tbl_hocsinh","t1")
       .field("t1.ma_hs")
       .field("t1.ten_hs")
       .field("to_char(t1.ngaysinh,'YYYY-MM-DD')","ngaysinh_chitiet")
       .field("t1.gioitinh")
       .field("t1.khoi")
       .field("t1.diachi")
       .field("t1.nienkhoa")
       .field("t1.stt")
       .join("tbl_lop","t2","t1.ma_lop = t2.ma_lop")
       .field("t2.ten_lop")
       .field("t2.ma_lop")
       .where("t1.stt = "+id_hs)
       .toString();
       let ketqua = await query(sql);
       res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocsinh.post("/update",async(req,res)=>{
    try {
        let {ma_hs,ten_hs,lop,khoi_lop,ngaysinh,gioitinh,diachi,nienkhoa,stt_hs} = req.body;
        let sql = squel.update()
        .table("tbl_hocsinh") 
        .set("ma_hs",ma_hs)
        .set("ten_hs",ten_hs)
        .set("ngaysinh",ngaysinh)
        .set("gioitinh",gioitinh == "null" ? "null" : gioitinh)
        .set("khoi",khoi_lop)
        .set("ma_lop",lop == "null" ? "null" : lop)
        .set("diachi",diachi)
        .set("nienkhoa",nienkhoa)
        .where("stt = "+stt_hs)
        .toString();
        await query(sql);
        req.flash('dulieu',stt_hs);
        req.flash('SuccessMessage','Cập nhật thông tin thành công');
        res.redirect("/hocsinh");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
}); 
routerhocsinh.delete("/delete",async(req,res)=>{
   try {
    let {id_hs} = req.body;
    let del_info = squel.update()
    .table("tbl_hocsinh")
    .set("hoiphuc = 0")
    .where("stt = "+id_hs)
    .toString();
    await query(del_info);
    res.send("1");
   } catch (error) {
        console.log(error);
        res.sendStatus(404);
   }
});
routerhocsinh.delete("/restore",async(req,res)=>{ 
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("tbl_hocsinh")
        .set("hoiphuc = 1")
        .where("stt = "+dulieu)
        .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerhocsinh.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_hocsinh")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerhocsinh.post("/ktratonghocsinh",async(req,res)=>{
    try {
        let data = req.body.dulieu;
        let sql = squel.select()
        .from("tbl_hocsinh")
        .where("ma_lop = '"+data+"'")
        .toString();
        let ketqua = await query(sql);
        let cong = ketqua.rowCount + 1;
        if(cong == 46)
        {
            res.send("1")
        }else{
            res.send("0");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
routerhocsinh.post("/page",async (req,res)=>{
    let sql_hocsinh,ds_hs,search;
    search=req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_hocsinh = squel.select()
        .from("tbl_hocsinh")
        .field("tbl_hocsinh.stt")
        .join("tbl_lop",null,"tbl_hocsinh.ma_lop = tbl_lop.ma_lop")
        .where("tbl_hocsinh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.khoi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.nienkhoa) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")           
        )
        .where(req.body.day == ''?'':`tbl_hocsinh.ngaysinh = '${req.body.day}'`)
        .toString();
        ds_hs = await query(sql_hocsinh)
        tongtrang = Math.ceil(ds_hs.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./hocsinh/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocsinh.post("/search",async (req,res)=>{
    let ds_hocsinh,sql_data,page,search;
    search=req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page=req.body.trang;
		if(req.body.trang){
        sql_data=squel.select()
        .from("tbl_hocsinh")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .field("to_char(tbl_hocsinh.ngaysinh,'DD/MM/YYYY')","ngaysinht1")
        .field("tbl_hocsinh.gioitinh")
        .field("tbl_hocsinh.khoi")
        .field("tbl_hocsinh.diachi")
        .field("tbl_hocsinh.nienkhoa")
        .field("tbl_hocsinh.stt")
        .join("tbl_lop",null,"tbl_hocsinh.ma_lop = tbl_lop.ma_lop")
        .field("tbl_lop.ten_lop")
        .where("tbl_hocsinh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.khoi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.nienkhoa) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")
        )
        .where(req.body.day == ''?'':`tbl_hocsinh.ngaysinh = '${req.body.day}'`)
        .limit(pagesize)
        .order("tbl_hocsinh.stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_hocsinh = await query(sql_data);
		}else{
        page=1;
		sql_data=squel.select()
        .from("tbl_hocsinh")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .field("to_char(tbl_hocsinh.ngaysinh,'DD/MM/YYYY')","ngaysinht1")
        .field("tbl_hocsinh.gioitinh")
        .field("tbl_hocsinh.khoi")
        .field("tbl_hocsinh.diachi")
        .field("tbl_hocsinh.nienkhoa")
        .field("tbl_hocsinh.stt")
        .join("tbl_lop",null,"tbl_hocsinh.ma_lop = tbl_lop.ma_lop")
        .field("tbl_lop.ten_lop")
        .where("tbl_hocsinh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.khoi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.nienkhoa) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")
        )
        .where(req.body.day == ''?'':`tbl_hocsinh.ngaysinh = '${req.body.day}'`)
        .limit(pagesize)
        .order("tbl_hocsinh.stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_hocsinh = await query(sql_data);
		}
        page=(page-1)*pagesize;
        let view={
            page:page,
            ds_hocsinh:ds_hocsinh.rows
        }
        res.render("./hocsinh/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocsinh.post("/chitiet_hs",async(req,res)=>{
    try {
        let {mahs} = req.body;
        let sql = squel.select()
        .from("tbl_hocsinh")
        .where("LOWER(ma_hs) = LOWER('"+mahs+"')")
        .toString();
        let ketqua = await query(sql);
        if(ketqua.rowCount != 0)
        {
            res.send("1");
        }else{
            res.send("0");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routerhocsinh;