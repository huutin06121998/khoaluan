const express = require("express");
const routerupload = express.Router();
const multer = require("multer");
const fs = require("fs");
const fileroot = require("app-root-path");
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `${fileroot}/server/image`)
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length-1];
        cb(null, file.fieldname + '-' + Date.now()+"."+extension);
    }
});

let upload = multer({storage:storage});

routerupload.get("/",async (req,res)=>{
    res.render("upload/index.ejs")
});
routerupload.post("/taikhoan_image",upload.single("file"),async (req,res)=>{
    try {
        let anhcu = req.body.anhcu
        if(anhcu == "" || anhcu == null || anhcu == "noneimage.png")
        {
            res.send(req.file.filename);
        }
        else
        {
            fs.unlinkSync("./image/"+anhcu);
            res.send(req.file.filename);

        }
    } catch (error) {
        console.error(error)
        res.send('0');
    }
});

routerupload.post("/taikhoan_image/del_file",async (req,res)=>{
    try {
        let anhcu = req.body.anhcu,anh_db=req.body.anh_db;
        if(anhcu == "" || anhcu == null || anhcu == "noneimage.png")
        {
            return 1;
        }else
        {
            fs.unlinkSync("./image/"+anhcu);
        }
         if(anh_db == "" || anh_db == null || anh_db == "noneimage.png")
        {
            return 1;
        }else
        {
          let sqlinserttaikhoan = squel.update()
            .table("login")
            .set("image_avatar",null)
            .where("image_avatar = '"+req.body.anh_db+"'")
            .toString();
            await query(sqlinserttaikhoan)  
            fs.unlinkSync("./image/"+anh_db);
            let trade = 1;
        }
         res.send('1');
    } catch (error) {
        console.error(error)
        res.send('0');
    }
});
module.exports = routerupload;