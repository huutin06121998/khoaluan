const express = require("express");
const routertonghocky = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize = 24;
routertonghocky.get("/", async (req, res) => {
    try {
        let sqlpage = squel.select()
            .from("tbl_hk_all")
            .field("*")
            .toString();
        // Xử lý phân trang
        let kq = await query(sqlpage);
        let tongsorecord = kq.rows[0].count;
        let Sizepage = 24;
        let tongsotrang = parseFloat(tongsorecord / Sizepage);
        tongsotrang = Math.ceil(tongsotrang);
        let sql_convert = "select DISTINCT t1.mahs,t2.ten_hs from tbl_hk_all as t1 inner join tbl_hocsinh as t2 on(t1.mahs = t2.ma_hs) " ;
        let convert = await query(sql_convert);
        let sql = squel.select()
            .from("tbl_hk_all", "t1")
            .field("t1.id_hk")
            .field("t1.diem")
            .field("t1.namhoc")
            .join("tbl_hocsinh", "t2", "t1.mahs = t2.ma_hs")
            .field("t2.ma_hs")
            .field("t2.ten_hs")
            .join("tbl_hocky", "t3", "t1.mahk = t3.ma_hk")
            .field("t3.ten_hk")
            .where("t1.hoiphuc not in(0)")
            .order("t1.id_hk", true)
            .limit(pagesize)
            .toString();
        let sql_hoiphuc = squel.select()
            .from("tbl_hk_all", "t1")
            .field("t1.id_hk")
            .field("t1.diem")
            .field("t1.namhoc")
            .join("tbl_hocsinh", "t2", "t1.mahs = t2.ma_hs")
            .field("t2.ma_hs")
            .field("t2.ten_hs")
            .join("tbl_hocky", "t3", "t1.mahk = t3.ma_hk")
            .field("t3.ten_hk")
            .where("t1.hoiphuc = 0")
            .toString();
        let hoiphuc = await query(sql_hoiphuc);
        let ketqua = await query(sql);
        let tongtrang = Math.ceil(kq.rowCount / Sizepage);
        let views = { ketqua: ketqua.rows,convert: convert.rows, hoiphuc: hoiphuc.rows, page: "1", tongtrang: tongtrang,message: req.flash('SuccessMessage') };
        res.render("./tongkethocky/index.ejs", views);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.delete("/deleteall", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.delete()
            .from("tbl_hk_all")
            .where("id_hk = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.delete("/delete", async (req, res) => {
    try {
        let { id } = req.body;
        let del_info = squel.update()
            .table("tbl_hk_all")
            .set("hoiphuc = 0")
            .where("id_hk = " + id)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.delete("/restore", async (req, res) => {
    try {
        let { dulieu } = req.body;
        let del_info = squel.update()
            .table("tbl_hk_all")
            .set("hoiphuc = 1")
            .where("id_hk = " + dulieu)
            .toString();
        await query(del_info);
        res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.post("/data_showall",async (req,res)=>{ 
    try {
        let {key_sr} = req.body;
        key_sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
        let sqldata = squel.select()
        .from("tbl_hk_all")
        .field("tbl_hk_all.id_hk")
        .field("tbl_hk_all.diem")
        .field("tbl_hk_all.namhoc")
        .join("tbl_hocsinh", null, "tbl_hk_all.mahs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_hocky", null, "tbl_hk_all.mahk = tbl_hocky.ma_hk")
        .field("tbl_hocky.ten_hk")
        .where("tbl_hk_all.hoiphuc not in(0)")
        .where(key_sr == null?"":key_sr== ''?'':`LOWER(tbl_hocsinh.ten_hs) like LOWER('%`+key_sr+`%')`)
        .order("tbl_hk_all.id_hk", true)
        .toString();
        let datadiemhocky = await query(sqldata)
        let views = {
            datadiemhocky : datadiemhocky.rows            
        }
        res.render("./tongkethocky/excel.ejs",views)
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.post("/page", async (req, res) => {
    let sql_diem_hk, ds_diem_hk, search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    try {
        sql_diem_hk = squel.select()
            .from("tbl_hk_all")
            .field("tbl_hk_all.id_hk")
            .field("tbl_hk_all.diem")
            .field("tbl_hk_all.namhoc")
            .join("tbl_hocsinh", null, "tbl_hk_all.mahs = tbl_hocsinh.ma_hs")
            .field("tbl_hocsinh.ma_hs")
            .field("tbl_hocsinh.ten_hs")
            .join("tbl_hocky", null, "tbl_hk_all.mahk = tbl_hocky.ma_hk")
            .field("tbl_hocky.ten_hk")
            .where("tbl_hk_all.hoiphuc not in(0)")
            .where(
                search == '' ? "" :
                    squel.expr()
                        .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%" + search + "%')")
                        .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%" + search + "%')")
                        .or("LOWER(tbl_hocky.ma_hk) like LOWER('%" + search + "%')")
                        .or("LOWER(tbl_hocky.ten_hk) like LOWER('%" + search + "%')")
                        .or("LOWER(tbl_hk_all.namhoc) like LOWER('%" + search + "%')")
            )
            .toString();
        ds_diem_hk = await query(sql_diem_hk);
        tongtrang = Math.ceil(ds_diem_hk.rowCount / pagesize);
        let view = {
            tongtrang: tongtrang,
            page: "1"
        }
        res.render("./tongkethocky/page.ejs", view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.post("/search", async (req, res) => {
    let ds_diem_hk, sql_data, page, search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '');
    try {
        page = req.body.trang;
        if (req.body.trang) {
            sql_data = squel.select()
                .from("tbl_hk_all")
                .field("tbl_hk_all.id_hk")
                .field("tbl_hk_all.diem")
                .field("tbl_hk_all.namhoc")
                .join("tbl_hocsinh", null, "tbl_hk_all.mahs = tbl_hocsinh.ma_hs")
                .field("tbl_hocsinh.ma_hs")
                .field("tbl_hocsinh.ten_hs")
                .join("tbl_hocky", null, "tbl_hk_all.mahk = tbl_hocky.ma_hk")
                .field("tbl_hocky.ten_hk")
                .where("tbl_hk_all.hoiphuc not in(0)")
                .where(
                    search == '' ? "" :
                        squel.expr()
                            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocky.ma_hk) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocky.ten_hk) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hk_all.namhoc) like LOWER('%" + search + "%')")
                )
                .limit(pagesize)
                .order("tbl_hk_all.id_hk", true)
                .offset((req.body.trang - 1) * pagesize)
                .toString();
            ds_diem_hk = await query(sql_data);
        } else {
            page = 1;
            sql_data = sql_data = squel.select()
                .from("tbl_hk_all")
                .field("tbl_hk_all.id_hk")
                .field("tbl_hk_all.diem")
                .field("tbl_hk_all.namhoc")
                .join("tbl_hocsinh", null, "tbl_hk_all.mahs = tbl_hocsinh.ma_hs")
                .field("tbl_hocsinh.ma_hs")
                .field("tbl_hocsinh.ten_hs")
                .join("tbl_hocky", null, "tbl_hk_all.mahk = tbl_hocky.ma_hk")
                .field("tbl_hocky.ten_hk")
                .where("tbl_hk_all.hoiphuc not in(0)")
                .where(
                    search == '' ? "" :
                        squel.expr()
                            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocky.ma_hk) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hocky.ten_hk) like LOWER('%" + search + "%')")
                            .or("LOWER(tbl_hk_all.namhoc) like LOWER('%" + search + "%')")
                )
                .limit(pagesize)
                .order("tbl_hk_all.id_hk", true)
                .offset((req.body.trang - 1) * pagesize)
                .toString();
            ds_diem_hk = await query(sql_data);
        }
        page = (page - 1) * pagesize;
        let view = {
            page: page,
            ds_diem_hk: ds_diem_hk.rows
        }
        res.render("./tongkethocky/tb.ejs", view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routertonghocky.delete("/result",async(req,res)=>{
    try {
        let {mahs,tenhs} = req.body;
        let sql_check_hk = squel.select()
        .from("tbl_tkcanam")
        .field("ma_hs")
        .where("ma_hs = '"+mahs+"'")
        .toString(); 
        let ketqua_check = await query(sql_check_hk);
        if(ketqua_check.rowCount === 1)
        {
            req.flash('SuccessMessage','Năm học của học sinh '+tenhs+' đã tổng kết')
            res.redirect("/tongkethocky");
        }else{
            let sql = "select mahs,mahk,namhoc from tbl_hk_all where mahk = 'HK1'or mahk = 'HK2' and mahs = '"+mahs+"'";
            let ketqua = await query(sql);
            if(ketqua.rowCount == 2)
            {
                let sql_tk = "SELECT SUM(diem) FROM tbl_hk_all WHERE mahk = 'HK1'or mahk = 'HK2' and mahs = '"+mahs+"'" ;
                let ketqua_sum = await query(sql_tk);
                let ketqua1 = ketqua_sum.rows;
                let ketqua2 = JSON.stringify(ketqua1[0].sum);
                let ketqua3 = parseFloat(ketqua2/2).toFixed(2);
                let sql_in = squel.insert()
                .into("tbl_tkcanam")
                .set("ma_hs",ketqua.rows[0].mahs)
                .set("namhoc",ketqua.rows[0].namhoc)
                .set("diemtk_cm",ketqua3 == null ? null : ketqua3)
                .toString();
                await query(sql_in);
                res.send("1");
            }else{
                req.flash('SuccessMessage','Chưa thể tổng kết năm học của học sinh '+tenhs+'')
                res.redirect("/tongkethocky");
            }
        }  
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
module.exports = routertonghocky;