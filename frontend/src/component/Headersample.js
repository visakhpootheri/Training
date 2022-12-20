import { useNavigate } from "react-router-dom";
import Header from "./Header";
export default function Headersample(){
    const navigate=useNavigate()
    const buynowclick=(e)=>{
        navigate("/Winners");
    }
    const registerclick=(e)=>{
        navigate("/Winners");
    }
    const loginclick=(e)=>{
        navigate("/Winners");
    }
    return(
        <>
        <Header label1={"Guest"}label2={"9"}label3={"Cart"}label4={"Buynow"}label5={"Register"}label6={"Login"}label7={"label7"}label8={"Label8"}label1click={""}
        label4click={buynowclick}label5click={registerclick}label6click={loginclick}label7click={""}label8click={""}/>
        </>
    );
}