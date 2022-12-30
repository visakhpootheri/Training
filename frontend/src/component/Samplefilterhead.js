import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Filterhead.css";
import Filterbox from "./Filterbox";
import Adminuserslist from "./Adminuserslist";
export default function Samplefilterhead() {
  const [userarray, setUserarray] = useState([]);
  const [userdata, setUserdata] = useState([]);
  const [filtersearch, setFiltersearch] = useState("");
  const [username, setUsername] = useState("");
  const [Lotteryname, setLotteryname] = useState("");
  const [purchasedate1, setPurchasedate1] = useState("");
  const [purchasedate2, setPurchasedate2] = useState("");
  const [drawdate, setDrawdate] = useState("");
  const [mainshow, setMainshow] = useState(false);
  const [value,setvalue]=useState(false);
  useEffect(() => {
    let url = "http://localhost:8080/userlistforadmin";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        var temp = [...res.data];
        console.log("array", temp);
        for (const item of temp) {
          item.ischecked = false;
        }
        console.log("newarray", temp);
        setUserarray(temp);
        setUserdata(temp);
      })
      .catch();
  }, []);

  //=============filterboxshow=============//

  const handleclick = () => {
    setMainshow(mainshow ? false : true);
    setUserarray(userdata);
    setLotteryname("");
    setUsername("");
    setDrawdate("");
    setPurchasedate1("");
  };

  //================filterbox=================//

  const handleclickfilter = (e) => {
    
    let temp = userarray.filter((item) =>
      item.name.toLowerCase().includes(username.toLowerCase())
    );
    let sample = userarray.filter((item) =>
      item.txtLotteryname.toLowerCase().includes(Lotteryname.toLowerCase())
    );
    let newsample = userarray.filter(
      (item) =>
        item.name.toLowerCase().includes(username.toLowerCase()) &&
        item.txtLotteryname.toLowerCase().includes(Lotteryname.toLowerCase())
    );
    console.log("new", newsample);
    console.log("lotteryname", sample);
    console.log("username", temp);
    console.log("myname", username);
    console.log("mylott", Lotteryname);

    if (temp.length > 0 && sample.length > 0) {
      setUserarray(newsample);
    } else if (temp.length > 0 && sample.length === 0) {
      console.log("if");
      setUserarray(temp);
    } else {
      console.log("else");
      setUserarray(sample);
    }
    setMainshow(false);
  };

  //==================searchbox===================//
  

  var usertemparray = [...userarray];
 
  usertemparray = userarray.filter(
  
    (item) =>
      item.txtLotteryname.toLowerCase().includes(filtersearch.toLowerCase()) ||
      item.name.toLowerCase().includes(filtersearch.toLowerCase()) ||
      item.txtaddress.toLowerCase().includes(filtersearch.toLowerCase()) ||
      item.purchasedate.includes(filtersearch) ||
      item.lotterydrawdate.includes(filtersearch)
  );

  //==========selectall============//
  const handlechanging=()=>{
     setvalue(false);
     console.log("useme");
  }

  const handlechange = () => {
    setvalue(value?false:true)
    var temp = [...userarray];
    for (const item of temp) { 
        if(item.ischecked==false){
          item.ischecked=true;
          console.log("hello iam");
        }else{
          item.ischecked=false;
        }
    }
    
    setUserarray(temp);
  };
  console.log("pp", usertemparray);

  return (
    <div>
      <div className="Filterpage_head">
        <label>Selectall</label>
        <input
          type={"checkbox"}
          name="allselect"
          checked={value}
          onChange={handlechange}
        />

        <button onClick={handleclick}>FILTER</button>

        <input
          type={"text"}
          placeholder="search...."
          onChange={(e) => setFiltersearch(e.target.value)}
        />

        <Filterbox
          showfilter={mainshow}
          setName={setUsername}
          setLotteryname={setLotteryname}
          setPurchasedate1={setPurchasedate1}
          // setPurchasedate2={setPurchasedate2}
          setDrawdate={setDrawdate}
          handleclickfilter={handleclickfilter}   
        />
      </div>

      <div className="Filterpage_body">
        <Adminuserslist data={usertemparray} fun2={handlechanging}/>
      </div>
    </div>
  );
}
