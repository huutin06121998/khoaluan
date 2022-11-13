const express = require("express");
const routerhocki = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
routerhocki.get("/",async(req,res)=>{
    try {
        let dulieu = req.flash('dulieu');
        let sql = squel.select()
        .from("tbl_hocky")
        .field("ma_hk")
        .field("ten_hk")
        .field("heso")
        .field("stt")
        .where("hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "stt = '"+dulieu+"'")
        .order("stt",true)
        .toString();
        let sql_hoiphuc = squel.select()
        .from("tbl_hocky")
        .field("ma_hk")
        .field("ten_hk")
        .field("heso")
        .field("stt")
        .where("hoiphuc = 0")
        .toString();
        let ketqua = await query(sql);
        let hoiphuc = await query(sql_hoiphuc);
        let view = {
            ketqua: ketqua.rows,
            hoiphuc: hoiphuc.rows,
            message: req.flash('SuccessMessage')
        };
        res.render("./hocki/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocki.post("/insert",async(req,res)=>{
    try {
        let {ma_hk,ten_hk,heso} = req.body;
        let sql = squel.insert()
        .into("tbl_hocky")
        .set("ma_hk",ma_hk)
        .set("ten_hk",ten_hk)
        .set("heso",heso)
        .returning("stt")
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',ketqua.rows[0].stt);
        req.flash('SuccessMessage','Thêm thành công');
        res.redirect("/hocki");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocki.post("/chitiet",async(req,res)=>{
    try {
        let {id_hk} = req.body;
        let sql = squel.select()
        .from("tbl_hocky")
        .field("ma_hk")
        .field("ten_hk")
        .field("heso")
        .field("stt")
        .where("stt = "+id_hk)
        .toString();
       let ketqua = await query(sql);
       res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocki.post("/update",async(req,res)=>{
    try {
        let {id_hk,ma_hk,ten_hk,heso} = req.body;
        let sql = squel.update()
        .table("tbl_hocky")
        .set("ma_hk",ma_hk)
        .set("ten_hk",ten_hk)
        .set("heso",heso)
        .where("stt = "+id_hk)
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',id_hk);
        req.flash('SuccessMessage','Cập nhật thông tin thành công');
        res.redirect("/hocki");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerhocki.delete("/delete",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.update()
     .table("tbl_hocky")
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
 routerhocki.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("tbl_hocky")
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
 routerhocki.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_hocky")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerhocki.post("/dkhocki",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let sql = squel.select()
        .from("tbl_hocky")
        .where("LOWER(ma_hk) = LOWER('"+dulieu+"')")
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
module.exports = routerhocki ;