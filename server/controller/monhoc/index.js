const express = require("express");
const routermonhoc = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
routermonhoc.get("/",async(req,res)=>{
    try {
        let dulieu = req.flash('dulieu');
        let sql = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .field("heso")
        .order("id_mh",true)
        .where("hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "id_mh = '"+dulieu+"'")
        .toString();
        let sql_hoiphuc = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .field("heso")
        .where("hoiphuc = 0")
        .toString();
        let ketqua = await query(sql);
        let hoiphuc = await query(sql_hoiphuc);
        let view = { 
            ketqua: ketqua.rows,
            hoiphuc: hoiphuc.rows,
            message: req.flash('SuccessMessage')
        };
        res.render("./monhoc/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routermonhoc.post("/insert",async(req,res)=>{
    try {
        let {ten_mh,heso} = req.body;
        let sql = squel.insert()
        .into("tbl_monhoc")
        .set("ten_mh",ten_mh)
        .set("heso",heso)
        .returning("id_mh")
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',ketqua.rows[0].id_mh);
        req.flash('SuccessMessage','Thêm thành công')
        res.redirect("/monhoc");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routermonhoc.post("/chitiet",async(req,res)=>{
    try {
        let {idmh} = req.body;
        let sql = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .field("heso")
        .where("id_mh = "+idmh)
        .toString();
       let ketqua = await query(sql);
       res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routermonhoc.post("/update",async(req,res)=>{
    try {
        let {id_mh,ten_mh,heso} = req.body;
        let sql = squel.update()
        .table("tbl_monhoc")
        .set("ten_mh",ten_mh)
        .set("heso",heso)
        .where("id_mh = "+id_mh)
        .toString();
        await query(sql);
        req.flash('dulieu',id_mh);
        req.flash('SuccessMessage','Cập nhật thông tin thành công');
        res.redirect("/monhoc");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routermonhoc.delete("/delete",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.update()
     .table("tbl_monhoc")
     .set("hoiphuc = 0")
     .where("id_mh = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
         console.log(error);
         res.sendStatus(404);
    }
 });
 routermonhoc.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body; 
        let del_info = squel.update()
        .table("tbl_monhoc")
        .set("hoiphuc = 1")
        .where("id_mh = "+dulieu)
        .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routermonhoc.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_monhoc")
     .where("id_mh = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 //tìm kiếm thông tin môn học
 routermonhoc.post("/Search",async(req,res)=>{
    try {
        let mh = req.body.data;
        mh=mh.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
        let sql = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .field("heso")
        .order("id_mh",true)
        .where("lower(ten_mh) like lower('%"+mh+"%')")
        .toString();
        let ketqua = await query(sql);
        if(ketqua.rowCount <= 0 )
        {
            let views = {nodata: true, ketqua: false};
            res.render("./monhoc/page.ejs",views);
        }
        else{
            let views = {nodata: false,ketqua: ketqua.rows}
            res.render("./monhoc/page.ejs",views);
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routermonhoc ;