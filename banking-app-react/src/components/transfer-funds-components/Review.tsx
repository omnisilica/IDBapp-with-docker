import {
  getToken,
  currencyString,
  accountTypeToString,
  censorAccountNumber,
} from "../../Utility";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import "./Review.css";
import apiClient from "../../services/api-client";
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
const TransferFundsReview = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState<string | null>(null);

  const [transactionAmount, setTransactionAmount] = useState<number | null>(
    null
  );
  const [fromAccount, setFromAccount] = useState<number | null>(null);
  const [toAccount, setToAccount] = useState<number | null>(null);
  const [maxTransferAmount, setMaxTransferAmount] = useState<number | null>(
    null
  );
  const [receivingAccountBalance, setReceivingAccountBalance] = useState<
    number | null
  >(null);
  const [sendingAccountType, setSendingAccountType] = useState<string | null>(
    null
  );
  const [receivingAccountType, setReceivingAccountType] = useState<
    string | null
  >(null);
  const location = useLocation();
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
    if (location.state != null) {
      setTransactionAmount(location.state?.transactionAmount);
      setFromAccount(location.state?.sourceAccount);
      setToAccount(location.state?.destinationAccount);
      setMaxTransferAmount(location.state?.sourceAccountBalance);
      setReceivingAccountBalance(location.state?.destinationAccountBalance);
      setSendingAccountType(location.state?.sendingAccountType);
      setReceivingAccountType(location.state?.receivingAccountType);
    }
  }, [location.state]);
  const fromAccNum = fromAccount ? fromAccount : "";
  const toAccNum = toAccount ? toAccount : "";
  const dateToday = new Date();
  const formattedDate = dateToday.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const transactionAmt = transactionAmount ? transactionAmount : 0;

  const handleEdit = () => {
    navigate("/transferMoney", {
      state: {
        transactionAmount: transactionAmount,
        sourceAccount: fromAccount,
        destinationAccount: toAccount,
        sourceAccountBalance: maxTransferAmount,
        destinationAccountBalance: receivingAccountBalance,
        sendingAccountType: sendingAccountType,
        receivingAccountType: receivingAccountType,
      },
    });
  };

  const handleSubmit = async () => {
    apiClient
      .post<any>(
        `/transactions/transfer`,
        {
          name: "Transfer between own accounts",
          sending_account_num: fromAccNum,
          receiving_account_num: toAccNum,
          amount: transactionAmt,
          date: dateToday.toISOString().split("T")[0],
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        // Navigate to completed page
        navigate("/transfer-funds/complete", { state: response.data });
      })
      .catch((error) => {
        console.log("[TransferFundsReview] Error " + error.message);
        setAlert("Failed to transfer, please try again later.");
      });
  };

  function isBeneficiary(accountNumber: number): boolean {
    return beneficiaryData.some(beneficiary => beneficiary.accountNumber === accountNumber);
  }

  return (
    <>
      <div className="box-container">
        <h3 className="tfr-bold">Review</h3>
        <h2 className="tfr-subtitle">Do we have these details right?</h2>
        <form>
          <div className="tfr-detail-edit-heading">
            <h4>Transfer details</h4>
            <button className="tfr-edit-link" onClick={handleEdit}>
              Edit <HiPencil />
            </button>
          </div>
          <div className="tfr-table">
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <div className="tfr-table-heading">From</div>
                  <div>
                    {accountTypeToString(
                      sendingAccountType ? sendingAccountType : ""
                    )}{" "}
                    {censorAccountNumber(Number(fromAccNum))}
                  </div>
                </td>
                <td>
                  <div className="tfr-table-heading tfr-align-right">
                    Balance
                  </div>
                  <div className="tfr-bold tfr-align-right">
                    {currencyString(maxTransferAmount ? maxTransferAmount : 0)}
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tfr-table-heading">To</div>
                  <div>
                    {accountTypeToString(
                      receivingAccountType ? receivingAccountType : ""
                    )}{" "}
                    {censorAccountNumber(Number(toAccNum))}
                  </div>
                </td>
                <td>
                  <div className="tfr-table-heading tfr-align-right">
                    Balance
                  </div>
                  <div className="tfr-bold tfr-align-right">
                    {isBeneficiary(Number(toAccNum))
                     ? '****'
                      : currencyString(receivingAccountBalance ? receivingAccountBalance : 0)
                    }
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="tfr-table-heading">Date</div>
                  <div>{formattedDate}</div>
                </td>
              </tr>
              <tr className="tfr-last-row">
                <td>
                  <div className="tfr-table-heading">Amount</div>
                  <div>
                    {currencyString(transactionAmt ? transactionAmt : 0)}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
        </form>
        <div>
          <Link to="/profile" className="btn btn-outline-danger">
            Cancel
          </Link>
          <button
            className="btn btn-outline-primary mx-2 shadow-sm"
            onClick={handleSubmit}
          >
            Transfer
          </button>
        </div>
        <p> {alert} </p>
      </div>
    </>
  );
};

export default TransferFundsReview;
