const express = require("express");
const routerdiem = express.Router();
const query = require("../../connection/Connection");
const squel = require("squel").useFlavour("postgres");
const pagesize = 24; 
routerdiem.get("/",async(req,res)=>{
    try {
        let sqlpage = squel.select()
        .from("tbl_diem")
        .field("*")
        .toString();
        // Xử lý phân trang
        let kq = await query(sqlpage);
        let tongsorecord = kq.rows[0].count;
        let Sizepage = 24;
        let tongsotrang = parseFloat(tongsorecord/Sizepage);
        tongsotrang = Math.ceil(tongsotrang);
        let dulieu = req.flash('dulieu');
        let sql = squel.select()
        .from("tbl_diem","t1")
        .field("t1.stt")
        .field("t1.diem_mieng")
        .field("t1.diem_15p")
        .field("t1.diem_1t")
        .field("t1.diem_thi")
        .field("t1.id_mh")
        .join("tbl_monhoc","t3","t1.id_mh = t3.id_mh")
        .field("t3.ten_mh")
        .field("t3.heso")
        .join("tbl_hocsinh","t4","t1.ma_hs = t4.ma_hs")
        .field("t4.ma_hs")
        .field("t4.ten_hs")
        .join("tbl_hocky","t5","t1.ma_hk = t5.ma_hk")
        .field("t5.ma_hk")
        .field("t5.ten_hk")
        .where("t1.hoiphuc not in(0)")
        .where(dulieu == "" || dulieu == null ? "" : "t1.stt = '"+dulieu+"'")
        .order("t1.ma_hs",true)
        .order("t1.ma_hk")
        .limit(pagesize)
        .toString();
        let sql_result = squel.select()
        .from("tbl_diem","t1")
        .field("t1.stt")
        .field("t1.id_mh")
        .field("t1.ma_hs")
        .join("tbl_monhoc","t3","t1.id_mh = t3.id_mh")
        .field("t3.ten_mh")
        .field("t3.heso")
        .join("tbl_hocsinh","t4","t1.ma_hs = t4.ma_hs")
        .field("t4.ma_hs")
        .field("t4.ten_hs")
        .join("tbl_hocky","t5","t1.ma_hk = t5.ma_hk")
        .field("t5.ma_hk")
        .field("t5.ten_hk")
        .distinct("t1.ma_hs")
        .where("t1.hoiphuc not in(0)")
        .order("t1.ma_hs",true)
        .toString();
        let sql_monhoc = squel.select()
        .from("tbl_monhoc")
        .field("id_mh")
        .field("ten_mh")
        .field("heso")
        .toString();
        let sql_hocsinh = squel.select()
        .from("tbl_hocsinh")
        .field("ma_hs")
        .field("ten_hs")
        .toString();
        let sql_hocki = squel.select()
        .from("tbl_hocky")
        .field("ma_hk")
        .field("ten_hk")
        .toString();
        let sql_hoiphuc = squel.select()
        .from("tbl_diem","t1")
        .field("t1.stt")
        .field("t1.diem_mieng")
        .field("t1.diem_15p")
        .field("t1.diem_1t")
        .field("t1.diem_thi")
        .join("tbl_monhoc","t3","t1.id_mh = t3.id_mh")
        .field("t3.ten_mh")
        .join("tbl_hocsinh","t4","t1.ma_hs = t4.ma_hs")
        .field("t4.ma_hs")
        .field("t4.ten_hs")
        .join("tbl_hocky","t5","t1.ma_hk = t5.ma_hk")
        .field("t5.ma_hk")
        .field("t5.ten_hk")
        .where("t1.hoiphuc = 0")
        .toString();
        let ketqua_t1 = await query(sql);
        let ketqua_t3 = await query(sql_monhoc);
        let ketqua_t4 = await query(sql_hocsinh);
        let ketqua_t5 = await query(sql_hocki);
        let result = await query(sql_result);
        let tongtrang = Math.ceil(kq.rowCount/Sizepage);
        let hoiphuc = await query(sql_hoiphuc);
        let view = 
        {
            ketqua_t1: ketqua_t1.rows,
            ketqua_t3: ketqua_t3.rows,
            ketqua_t4: ketqua_t4.rows,
            ketqua_t5: ketqua_t5.rows,
            result: result.rows,
            hoiphuc: hoiphuc.rows,
            message: req.flash('SuccessMessage'),
            page :"1",
            tongtrang: tongtrang,
        }
        res.render("./diem/index.ejs",view);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerdiem.post("/insert",async(req,res)=>{
    try {
            let {mahocsinh,mamonhoc,hocki,diemmieng,diem15_1,diem15_2,diem15_3,diem1tiet_1,diem1tiet_2,diemthi,namhoc} = req.body;
            let diem15p = ((parseFloat(diem15_1)+parseFloat(diem15_2)+parseFloat(diem15_3))/3).toFixed(1);
            let diem_1tiet = ((parseFloat(diem1tiet_1)+parseFloat(diem1tiet_2))/2);
            let dtbm = ((parseFloat(diemmieng)+parseFloat(diem15_1)+parseFloat(diem15_2)+parseFloat(diem15_3))+((parseFloat(diem1tiet_1)*2+parseFloat(diem1tiet_2)*2))+(parseFloat(diemthi)*3))/11;
            let sql = squel.insert()
            .into("tbl_diem")
            .set("ma_hk",hocki)
            .set("ma_hs",mahocsinh)
            .set("diem_mieng",diemmieng == null ? null : parseFloat(diemmieng).toFixed(1))
            .set("diem_thi",diemthi == null ? null : parseFloat(diemthi))
            .set("id_mh",mamonhoc)
            .set("diem15_1",diem15_1 == null ? null : parseFloat(diem15_1).toFixed(1))
            .set("diem15_2",diem15_2 == null ? null : parseFloat(diem15_2).toFixed(1))
            .set("diem15_3",diem15_3 == null ? null : parseFloat(diem15_3).toFixed(1))
            .set("diem_15p",diem15p)
            .set("diem1_t_1",diem1tiet_1 == null ? null : parseFloat(diem1tiet_1))
            .set("diem1_t_2",diem1tiet_2 == null ? null : parseFloat(diem1tiet_2))
            .set("diem_1t",parseFloat(diem_1tiet))
            .set("dtb_m",parseFloat(dtbm).toFixed(2))
            .set("namhoc",namhoc)
            .returning("stt")
            .toString();
            let ketqua = await query(sql);
            req.flash('dulieu',ketqua.rows[0].stt);
            req.flash('SuccessMessage','Thêm thành công')
            res.redirect("/diem");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerdiem.post("/update",async(req,res)=>{
    try {
            let {mahocsinh,mamonhoc,hocki,diemmieng,diem15_1,diem15_2,diem15_3,diem1tiet_1,diem1tiet_2,diemthi,id,namhoc} = req.body;
            let diem15p = ((parseFloat(diem15_1)+parseFloat(diem15_2)+parseFloat(diem15_3))/3).toFixed(1);
            let diem_1tiet = ((parseFloat(diem1tiet_1)+parseFloat(diem1tiet_2))/2);
            let dtbmh = ((parseFloat(diemmieng)+parseFloat(diem15_1)+parseFloat(diem15_2)+parseFloat(diem15_3))+((parseFloat(diem1tiet_1)*2+parseFloat(diem1tiet_2)*2))+(parseFloat(diemthi)*3))/11;
            let sql = squel.update()
            .table("tbl_diem")
            .set("ma_hk",hocki)
            .set("ma_hs",mahocsinh)
            .set("diem_mieng",diemmieng == null ? null : parseFloat(diemmieng).toFixed(1))
            .set("diem_thi",diemthi == null ? null : parseFloat(diemthi))
            .set("id_mh",mamonhoc)
            .set("diem15_1",diem15_1 == null ? null : parseFloat(diem15_1).toFixed(1))
            .set("diem15_2",diem15_2 == null ? null : parseFloat(diem15_2).toFixed(1))
            .set("diem15_3",diem15_3 == null ? null : parseFloat(diem15_3).toFixed(1))
            .set("diem_15p",diem15p)
            .set("diem1_t_1",diem1tiet_1 == null ? null : parseFloat(diem1tiet_1))
            .set("diem1_t_2",diem1tiet_2 == null ? null : parseFloat(diem1tiet_2))
            .set("diem_1t",parseFloat(diem_1tiet))
            .set("dtb_m",parseFloat(dtbmh).toFixed(2))
            .set("namhoc",namhoc)
            .where("stt = "+id)
            .toString();
            await query(sql);
            req.flash('dulieu',id);
            req.flash('SuccessMessage','Cập nhật thông tin thành công')
            res.redirect("/diem");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
routerdiem.post("/chitiet_hhhh",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let sql = squel.select()
        .from("tbl_diem","t1")
        .field("t1.stt")
        .field("t1.ma_hs")
        .field("t1.diem_mieng")
        .field("t1.diem_15p")
        .field("t1.diem15_1")
        .field("t1.diem15_2")
        .field("t1.diem15_3")
        .field("t1.diem1_t_1")
        .field("t1.diem1_t_2")
        .field("t1.diem_1t")
        .field("t1.diem_thi")
        .field("t1.dtb_m")
        .field("t1.namhoc")
        .join("tbl_monhoc","t3","t1.id_mh = t3.id_mh")
        .field("t3.id_mh")
        .field("t3.ten_mh")
        .join("tbl_hocsinh","t4","t1.ma_hs = t4.ma_hs")
        .field("t4.ma_hs")
        .field("t4.ten_hs")
        .field("t4.ma_lop")
        .join("tbl_hocky","t5","t1.ma_hk = t5.ma_hk")
        .field("t5.ma_hk")
        .field("t5.ten_hk")
        .where("t1.stt = "+dulieu)
        .toString();
        let data = await query(sql);
        res.send(data.rows[0]);
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
/*routerdiem.post("/chitiet",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let sql = squel.select()
        .from("tbl_diem","t1")
        .field("t1.stt")
        .field("t1.ma_hs")
        .field("t1.diem_mieng")
        .field("t1.diem_15p")
        .field("t1.diem15_1")
        .field("t1.diem15_2")
        .field("t1.diem15_3")
        .field("t1.diem1_t_1")
        .field("t1.diem1_t_2")
        .field("t1.diem_1t")
        .field("t1.diem_thi")
        .field("t1.dtb_m")
        .field("t1.namhoc")
        .join("tbl_monhoc","t3","t1.id_mh = t3.id_mh")
        .field("t3.id_mh")
        .field("t3.ten_mh")
        .join("tbl_hocsinh","t4","t1.ma_hs = t4.ma_hs")
        .field("t4.ma_hs")
        .field("t4.ten_hs")
        .field("t4.ma_lop")
        .join("tbl_hocky","t5","t1.ma_hk = t5.ma_hk")
        .field("t5.ma_hk")
        .field("t5.ten_hk")
        .where("t1.stt = "+dulieu)
        .toString();
       let ketqua = await query(sql);
       let sql_lop = squel.select()
       .from("tbl_lop")
       .field("ten_lop")
       .where("ma_lop = '"+ketqua.rows[0].ma_lop+"'")
       .toString();
       let ketqua_lop = await query(sql_lop);
        //Tổng kết cả năm môn học
        let sql_tkmh = squel.select()
        .from("tbl_tkmh") 
        .field("diem_tkmh")
        .where("idmh = '"+ketqua.rows[0].id_mh+"' ")
        .where("mahs = '"+ketqua.rows[0].ma_hs+"'")
        .toString();
        let check_tkmh = await query(sql_tkmh);
        //Tổng kết các môn theo học kì
        let sql_tkhk = squel.select()
        .from("tbl_hk_all")
        .field("diem")
        .where("mahs = '"+ketqua.rows[0].ma_hs+"'")
        .where("mahk = '"+ketqua.rows[0].ma_hk+"'")
        .toString();
        let check_tkhk = await query(sql_tkmh);
        var send = "";
        if(check_tkmh.rowCount >= 1 || check_tkhk.rowCount >= 1)
        {
            var ketqua_tkmh = await query(sql_tkmh);
            var ketqua_tkhk = await query(sql_tkhk);
            res.send({
                ketqua: ketqua.rows[0],
                ketqua_lop: ketqua_lop.rows[0],
                ketqua_tkmh: ketqua_tkmh.rows[0],
                ketqua_tkhk: ketqua_tkhk.rows[0],
           });
        }else{
            res.send("1");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});*/
routerdiem.delete("/delete",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.update()
     .table("tbl_diem")
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
 routerdiem.post("/ktraselectoption",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let sql = squel.select()
        .from("tbl_diem")
        .where("ma_hs = '"+dulieu+"'")
        .toString();
        let ketqua = await query(sql);
        if(ketqua.rowCount == 24){
            res.send("1")
        }else{
            res.send("0")
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerdiem.delete("/restore",async(req,res)=>{
    try {
        let {dulieu} = req.body;
        let del_info = squel.update()
        .table("tbl_diem")
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
 routerdiem.delete("/result",async(req,res)=>{
    try {
        let {tongmonhoc,tenhs} = req.body;
        let sql_dk_dacomh = squel.select()
        .from("tbl_tkmh")
        .field("idmh")
        .where("idmh = '"+tongmonhoc+"'")
        .toString();
        let dacomh = await query(sql_dk_dacomh);
        if(dacomh.rowCount == 1)
        {
            req.flash('SuccessMessage','Môn học đã tổng kết')
            res.redirect("/diem");
        }else
        {
        //SELECT id, SUM(amount) AS amount FROM yourtable GROUP BY id
        let sql_hk1 = squel.select()
        .from("tbl_diem")
        .field("dtb_m")
        .where("ma_hk = 'HK1'")
        .where("id_mh = '"+tongmonhoc+"'")
        .where("ma_hs = '"+tenhs+"'")
        .toString();
        let sql_hk2 = squel.select()
        .from("tbl_diem")
        .field("dtb_m")
        .where("ma_hk = 'HK2'")
        .where("id_mh = '"+tongmonhoc+"'")
        .where("ma_hs = '"+tenhs+"'")
        .toString();
        let tong_sql_hk2 = await query(sql_hk2);
        let tong_sql_hk1 = await query(sql_hk1);
        let tonghaihocki = parseFloat(((tong_sql_hk2.rows[0].dtb_m * 2)+tong_sql_hk1.rows[0].dtb_m)/3).toFixed(2);
        let sql = squel.select()
        .from("tbl_diem")
        .field("ma_hk")
        .field("ma_hs")
        .field("id_mh")
        .field("namhoc")
        .field("dtb_m")
        .where("id_mh = '"+tongmonhoc+"'")
        .where("ma_hs = '"+tenhs+"'")
        .toString();
        let ketqua = await query(sql);
        if(ketqua.rowCount == 2)
        {
           let sql_result = squel.insert()
           .into("tbl_tkmh")
           .set("diem_tkmh",tonghaihocki == null ? null : tonghaihocki)
           .set("idmh",tongmonhoc)
           .set("mahs",ketqua.rows[0].ma_hs)
           .set("namhoc",ketqua.rows[0].namhoc)
           .toString();
           await query(sql_result);
           res.send("1");
        }else{
            req.flash('SuccessMessage','Môn học chưa thể tổng kết')
            res.redirect("/diem");
        }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerdiem.delete("/result_hk",async(req,res)=>{
    try {
        let {tenhs,mahk} = req.body;
        let sql_check_hk = squel.select()
        .from("tbl_hk_all")
        .field("mahs")
        .field("mahk")
        .where("mahk = '"+mahk+"'")
        .where("mahs = '"+tenhs+"'")
        .toString();
        let ketqua_check = await query(sql_check_hk);
        if(ketqua_check.rowCount == 1)
        {
            req.flash('SuccessMessage','Học kì đã tổng kết')
            res.redirect("/diem");
        }else{
            let sql = squel.select()
            .from("tbl_diem")
            .field("ma_hs")
            .field("ma_hk")
            .field("id_mh")
            .field("namhoc")
            .where("ma_hk = '"+mahk+"'")
            .where("ma_hs = '"+tenhs+"'")
            .toString();
            let ketqua = await query(sql);
            //SELECT SUM(diem_tkmh) FROM tbl_tkmh where(idmh = '"+tongmonhoc+"')
            if(ketqua.rowCount == 12)
            {
                let sql_tk = "SELECT SUM(dtb_m) FROM tbl_diem WHERE ma_hk = '"+mahk+"' AND ma_hs = '"+tenhs+"' " ;
                let ketqua_sum = await query(sql_tk);
                let ketqua1 = ketqua_sum.rows;
                let ketqua2 = JSON.stringify(ketqua1[0].sum);
                let ketqua3 = parseFloat(ketqua2/12).toFixed(2);
                let sql_in = squel.insert()
                .into("tbl_hk_all")
                .set("mahs",ketqua.rows[0].ma_hs)
                .set("mahk",ketqua.rows[0].ma_hk)
                .set("namhoc",ketqua.rows[0].namhoc)
                .set("diem",ketqua3 == null ? null : ketqua3)
                .toString();
                await query(sql_in);
                res.send("1");
            }else{
                req.flash('SuccessMessage','Chưa thể tổng kết học kì')
                res.redirect("/diem");
            }
        }
        
        
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerdiem.delete("/deleteall",async(req,res)=>{
    try {
     let {id} = req.body;
     let del_info = squel.delete()
     .from("tbl_diem")
     .where("stt = "+id)
     .toString();
     await query(del_info);
     res.send("1");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
 });
 routerdiem.post("/page",async (req,res)=>{
    let sql_diem,ds_hs,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
            sql_diem = squel.select()
            .from("tbl_diem")
            .field("tbl_diem.stt")
            .field("tbl_diem.diem_mieng")
            .field("tbl_diem.diem_15p")
            .field("tbl_diem.diem_1t")
            .field("tbl_diem.diem_thi")
            .join("tbl_monhoc",null,"tbl_diem.id_mh = tbl_monhoc.id_mh")
            .field("tbl_monhoc.ten_mh")
            .join("tbl_hocsinh",null,"tbl_diem.ma_hs = tbl_hocsinh.ma_hs")
            .field("tbl_hocsinh.ma_hs")
            .field("tbl_hocsinh.ten_hs")
            .join("tbl_hocky",null,"tbl_diem.ma_hk = tbl_hocky.ma_hk")
            .field("tbl_hocky.ten_hk")
            .where("tbl_diem.hoiphuc not in(0)")
            .where(
                search == ''?"":
                squel.expr()
                .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
                .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")          
            )
        .toString();
        ds_hs = await query(sql_diem)
        tongtrang = Math.ceil(ds_hs.rowCount/pagesize);
        let view = {
            tongtrang:tongtrang,
            page :"1"
        }
        res.render("./diem/page.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
routerdiem.post("/search",async (req,res)=>{
    let ds_diem,sql_data,page,search;
    search = req.body.sr.replace(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g,'');
	try{
        page = req.body.trang;
		if(req.body.trang){
        sql_data = squel.select()
        .from("tbl_diem")
        .field("tbl_diem.stt")
        .field("tbl_diem.diem_mieng")
        .field("tbl_diem.diem_15p")
        .field("tbl_diem.diem_1t")
        .field("tbl_diem.diem_thi")
        .join("tbl_monhoc",null,"tbl_diem.id_mh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .join("tbl_hocsinh",null,"tbl_diem.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_hocky",null,"tbl_diem.ma_hk = tbl_hocky.ma_hk")
        .field("tbl_hocky.ten_hk")
        .where("tbl_diem.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")          
        )
        .limit(pagesize)
        .order("tbl_diem.ma_hs",true)
        .order("tbl_diem.ma_hk",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_diem = await query(sql_data);
		}else{
        page = 1;
		sql_data = squel.select()
        .from("tbl_diem")
        .field("tbl_diem.stt")
        .field("tbl_diem.diem_mieng")
        .field("tbl_diem.diem_15p")
        .field("tbl_diem.diem_1t")
        .field("tbl_diem.diem_thi")
        .join("tbl_monhoc",null,"tbl_diem.id_mh = tbl_monhoc.id_mh")
        .field("tbl_monhoc.ten_mh")
        .join("tbl_hocsinh",null,"tbl_diem.ma_hs = tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ma_hs")
        .field("tbl_hocsinh.ten_hs")
        .join("tbl_hocky",null,"tbl_diem.ma_hk = tbl_hocky.ma_hk")
        .field("tbl_hocky.ten_hk")
        .where("tbl_diem.hoiphuc not in(0)")
        .where(
            search == ''?"":
            squel.expr()
            .or("LOWER(tbl_hocsinh.ma_hs) like LOWER('%"+search+"%')")
            .or("LOWER(tbl_hocsinh.ten_hs) like LOWER('%"+search+"%')")          
        )
        .limit(pagesize)
        .order("tbl_diem.ma_hs",true)
        .order("tbl_diem.ma_hk",true)
        .offset((req.body.trang-1)*pagesize)
        .toString();
        ds_diem = await query(sql_data);
		}
        page = (page-1)*pagesize;
        let view = {
            page:page,
            ds_diem:ds_diem.rows
        }
        res.render("./diem/tb.ejs",view);
    }catch(error){
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routerdiem ;