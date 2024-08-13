// import React from "React";
import Carousel from "react-bootstrap/Carousel";
import Logo from "../images/Logo.png"; 
import Image1 from "../images/Image1.jpg"
import Image2 from "../images/Image2.avif";
import Image3 from "../images/Image3.jpg";
import "./CarouselComponent.css";

export const CarouselComponent = () =>{
    // console.log(data);
    return (
      <>
        <Carousel data-bs-theme="light">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image1}
              alt="First slide"
            />
            <Carousel.Caption>
              <h5 className="bold">Innovative Banking Solutions, Exceptional Service</h5>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image2}
              alt="Second slide"
            />
            <Carousel.Caption>
              <h5>24/7 Access to Your Financial World</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={Image3}
              alt="Third slide"
            />
            <Carousel.Caption>
              <h5>Secure and Seamless Banking Solutions</h5>
              <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </>
    );
}