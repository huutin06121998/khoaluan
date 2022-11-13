const express = require("express");
const routerkhoilop = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
routerkhoilop.get("/",async(req,res)=>{
    try {
        let sql_6 = squel.select().from("tbl_lop").field("ten_lop").field("ma_lop").where("ma_lop like ('%"+'6'+"%')").order("ma_lop",true).toString();
        let sql_7 = squel.select().from("tbl_lop").field("ten_lop").field("ma_lop").where("ma_lop like ('%"+'7'+"%')").order("ma_lop",true).toString();
        let sql_8 = squel.select().from("tbl_lop").field("ten_lop").field("ma_lop").where("ma_lop like ('%"+'8'+"%')").order("ma_lop",true).toString();
        let sql_9 = squel.select().from("tbl_lop").field("ten_lop").field("ma_lop").where("ma_lop like ('%"+'9'+"%')").order("ma_lop",true).toString();
        let lop_6 = await query(sql_6);
        let lop_7 = await query(sql_7);
        let lop_8 = await query(sql_8);
        let lop_9 = await query(sql_9);
        let view = {
            lop_6: lop_6.rows,
            lop_7: lop_7.rows,
            lop_8: lop_8.rows,
            lop_9: lop_9.rows
        };
        res.render("./ds_khoilop/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerkhoilop.post("/data_showall",async (req,res)=>{ 
    try {
        let {malop} = req.body;
        let sqldata = squel.select()
        .from("tbl_hocsinh")
        .field("ten_hs")
        .where("ma_lop = '"+malop+"'")
        .toString();
        let datashowall = await query(sqldata)
        let views = {
            datashowall : datashowall.rows            
        }
        res.render("./ds_khoilop/show_hs.ejs",views)
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routerkhoilop ;