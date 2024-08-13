import React, { useEffect, useState } from "react";
import { CarouselComponent } from "./carousel-component/CarouselComponent";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Wallet from "./images/WalletIcon.png";
import Savings from "./images/SavingsIcon.png";
import Business from "./images/BusinessIcon.png";
import Mortgage from "./images/mortgage-loan.png";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Numbers } from "@mui/icons-material";

const Home = () => {
  let navigate = useNavigate();
  const user = localStorage.getItem("loggedInUser");

  console.log(user)
  console.log()
  return (
    <>
      <CarouselComponent />
      <div className="container p-5 pt-4 mt-4  border shadow pb-4 mb-4 bg-white">
        <div className="accountDiv">
          <div
            className="row"
            style={{
              "justifyContent": "center",
              "textAlign": "center",
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
                src={Wallet}
                style={{ background: "#F28500", "border-radius": "50%" }}
              />
              <Card.Body style={{ "text-align": "center", color: "#555555" }}>
                <Card.Title>
                  <b>Chequing</b>
                </Card.Title>
                <Card.Text>No-fee daily chequing transactions.</Card.Text>
                <Button
                  variant="primary"
                  style={{ background: "#F28500", "border-color": "#F28500" }}
                >
                  <Link to="/chequingaccountstypes" style={{color:'white'}}>Learn More</Link>
                </Button>
              </Card.Body>
            </Card>
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
                src={Savings}
                style={{ background: "#F28500", "border-radius": "50%" }}
              />
              <Card.Body style={{ "text-align": "center", color: "#555555" }}>
                <Card.Title>
                  <b>Savings</b>
                </Card.Title>
                <Card.Text>Grow your money and save for your goals.</Card.Text>
                <Button
                  variant="primary"
                  style={{ background: "#F28500", "border-color": "#F28500" }}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
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
                src={Business}
                style={{ background: "#F28500", borderRadius: "50%" }}
              />
              <Card.Body style={{ "text-align": "center", color: "#555555" }}>
                <Card.Title>
                  <b>Business</b>
                </Card.Title>
                <Card.Text>A smart and affordable way to borrow.</Card.Text>

                <Button
                  variant="primary"
                  style={{ background: "#F28500", borderColor: "#F28500" }}
                >
                  <Link to={"/businessLearnMore"} style={{ color: 'inherit' }}>Learn More</Link>
                </Button>

                {/* <Button
                  variant="primary"
                  style={{ background: "#F28500", borderColor: "#F28500" }}
                >
                  <Link to={"/businessLearnMore"}>Learn More</Link>
                </Button> */}
              </Card.Body>
            </Card>
            <div
              className="row"
              style={{ justifyContent: "center", textAlign: "center" }}
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

export default Home;
