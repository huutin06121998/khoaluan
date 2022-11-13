const express = require("express");
const routermain = express.Router();
routermain.get("/",async(req,res)=>{
    try {
        res.render("./main/index.ejs");
    } catch (error) {
        console.log(error);
        res.sendStatus(404);
    }
});
module.exports = routermain ;