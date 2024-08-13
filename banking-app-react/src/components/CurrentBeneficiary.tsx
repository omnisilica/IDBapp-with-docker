import React, { useEffect, useState } from 'react'
import { NavProgressBar, NavTabLink } from './navigation-tabs/NavTab'
import axios, { AxiosError } from 'axios';
import {
  getToken,
} from "../Utility";
import "./RemoveBeneficiary.css"
let token = "";
interface BeneficiaryAccount{
    _id: number;
    name: string;
    bank: string;
    relationship: string;
    accountNumber: number;
    routingNumber: number;
    nickname: string;
}
const RemoveBeneficiary = () => {

    const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryAccount[]>([]);
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);
    let customerId = JSON.parse(localStorage.getItem("loggedInUser") || "").id;
      // Retrieve the token from localstorage
  token = getToken();
        useEffect(() => {
            const filterUrl = `http://localhost:3000/beneficiaries/customer/${customerId}`;
      (async () => {
      try {
        const response = await axios.get<BeneficiaryAccount[]>(filterUrl, {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("output", response);
        setBeneficiaryData(response.data);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoaded(true);
      }
    })();
  }, [])
    const  deleteBeneficiary = (item: BeneficiaryAccount) : void=>  {
        // setBeneficiaryData(beneficiaryData.filter((item) => item.id !== (index)));
        const originalBeneficiaries = [...beneficiaryData];

        setBeneficiaryData(beneficiaryData.filter((u) => u !== item));
         axios
         .delete(`http://localhost:3000/beneficiaries/customer/${customerId}/${item._id}`, {
          headers: { Authorization: "Bearer " + token }
        })
      .catch((err) => {
        setError(err.message);
        setBeneficiaryData(originalBeneficiaries);
      });

    // axios
    //   .delete("https://jsonplaceholder.typicode.com/users/" + user.id)
    //   .catch((err) => {
    //     setError(err.message);
    //     setUsers(originalUsers);
    //   });
    }

    return (<>
      <div className="beneficiariesNavWrapUp">
         <NavProgressBar>
           <NavTabLink  to="/addBeneficiary">Add New Beneficiaries</NavTabLink>
           <NavTabLink to="/currentBeneficiary">Current Beneficiaries</NavTabLink>
         </NavProgressBar>
         </div>
        <table className="table">
          <thead className='headingBeneficiary'>
            <tr >
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Relationship to Beneficiary</th>
                            <th scope="col">Beneficiary Bank</th>
                            <th scope="col">Beneficiary Account Number</th>
                            <th scope="col">Beneficiary Routing Number</th>
                            <th scope="col">Beneficiary Nickname</th>
            </tr>
          </thead>
              {/* <tbody>
                  {beneficiaryData.map((item, index) =>
                    <tr key={item.id} >

                          <th scope="row" className={(index % 2 === 0) ? "grayRow" : ""}>{index + 1 }</th>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{ item.name}</td>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{ item.relationship}</td>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{item.bank}</td>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{item.accountNumber}</td>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{item.routingNumber}</td>
                          <td className={(index % 2 === 0) ? "grayRow" : ""}>{item.nickName}</td>

                          <button
                  className="btn btn-outline-danger"
                  onClick={() => deleteBeneficiary(item)}
                >
                  Delete
                </button>
                      </tr>
                )}

        </tbody> */}
        <tbody>
  {beneficiaryData.map((item, index) => (
    <tr key={item.id} className={index % 2 === 0 ? "grayRow" : ""}>
      <th scope="row">{index + 1}</th>
      <td>{item.name}</td>
      <td>{item.relationship}</td>
      <td>{item.bank}</td>
      <td>{item.accountNumber}</td>
      <td>{item.routingNumber}</td>
      <td>{item.nickname}</td>
      {/* <td> */}
        <button
          className="btn-outline-secondary"
          onClick={() => deleteBeneficiary(item)}
        >
          Delete
        </button>
      {/* </td> */}
    </tr>
  ))}
</tbody>
          </table>
        </>
  )
}

export default RemoveBeneficiary
