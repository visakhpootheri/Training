var mysql = require("mysql");
const express = require("express");
const app = express();
app.use(express.json())
const cors=require("cors");
app.use(cors());
var con = mysql.createConnection({
  database: "lotterydrums",
  user: "root",
  password: "Visakh@97",
  host: "localhost",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

//------------userinfoforadmin--------------//

app.post("/userlistforadmin",(req,res)=>{
  var sql="select TUR.id,concat(TUR.txtFname,TUR.txtLname) as name,TUR.txtaddress,TLM.txtLotteryname,date_format(dtLotterydrawdate,'%Y-%m-%d') as lotterydrawdate,date_format(txtPurchaseddate,'%Y-%m-%d') as purchasedate from tblunit TU leftjoin tblusers TUR on TU.refUser=TUR.id leftjoin tbllotterymaster TLM on TU.refLotterymaster=TLM.id;"
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log(result)
    res.send(result);
  });
});

//-----------userlotterydetails using username-----------//

app.post("/userlotterydetails",(req,res)=>{
  let Fname=req.body.fname;
  let Lname=req.body.lname;
  var sql="select TL.txtLotteryname as Lotteryname,date_format(TL.dtLotterydrawdate,'%Y-%m-%d') as Drawdate,date_format(TU.txtPurchaseddate,'%Y-%m-%d')as Purchaseddate from tbllotterymaster TL join tblunit TU on TL.id=TU.refLotterymaster join tblusers TUR on TU.refUser=TUR.id where TUR.txtFname='"+Fname+"' && TUR.txtLname='"+Lname+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  });
});

//----------count of userpurchased lottery---------//

app.post("/userlotterycount",(req,res)=>{
  let Fname=req.body.fname;
  let Lname=req.body.lname;
  var sql="select count(*) from (select TL.txtLotteryname as Lotteryname,date_format(TL.dtLotterydrawdate,'%Y-%m-%d') as Drawdate,date_format(TU.txtPurchaseddate,'%Y-%m-%d')as Purchaseddate from tbllotterymaster TL join tblunit TU on TL.id=TU.refLotterymaster join tblusers TUR on TU.refUser=TUR.id where TUR.txtFname='"+Fname+"' && TUR.txtLname='"+Lname+"')as new;"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

//-----------userpasswordedit-------------//
app.post("/updatepassword",(req,res)=>{
  let userid=req.body.userid;
  let newpassword=req.body.password;
  var sql="update tblusers set txtUpassword='"+newpassword+"' where tblusers.id='"+userid+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});
app.post("/showpassword",(req,res)=>{
  let userid=req.body.userid;
  var sql="select TU.id,TU.txtUpassword from tblusers TU where  TU.id='"+userid+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen(8080, () => {
  console.log("listening on port");
});

