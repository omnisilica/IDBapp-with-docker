import React from "react";
import { Link } from "react-router-dom";
import WaysImage from "./images/WaysImage.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Award1 from "./images/Award1.png";
import "../styles/InfoPage.css";

const WaysToBank = () => {
  return (
    <div className="accountDiv">
      <img
        className="d-block w-100 shadow banner-image"
        src={WaysImage}
        alt="First slide"
      />
      <h1 className="row center bold">Ways to Bank</h1>
      <div className="container p-5 pt-4 mt-4 border shadow pb-4 mb-4 bg-white">
        <div className="row">
          <div className="item text">
            <h2 className="bold">
              A full run-down on how to bank with us.
            </h2>
          </div>
          <div className="item text">
            <p>
                In today’s fast paced world, we know you’re busy and always on
                the go. You have enough things to worry about in your life, and
                banking shouldn’t be one of them. It’s why we make it simple to
                save, simple to understand and simple to do all of your everyday
                banking with us. Through online banking, mobile banking, or over
                the phone, we make it safe, easy and convenient to take charge
                of your money.
              </p>
              <p> We call this Forward Banking!</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default WaysToBank;
