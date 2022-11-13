const express = require("express");
const routergiaovien = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize=process.env.PAGESIZE || 5; 
routergiaovien.get("/",async(req,res)=>{
    try {
        let sqlpage = squel.select()
        .from("tbl_giaovien")
        .field("*")
        .toString();
        // Xử lý phân trang
       let kq = await query(sqlpage);
       let tongsorecord = kq.rows[0].count;
       let Sizepage = process.env.PAGESIZE||5;
       let tongsotrang = parseFloat(tongsorecord/Sizepage);
       tongsotrang = Math.ceil(tongsotrang);
        let dulieu = req.flash('dulieu');
        let sql = squel.select()
        .from("tbl_giaovien","t1")
        .field("t1.ma_gv")
        .field("t1.ten_gv")
        .field("t1.gioitinh")
        .field("t1.diachi")
        .field("t1.trinhdo")
        .field("to_char(t1.ngaysinh,'DD/MM/YYYY')","ngaysinh_ejs")
        .field("t1.stt")
        .join("tbl_monhoc","t2","t1.id_mh = t2.id_mh")
        .field("t2.ten_mh")
        .where("t1.hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "t1.stt = '"+dulieu+"'")
        .limit(pagesize)
        .order("t1.ma_gv",true)
        .toString();
        let ketqua = await query(sql);
        let sql_monhoc = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .toString();
        let sql_hoiphuc = squel.select()
        .from("tbl_giaovien","t1")
        .field("t1.ma_gv")
        .field("t1.ten_gv")
        .field("t1.gioitinh")
        .field("t1.diachi")
        .field("t1.trinhdo") 
        .field("to_char(t1.ngaysinh,'DD/MM/YYYY')","ngaysinh_ejs1")
        .field("t1.stt")
        .join("tbl_monhoc","t2","t1.id_mh = t2.id_mh")
        .field("t2.ten_mh")
        .where("t1.hoiphuc = 0")
        .toString();
        let kq_sqlmonhoc = await query(sql_monhoc);
        let tongtrang = Math.ceil(kq.rowCount/Sizepage);
        let hoiphuc = await query(sql_hoiphuc);
        let views = {
            ketqua:ketqua.rows, 
            page :"1",
            tongtrang: tongtrang,
            kq_sqlmonhoc:kq_sqlmonhoc.rows,
            hoiphuc: hoiphuc.rows,
            message: req.flash('SuccessMessage')
        };
        res.render("./giaovien/index.ejs",views);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routergiaovien.post("/insert",async(req,res)=>{
    try {
        let {ma_gv,ten_gv,ngaysinh,gioitinh,diachi,trinhdo,monhoc} = req.body;
        let sql = squel.insert()
        .into("tbl_giaovien")
        .set("ma_gv",ma_gv)
        .set("ten_gv",ten_gv)
        .set("gioitinh",gioitinh == "null" ? "null" : gioitinh)
        .set("ngaysinh",ngaysinh)
        .set("diachi",diachi)
        .set("id_mh",monhoc)
        .set("trinhdo",trinhdo)
        .returning("stt")
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',ketqua.rows[0].stt);
        req.flash('SuccessMessage','Thêm thành công')
        res.redirect("/giaovien");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routergiaovien.post("/dkmagiaovien",async(req,res)=>{
    try {
        let {giatri_giaovien} = req.body;
        let sql = squel.select()
        .from("tbl_giaovien")
        .where("LOWER(ma_gv) = LOWER('"+giatri_giaovien+"')")
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
routergiaovien.post("/chitiet",async(req,res)=>{
    try {
        let {idgv} = req.body;
        let sql = squel.select()
        .from("tbl_giaovien","t1")
        .field("t1.ma_gv")
        .field("t1.ten_gv")
        .field("t1.gioitinh")
        .field("t1.diachi")
        .field("t1.trinhdo")
        .field("to_char(ngaysinh,'YYYY-MM-DD')","ngaysinh_chitiet")
        .field("t1.stt")
        .join("tbl_monhoc","t2","t1.id_mh = t2.id_mh")
        .field("t2.ten_mh")
        .field("t2.id_mh")
        .where("stt = "+idgv)
        .toString();
       let ketqua = await query(sql);
       res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routergiaovien.post("/update",async(req,res)=>{
    try { 
        let {id,ma_gv,ten_gv,ngaysinh,gioitinh,diachi,trinhdo,monhoc} = req.body;
        let sql = squel.update()
        .table("tbl_giaovien")
        .set("ma_gv",ma_gv)
        .set("ten_gv",ten_gv)
        .set("ngaysinh",ngaysinh)
        .set("gioitinh",gioitinh)
        .set("diachi",diachi)
        .set("trinhdo",trinhdo)
        .set("id_mh",monhoc)
        .where("stt = "+id)
        .toString();
        await query(sql);
        req.flash('dulieu',id);
        req.flash('SuccessMessage','Cập nhật thông tin thành công');
        res.redirect("/giaovien");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routergiaovien.delete("/delete",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.update()
     .table("tbl_giaovien")
     .set("hoiphuc = 0")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
         console.log(error);
         res.sendStatus(404);
    }
 });
 routergiaovien.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("tbl_giaovien")
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
 routergiaovien.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_giaovien")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routergiaovien.post("/page",async (req,res)=>{
    let sql_giaovien,ds_gv,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_giaovien = squel.select()
        .from("tbl_giaovien")
        .field("tbl_giaovien.stt")
        .join("tbl_monhoc",null,"tbl_giaovien.id_mh = tbl_monhoc.id_mh")
        .where("tbl_giaovien.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_giaovien.ma_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.trinhdo) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')")        
        )
        .where(req.body.day == ''?'':`tbl_giaovien.ngaysinh = '${req.body.day}'`)
        .toString();
        ds_gv = await query(sql_giaovien)
        tongtrang = Math.ceil(ds_gv.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./giaovien/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routergiaovien.post("/search",async (req,res)=>{
    let ds_giaovien,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page = req.body.trang;
		if(req.body.trang){
        sql_data = squel.select()
        .from("tbl_giaovien")
        .field("tbl_giaovien.ma_gv")
        .field("tbl_giaovien.ten_gv")
        .field("to_char(tbl_giaovien.ngaysinh,'DD/MM/YYYY')","ngaysinh_ejs1")
        .field("tbl_giaovien.gioitinh")
        .field("tbl_giaovien.diachi")
        .field("tbl_giaovien.trinhdo")
        .field("tbl_giaovien.stt")
        .join("tbl_monhoc",null,"tbl_giaovien.id_mh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .where("tbl_giaovien.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_giaovien.ma_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.trinhdo) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')") 
        )
        .where(req.body.day == ''?'':`tbl_giaovien.ngaysinh = '${req.body.day}'`)
        .limit(pagesize)
        .order("tbl_giaovien.ma_gv",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_giaovien = await query(sql_data);
		}else{
        page = 1;
		sql_data = squel.select()
        .from("tbl_giaovien")
        .field("tbl_giaovien.ma_gv")
        .field("tbl_giaovien.ten_gv")
        .field("to_char(tbl_giaovien.ngaysinh,'DD/MM/YYYY')","ngaysinh_ejs1")
        .field("tbl_giaovien.gioitinh")
        .field("tbl_giaovien.diachi")
        .field("tbl_giaovien.trinhdo")
        .field("tbl_giaovien.stt")
        .join("tbl_monhoc",null,"tbl_giaovien.id_mh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .where("tbl_giaovien.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_giaovien.ma_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.diachi) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.trinhdo) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')") 
        )
        .where(req.body.day == ''?'':`tbl_giaovien.ngaysinh = '${req.body.day}'`)
        .limit(pagesize)
        .order("tbl_giaovien.ma_gv",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_giaovien = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view = {
            page:page,
            ds_giaovien:ds_giaovien.rows
        }
        res.render("./giaovien/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routergiaovien ;