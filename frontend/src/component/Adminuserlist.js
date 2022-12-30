import { useEffect, useState } from "react";

export default function Adminuserslist({ data }) {
  const [newarr, setNewarr] = useState([]);
  const handlechange = (index) => {
    let temp = [...data];
    console.log("jj", index);
    for (const item of temp) {
      temp[index].ischecked = !temp[index].ischecked;
    }
    console.log("g", temp[index]);
    setNewarr(temp);
  };
  useEffect(() => {
    setNewarr(data);
  });

  return (
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
        {newarr.map((item, index) => {
          return (
            <>
              <tr>
                <td>
                  <input
                    type={"checkbox"}
                    onChange={(e) => handlechange(index)}
                    checked={item.ischecked}
                  />
                </td>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.txtaddress}</td>
                <td>{item.txtLotteryname}</td>
                <td>{item.purchasedate}</td>
                <td>{item.lotterydrawdate}</td>
              </tr>
            </>
          );
        })}
      </table>
    </>
  );
}
