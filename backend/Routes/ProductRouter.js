
const express = require("express")
const router = express.Router()
const ensureAuthenticated = require("../Middlewares/Auth");

router.get("/",ensureAuthenticated,(req,res)=>{

    res.send
 (   [{
        name:"phone",
        price:1000
    },
    {
        name:"tv",
        price:20000
    },
    {
        name:"couch",
        price:50000
    }])
})

module.exports = router