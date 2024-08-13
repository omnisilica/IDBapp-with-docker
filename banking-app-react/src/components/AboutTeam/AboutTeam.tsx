import React from 'react';
import image from '../images/person.jpg';
import "./AboutTeam.css";
import { BsTelephoneFill } from "react-icons/bs";
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const AboutTeam = () => {
   
  return (
    <div className="container" >
        <div className="row justify-content-center align-items-center mt-4 mb-4">
            <div className="col-lg-4 p-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
                <h4 className="text-center headline">Meet the team</h4>
            </div>
        </div>

        <div className="container box">

        <div className="row justify-content-center align-items-center m-4">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4">
                <div className="image-card w-100" style={{maxWidth: "250px"}}>
                    <div className="img-container">
                        <img src={image} alt="team member photo" className="img-fluid rounded-circle" />
                    </div>
                    <p className="text-center">Nishant Aggarwal</p>
                    <p className="role text-center">Chief Operating Officer</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4">
                <div className="image-card w-100" style={{maxWidth: "250px"}}>
                    <div className="img-container">
                        <img src={image} alt="team member photo" className="img-fluid rounded-circle" />
                    </div>
                    <p className="text-center">Jasmeet</p>
                    <p className="role text-center">Chief Marketing Officer</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4">
                <div className="image-card w-100" style={{maxWidth: "250px"}}>
                    <div className="img-container">
                        <img src={image} alt="team member photo" className="img-fluid rounded-circle" />
                    </div>
                    <p className="text-center">Claudia</p>
                    <p className="role text-center">Chief Financial Officer</p>
                </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-4">
                <div className="image-card w-100" style={{maxWidth: "250px"}}>
                    <div className="img-container">
                        <img src={image} alt="team member photo" className="img-fluid rounded-circle" />
                    </div>
                    <p className="text-center">Mariah</p>
                    <p className="role text-center">Senior Vice president</p>
                </div>
            </div>
        </div>
     <div className="row justify-content-center align-items-center">
        <h4 className="text-center headline">Reach to our Team</h4>
     </div>
     <div className="contact mb-5">
     <div className="row justify-content-around align-items-center m-4 p-3">
        <div className="col-lg-10 col-md-12 col-sm-12 d-flex justify-content-center mb-4">
            <p className="text-center" style={{color:'white',fontSize:"1.2rem"}}>We love your questions and feedback- and we are always happy to help!</p>
        </div>
        <div className="col-lg-4">
            <div className="container-bottom">
                <h6 className="text-center headline2">Talk to sales</h6>
                <p>Chat with our sales team to see how our product can work best for you.</p>
                <div className="info">
                <div className="icon-div">
               <BsTelephoneFill className="icon-tel"/>
                </div>
                <span>222-333-1234</span>
                </div>
            </div>
            
        </div>
        <div className="col-lg-4 ">
            <div className="container-bottom ">
                <h6 className="text-center headline2">Contact Customer support</h6>
                <p>We are waiting to help you and your team - so dont hesitate to reach out!</p>
              <div className="info">
              <button className="text-center">Contact Support</button>
              </div>
            </div>
            
        </div>
     </div>
     </div>

    </div>
    </div>
  )
}

export default AboutTeam;
