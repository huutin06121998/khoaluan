const express = require("express");
const routertongketmonhoc = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize=process.env.PAGESIZE || 5; 
routertongketmonhoc.get("/",async(req,res)=>{
    try {
        let sqlpage = squel.select()
        .from("tbl_tkmh")
        .field("*")
        .toString();
        // Xử lý phân trang
       let kq = await query(sqlpage);
       let tongsorecord = kq.rows[0].count;
       let Sizepage = process.env.PAGESIZE||5;
       let tongsotrang = parseFloat(tongsorecord/Sizepage);
       tongsotrang = Math.ceil(tongsotrang);
        let sql_hoiphuc = squel.select()
        .from("tbl_tkmh","t1")
        .field("t1.mamhtk")
        .field("t1.diem_tkmh")
        .field("t1.namhoc")
        .join("tbl_hocsinh","t2","t1.mahs = t2.ma_hs")
        .field("t2.ma_hs")
        .field("t2.ten_hs")
        .join("tbl_monhoc","t3","t1.idmh = t3.id_mh")
        .field("t3.id_mh")
        .field("t3.ten_mh")
        .where("t1.hoiphuc = 0")
        .toString();
        let sql = squel.select()
        .from("tbl_tkmh","t1")
        .field("t1.mamhtk")
        .field("t1.diem_tkmh")
        .field("t1.namhoc")
        .join("tbl_hocsinh","t2","t1.mahs = t2.ma_hs")
        .field("t2.ma_hs")
        .field("t2.ten_hs")
        .join("tbl_monhoc","t3","t1.idmh = t3.id_mh")
        .field("t3.id_mh")
        .field("t3.ten_mh")
        .where("t1.hoiphuc not in(0)")
        .limit(pagesize)
        .order("t1.mamhtk",true)
        .toString();
        let ketqua = await query(sql);
        let hoiphuc =  await query(sql_hoiphuc);
        let tongtrang = Math.ceil(kq.rowCount/Sizepage);
        let views = {ketqua: ketqua.rows,hoiphuc: hoiphuc.rows,message: req.flash('SuccessMessage'), page :"1",tongtrang: tongtrang};
        res.render("./tongketmonhoc/index.ejs",views);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongketmonhoc.delete("/deleteall", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.delete()
            .from("tbl_tkmh")
            .where("mamhtk = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongketmonhoc.delete("/delete", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.update()
            .table("tbl_tkmh")
            .set("hoiphuc = 0")
            .where("mamhtk = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongketmonhoc.delete("/restore", async (req, res) => {
    try {
        let { dulieu } = req.body;
        let del_info = squel.update()
            .table("tbl_tkmh")
            .set("hoiphuc = 1")
            .where("mamhtk = " + dulieu)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertongketmonhoc.post("/page",async (req,res)=>{
    let sql_tongketmonhoc,ds_tkmh,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        sql_tongketmonhoc = squel.select()
        .from("tbl_tkmh")
        .field("tbl_tkmh.mamhtk")
        .field("tbl_tkmh.diem_tkmh")
        .field("tbl_tkmh.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkmh.mahs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_monhoc",null,"tbl_tkmh.idmh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .where("tbl_tkmh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')")     
        )
        .toString();
        ds_tkmh = await query(sql_tongketmonhoc)
        tongtrang = Math.ceil(ds_tkmh.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./tongketmonhoc/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routertongketmonhoc.post("/search",async (req,res)=>{
    let ds_tongketmonhoc,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page = req.body.trang;
		if(req.body.trang){
        sql_data = squel.select()
        .from("tbl_tkmh")
        .field("tbl_tkmh.mamhtk")
        .field("tbl_tkmh.diem_tkmh")
        .field("tbl_tkmh.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkmh.mahs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_monhoc",null,"tbl_tkmh.idmh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .where("tbl_tkmh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')")     
        )
        .limit(pagesize)
        .order("tbl_tkmh.mamhtk",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_tongketmonhoc = await query(sql_data);
		}else{
        page = 1;
		sql_data = squel.select()
        .from("tbl_tkmh")
        .field("tbl_tkmh.mamhtk")
        .field("tbl_tkmh.diem_tkmh")
        .field("tbl_tkmh.namhoc")
        .join("tbl_hocsinh",null,"tbl_tkmh.mahs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_monhoc",null,"tbl_tkmh.idmh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .where("tbl_tkmh.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_monhoc.ten_mh) like LOWER('%"+search+"%')")     
        )
        .limit(pagesize)
        .order("tbl_tkmh.mamhtk",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_tongketmonhoc = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view = {
            page:page,
            ds_tongketmonhoc:ds_tongketmonhoc.rows
        }
        res.render("./tongketmonhoc/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routertongketmonhoc ;