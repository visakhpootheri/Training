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
  var sql="select TUR.id,TUR.txtFname,TUR.txtLname,TUR.txtaddress,TLM.txtLotteryname,date_format(dtLotterydrawdate,'%Y-%m-%d') as lotterydrawdate,date_format(txtPurchaseddate,'%Y-%m-%d') as purchasedate from tblunit TU join tblusers TUR on TU.refUser=TUR.id join tbllotterymaster TLM on TU.refLotterymaster=TLM.id;"
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

//--------------users details of a specific lottery--------------//

app.post("/lotterypurchasedusers",(req,res)=>{
  let lottery=req.body.lotteryname;
  var sql="SELECT TUR.txtFname,TUR.txtLname,date_format(TU.txtPurchaseddate,'%Y-%m-%d'),date_format(TLM.dtLotterydrawdate,'%Y-%m-%d') from tblunit TU join tbllotterymaster TLM on TU.refLotterymaster=TLM.id join tblusers TUR on TU.refUser=TUR.id where TLM.txtLotteryname='"+lottery+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

//-------user details who purchased a specific lottery,date------------//
app.post("/userlist",(req,res)=>{
  let Purchaseddate=req.body.purchaseddate;
  let lottery=req.body.lotteryname;
  var sql="select TUR.id,TUR.txtFname,TUR.txtLname FROM tblusers TUR JOIN tblunit TU ON TUR.id=TU.refUser join tbllotterymaster TLM on TU.refLotterymaster=TLM.id where TLM.txtLotteryname='"+lottery+"' && TU.txtPurchaseddate='"+Purchaseddate+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})
//--------------loterylist using drawdate---//
app.post("/lotterylist",(req,res)=>{
  let Drawdate=req.body.drawdate;
  var sql="select txtLotteryname from tbllotterymaster where dtLotterydrawdate='"+Drawdate+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

//------------CHOISE LIST-----------//

app.post("/choicelist",(req,res)=>{
  let lottery=req.body.lotteryname;
  var sql="select TU.txtFirstchoicenumber,TU.txtSecondchoicenumber,TU.txtThirdchoicenumber,TU.txtFourthchoicenumber,TU.txtFifthoicenumber from tblunit TU join tbllotterymaster TLM on TU.refLotterymaster=TLM.id where TLM.txtLotteryname='"+lottery+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

//----------------for select all-----------//

app.post("/selectall",(req,res)=>{
  let lottery=req.body.lotteryname;
  let Purchaseddate=req.body.purchaseddate;
  let Drawdate=req.body.drawdate;
  var sql="select TUR.id,TUR.txtFname,TUR.txtLname from tblusers TUR join tblunit TU on TUR.id=TU.refUser join tbllotterymaster TLM on TU.refLotterymaster=TLM.id where TLM.txtLotteryname='"+lottery+"' && TLM.dtLotterydrawdate='"+Drawdate+"' && TU.txtPurchaseddate='"+Purchaseddate+"';"
  con.query(sql,function(err,result){
    if(err) throw err;
    res.send(result);
  })
})

app.listen(8080, () => {
  console.log("listening on port");
});

