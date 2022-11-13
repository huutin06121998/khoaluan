const express = require("express");
const App = express();
const flash = require("connect-flash");
const env = require("dotenv").config({path: '../config/.env'})
const bodyparser = require("body-parser");
const fileroot = require("app-root-path");
const session = require("express-session");
const routermain = require("./controller/routermain");
const auth = require("../server/middleware/auth");
// lệnh cấu hình thư mục view
App.set("view engine","ejs");
App.set("views","../client/views");
//kết thúc cấu hình views
// cấu hình thư mục public
App.use(express.static(fileroot+"/client/public"));
// kết thúc cấu hình public
App.use(bodyparser.json());
App.use(bodyparser.urlencoded({extended:false}));
// maxAge là thời gian sống của cookie
App.use(session({ cookie: { maxAge: 2 * 60 * 60 * 1000 }, 
    secret: 'huutin1998',
    resave: false, 
    saveUninitialized: false}));
App.use(flash());
auth.decentralization(App);
routermain(App);
// App.use((req,res)=>{
//     res.render("./Error/404.ejs")
// });
App.listen(process.env.PORT,()=>{
    console.log("Server running at port:"+process.env.PORT);
});