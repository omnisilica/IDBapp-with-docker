import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChequingAccounts from "./components/ChequingAccountsTypes/ChequingAccounts";
import BusinessLearnMore from "./components/BusinessLearnMore/BusinessLearnMore";

import Login from "./components/Login";
import NavbarBootStrap from "./components/NavbarBootStrap";
import Home from "./components/Home";
import About from "./components/About";
import Profile from "./components/Profile";
import Detail from "./components/Detail";
import { useState, useEffect } from "react";
import RegisterPage from "./components/RegisterPage";
import { Account } from "./components/account-details/Account";
import { Footer } from "./components/Footer";
import { FooterNew } from "./components/account-details/FooterNew";
import WaysToBank from "./components/WaysToBAnk";
import ForgotPassword from "./components/forget-password/ForgotPassword";
import ResetPassword from "./components/forget-password/ResetPassword";
import SecurityQuestion from "./components/forget-password/SecurityQuestion";
import ForgotUsername from "./components/forget-password/ForgotUsername";
import GetUsername from "./components/forget-password/GetUsername";
import Theme from "./components/theme-component/Theme";
import UpdateUserDetail from "./components/user-detail-component/UpdateUserDetail";
import UserDetail from "./components/user-detail-component/UserDetail";
import TransferFundsReview from "./components/transfer-funds-components/Review";
import { TransferComplete } from "./components/transfer-funds-components/Complete";
// import TransferMoney from "./components/TransferMoney";
import TransferMoney from "./components/transfer-funds-components/TransferMoney";
import Mortgage from "./components/mortgage-component/Mortgage";
import MortgageStep1 from "./components/mortgage-component/MortgageStep1";
import Products from "./components/Products";
import DownloadTransactions from "./components/account-details/DownloadTransactions";
import { ExampleNavTabBar } from "./components/navigation-tabs/ExampleNavTabBar";
import ConfirmInformationTab from "./components/product-components/mortgage/confirm-information-tab/ConfirmInformationTab";
import AccountSetupTab from "./components/product-components/mortgage/account-setup/AccountSetupTab";
import AddAccount from "./components/account-details/AddAccount";
import AddBeneficiary from "./components/AddBeneficiary";
import CurrentBeneficiary from "./components/CurrentBeneficiary";
import RemoveBeneficiary from "./components/CurrentBeneficiary";
import UpdateBeneficiary from "./components/UpdateBeneficiary";
import LoginEmployee from "./components/LoginEmployee";
import AdminDashboard from "./components/AdminDashboard";
import TellerDashboard from "./components/TellerDashboard";
import CreateAdminTeller from "./components/create-admin-teller/CreateAdminTeller";
import UserProfileWrapper from "./components/user-profile/UserProfileWrapper";
import UserProfileSearch from "./components/user-profile/UserProfileSearch";

import BARequestOverview from "./components/Business-Account/BARequestOverview";
import CreateBusinessAccount from "./components/business-account-creation/CreateBusinessAccount";
import CreateBusinessAccount2 from "./components/business-account-creation/CreateBusinessAccount2";
import BusinessSetupTab from "./components/business-account-creation/BusinessSetupTab";
import Insurance from "./components/insurance-component/Insurance";
import InsuranceLife from "./components/insurance-component/InsuranceLife";
import InsuranceProperty from "./components/insurance-component/InsuranceProperty";
import InsuranceVehicle from "./components/insurance-component/InsuranceVehicle";
import LoggedIn from "./components/LoggedIn";

interface customer {
  id: number;
  username: string;
  firstName: string;
  lastName: String;
}

