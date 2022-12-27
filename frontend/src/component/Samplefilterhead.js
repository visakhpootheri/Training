import { useState, useEffect } from "react";
import axios from "axios";
import "../style/Filterhead.css";
import Filterbox from "./Filterbox";
import Adminuserslist from "./Adminuserslist";
export default function Samplefilterhead() {

  const [userarray, setUserarray] = useState([]);
  const [filtersearch, setFiltersearch] = useState("");
  const [username, setUsername] = useState("");
  const [Lotteryname, setLotteryname] = useState("");
  const [purchasedate1, setPurchasedate1] = useState("");
  const [purchasedate2, setPurchasedate2] = useState("");
  const [drawdate, setDrawdate] = useState("");

  const [mainshow, setMainshow] = useState(false);
  const handleclick = () => {
    setMainshow(mainshow ? false : true);
  };

  useEffect(() => {
    let url = "http://localhost:8080/userlistforadmin";
    let req = {};
    let header = {};
    axios
      .post(url, req, header)
      .then((res) => {
        setUserarray(res.data);
      })
      .catch();
  }, []);
  
  
//================filterbox=================//

  const handleclickfilter=(e)=>{
    usertemparray=userarray.filter((item)=>item.txtFname.toLowerCase().include(username.toLowerCase()))
    console.log("jj",usertemparray)
  }

//==================searchbox===================//

  var usertemparray=[...userarray]
  usertemparray=userarray.filter((item) =>item.txtLotteryname.toLowerCase().includes(filtersearch.toLowerCase())|| item.txtFname.toLowerCase().includes(filtersearch.toLowerCase()) || item.txtPurchaseddate.includes(filtersearch.toLowerCase()));

//==========selectall============//

  const handlechange = (e) => {
    const { name, checked } = e.target;
    if (name === "allselect") {
      let tempuser=userarray.map((item)=>{return{...item,ischecked:checked}})
      setUserarray(tempuser);
    } else {
      let tempuser = userarray.map((item) =>
        item.txtFname === name ? { ...item, ischecked: checked } : item
      );
      setUserarray(tempuser);
    }
  };

  return (
    <div>
      <div className="Filterpage_head">

        <label>Selectall</label>{username}
        <input type={"checkbox"} name="allselect" onChange={handlechange} />

        <button onClick={handleclick}>FILTER</button>

        <input
          type={"text"}
          placeholder="search...."
          onChange={(e)=>setFiltersearch(e.target.value)}
        />
        

        <Filterbox
          showfilter={mainshow}
          setName={setUsername}
          setLotteryname={setLotteryname}
          setPurchasedate1={setPurchasedate1}
          setPurchasedate2={setPurchasedate2}
          setDrawdate={setDrawdate}
          handleclickfilter={handleclickfilter}
        />
      </div>

      <div className="Filterpage_body">
        <Adminuserslist data={usertemparray} handlechange={handlechange} />
      </div>

    </div>
  );
}