const express = require('express');
const app = express();
// const fast2sms = require("fast-two-sms")
require("dotenv").config()
app.set("views engine","ejs")
// app.use(express.urlencoded({extended:false}))


app.get("/",(req,res)=>{
    res.render("index.ejs")
});
app.post("/sendmessage",async(req,res)=>{
    var unirest = require("unirest");
    var req = unirest("GET", "https://www.fast2sms.com/dev/bulk");
        req.query({
            "authorization": process.env.API_KEY,
            "sender_id": "FSTSMS",
            "message": "where are you ?",
            "language": "english",
            "route": "p",
            "numbers": 6268329811
        });

        req.headers({
            "cache-control": "no-cache"
        });

        req.end(function (res) {
            if (res.error) throw new Error(res.error);

            console.log(res.body);
        });
})


app.listen(3000,()=>{
    console.log("server is listening port on 3000");
}) 