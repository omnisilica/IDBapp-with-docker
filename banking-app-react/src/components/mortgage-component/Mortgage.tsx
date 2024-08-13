import React, { useState } from "react";
import "./Mortgage.css";
import Discount from "../images/discount.png";
import CustomerService from "../images/customer-service.png";
import FexiblePayment from "../images/flexible.png";
import PortableMortgage from "../images/affordable.png";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const Mortgage = () => {
  const [fadeBackground, setFadeBackground] = useState<string>("");
  let navigate = useNavigate();
  return (
    <>
      <div
        className={
          fadeBackground === "" ? `modalContainer fade` : `modalContainer `
        }
      >
        <div className="headerSection">
          <h1 className="headerText">Are you already a Client?</h1>
          <button
            id="desktopHeaderClose"
            className="btn btn-outline-primary mx-2 shadow-sm"
            onClick={() => setFadeBackground("")}
          >
            <AiOutlineClose />
          </button>
        </div>
        <p className="subhead">
          Log in if you already bank with us, or take just a few minutes to sign
          up and become a Client.
        </p>
        <div
          className="abc"
          style={{
            marginTop: "1rem",
            justifyContent: "right",
            marginLeft: "20rem",
            marginBottom: "1rem",
          }}
        >
          <button
            className="btn btn-outline-secondary mx-2 shadow-sm"
            id="ctaenrollMortgageDesktop"
            onClick={() => navigate("/register")}
          >
            No, Sign Me Up
          </button>
          <button
            className="btn btn-outline-primary mx-2 shadow-sm"
            onClick={() => navigate("/login")}
          >
            Yes, Log Me In
          </button>
        </div>
      </div>
      <div
        className={
          fadeBackground === "" ? "avgContent" : `avgContent ${fadeBackground}`
        }
      >
        <h1 className="avgHeading-1">Mortgage</h1>
        <div>
          Get a competitive interest rate up front. We’re all about keeping
          things simple, including Mortgages. So don’t stress over the numbers
          and calculations&nbsp;– we’ll walk you through it all. Whether you’re
          buying a new home or refinancing, we’re here to work with you and can
          get you to Mortgage freedom&nbsp;faster.
        </div>
      </div>
      <div
        className={
          fadeBackground === ""
            ? "avgBanner-controls"
            : `avgBanner-controls ${fadeBackground}`
        }
      >
        <div className="avgWrapper">
          <div className="avgFlex-row">
            <div className="avgCol-2">
              <p className="avgBodyMed-prx">Term</p>
              <span className="avgHeading-2">5 Year</span>
            </div>
            <div className="avgCol-3">
              <p className="avgBodyMed-prx">Interest rate (Fixed)</p>
              <span className="avgHeading-2">6.49%</span>
            </div>
            <button
              className="btn btn-outline-primary mx-2 shadow-sm"
              onClick={() => {
                const user = localStorage.getItem("loggedInUser");

                if (user) {
                  navigate("/test/navtabbar1");
                } else {
                  setFadeBackground("backdrop fade");
                  localStorage.setItem("unLoggedInUser", "yes");
                }
              }}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>

      <div className={fadeBackground === "" ? "" : `${fadeBackground}`}>
        <h2 className="avgHeading-3">Key Features of a Mortgage</h2>
        <div className="keyFeatures">
          <div className="keyFeature">
            <img src={Discount} className="discountImage" />
            <div className="keyFeatureHeading">
              <span>Great Rate</span>
              <div className="keyFeatureHeadingContent">
                Get a great rate up front guaranteed for 120 days.
              </div>
            </div>
          </div>
          <div className="keyFeature">
            <img src={CustomerService} className="CustomerServiceImage" />
            <div className="keyFeatureHeading">
              <span>Dedicated support</span>
              <div className="keyFeatureHeadingContent">
                Once you’ve applied, you get a dedicated Mortgage Account
                Manager to help you every step of the way.
              </div>
            </div>
          </div>
        </div>
        <div className="keyFeatures">
          <div className="keyFeature">
            <img src={FexiblePayment} className="FexiblePaymentImage" />
            <div className="keyFeatureHeading">
              <span>Flexible prepayment options</span>
              <div className="keyFeatureHeadingContent3">
                Each year you can make lump sum prepayments up to 25% of your
                original Mortgage amount, and increase your regular Mortgage
                payments by up to 25% of your original Mortgage payment. You can
                do this on any payment date.
              </div>
            </div>
          </div>
          <div className="keyFeature">
            <img src={PortableMortgage} className="PortableMortgageImage" />
            <div className="keyFeatureHeading">
              <span>Portable</span>
              <div className="keyFeatureHeadingContent">
                If you happen to move, you can take your Mortgage with you
                penalty-free at your current rate, term and loan amount.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mortgage;
