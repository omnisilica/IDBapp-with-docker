import React, { useEffect, useState } from "react";
import { CarouselComponent } from "./carousel-component/CarouselComponent";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Wallet from "./images/WalletIcon.png";
import Savings from "./images/SavingsIcon.png";
import Business from "./images/BusinessIcon.png";
import Mortgage from "./images/mortgage-loan.png";
import Insurance from "./images/insurance-logo.png";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Products = () => {
  let navigate = useNavigate();
  return (
    <>
      <div className="container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white">
        <div className="accountDiv">
          <div
            className="row"
            style={{
              "justify-content": "center",
              "text-align": "center",
              color: "#555555",
            }}
          >
            <h1>
              <b>What can we help you with today?</b>
            </h1>
            <Card
              className="shadow"
              style={{
                width: "18rem",
                padding: "2%",
                margin: "2%",
                border: "none",
                "border-radius": "5%",
              }}
            >
              <Card.Img
                variant="top"
                src={Mortgage}
                style={{ background: "#F28500", "border-radius": "50%" }}
              />
              <Card.Body style={{ "text-align": "center", color: "#555555" }}>
                <Card.Title>
                  <b>Mortgages</b>
                </Card.Title>
                <Card.Text>A smart and affordable way to borrow.</Card.Text>
                <Button
                  className="btn btn-outline-primary mx-2 shadow-sm"
                  variant="primary"
                  style={{ background: "#F28500", "border-color": "#F28500" }}
                  onClick={() => {
                    navigate("/mortgage");
                  }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
            {/* insurance */}
            <Card
              className="shadow"
              style={{
                width: "18rem",
                padding: "2%",
                margin: "2%",
                border: "none",
                "border-radius": "5%",
              }}
            >
              <Card.Img
                variant="top"
                src={Insurance}
                style={{ background: "#F28500", "border-radius": "50%" }}
              />
              <Card.Body style={{ "text-align": "center", color: "#555555" }}>
                <Card.Title>
                  <b>Insurances</b>
                </Card.Title>
                <Card.Text>Protect what is most important to you.</Card.Text>
                <Button
                  className="btn btn-outline-primary mx-2 shadow-sm"
                  variant="primary"
                  style={{ background: "#F28500", "border-color": "#F28500" }}
                  onClick={() => {
                    navigate("/insurance");
                  }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
            <div
              className="row"
              style={{ "justify-content": "center", "text-align": "center" }}
            >
              <Button
                variant="primary"
                style={{
                  "border-color": "#F28500",
                  "border-radius": "15px 15px",
                  background: "transparent",
                  width: "200px",
                  height: "50px",
                  margin: "1%",
                  color: "#F28500",
                }}
              >
                <b>View All Offers</b>
              </Button>
              <Button
                style={{
                  "border-color": "#F28500",
                  "border-radius": "15px 15px",
                  background: "transparent",
                  width: "200px",
                  height: "50px",
                  margin: "1%",
                  color: "#F28500",
                }}
              >
                <b>View All Products</b>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
