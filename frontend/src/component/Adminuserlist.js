import "../style/Filterhead.css";
export default function Adminuserslist({ data,handlechange}) {
  
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Username</th>
            <th>UserAddress</th>
            <th>LottreyName</th>
            <th>LotteryPurchasedate</th>
            <th>LotteryDrawdate</th>
          </tr>
          {data.map((item, index) => {
            return (
              <>
                <tr key={item.no}>
                  <td>
                    <input
                      type={"checkbox"}
                      value={index}
                      onChange={(e) => {
                        handlechange(e.target.value);
                      }}
                      checked={item.ischecked}
                    />
                  </td>
                  <td>{item.uid}</td>
                  <td>{item.uname}</td>
                  <td>{item.txtaddress}</td>
                  <td>{item.txtLotteryname}</td>
                  <td>{item.purchasedate}</td>
                  <td>{item.drawdate}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

