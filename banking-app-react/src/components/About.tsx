import React from "react";
import { Link } from "react-router-dom";
import BankImage from "./images/Bank_Image.jpg";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Award1 from "./images/Award1.png";
import "./About.css";
import "../styles/InfoPage.css";
import { useLocation } from "react-router-dom";
import AboutTeam from "./AboutTeam/AboutTeam";
import { useEffect } from "react";

const About = () => {
  // this hook is used so that we can check if there was any data passed from the previous page
  const {hash}=useLocation();

  useEffect(()=>{
      if(hash){
          let element=document.getElementById(hash.slice(1));
          if(element){
              element.scrollIntoView({behavior:'smooth'});
          }
      }
  },[hash])

  return (
    <div className="accountDiv">
      <h1 className="row bold center">About Us</h1>
      <div className="container p-5 pt-4 mt-4 border shadow pb-4 mb-4 bg-white">
        <div className="row">
          <div className="col-md-6 item">
            <h2 className="bold">
              Banking that’s anything but typical
            </h2>
            <div className="row">
              <img
                className="d-block w-100 shadow banner-image"
                src={BankImage}
                alt="First slide"
              />
            </div>
          </div>
          <div className="col-md-6 item">
            <p className="bold">
              No unfair fees. No overly complicated products. No expensive
              brick-and-mortar branches.
            </p>
            <p>
              We call that Forward Banking. It’s how we got started this year
              – back when we were INX DIRECT. And it’s the reason
              we continue to innovate today as Infinity Digital Bank.
            </p>
            <p>
              Now more than ever, your hard-earned money should be working
              hard for you. That means having a bank that keeps up with your
              unique needs and goals.
            </p>
            <p>
              Infinity Digital Bank is a wholly-owned subsidiary of The Bank of Nova
              Scotia and a CDIC member in its own right. Eligible deposits of
              up to $100,000 per category are protected separately from
              deposits at The Bank of Nova Scotia.
            </p>
          </div>
        </div>
        <div className="item">
          <h2> Recognition for our commitment to you </h2>
          <p>
            Clients come first. So whether that’s delivering a simple and
            convenient everyday banking experience, or helping you meet your
            goals faster, it’s all about you.
          </p>
          <p> <a className="bold" href="#"> Learn more about our awards </a> </p>
        </div>
        <div className="row cardholder center">
          <Card className="shadow">
            <Card.Img
              variant="top"
              src={Award1}
            />
            <Card.Body className="center">
              <Card.Title className="bold">
                  Highest in Customer Satisfaction Among Midsize Retail Banks
              </Card.Title>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div id="team-section">
      <AboutTeam/>
      </div>
      
    </div>
  );
};

export default About;
