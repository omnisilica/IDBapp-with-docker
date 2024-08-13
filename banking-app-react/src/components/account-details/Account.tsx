import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import daysFilter from "./daysFilter";
import { currencyString, censorAccountNumber, getToken } from "../../Utility";
import { TransactionPopup } from "./Transaction";
import { Transaction } from "../../../src/module/Transaction";
import Pagination from './Pagination';
import backendUrl from "../../config";

let token = "";
let type: any = "";
let transactionTypes = [
  { value: "deposit", displayValue: "Deposit" },
  { value: "withdraw", displayValue: "Withdraw" },
];

/**
 * Displays the account page with a full list of transactions.
 * Uses URL parameters to select customer and display relevant transactions.
 */
export function Account() {
  // Get the customer information from the URL params and create the API call
  // const queryParameters = new URLSearchParams(window.location.search);
  // const customer = JSON.parse(queryParameters.get("accountData") || "");
  const customer = useLocation().state || "";
  const url = `${backendUrl}/transactions/account/${customer.id}`;

  // Retrieve the token from localstorage
  token = getToken();
  const navigate = useNavigate();

  // Prepare state information
  const [data, setData] = useState<Transaction[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [transactionType, setTransactionType] = useState("all");
  const [days, setDays] = useState(0);
  const [showingPopup, setShowingPopup] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPageCount, setTotalPageCount] = useState(1);

  useEffect(() => {
    console.log("inside the effect hook");
    var today = new Date().toISOString().slice(0, 10); // Get today's date

    var prev = new Date(new Date().setDate(new Date().getDate() - days))
      .toISOString()
      .slice(0, 10); // Format it as yyyy-mm-dd

    const dateFilter = days === 0 ? "" : `date_start=${prev}&date_end=${today}&`;
    const filterUrl = `${backendUrl}/transactions/search/account/${customer.id}?${dateFilter}transaction_type=${transactionType}&search=${searchValue}&page=${currentPage}`;

    (async () => {
      try {
        const response = await axios.get<Transaction[]>(filterUrl, {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("output", response);
        if (response.data.current_page > response.data.total_pages) {
          setCurrentPage(1);
        }
        setTotalPageCount(response.data.total_pages);
        setData(response.data.transactions);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, [searchValue, transactionType, days, currentPage]);

  let transactionsList = data
  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  .map((transaction) => {
    if (transaction.transactionType == "withdraw" && transaction.amount > 0) {
      transaction.amount = -transaction.amount;
    }
    return (
      <tr
        className="account-type"
        key={transaction.id}
        onClick={() => {
          setShowingPopup(true);
          setActiveTransaction(transaction);
        }}
      >
        <td>{transaction.name}</td>
        <td>{transaction.date}</td>
        <td className="balance">{currencyString(transaction.amount)}</td>
      </tr>
    );
  });

  const handleEdit = () => {
    navigate("/download-transactions", {
      state: {
        selectedAccount: customer.accountNumber
      },
    });
  };

  return (
    <>
      <div className="container p-4 pt-3 mt-3  border shadow p-3 mb-3 bg-white">
        <br />
        <div className="accountDiv">
          <div>
            <h1>Balance: {currencyString(customer.balance)}</h1>
            <nav className="navbar navbar-light bg-light">
              <form className="mb-2 mx-2">
                <div className="row align-items-center g-3">
                  <div className="col-auto">
                    <label>Search</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <label>Transactions type</label>
                    <select
                      onChange={(e) => setTransactionType(e.target.value)}
                      className="mr-sm-2"
                    >
                      <option value="all">Select Transaction Type</option>

                      {transactionTypes.map((type) => (
                        <option value={type.value}>{type.displayValue}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-auto">
                    <label>Timeframe</label>
                    <select
                      onChange={(e) => {
                        setDays(parseInt(e.target.value));
                        console.log(`"e.target.value is" + ${e.target.value}`);
                      }}
                      className="mr-sm-2"
                    >
                      {daysFilter.map((day) => (
                        <option value={day.value}>{day.displayValue}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </nav>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th className="type-Heading" colSpan={3}>
                    <span className="balance">
                      {customer.accountType.toUpperCase()}
                      {censorAccountNumber(customer.accountNumber)}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>{transactionsList}</tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPageCount={totalPageCount}
              pageSize={10}
              onChange={(page: SetStateAction<number>) => setCurrentPage(page)}
            />
          <button className="btn-outline-primary mx-2 shadow-sm" onClick={handleEdit}>
              Download Transactions
          </button>
          <Link to="/profile" className="btn">Return to Overview</Link>
          </div>
        </div>
      </div>
      {showingPopup && (
        <TransactionPopup
          unmountMe={() => setShowingPopup(false)}
          transaction={activeTransaction}
        />
      )}
    </>
  );
}
