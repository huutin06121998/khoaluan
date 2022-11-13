
const hocsinh = require("../controller/hocsinh/index");
const lop = require("../controller/lop/index");
const giaovien = require("../controller/giaovien/index");
const monhoc = require("../controller/monhoc/index");
const hocki = require("../controller/hocky/index");
const diem = require("../controller/diem/index");
const index = require("../controller/main/index");
const taikhoan = require("../controller/taikhoan/index");
const ds_khoilop = require("../controller/ds_khoilop/index");
const tongketmonhoc =  require("../controller/tongketmonhoc/index");
const tongkethocky = require("../controller/tongkethocky/index");
const tongketcanam = require("../controller/tongketcanam/index");
const router_upload = require("./upload/index");
const auth = require("../middleware/auth");
const router_anh = require("./linkanh/index");
let main = (app)=>{
    app.use("/hocsinh",auth.middleauth,hocsinh);
    app.use("/lop",auth.middleauth,lop);
    app.use("/giaovien",auth.middleauth,giaovien);
    app.use("/monhoc",auth.middleauth,monhoc);
    app.use("/hocki",auth.middleauth,hocki);
    app.use("/diem",auth.middleauth,diem);
    app.use("/taikhoan",auth.middleauth,taikhoan);
    app.use("/ds_khoilop",auth.middleauth,ds_khoilop);
    app.use("/tongkethocky",auth.middleauth,tongkethocky);
    app.use("/tongketcacmonhoc",auth.middleauth,tongketmonhoc);
    app.use("/tongketcanam",auth.middleauth,tongketcanam);
    app.use("/upload",auth.middleauth,router_upload);
    app.use("/hinhanh",auth.middleauth,router_anh);
    app.use("/",auth.middleauth,index);
}
module.exports = main;