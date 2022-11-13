const express = require("express");
const routerlogin= express.Router();
routerlogin.get("/",async (req,res)=>{
    res.render("./login/index.ejs");
});
module.exports = routerlogin;