function App() {
  const user = localStorage.getItem("loggedInUser");
  const [loggedInUser, setLoggedInUser] = useState<customer>(JSON.parse(user));

  return (
    <>
      <BrowserRouter>
        <div
          className={
            user
              ? "body-min-size body-logged-in"
              : "body-min-size body-logged-out"
          }
        >
          <NavbarBootStrap
            loggedInUser={loggedInUser}
            setUser={setLoggedInUser}
          />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/waysToBank" element={<WaysToBank />}></Route>
            <Route path="/products" element={<Products />}></Route>
            <Route
              path="/login"
              element={<Login setUser={setLoggedInUser} />}
            ></Route>
            <Route path="/login-employee" element={<LoginEmployee />}></Route>
            <Route path="/logged-in" element={<LoggedIn setUser={setLoggedInUser} />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/detail/:id" element={<Detail />}></Route>
            <Route path="/register" element={<RegisterPage />}></Route>
            <Route path="/account" element={<Account />}></Route>
            <Route path="/userdetail" element={<UserDetail />}></Route>
            <Route path="/admindashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/tellerdashboard"
              element={<TellerDashboard />}
            ></Route>
            <Route
              path="/updateuserdetail"
              element={<UpdateUserDetail />}
            ></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset-password" element={<ResetPassword />}></Route>
            <Route path="/auth-user" element={<SecurityQuestion />}></Route>
            <Route path="/forgot-username" element={<ForgotUsername />}></Route>
            <Route path="/username" element={<GetUsername />}></Route>
            <Route
              path="/confirm-info-tab"
              element={<ConfirmInformationTab />}
            ></Route>
            <Route
              path="/product/accountSetup"
              element={<AccountSetupTab />}
            ></Route>
            <Route
              path="*"
              element={
                <div className="box-container">
                  <h2>404 Page not found</h2>
                </div>
              }
            />
            <Route path="/theme" element={<Theme />}></Route>
            <Route path="/transferMoney" element={<TransferMoney />}></Route>
            <Route
              path="/transfer-funds/review"
              element={<TransferFundsReview />}
            ></Route>
            <Route
              path="/transfer-funds/complete"
              element={<TransferComplete />}
            ></Route>
            <Route path="/mortgage" element={<Mortgage />}></Route>
            <Route path="/mortgageStep1" element={<MortgageStep1 />}></Route>
            <Route path="/insurance" element={<Insurance />}></Route>
            <Route path="/life-insurance" element={<InsuranceLife />}></Route>
            <Route
              path="/property-insurance"
              element={<InsuranceProperty />}
            ></Route>
            <Route
              path="/vehicle-insurance"
              element={<InsuranceVehicle />}
            ></Route>
            <Route
              path="/download-transactions"
              element={<DownloadTransactions />}
            ></Route>
            <Route
              path="/test/navtabbar1"
              element={<AccountSetupTab />}
            ></Route>
            <Route
              path="/test/navtabbar2"
              element={<ConfirmInformationTab />}
            ></Route>
            <Route
              path="/test/navtabbar3"
              element={<ExampleNavTabBar />}
            ></Route>
            <Route
              path="/test/navtabbar4"
              element={<ExampleNavTabBar />}
            ></Route>
            <Route path="/add-account" element={<AddAccount />}></Route>
            <Route path="/addBeneficiary" element={<AddBeneficiary />}></Route>
            {/* <Route path="/currentBeneficiary" element={<CurrentBeneficiary />}></Route> */}
            {/* <Route path="/updateBeneficiary" element={<UpdateBeneficiary />}></Route> */}
            <Route
              path="/create-admin-teller"
              element={<CreateAdminTeller />}
            ></Route>{" "}
            {/* temp */}
            <Route path="/currentBeneficiary" element={<CurrentBeneficiary />}></Route>
            <Route path="/updateBeneficiary" element={<UpdateBeneficiary />}></Route>
            <Route path="/create-admin-teller" element={<CreateAdminTeller />}></Route>            {/* temp */}
            <Route path="/ba-requests" element={<BARequestOverview />}></Route>
            <Route
              path="/searchProfile"
              element={<UserProfileSearch />}
            ></Route>
            <Route
              path="/userProfile/:email"
              element={<UserProfileWrapper />}
            ></Route>
            <Route
              path="/create-admin-teller"
              element={<CreateAdminTeller />}
            ></Route>
            <Route
              path="/business-account-setup"
              element={<BusinessSetupTab />}
            ></Route>
            <Route
              path="/create-business-account"
              element={<CreateBusinessAccount />}
            ></Route>
            <Route
              path="/create-business-account-2"
              element={<CreateBusinessAccount2 />}
            ></Route>
            //this route takes us to a page where it shows all the options
            available for the ChequingAccounts
            <Route
              path="/chequingaccountstypes"
              element={<ChequingAccounts />}
            ></Route>

            <Route path="/businessLearnMore" element={<BusinessLearnMore />}></Route>
          </Routes>
          <FooterNew />
        </div>
      </BrowserRouter>
      
    </>
  );
}

export default App;
