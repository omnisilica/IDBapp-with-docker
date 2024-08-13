import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import {
  getToken,
  censorAccountNumber,
  accountTypeToString,
  currencyString,
} from "../../Utility";
import { FieldValues, useForm } from "react-hook-form";
import { NavItem } from "react-bootstrap";
import { Label } from "@mui/icons-material";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./DownloadTransactions.css";

interface FormData {
  fromAccount: number | undefined;
  timeframe: string | undefined;
}

interface Account {
  id: number;
  accountNumber: number;
  accountType: string;
  balance: number;
}

interface IDates {
  start: string;
  end: string;
}

let accountData: { [id: number]: Account; } = {};

const DownloadTransactions = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    trigger,
  } = useForm<FormData>();

  const [data, setData] = useState<Account[]>([]);
  const [error, setError] = useState("");
  const [selectedAccount, setSelectedAccount] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [alert, setAlert] = useState<string | null>(null);
  let customerId = JSON.parse(localStorage.getItem("loggedInUser") || "").id;
  const dateOptions: { [id: string]: IDates } = getDateOptions();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<Account[]>(`http://localhost:3000/accounts/customer/${customerId}`, { headers: { Authorization: "Bearer " + getToken() } });
        setData(response.data);
        setValue("fromAccount", response.data[0].accountNumber, {});
        setValue("timeframe", "Last 30 days", {});
        setSelectedDate("Last 30 Days");

        if (location.state != null) {
            setSelectedAccount(location.state?.selectedAccount);
        } else {
            setSelectedAccount(response.data[0].accountNumber);
        }
        
        response.data.forEach(account => {
          accountData[account.accountNumber] = account;
        });
      } catch (error) {
        setError((error as AxiosError).message);
      }
    })();
  }, []);


  const onSubmit = async () => {
    console.log("SELECTED ACC: " + selectedAccount);
    console.log("SELECTED DATE: " + selectedDate);
    let startDate = dateOptions[selectedDate].start;
    let endDate = dateOptions[selectedDate].end;
    try {
      const response = await axios.get<any>(
        `http://localhost:3000/transactions/generate-pdf/account/${accountData[selectedAccount].id}?date_start=${startDate}&date_end=${endDate}`,
        { headers: { Authorization: "Bearer " + getToken() }, responseType: "blob" }
      );

      const href = URL.createObjectURL(response.data);
      const link = document.createElement('a');
      link.href = href;
      link.setAttribute('download', `Account Transactions ${startDate} to ${endDate}.pdf`);
      link.click();
      URL.revokeObjectURL(href);
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="box-container ">
      {error && <p className="text-danger">{error}</p>}
      <form className="mb-2 mx-2 set-form-width" onSubmit={handleSubmit(onSubmit)}>
        <div className="row justify-content-center align-items-center g-3">
          <h1 className="heading">Download Transactions</h1>
          <div className="row-auto">
            <label>Select an Account</label>
            <select id="fromAccount" defaultValue={selectedAccount} onChange={(e) => setSelectedAccount(parseInt(e.target.value))} value={selectedAccount.toString()}>
              {data.map((item, index) => (
                <option key={index} value={item.accountNumber}>
                  {accountTypeToString(item.accountType)} {censorAccountNumber(item.accountNumber)}
                </option>
              ))}
            </select>
          </div>
          <div className="row-auto">
            <label>Select timeframe</label>
            <select id="timeframe" defaultValue={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} value={selectedDate}>
              {Object.keys(dateOptions).map((key, index) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
          </div>
          <div className="row-auto ">
            <button type="submit" className="btn btn-outline-primary mx-2 shadow-sm">
              Download
            </button>
          </div>
          <div className="row-auto ">
            <p className="warning">{alert}</p>
          </div>
        </div>
      </form>
    </div>
  );
};

function getDateOptions() {
  let today = new Date(), last30days = new Date(), last60days = new Date(), last90days = new Date(), last12months = new Date();
  last30days.setDate(today.getDate() - 30);
  last60days.setDate(today.getDate() - 60);
  last90days.setDate(today.getDate() - 90);
  last12months.setMonth(today.getMonth() - 12);
  let months: { [id: string]: IDates } = {};
  let isCurrentMonth = true;
  for (let startDate of getLastNMonths(12)) {
    let endDate = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth() + 1, 0);
    if (isCurrentMonth) {
      months["Current Month"] = { "start": startDate.toISOString().split('T')[0], "end": endDate.toISOString().split('T')[0] };
      isCurrentMonth = false;
    } else {
      months[startDate.toLocaleString('default', { month: 'long' }) + " " + startDate.getFullYear()] = { "start": startDate.toISOString().split('T')[0], "end": endDate.toISOString().split('T')[0] };
    }
  }
  const dateOptions: { [id: string]: IDates } = {
    "Last 30 Days": { "start": last30days.toISOString().split('T')[0], "end": today.toISOString().split('T')[0] },
    "Last 60 Days": { "start": last60days.toISOString().split('T')[0], "end": today.toISOString().split('T')[0] },
    "Last 90 Days": { "start": last90days.toISOString().split('T')[0], "end": today.toISOString().split('T')[0] },
    "Last 12 Months": { "start": last12months.toISOString().split('T')[0], "end": today.toISOString().split('T')[0] },
    ...months
  };

  return dateOptions;
}

function getLastNMonths(n = 0, d = new Date()) {
  let y = d.getFullYear(),
    m = d.getMonth(),
    dates = [];

  do {
    dates.push(new Date(y, m--, 1));
  } while (n--);

  return dates;
}


export default DownloadTransactions;
