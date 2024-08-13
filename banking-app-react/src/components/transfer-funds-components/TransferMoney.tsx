import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  getToken,
  censorAccountNumber,
  accountTypeToString,
  currencyString,
} from "../../Utility";
import { FieldValues, useForm} from "react-hook-form";
import { NavItem } from "react-bootstrap";
import { Label } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./TransferMoney.css";
import backendUrl from "../../config";

let token = "";
interface FormData {
  amount: number;
  toAccount: number | undefined;
  fromAccount: number | undefined;
}

interface Account {
  id: number;
  accountNumber: number;
  accountType: string;
  balance: number;
}
interface BeneficiaryAccount{
  id: number;
  nickName: string;
  accountNumber: number;
}
let continueClicked = false;
let alertCount: any = 0;

const TransferMoney = () => {
  // Inside your component function or class
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    resetField,
    setFocus,
    setValue,
    trigger,
    watch
  } = useForm<FormData>();




  const [data, setData] = useState<Account[]>([]);
  const [beneficiaryData, setBeneficiaryData] = useState<BeneficiaryAccount[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [sendingAccount, setSendingAccount] = useState<number | undefined>(
    undefined
  );
  const [receivingAccount, setReceivingAccount] = useState<number | undefined>(
    undefined
  );
  const [transferAmount, setTransferAmount] = useState<number>(0);
  const [alert, setAlert] = useState<string | null>(null);
  const [maxTransferAmount, setMaxTransferAmount] = useState(0.0);
  const [receivingAccountBalance, setReceivingAccountBalance] = useState<
    number | null
  >(null);
  const [sendingAccountType, setSendingAccountType] = useState<string>();
  const [receivingAccountType, setReceivingAccountType] = useState<string>();
  // Get the customer information from the URL params and create the API call
  const queryParameters = new URLSearchParams(window.location.search);
  let customerId = JSON.parse(localStorage.getItem("loggedInUser") || "").id;
  console.log(`customerId is ${customerId}`);
  const url = `${backendUrl}/accounts/customer/${customerId}`;

  // Retrieve the token from localstorage
  token = getToken();

  const disabled=!sendingAccount || !receivingAccount || !transferAmount;

  useEffect(() => {
    const filterUrl = `${backendUrl}/accounts/customer/${customerId}`;

    (async () => {
      try {
        const response = await axios.get<Account[]>(filterUrl, {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("output", response);
        setData(response.data);
        data.map((d) => {
          console.log(`d.accountNumber is ${d.accountNumber}`);
          console.log(`sendingAccount is ${sendingAccount}`);
          console.log(`type of d.accountNumber is ${typeof d.accountNumber}`);
          console.log(`type of sendingAccount is ${typeof sendingAccount}`);
          console.log(
            `d.accountNumber === sendingAccount is ${
              d.accountNumber === sendingAccount
            }`
          );
          d.accountNumber === sendingAccount &&
            setMaxTransferAmount(Number(d.balance));
          d.accountNumber === sendingAccount &&
            setSendingAccountType(d.accountType);
          d.accountNumber === sendingAccount &&
            console.log(`Number(d.balance) is ${Number(d.balance)}`);
          d.accountNumber === sendingAccount &&
            console.log(`sendingAccountType is ${d.accountType}`);
          d.accountNumber === receivingAccount &&
            setReceivingAccountBalance(Number(d.balance));
          d.accountNumber === receivingAccount &&
            setReceivingAccountType(d.accountType);
          d.accountNumber === receivingAccount &&
            console.log(`setReceivingAccountBalance is ${Number(d.balance)}`);
          d.accountNumber === receivingAccount &&
            console.log(`receivingAccountType is ${d.accountType}`);
        });
        console.log(` maxTransferAmount is ${maxTransferAmount}`);
        console.log(`sendingAccountType is ${sendingAccountType}`);
        console.log(`receivingAccountType is ${receivingAccountType}`);
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setLoaded(true);
      }
    })();
  }, [sendingAccount, receivingAccount]);
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
  const location = useLocation();
  console.log(`location.state is ${location.state}`);

  useEffect(() => {
    console.log({ state: location.state });
    if (location.state != null) {
      setTransferAmount(location.state?.transactionAmount);
      setSendingAccount(location.state?.sourceAccount);
      setReceivingAccount(location.state?.destinationAccount);
      setMaxTransferAmount(location.state?.sourceAccountBalance);
      setReceivingAccountBalance(location.state?.destinationAccountBalance);
      setSendingAccountType(location.state?.sendingAccountType);
      setReceivingAccountType(location.state?.receivingAccountType);
    }

  
    setValue("fromAccount", location.state?.sourceAccount, {});
    setValue("toAccount", location.state?.destinationAccount, {});
    setValue("amount", location.state?.transactionAmount, {});

    // Check if location.state is not null
    if (location.state !== null) {
      // Delayed trigger validation after 250 milliseconds
      setTimeout(() => {
        trigger(); // Assuming you want to trigger validation here
      }, 250);
    }
  }, [location.state]);
  const onSubmit = (data1: FieldValues) => {
    continueClicked = true;
    console.log(
      `data1 is ${data1.fromAccount}, ${data1.toAccount}, ${data1.amount}`
    );
    let acc = data1.fromAccount;
    {
      if (Number(data1.fromAccount) === Number(data1.toAccount)) {
        console.log(`The "From" and "To" accounts are the same`);
        setAlert(`The "From" and "To" accounts are the same.`);
        alertCount = alertCount + 1;
        setTimeout(() => {
          setAlert(""); // Clear the message after 5 seconds
        }, 5000); // 5 seconds in milliseconds
      } else {
        data.map((d) => {
          if (
            Number(d.accountNumber) === Number(acc) &&
            Number(d.balance) < Number(data1.amount)
          ) {
            console.log(d.balance);
            console.log(data1.amount);
            console.log("Insufficient balance");
            console.log(d.accountNumber, d.balance);
            console.log(acc);
            setAlert("Insufficient funds for this transfer.");
            alertCount = alertCount + 1;
            setTimeout(() => {
              setAlert(""); // Clear the message after 5 seconds
            }, 5000); // 5 seconds in milliseconds
          } else if (
            Number(d.accountNumber) === Number(acc) &&
            Number(d.balance) >= Number(data1.amount)
          ) {
            console.log("Sufficient balance");
            console.log(d.accountNumber, d.balance);
            console.log(acc);
            {
              navigate("/transfer-funds/review", {
                state: {
                  transactionAmount: data1.amount,
                  sourceAccount: data1.fromAccount,
                  destinationAccount: data1.toAccount,
                  sourceAccountBalance: maxTransferAmount,
                  destinationAccountBalance: receivingAccountBalance,
                  sendingAccountType: sendingAccountType,
                  receivingAccountType: receivingAccountType,
                },
              });
            }
          }
        });
      }
    }
  };
  function handleAddBeneficiaryClick(event: any): void {
    navigate("/addBeneficiary");
  }
  return (
    <div className="box-container ">
      {error && <p className="text-danger">{error}</p>}
      <nav className="navbar justify-content-center navbar-light bg-light">
        <form
          className="mb-2 mx-2 set-form-width"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="row justify-content-center align-items-center g-3">
            <h1 className="heading">Transfer between accounts</h1>
            <div className="row-auto">
              <label>From</label>
              <select
                id="fromAccount"
                {...register("fromAccount", { required: true })}
                onChange={(e) => {
                  setSendingAccount(parseInt(e.target.value));
                  console.log(
                    `setSendingAccount(e.target.value) is ${e.target.value}`
                  );
                  alertCount = 0;
                  continueClicked = false;
                }}
                value={sendingAccount?.toString()}
              >
                <option value="">
                  <label>Select Account</label>
                </option>
                {data.map((item, index) => (
                  <option key={index} value={item.accountNumber}>
                    {accountTypeToString(item.accountType)} {":"}
                    {/* {"************" + item.accountNumber.toString().slice(-4)} */}
                    {censorAccountNumber(item.accountNumber)} {","}{" "}
                    {`Balance: ${currencyString(item.balance)}`}
                  </option>
                ))}
              </select>
              {errors.fromAccount?.type === "required" && (
                <p>Please select the From Account field</p>
              )}
            </div>
            <div className="row-auto">
              <label>To</label>
              <select
                id="toAccount"
                {...register("toAccount", { required: true })}
                onChange={(e) => {
                  setReceivingAccount(parseFloat(e.target.value));
                  console.log(
                    `setReceivingAccount(e.target.value) is ${e.target.value}`
                  );
                  alertCount = 0;
                  continueClicked = false;
                }}
                value={receivingAccount?.toString()}
              >
                <option value="">
                  <label>Select Account</label>
                </option>
                {data.map((item, index) => (
                  <option key={index} value={item.accountNumber}>
                    {accountTypeToString(item.accountType)} {":"}
                    {/* {"************" + item.accountNumber.toString().slice(-4)} */}
                    {censorAccountNumber(item.accountNumber)} {","}{" "}
                    {`Balance: ${currencyString(item.balance)}`}
                  </option>
                    ))}
                {beneficiaryData.map((item, index) => (
                    <option key={index} value={item.accountNumber}>
                    {`NickName: ${item.nickName}`}
                  </option>
                  ))}
              </select>
              {errors.toAccount?.type === "required" && (
                <p>Please select the To Account field</p>
              )}
            </div>
            <div className="row-auto amount">
              <label>Amount </label>
                <button
                  // type="submit"
                // className="btn btn-outline-primary mx-2 shadow-sm"
                className="btn-outline-secondary"
                  onClick={handleAddBeneficiaryClick}
                >
                  Add Beneficiary
                </button>
              {/* <input
                type="number"
                // pattern="\d+"
                min="0.01"
                step="0.01"
                className="form-control"
                placeholder="0.00"
                id="amount"
                {...register("amount", {
                  required: true,
                  min: 0.01,
                })}
                onChange={(e) => {
                  setTransferAmount(parseFloat(e.target.value));
                  console.log(
                    `setTransferAmount(e.target.value) is ${e.target.value}`
                  );
                }}
              /> */}
            </div>
            <div className="row-auto">
              {/* <label>Amount</label> */}
              <input
                type="number"
                // pattern="\d+"
                min="0.01"
                step="0.01"
                className="form-control"
                placeholder="0.00"
                id="amount"
                {...register("amount", {
                  required: true,
                  min: 0.01,
                })}
                onChange={(e) => {
                  setTransferAmount(parseFloat(e.target.value));
                  console.log(
                    `setTransferAmount(e.target.value) is ${e.target.value}`
                  );
                }}
              />
            </div>
            <div className="row-auto ">
              <Link to="/profile" className="btn btn-outline-danger">
                Cancel
              </Link>
              
                <button
                  type="submit"
                  disabled={disabled}
                  className="btn btn-outline-primary mx-2 shadow-sm"
                >
                  Continue
                </button>
              
            </div>
            <div className="row-auto ">
              <p className="warning">{alert}</p>
            </div>
          </div>
        </form>
      </nav>
    </div>
  );
};

export default TransferMoney;
