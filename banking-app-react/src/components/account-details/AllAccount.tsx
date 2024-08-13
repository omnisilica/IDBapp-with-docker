import {
  JSXElementConstructor,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { account } from "../../module/Account";
import { BsDatabaseDash, BsGrid3X3Gap } from "react-icons/bs";
import { CiWallet } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { RiBarChart2Line } from "react-icons/ri";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";
import { Account } from "./Account";
import { JSX } from "react/jsx-runtime";
import axios from "axios";
import {
  currencyString,
  censorAccountNumber,
  getToken,
} from "../../Utility.tsx";
import "./AllAccount.scss";
import backendUrl from "../../config";
import { CloseButton } from "../CloseButton";

let customerId = "";
let token = "";

enum AccountListing {
  All,
  Chequing,
  Savings,
  Business,
}

export function AllAccount(): JSX.Element {
  const [error, setError] = useState("");
  const location = useLocation();
  const accountSuccessStatus = location.state?.accountSuccessStatus;
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000); // After 5 seconds set the show value to false
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  token = getToken();
  if (token != "") {
    try {
      customerId = JSON.parse(localStorage.getItem("loggedInUser") || "").id;
    } catch (e) {
      console.log("FATAL ERROR: Please log out then log back in.");
    }

    const queryParameters = new URLSearchParams(window.location.search);
    let type = queryParameters.get("AccountType");
    type =
      type == null
        ? (type = AccountListing.All)
        : (type = AccountListing[type]);

    const [active, setActive] = useState(type);

    const HeaderButton = (accountListing: AccountListing) => {
      const ButtonSymbol = (accountListing: AccountListing) => {
        const size = 40;
        const className = "navBar";
        switch (accountListing) {
          case AccountListing.All:
            return <BsGrid3X3Gap size={size} />;
          case AccountListing.Chequing:
            return <CiWallet size={size} />;
          case AccountListing.Savings:
            return <LiaPiggyBankSolid size={size} />;
          case AccountListing.Business:
            return <RiBarChart2Line size={size} />;
          default:
            return "";
        }
      };

      return (
        <button
          className={
            active === accountListing
              ? "active-navbar-button-class"
              : "navbar-button-class"
          }
          onClick={() => {
            setActive(accountListing);
          }}
        >
          {ButtonSymbol(accountListing)}
          <p className="navbar-list">{AccountListing[accountListing]}</p>
        </button>
      );
    };

    return (
      <>
        <div>
          {accountSuccessStatus && show && (
            <div className="custom-div-alert">
              <div className="alert alert-success" role="alert">
                <span className="custom-div-alert-message">
                  <strong>Account Added Successfully!</strong>
                </span>
                <CloseButton />
              </div>
            </div>
          )}
        </div>
        <div className="container p-5 pt-4 mt-4 border shadow pb-4 mb-4 bg-white">
          <div className="accountDiv">
            <div className="accountDiv text-center">
              {HeaderButton(AccountListing.All)}
              {HeaderButton(AccountListing.Chequing)}
              {HeaderButton(AccountListing.Savings)}
              {HeaderButton(AccountListing.Business)}
            </div>
            {(active === AccountListing.All ||
              active === AccountListing.Chequing) && (
              <AccountTable type={AccountListing.Chequing} />
            )}
            {(active === AccountListing.All ||
              active === AccountListing.Savings) && (
              <AccountTable type={AccountListing.Savings} />
            )}
            {(active === AccountListing.All ||
              active === AccountListing.Business) && (
              <AccountTable type={AccountListing.Business} />
            )}
            <Link className="btn-outline-secondary" to="/add-account">
              Add Account
            </Link>
          </div>
        </div>
      </>
    );
  }
}

const AccountRow = (data: account[], type: AccountListing) => {
  console.log("data account row", data);

  if (data) {
    const accountsToSend: account[] = data.filter((data_e: account) => data_e.accountType == AccountListing[type].toLowerCase());
    const linkTo = `/account/`
    return accountsToSend.map((data_e: account, index: number) => (
      <tr className="account-type" key={index}>
        <td>
          <Link className="navbar-list balance" to={linkTo} state={data_e}>
            {data_e.accountType.toUpperCase()}{" "}
            {censorAccountNumber(data_e.accountNumber)}
          </Link>
        </td>
        <td className="balance">
          <Link className="navbar-list" to={linkTo} state={data}>
            {currencyString(data_e.balance)}
          </Link>
        </td>
      </tr>
    ));
  }
};

const TableLoading = () => {
  return (
    <tr>
      <td colSpan={2}>
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

const AccountTable = (props) => {
  const url = `${backendUrl}/accounts/customer/${customerId}`;

  const [data, setData] = useState<account[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      setLoaded(false);
      try {
        const response = await axios.get<account[]>(url, {
          headers: { Authorization: "Bearer " + token },
        });
        console.log("response", response)
        setData(response.data.accounts || response.data);
      } catch (error: any) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  console.log("Heading: " + AccountListing[props.type]);
  console.log("Is loaded: " + loaded ? true : false);

  const accountRows: any = AccountRow(data, props.type);
  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th className="type-Heading" colSpan={2}>
            {" "}
            {AccountListing[props.type]}{" "}
          </th>
        </tr>
      </thead>
      <tbody>
        {loaded ? accountRows && accountRows.length !== 0? accountRows : 
          <tr className="account-type">
              <td colSpan={2} className="balance">
                No Account Exist
              </td>
          </tr> : <TableLoading />}
      </tbody>
    </table>
  );
};

export default AllAccount;
