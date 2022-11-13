const express = require("express");
const routertaikhoan = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const md5 = require("md5");
const sha = require("sha1");
const fs = require("fs");
const pagesize=process.env.PAGESIZE || 5; 
routertaikhoan.get("/",async(req,res)=>{
    try {
        let sqlpage = squel.select()
        .from("dangnhap")
        .field("*")
        .toString();
        // Xử lý phân trang
        let kq = await query(sqlpage);
        let tongsorecord = kq.rows[0].count;
        let Sizepage = process.env.PAGESIZE||5;
        let tongsotrang = parseFloat(tongsorecord/Sizepage);
        tongsotrang = Math.ceil(tongsotrang)
        let dulieu = req.flash('dulieu');
        let sql = squel.select()
        .from("dangnhap")
        .field("username")
        .field("stt")
        .where("hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "stt = '"+dulieu+"'")
        .order("stt",true)
        .limit(Sizepage)
        .toString();
        let sql_hoiphuc = squel.select()
        .from("dangnhap")
        .field("username")
        .field("stt")
        .where("hoiphuc = 0")
        .toString();
        let ketqua = await query(sql);
        let hoiphuc = await query(sql_hoiphuc);
        let tongtrang = Math.ceil(kq.rowCount/Sizepage);
        let views = {
            ketqua: ketqua.rows,
            page :"1",
            tongtrang: tongtrang,
            hoiphuc: hoiphuc.rows,
            messge: req.flash('SuccessMessage')
        };
        res.render("./taikhoan/index.ejs",views);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.post("/chitiet_taikhoan",async(req,res)=>{
    try {
        let {tentk} = req.body;
        let sql = squel.select()
        .from("dangnhap")
        .where("LOWER(username) = LOWER('"+tentk+"')")
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
routertaikhoan.post("/insert",async(req,res)=>{
    try {
        let {tentaikhoan,matkhau,img} = req.body;
        let quyen = parseInt(req.body.quyen);
        let sql = squel.insert()
        .into("dangnhap")
        .set("username",tentaikhoan)
        .set("password",sha(md5(matkhau)))
        .set("image_avatar",img == null ? "noneimage.png" : img)
        .set("quyen",quyen)
        .returning("stt")
        .toString();
        let ketqua = await query(sql);
        req.flash('dulieu',ketqua.rows[0].stt);
        req.flash('SuccessMessage','Tạo tài khoản thành công')
        res.redirect("/taikhoan");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.post("/chitiet_change",async(req,res)=>{
    try {
        let {id} = req.body;
        let sql = squel.select()
        .from("dangnhap")
        .field("stt")
        .field("username")
        .where("stt = "+id)
        .toString();
        let ketqua = await query(sql);
        res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404); 
    }
});
routertaikhoan.post("/change",async(req,res)=>{
    try {
        let {iduser,changematkhau} = req.body;
        let sql = squel.update()
        .table("dangnhap")
        .set("password",sha(md5(changematkhau)))
        .where("stt = "+iduser)
        .toString();
        await query(sql);
        req.flash('SuccessMessage','Thay đổi mật khẩu thành công');
        res.redirect("/taikhoan");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.post("/chitiet",async(req,res)=>{
    try {
        let {id_sua} = req.body;
        let sql = squel.select()
        .from("dangnhap")
        .field("stt")
        .field("username")
        .field("image_avatar")
        .field("quyen")
        .where("stt = "+id_sua)
        .toString();
        let ketqua = await query(sql);
        res.send(ketqua.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.post("/update",async(req,res)=>{
    try {
        let {id_user,tentaikhoan,img} = req.body;
        let quyen = parseInt(req.body.quyen);
        let sql = squel.update()
        .table("dangnhap")
        .set("username",tentaikhoan)
        .set("image_avatar",img == null ? "noneimage.png" : img)
        .set("quyen",quyen)
        .where("stt = "+id_user)
        .toString();
        await query(sql);
        req.flash('dulieu',id_user);
        req.flash('SuccessMessage','Cập nhật tài khoản thành công');
        res.redirect("/taikhoan");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.delete("/delete",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.update()
     .table("dangnhap")
     .set("hoiphuc = 0")
     .where("stt = "+id)
     .returning("image_avatar")
     .toString();
     let avatar = await query(del_info);
     let avatar_img = avatar.rows[0].image_avatar;
     if(avatar_img == "noneimage.jpg" || avatar_img == null || avatar_img == ""){
         return 1;
     }else{
        fs.unlinkSync("./image/"+avatar_img);
     }
     res.send("1");
    } catch (error) {
         console.log(error);
         res.sendStatus(404);
    }
 });
 routertaikhoan.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("dangnhap")
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
 routertaikhoan.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("dangnhap")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routertaikhoan.post("/page",async (req,res)=>{
    let sql_taikhoan,ds_tk,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_taikhoan = squel.select()
        .from("dangnhap")
        .field("stt")
        .field("username")
        .where("hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(username) like LOWER('%"+search+"%')")       
        )
        .toString();
        ds_tk = await query(sql_taikhoan);
        tongtrang = Math.ceil(ds_tk.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./taikhoan/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routertaikhoan.post("/search",async (req,res)=>{
    let ds_taikhoan,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page = req.body.trang;
		if(req.body.trang){
        sql_data = squel.select()
        .from("dangnhap")
        .field("stt")
        .field("username")
        .where("hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(username) like LOWER('%"+search+"%')")       
        )
        .limit(pagesize)
        .order("stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_taikhoan = await query(sql_data);
		}else{
        page = 1;
		sql_data = squel.select()
        .from("dangnhap")
        .field("stt")
        .field("username")
        .where("hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(username) like LOWER('%"+search+"%')")       
        )
        .limit(pagesize)
        .order("stt",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_taikhoan = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view = {
            page:page,
            ds_taikhoan:ds_taikhoan.rows
        }
        res.render("./taikhoan/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routertaikhoan;