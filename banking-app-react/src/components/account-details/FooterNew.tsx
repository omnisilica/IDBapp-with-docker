import { Icon } from "@iconify/react";
import Logo from "../images/BankLogo.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export function FooterNew() {

  return (
    <>
      <div className="footer-dark sticky-bottom ">
        <footer className="footer-dark">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-6 item text-left">
                <h2 className="lh-base footer-link ml-md-auto font-weight-normal">
                  <img className="d-block" src={Logo} alt="First slide" width={100} height={40}/>
                </h2>
              </div>
              <div className="lh-lg col item footer-link col-sm-6 col-md-6 text-lg-end text-md-left text-sm-left">
                <a href="#">
                  <i className="icon ion-social-facebook">
                    <Icon icon="ion:logo-facebook" width="40" height="40" className="footer-link"/>
                  </i>
                </a>
                <a href="#">
                  <i className="icon ion-social-twitter item">
                    <Icon icon="ion:logo-twitter" width="40" height="40" className="footer-link"/>
                  </i>
                </a>
                <a href="#">
                  <i className="icon ion-social-snapchat">
                    <Icon icon="ion:logo-snapchat" width="40" height="40" className="footer-link"/>
                  </i>
                </a>
                <a href="#">
                  <i className="icon ion-social-instagram">
                    <Icon icon="ion:logo-instagram" width="40" height="40" className="footer-link"/>
                  </i>
                </a>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 item">
                <p>
                  We call that Forward Banking. It’s how we got started this
                  year – back when we were INX DIRECT. And it’s the reason we
                  continue to innovate today as Infinity Digital Bank.
                </p>
                <p className="copyright item">Infinity Digital Bank © {new Date().getFullYear()}</p>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3 className="lh-1">Services</h3>
                <ul>
                  <li><a href="#" className="footer-link"> Savings </a></li>
                  <li><a href="#" className="footer-link"> Business </a></li>
                  <li><a href="#" className="footer-link"> Mortgage </a></li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3 className="lh-1">About</h3>
                <ul>
                  <li>
                    <a href="/about" className="footer-link">
                      Company
                    </a>
                  </li>
                  <li >
                  <Link to="/about#team-section" style={{color:'white'}}>Team</Link>

                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
