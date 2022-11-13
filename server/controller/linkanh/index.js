const express = require("express");
const routeranh = express.Router();
const fs = require("fs")
routeranh.get("/:hinhanh",async (req,res)=>{
    let hinhanh = req.params.hinhanh;
    res.sendfile("./image/"+hinhanh);
});
module.exports = routeranh;