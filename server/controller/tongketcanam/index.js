const express = require("express");
const routertongcanam = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize=process.env.PAGESIZE || 5; 
routertongcanam.get("/",async(req,res)=>{
    try {
        let sqlpage = squel.select()
            .from("tbl_tkcanam")
            .field("*")
            .toString();
        // Xử lý phân trang
        let kq = await query(sqlpage);
        let tongsorecord = kq.rows[0].count;
        let Sizepage = process.env.PAGESIZE||5;;
        let tongsotrang = parseFloat(tongsorecord / Sizepage);
        tongsotrang = Math.ceil(tongsotrang);
        let sql_hoiphuc = squel.select()
        .from("tbl_tkcanam","t1")
        .field("t1.id_all_cm")
        .field("t1.diemtk_cm")
        .field("t1.namhoc")
        .join("tbl_hocsinh","t2","t1.ma_hs = t2.ma_hs")
        .field("t2.ma_hs")
        .field("t2.ten_hs")
        .where("t1.hoiphuc = 0 ")
        .toString();
        let sql = squel.select()
        .from("tbl_tkcanam","t1")
        .field("t1.id_all_cm")
        .field("t1.diemtk_cm")
        .field("t1.namhoc")
        .join("tbl_hocsinh","t2","t1.ma_hs = t2.ma_hs")
        .field("t2.ma_hs")
        .field("t2.ten_hs")
        .where("t1.hoiphuc not in(0)")
        .toString();
        let ketqua = await query(sql);
        let hoiphuc = await query(sql_hoiphuc);
        let tongtrang = Math.ceil(kq.rowCount/Sizepage);
        let views = {ketqua: ketqua.rows,hoiphuc: hoiphuc.rows,page :"1",tongtrang: tongtrang};
        res.render("./tongketcanam/index.ejs",views);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.delete("/deleteall", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.delete()
            .from("tbl_tkcanam")
            .where("id_all_cm = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.delete("/delete", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.update()
            .table("tbl_tkcanam")
            .set("hoiphuc = 0")
            .where("id_all_cm = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.delete("/restore", async (req, res) => {
    try {
        let { dulieu } = req.body;
        let del_info = squel.update()
            .table("tbl_tkcanam")
            .set("hoiphuc = 1")
            .where("id_all_cm = " + dulieu)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.post("/page",async (req,res)=>{
    let sql_tongketcanam,ds_tkcn,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_tongketcanam = squel.select()
        .from("tbl_tkcanam")
        .field("tbl_tkcanam.id_all_cm")
        .field("tbl_tkcanam.diemtk_cm")
        .field("tbl_tkcanam.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkcanam.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .where("tbl_tkcanam.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_tkcanam.namhoc) like LOWER('%"+search+"%')")     
        )
        .toString();
        ds_tkcn = await query(sql_tongketcanam);
        tongtrang = Math.ceil(ds_tkcn.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./tongketcanam/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.post("/search",async (req,res)=>{
    let ds_tongketcanam,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page = req.body.trang;
		if(req.body.trang){
        sql_data = squel.select()
        .from("tbl_tkcanam")
        .field("tbl_tkcanam.id_all_cm")
        .field("tbl_tkcanam.diemtk_cm")
        .field("tbl_tkcanam.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkcanam.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .where("tbl_tkcanam.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_tkcanam.namhoc) like LOWER('%"+search+"%')")     
        )
        .limit(pagesize)
        .order("tbl_tkcanam.id_all_cm",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_tongketcanam = await query(sql_data);
		}else{
        page = 1;
		sql_data =  squel.select()
        .from("tbl_tkcanam")
        .field("tbl_tkcanam.id_all_cm")
        .field("tbl_tkcanam.diemtk_cm")
        .field("tbl_tkcanam.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkcanam.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .where("tbl_tkcanam.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_tkcanam.namhoc) like LOWER('%"+search+"%')")     
        )
        .limit(pagesize)
        .order("tbl_tkcanam.id_all_cm",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_tongketcanam = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view = {
            page:page,
            ds_tongketcanam: ds_tongketcanam.rows
        }
        res.render("./tongketcanam/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routertongcanam.post("/data_showall",async (req,res)=>{ 
    try {
        let {key_sr} = req.body;
        key_sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
        let sqldata =  squel.select()
        .from("tbl_tkcanam")
        .field("tbl_tkcanam.id_all_cm")
        .field("tbl_tkcanam.diemtk_cm")
        .field("tbl_tkcanam.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkcanam.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .where("tbl_tkcanam.hoiphuc not in(0)")
        .where(key_sr == null?"":key_sr== ''?'':`LOWER(tbl_hocsinh.ten_hs) like LOWER('%`+key_sr+`%')`)
        .order("tbl_tkcanam.id_all_cm", true)
        .toString();
        let datadiemcanam = await query(sqldata)
        let views = {
            datadiemcanam : datadiemcanam.rows            
        }
        res.render("./tongketcanam/excel.ejs",views)
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routertongcanam;