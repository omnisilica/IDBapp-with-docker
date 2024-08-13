import React, { useEffect, useState } from "react";
import { Link, To, useLocation, useNavigate } from "react-router-dom";
import Logo from "./images/BankLogo.png";
import { MdAttachMoney } from "react-icons/md";
import { ReactCountryFlag } from "react-country-flag";
import "./NavbarBootStrap.css";
import userInactivityTimer from "./utils/userInactivityTimer";

interface customer {
  id: number;
  username: string;
  firstName: string;
  lastName: String;
  role_id: Number;
}

enum PageSelect {
  homepage,
  wtbpage,
  aboutpage,
  productspage,
}

export default function NavbarBootStrap() {
  const [loggedInUser, setLoggedInUser] = useState<customer | null>(null);
  const navigate = useNavigate();
  const [homepage, setHomePage] = useState(true);
  const [wtbpage, setWTBPage] = useState(false);
  const [aboutpage, setAboutPage] = useState(false);
  const [productspage, setProductsPage] = useState(false);
  const [pageSelect, setPageSelect] = useState(PageSelect.homepage);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
        try {
            setLoggedInUser(JSON.parse(user));
        } catch (e) {
            console.log("FATAL ERROR: Please log out and try logging back in.");
        }
    } else {
        // If there's no loggedInUser in localStorage, set state to null
        setLoggedInUser(null);
    }

    // Function to handle the custom loggedOut event
    const handleLoggedOutEvent = () => {
        setLoggedInUser(null);
    };

    // Add event listener for the loggedOut event
    window.addEventListener("loggedOut", handleLoggedOutEvent);

    // Cleanup the event listener on component unmount
    return () => {
        window.removeEventListener("loggedOut", handleLoggedOutEvent);
    };
}, [navigate]);

  userInactivityTimer(600000, !!loggedInUser);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("unLoggedInUser");
    navigate("/login");
    props.setUser(undefined);
  };

  const MainNavLink = (props) => {
    return (
      <li
        className={
          pageSelect == props.pageSelect ? "nav-item active" : "nav-item"
        }
        onClick={() => {
          setPageSelect(props.pageSelect);
        }}
      >
        <Link className="nav-link" to={props.route}>
          {" "}
          {props.children}{" "}
        </Link>
      </li>
    );
  };

  const SubNavLink = (props) => {
    return (
      <li className="nav-sub-item">
        <Link className="nav-link nav-sub-link" to={props.to}>
          {" "}
          {props.children}{" "}
        </Link>
      </li>
    );
  };

  return (
    <>
      <div className="fixed-top">
        <nav className="navbar navbar-expand-sm navbar-dark shadow">
          <Link className="navbar-brand ml-md-auto pl-1 " to="/">
            <img
              className="d-block"
              src={Logo}
              alt="First slide"
              width={100}
              height={40}
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ml-md-auto">
              <MainNavLink pageSelect={PageSelect.homepage} route="/home">
                {" "}
                Home{" "}
              </MainNavLink>
              <MainNavLink pageSelect={PageSelect.wtbpage} route="/waysToBank">
                {" "}
                Ways to Bank{" "}
              </MainNavLink>
              <MainNavLink pageSelect={PageSelect.aboutpage} route="/about">
                {" "}
                About Us{" "}
              </MainNavLink>
              <MainNavLink
                pageSelect={PageSelect.productspage}
                route="/products"
              >
                {" "}
                Products{" "}
              </MainNavLink>
            </ul>

            {loggedInUser ? (
              <div className="navbar-nav ml-md-auto text-center">
                <li className="nav-item active">
                  <Link className="nav-link" to="/userdetail">
                    Welcome {loggedInUser.firstName}!
                  </Link>
                </li>
                <a
                  href="/login"
                  onClick={handleLogout}
                  className="btn-outline-light"
                >
                  {" "}
                  Log Out{" "}
                </a>
              </div>
            ) : (
              <div className="navbar-nav ml-md-auto">
                <Link
                  to="/register"
                  className="btn-outline-light active mx-2 shadow-sm"
                >
                  {" "}
                  Sign Up{" "}
                </Link>
                <Link to="/login" className="btn-outline-light mx-2 shadow-sm">
                  {" "}
                  Log In{" "}
                </Link>
              </div>
            )}
          </div>
        </nav>

        {loggedInUser ? (
          <nav className="nav-sub navbar-expand-sm shadow">
            <ul className="navbar-nav">
              <li
                className="nav-sub-item"
                style={{
                  flex: "2",
                  display: "flex",
                  justifyContent: "flex-start",
                  paddingLeft: "1rem",
                }}
              >
                <Link className="nav-link nav-sub-link" to="/profile">
                  Overview
                </Link>
              </li>
              {loggedInUser.role_id != undefined && loggedInUser.role_id != null && loggedInUser.role_id == 3 ? (
              <li
                className="nav-sub-item"
                style={{
                  flex: "8",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link className="nav-link nav-sub-link" to="/tellerdashboard">
                  Transactional Processing
                  <MdAttachMoney />
                </Link>
              </li>
              ) : loggedInUser.role_id != undefined && loggedInUser.role_id != null && loggedInUser.role_id == 2 ? (
                <li
                className="nav-sub-item"
                style={{
                  flex: "8",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link className="nav-link nav-sub-link" to="/admindashboard">
                  Account Management
                  <MdAttachMoney />
                </Link>
              </li>
              ) : (
                <li
                className="nav-sub-item"
                style={{
                  flex: "8",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Link className="nav-link nav-sub-link" to="/transferMoney">
                  Transfer Money
                  <MdAttachMoney />
                </Link>
              </li>
              )}
              <li
                className="nav-sub-item"
                style={{
                  flex: "2",
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingRight: "0.85rem",
                  paddingTop: "0.45rem",
                }}
              >
                <ReactCountryFlag
                  svg
                  className="nav-sub-item"
                  countryCode="CA"
                  style={{
                    paddingRight: "0.2rem",
                  }}
                />{" "}
                CAD
              </li>
            </ul>
          </nav>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
