import "../style/sample1.css";
import { useState } from "react";
export default function Sample1(){
    const [array,setArray]=useState([[{value: 1,click: false},{value: 2,click: false},{value: 3,click: false}],[{value: 4,click: false},{value: 5,click: false},{value: 6,click: false}]]);
    
    const buttonselect=(index,innerindex)=>{
        console.log(index)
        console.log(innerindex)
    const temp=[...array]; 
    temp[index][innerindex].click=temp[index][innerindex].click?false:true;
    setArray(temp)
    }

    return(
        <>
        {array.map((item,index) => {
            return(
                <>
                {item.map((inneritem,innerindex)=>{
                    return(
                        <>
                        <button onClick={(e) =>buttonselect(index,innerindex)} className={inneritem.click? "button clicked" : "button"}>{JSON.stringify(inneritem.click)}</button>
                        
                        </>
                    )
                })}
                <br></br>
                </>
            );
        })}
       </>
    );
}