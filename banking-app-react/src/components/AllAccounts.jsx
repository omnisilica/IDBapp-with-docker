import { useEffect, useState } from "react";
import axios from "axios";
const AllAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/accounts")
      .then((response) => {
        setAccounts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleDelete = (accountNumber) => {
    axios
      .delete(`http://localhost:3000/accounts/${accountNumber}`)
      .then((response) => {
        // Remove the deleted account from the accounts state
        setAccounts(
          accounts.filter((account) => account.accountNumber !== accountNumber)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-4">
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Account Number</th>
            <th>Account Balance</th>
            <th>Account Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.accountNumber}>
              <td>{account.accountNumber}</td>
              <td>{account.balance}</td>
              <td>{account.accountType}</td>
              <td>
                <button onClick={() => handleDelete(account.accountNumber)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllAccounts;
