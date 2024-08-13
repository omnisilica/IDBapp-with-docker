import React from 'react'
import "./ChequingAccounts.css";
import { CiLocationOn } from "react-icons/ci";
import { TiLockClosed } from "react-icons/ti";
import { MdMobileFriendly } from "react-icons/md";
import chequingImage from "../images/chequing.jpg"


const ChequingAccounts = () => {
  return (
    <div className="container">
    <div className="row justify-content-center align-items-center">
      <div className="col-lg-6 col-md-10 col-sm-12 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
        <h5 className="text-center">Find the Right Chequing Account for your Needs</h5>
      </div>
    </div>
    <div className="row align-item-center justify-content-center mt-3">
      <div className="col-lg-8 col-md-10 col-sm-12 d-flex align-items-center justify-content-center">
        <p>
        Discover everything you need to know about our chequing accounts and find the perfect fit for your financial needs.
        Explore features, benefits, fees (if any), and eligibility requirements to make an informed decision. Whether you're a
         student, a young professional, or a seasoned banker, we have the right chequing account for you.
        </p>
      </div>
    </div>
    <div className="row justify-content-center align-items-center mt-4 p-2">
     <div className="col-lg-2 d-flex align-items-center justify-content-center">
    <h5 className="features-heading">Features</h5>
     </div>
    </div>


    <div className="row justify-content-center align-items-center card-account mt-4">
      <div className="col-lg-4 col-md-6  align-items-center justify-content-center single-feature p-1">
      <div className="icon2">
      <CiLocationOn />
      </div>
        <p>Access to large network of ATMs for convinient cash
          withdrwal and deposits across various locations</p>
      </div>
      <div className="col-lg-4 col-md-6  align-items-center justify-content-center single-feature p-1">
      <div className="icon2">
      <TiLockClosed />
      </div>
        <p>Benefit from robust fraud protection measures to safeguard your account and transactions
           against unauthorized access and fraudulent activities.</p>
      </div>
      <div className="col-lg-4 col-md-6 align-items-center justify-content-center single-feature p-1">
      <div className="icon2">
      <MdMobileFriendly />
      </div>
        <p>Utilize a suite of digital tools designed to enhance your banking experience, including online account
           management, bill payment, and mobile check deposit.</p>
      </div>
    </div>


    <div className="row justify-content-center align-items-center card-account mt-4 mb-4">
      <div className="col-lg-4 p-2 col-md-12 col-sm-12 d:flex align-items-center justify-content-center">
        <img src={chequingImage} className="img-fluid img2" />
      </div>
      <div className='col-lg-8 col-md-12 col-sm-12  align-items-center justify-content-center point-list'>
        <h6>Benifits:</h6>
        <ul>
          <li>Our Standard Chequing account offers essential banking features with no frills. It's perfect for those who prefer simplicity and ease of use in their day-to-day banking.</li>
          <li>Fee:No monthly maintenance fee.</li>
        </ul>
        <button>Learn More</button>
      </div>
    </div>
  </div>

  )
}

export default ChequingAccounts
