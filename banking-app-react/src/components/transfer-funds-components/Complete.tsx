import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { currencyString, censorAccountNumber, getToken } from "../../Utility.tsx";
import "./Complete.css";
import { getAccountBalance } from "../../services/apiAccount";
import axios, { AxiosError } from "axios";

interface BeneficiaryAccount{
  id: number;
  name: string;
  bank: string;
  relationship: string;
  accountNumber: number;
  routingNumber: number;
  nickName: string;
}
export function TransferComplete(props) {
  const location = useLocation();
  console.log(location.state);

  let amount = location.state.deposit
    ? currencyString(location.state.deposit.amount)
    : "Unknown Amount";

  let withdraw_num = location.state.withdraw
    ? censorAccountNumber(location.state.withdraw.transactionFrom)
    : "NaN";
  let deposit_num = location.state.deposit
    ? censorAccountNumber(location.state.deposit.transactionTo)
    : "NaN";

  const [withdrawBalance, setWithdrawBalance] = useState<number | null>(null);
  const [depositBalance, setDepositBalance] = useState<number | null>(null);
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryAccount[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  let token = "";

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

  useEffect(() => {
    async function getBalances() {
      setWithdrawBalance(
        await getAccountBalance(location.state.withdraw.transactionFrom)
      );
      setDepositBalance(
        await getAccountBalance(location.state.deposit.transactionTo)
      );
    }
    getBalances();
  });

  function isBeneficiary(accountNumber: number): boolean {
    return beneficiaryData.some(beneficiary => beneficiary.accountNumber === accountNumber);
  }

  return (
    <main className="container border shadow p-5 mt-4">
      <h1>Transfer Complete</h1>
      <p>
        Your transfer has completed successfully. Funds should appear in the
        target account immediately.
      </p>
      <table className="border shadow tableComplete">
        <thead>
          <tr>
            <th>Amount</th>
            <td className="balance" colspan="2">
              {amount}
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="tfr-table-heading">From</div>
              {withdraw_num}
            </td>
            <td>
              <div className="tfr-table-heading">New balance</div>
              {currencyString(withdrawBalance)}
            </td>
          </tr>
          <tr>
            <td>
              <div className="tfr-table-heading">To </div>
              {deposit_num}
            </td>
            <td>
              <div className="tfr-table-heading tfr-align-right">
                New Balance
              </div>
              <div className="tfr-bold tfr-align-right">
              {isBeneficiary(Number(location.state.deposit.transactionTo))
                  ? '****'
                  : currencyString(depositBalance ? depositBalance : 0)
                }
              </div>
          </td>
          </tr>
        </tbody>
      </table>
      <nav>
        <Link to="/profile" className="btn btn-outline-primary mx-2 shadow-sm">
          Return to accounts overview
        </Link>
      </nav>
    </main>
  );
}
