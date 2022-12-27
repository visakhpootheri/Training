export default function Adminuserslist({data,handlechange}){
    
    return(
        <>
         <table>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Username</th>
            <th>UserAddress</th>
            <th>LottreyName</th>
            <th>LotteryPurchasedate</th>
            <th>LotteryDrawdate</th>
          </tr>
          {data.map((item,index)=>{
            return<>
            <tr>
            <td>
              <input type={"checkbox"} name={item.txtFname} onChange={handlechange}/>
            </td>
            <td>{item.id}</td>
            <td>{item.txtFname}{item.txtLname}</td>
            <td>{item.txtaddress}</td>
            <td>{item.txtLotteryname}</td>
            <td>{item.txtPurchaseddate}</td>
            <td>{item.dtLotterydrawdate}</td>
          </tr>
            </>
          })}
          
        </table>
        </>
    );
}