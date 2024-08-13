import React, { useEffect, useState } from 'react'
import { NavProgressBar, NavTabLink } from './navigation-tabs/NavTab'
import axios, { AxiosError } from 'axios';
import {
  getToken,
} from "../Utility";
let token = "";
interface BeneficiaryAccount{
    id: number;
    name: string;
    bank: string;
    relationship: string;
    accountNumber: number;
    routingNumber: number;
    nickName: string;
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
        const originalBeneficiaries = [...beneficiaryData];

        setBeneficiaryData(beneficiaryData.filter((u) => u !== item));
         axios
      .delete("http://localhost:3000/beneficiaries/" + item.id, { headers: { Authorization: "Bearer " + token }})
      .catch((err) => {
        setError(err.message);
        setBeneficiaryData(originalBeneficiaries);
      });
    }

    return (<>
      <div className="beneficiariesNavWrapUp">
         <NavProgressBar>
           <NavTabLink  to="/addBeneficiary">Add New Beneficiaries</NavTabLink>
           <NavTabLink to="/currentBeneficiary">Current Beneficiaries</NavTabLink>
           <NavTabLink  to="/removeBeneficiary">Remove Beneficiaries</NavTabLink>
           <NavTabLink  to="/updateBeneficiary">Update Beneficiaries</NavTabLink>
         </NavProgressBar>
         </div>
        <table className="table">
  <thead>
    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Relationship to Beneficiary</th>
                    <th scope="col">Beneficiary Bank</th>
                    <th scope="col">Beneficiary Account Number</th>
                    <th scope="col">Beneficiary Routing Number</th>
                    <th scope="col">Beneficiary Nick Name</th>
    </tr>
  </thead>
            <tbody>
                {beneficiaryData.map((item, index) =>
                    <tr key={item.id}>
                        <th scope="row">{index + 1 }</th>
                        <td>{ item.name}</td>
                        <td>{ item.relationship}</td>
                        <td>{item.bank}</td>
                        <td>{item.accountNumber}</td>
                        <td>{item.routingNumber}</td>
                        <td>{item.nickName}</td>
                        {/* <td><button onClick={deleteBeneficiary(item)} className="btn btn-outline-danger">
          Remove
        </button></td> */}
                        <button
                className="btn btn-outline-danger"
                onClick={() => deleteBeneficiary(item)}
              >
                Update
              </button>
    </tr>
                )}

    {/* <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Larry</td>
      <td>the Bird</td>
      <td>@twitter</td>
    </tr> */}
  </tbody>
</table>
        </>
  )
}

export default RemoveBeneficiary