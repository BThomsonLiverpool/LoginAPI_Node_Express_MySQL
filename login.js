//tools
const mysql = require("mysql2");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static("assets"));

// create connection to the local database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "nodejs"
});

// connect to the MySQL Workbench Database
connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database!")
});


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/",encoder, function(req,res){
    var username = req.body.username;
    var password = req.body.password;
//  mysql query 
    connection.query("select * from loginuser where user_name = ? and user_pass = ?",[username,password],function(error,results,fields){
        if (results.length > 0) {
            res.redirect("/signedin");
        } else {
            res.redirect("/");
        }
        res.end();
    })
})

// when login is successful 
app.get("/signedin",function(req,res){
    res.sendFile(__dirname + "/signedin.html")
})


// set app port     localhost:4000 
app.listen(4000);