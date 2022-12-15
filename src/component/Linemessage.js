import "../style/Linemessage.css";
import axios from "axios";
import { useEffect,useState } from "react";
export default function Linemessage(){
    const[ticket,setTickets]=useState("");
    useEffect(()=>{
        let url="http://localhost:8080/tickets";
        let req={userid:1};
        let header={};
        axios
        .post(url, req, header)
        .then((res) => {
          setTickets(res.data[0].number)
          console.log(res.data[0].number)
         
        })
        .catch();
    },[]);
    return(
        <div className="Linemessage">
            <div className="Linemessage_raw">
                <label>You have selected {ticket} tickets and now you eligible to enter in the Grand Draw</label>
            </div>
        </div>
    );
}