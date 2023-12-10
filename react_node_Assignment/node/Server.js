const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

const connectionDetails = {
  host: "localhost",
  database: "alex",
  user: "root",
  password: "manager",
};

app.use(cors());
app.use(express.json());

//\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\/////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\

app.get("/products", (req, res) => {
  var connection = mysql.createConnection(connectionDetails);
  var statement = "select * from products";
  connection.query(statement, (error, result) => {
    if (error == null) {
      var resultInString = JSON.stringify(result);
      res.setHeader("Content-Type", "application/json");
      res.write(resultInString);
      res.end();
      connection.end();
    } else {
      var errorInString = JSON.stringify(result);
      res.setHeader("Content-Type", "application/json");
      res.write(errorInString);
      res.end();
      connection.end();
    }
  });
});

//\\\\\\\\\\\\\/////////////////\\\\\\\\\\\\\\\\\/////////////\\\\\\\\\\\\\\\\\\\\\\\\///////////////////////////
app.post("/products",(req,res)=>{
  var connection = mysql.createConnection(connectionDetails);
   var statement = `insert into products (productid,producttitle,price,stock) values(${req.body.productid},'${req.body.producttitle}',${req.body.price},${req.body.stock})`;
  connection.query(statement, (error, result) => {
    if (error == null) {
      var resultInString = JSON.stringify(result);
      res.setHeader("Content-Type", "application/json");
      res.write(resultInString);
      connection.end();
      res.send();
     
    } else {
      var errorInString = JSON.stringify(result);
      res.setHeader("Content-Type", "application/json");
      res.write(errorInString);
     
      connection.end();
      res.send();
    }
  });
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.put("/products/:productid",(req,res)=>{
  var connection=mysql.createConnection(connectionDetails);
  var statement=`update products set producttitle='${req.body.producttitle}' where productid=${req.params.productid}`;
  connection.query(statement,(error,result)=>{
    if (error==null) {
      var resultInString=JSON.stringify(result);
      res.setHeader("Content-Type","application/json");
      res.write(resultInString);
      connection.end();
      res.end();
    }else{
      var errortInString=JSON.stringify(error);
      res.setHeader("Content-Type","application/json");
      res.write(errortInString);
      connection.end();
      res.end();
    }
  });
});

//\\\\\\\\\\\//////////////////\\\\\\\\\\\\\\\\\\\/////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\
app.delete("/products/:productid",(req,res)=>{
  var connection=mysql.createConnection(connectionDetails);
  var statement=`delete from products where productid=${req.params.productid}`;
  connection.query(statement,(error,result)=>{
    if (error==null) {
      var resultInString=JSON.stringify(result);
      res.setHeader("Content-Type","application/json");
      res.write(resultInString);
      connection.end();
      res.end();
    }else{
      var errorInString=JSON.stringify(error);
      res.setHeader("Content-Type","application/json");
      res.write(errorInString);
      connection.end();
      res.end();
    }
  })
})

app.listen(5000, () => {
  console.log("server started listening at port 5000");
});
