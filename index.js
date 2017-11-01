var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app =express();
var urlencodeParser = bodyParser.urlencoded({extended:false});

var tmp;
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "Project_car"
});
app.get('/',function (req,res) {
   res.send('Hello');
});


app.post('/AddData',urlencodeParser,function (req,res) {
    var sql ="INSERT INTO `account`(`account_number`, `branch_name`, `balance`) VALUES ('"+req.body.number+"','"+req.body.name+"','"+req.body.balance+"') ";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.send('Add data ')
    res.send(sql);
        });
    });
// เรียกแสดง
app.get('/showData',function (req,res) {
var sql = "select * from account";
con.query(sql,function (err,rows) {
    res.json(rows);

    });
});

// ค้นหา
app.get('/getAccount/:id',function (req,res) {

    var sql = "SELECT `account_number`, `branch_name`, `balance` FROM `account` WHERE account_number ='"+req.params.id+"'";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.json(rows);

    });
});
//ลบข้อมูล
app.delete('/delete/:id',urlencodeParser,function (req,res) {

    var sql = "DELETE FROM `account" +
        "` WHERE account_number  ='"+req.params.id+"'";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        res.send('Delete sucsess');

    });
});
//อับเดตข้อมูล
app.put('/UpdateData',urlencodeParser,function (req,res) {
    var number = req.body.account_number;
    var bal = req.body.balance;

    var sql ="UPDATE `account` SET `balance`= '"+bal+"' where account_number = '"+number+"' ";
    con.query(sql,function (err,rows) {
        if(err) throw err;
        console.log('Update data ');
        res.send(sql);
    });
});


app.listen(3000,function () {
   console.log('server running at localhot:3000')
});