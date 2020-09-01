//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

var mysql = require("mysql");

const app = express();
app.set('view engine', 'ejs');

app.use(express.static("public"));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "This is test";
const PORT = 3000;

var r;
// mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodedb",
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    r = result;
    console.log(r);
  });
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// app.get("/", function(req, res){
//     res.sendFile(__dirname + "/templates/index.ejs");
// });


app.get("/", function(req, res) {
  res.render("home");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/cyl1", function(req, res){
  res.render("cyl1");
});

app.get("/cyl2", function(req, res){
  res.render("cyl2");
});

app.get("/cyl3", function(req, res){
  res.render("cyl3");
});


app.get("/about", function(req, res){
  res.render("about");
});

app.get("/read", function(req, res){
  con.query('SELECT * FROM customers', (err, rows, fields)=>{
    if(err)
      res.render(404);
    else
      res.render("read", {
      read_row_name: rows[0].name,
      read_row_addr: rows[0].address
      });
  });
});

// app.get("/read", function(req, res){
//   con.query('SELECT * FROM customers', (err, rows, fields)=>
//   {
//     if(!err)
//       res.send(rows);
//     else
//       console.log(err);
//   });
// });

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
});

