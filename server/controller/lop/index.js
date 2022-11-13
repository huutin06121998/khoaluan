const express = require("express");
const routerlop = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize = 4;
routerlop.get("/",async(req,res)=>{
    try {
       let dulieu = req.flash('dulieu');
       let sqlpage = squel.select()
        .from("tbl_lop")
        .field("*")
        .toString();
        // Xử lý phân trang
       let kq = await query(sqlpage);
       let tongsorecord = kq.rows[0].count;
       let Sizepage = 4;
       let tongsotrang = parseFloat(tongsorecord/Sizepage);
       tongsotrang = Math.ceil(tongsotrang)
        let sql = squel.select()
        .from("tbl_lop","t1")
        .field("t1.ma_lop")
        .field("t1.ten_lop")
        .field("t1.stt")
        .where("t1.hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "t1.stt = '"+dulieu+"'")
        .join("tbl_giaovien","t2","t1.ma_gv = t2.ma_gv")
        .field("t2.ten_gv")
        .order("t1.stt",true)
        .limit(pagesize)
        .toString();
        let sql_gvcn = squel.select()
        .from("tbl_giaovien")
        .field("ma_gv")
        .field("ten_gv")
        .where("chon not in(0)")
        .order("ten_gv",true)
        .toString();
        let sql_gvcn1 = squel.select()
        .from("tbl_giaovien")
        .field("ma_gv")
        .field("ten_gv")
        .order("ten_gv",true)
        .toString();
        let sql_hoiphuc = squel.select()
        .from("tbl_lop","t1")
        .field("t1.ma_lop")
        .field("t1.ten_lop")
        .field("t1.stt")
        .join("tbl_giaovien","t2","t1.ma_gv = t2.ma_gv")
        .field("t2.ten_gv")
        .where("t1.hoiphuc = 0")
        .toString();
        let ketqua = await query(sql);
        let hoiphuc = await query(sql_hoiphuc);
        let gvcn = await query(sql_gvcn);
        let gvcn_c1 = await query(sql_gvcn1);
        //Update sau khi chọn thì so sánh
        //Ban đầu khởi tạo 
        let tongtrang = Math.ceil(kq.rowCount/Sizepage)
        let view = {
            ketqua: ketqua.rows,
            page :"1",
            tongtrang: tongtrang,
            hoiphuc: hoiphuc.rows,
            gvcn: gvcn.rows,
            gvcn_c1: gvcn_c1.rows,
            message: req.flash('SuccessMessage')
        };
        res.render("./lop/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.post("/insert",async(req,res)=>{
    try {
        let {ma_lop,ten_lop,gvcn} = req.body;
        let sql = squel.insert()
        .into("tbl_lop")
        .set("ma_lop",ma_lop)
        .set("ten_lop",ten_lop)
        .set("ma_gv",gvcn)
        .returning("stt")
        .returning("ma_gv")
        .toString();
        let ketqua = await query(sql);
        let sql_select = squel.update()
        .table("tbl_giaovien")
        .set("chon = 0")
        .where("ma_gv = '"+ketqua.rows[0].ma_gv+"'")
        .toString();
        await query(sql_select);
        req.flash('dulieu',ketqua.rows[0].stt);
        req.flash('SuccessMessage','Thêm thành công')
        res.redirect("/lop");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.post("/chitiet",async(req,res)=>{
    try {
        let {id_lop} = req.body;
        let sql = squel.select()
        .from("tbl_lop","t1")
        .field("t1.ma_lop")
        .field("t1.ten_lop")
        .field("t1.stt")
        .join("tbl_giaovien","t2","t1.ma_gv = t2.ma_gv")
        .field("t2.ten_gv")
        .field("t2.ma_gv")
        .where("t1.stt = "+id_lop)
        .toString();
       let ketqua = await query(sql);
       res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.post("/update",async(req,res)=>{
    try {
        let {id_lop,ma_lop,ten_lop,gvcn} = req.body;
        let sql = squel.update()
        .table("tbl_lop")
        .set("ma_lop",ma_lop)
        .set("ten_lop",ten_lop)
        .set("ma_gv",gvcn)
        .where("stt = "+id_lop)
        .toString();
        await query(sql);
        req.flash('dulieu',id_lop);
        req.flash('SuccessMessage','Cập nhật thông tin thành công');
        res.redirect("/lop");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.delete("/delete",async(req,res)=>{
    try {
     let {id_lop} = req.body;
     let del_info = squel.update()
     .table("tbl_lop")
     .set("hoiphuc = 0")
     .where("stt = "+id_lop)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
         console.log(error);
         res.sendStatus(404);
    }
 });
 routerlop.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("tbl_lop")
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
 routerlop.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_lop")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerlop.post("/page",async (req,res)=>{
    let sql_lop,ds_lop,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_lop = squel.select()
        .from("tbl_lop")
        .field("tbl_lop.ma_lop")
        .field("tbl_lop.ten_lop")
        .field("tbl_lop.stt")
        .join("tbl_giaovien",null,"tbl_lop.ma_gv = tbl_giaovien.ma_gv")
        .where("tbl_lop.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_lop.ma_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")          
        )
        .toString();
        ds_lop = await query(sql_lop)
        tongtrang=Math.ceil(ds_lop.rowCount/pagesize);
        let view={
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./lop/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.post("/search",async (req,res)=>{
    let ds_lop,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page=req.body.trang;
		if(req.body.trang){
        sql_data= squel.select()
        .from("tbl_lop")
        .field("tbl_lop.ma_lop")
        .field("tbl_lop.ten_lop")
        .field("tbl_lop.stt")
        .join("tbl_giaovien",null,"tbl_lop.ma_gv = tbl_giaovien.ma_gv")
        .field("tbl_giaovien.ten_gv")
        .where("tbl_lop.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_lop.ma_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")           
        )
        .limit(pagesize)
        .order("tbl_lop.stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_lop = await query(sql_data);
		}else{
        page = 1;
		sql_data = squel.select()
        .from("tbl_lop")
        .field("tbl_lop.ma_lop")
        .field("tbl_lop.ten_lop")
        .field("tbl_lop.stt")
        .join("tbl_giaovien",null,"tbl_lop.ma_gv = tbl_giaovien.ma_gv")
        .field("tbl_giaovien.ten_gv")
        .where("tbl_lop.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_lop.ma_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_lop.ten_lop) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_giaovien.ten_gv) like LOWER('%"+search+"%')")           
         )
        .limit(pagesize)
        .order("tbl_lop.stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_lop = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view={
            page:page,
            ds_lop:ds_lop.rows
        }
        res.render("./lop/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routerlop.post("/chitiet_lop",async(req,res)=>{ 
    try {
        let {malop} = req.body;
        let sql = squel.select()
        .from("tbl_lop")
        .where("LOWER(ma_lop) = LOWER('"+malop+"')")
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
module.exports = routerlop;