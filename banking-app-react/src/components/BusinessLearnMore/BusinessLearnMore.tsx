import React from 'react'
import "./BusinessLearnMore.css";
import { CiLocationOn } from "react-icons/ci";
import { TiLockClosed } from "react-icons/ti";
import { MdMobileFriendly } from "react-icons/md";
import chequingImage from "../images/chequing.jpg"


const BusinessLearnMore = () => {
  return (
    <div className="container">
    <div className="row justify-content-center align-items-center">
      <div className="col-lg-6 col-md-10 col-sm-12 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
        <h5 className="text-center">Business Account</h5>
      </div>
    </div>
    <div className="row justify-content-center align-items-center card-account mt-4">
        <div className="row justify-content-center align-items-center mt-4 p-2" style={{textAlign: 'center'}}>
            <p><h5><b>Explore IDB's Business Services to meet your business needs.</b></h5></p>
            <div className="d-flex align-items-center justify-content-center" style={{marginLeft:'40px'}}>
                <h6 className="features-heading"><b>Credit Cards</b></h6>
                <h6 className="features-heading"><b>Chequing Account</b></h6>
                <h6 className="features-heading"><b>Corporate Cards</b></h6>
                <h6 className="features-heading"><b>Payment Solutions</b></h6>
            </div>
        </div>
    </div>



    <div className="row justify-content-center align-items-center" style={{marginTop : '15px'}}>
      <div className="col-lg-4 col-md-6 col-sm-8 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
        <h5 className="text-center">Explore your Options</h5>
      </div>
    </div>

    <div className="d-flex" style={{ padding: '25px' }}>
        <div className="row">
            {/* Div 1 */}
            <div className="col-md-6 p-4" >
                <div className="row justify-content-center align-items-center card-account-business mt-4">
                    <div className="col-lg-4 p-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
                        <img src={chequingImage} className="img-fluid img3" style={{borderRadius:'15px'}}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <p>Explore IDB's Small Business Credit Cards</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center' }}>
                        <div> {/* Wrap the <p> tags in a <div> */}
                            <p>Start, Manage, Promote, and Maintain your business with IDB.
                                <br/>Earn rewards and benefits with out suite of 3 cards.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center" style={{ marginTop:'25px' ,marginBottom: '15px' }}>
                        <div className="col-lg-7 col-md-8 col-sm-10 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
                            <button className="text-center" style={{whiteSpace: 'nowrap'}}><b>Learn more about Business Credit Cards</b></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Div 2 */}
            <div className="col-md-6 p-4"  >
                <div className="row justify-content-center align-items-center card-account-business mt-4">
                    <div className="col-lg-4 p-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
                        <img src={chequingImage} className="img-fluid" style={{borderRadius:'15px'}}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <p>Explore IDB's Payment Solutions</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center' }}>
                        <div> {/* Wrap the <p> tags in a <div> */}
                            <p>Tailored automated solutions designed to address your
                                <br/>organization's specific requirements, whether it involves tracking
                                <br/>employee expenditures or optimizing payment workflows.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center" style={{ marginBottom: '15px' }}>
                        <div className="col-lg-7 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
                            <button className="text-center" style={{whiteSpace: 'nowrap'}}><b>Learn more about Payment Solutions</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div style={{ padding: '25px' }}>
        <div className="row justify-content-center">
            {/* Div 1 */}
            <div className="col-md-6" >
                <div className="row justify-content-center align-items-center card-account-business mt-4">
                    <div className="col-lg-4 p-2 col-md-12 col-sm-12 d-flex align-items-center justify-content-center">
                        <img src={chequingImage} className="img-fluid" style={{borderRadius:'15px'}}/>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                        <p>Explore IDB's Small Business Credit Cards</p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center" style={{ textAlign: 'center' }}>
                        <div> {/* Wrap the <p> tags in a <div> */}
                            <p>Our Corporate Cards empower you to make strategic expenditures,
                                <br/>whether It's booking a spontaneous flight or investing in cutting-edge
                                <br/>technology, to drive the growth of your busiess.</p>
                        </div>
                    </div>
                    <div className="row justify-content-center align-items-center" style={{ marginBottom: '15px' }}>
                        <div className="col-lg-7 mt-sm-1 main-heading d-flex align-items-center justify-content-center">
                            <button className="text-center" style={{whiteSpace: 'nowrap'}}><b>Learn more about Payment Solutions</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>



    <div className="row justify-content-center align-items-center card-account-business mt-4 mb-4 d-flex p-1">
        <div className="col-lg-6">
            <div className="row justify-content-center align-items-center">
                <div className="col-lg-10 p-2 col-md-10 col-sm-10 d-flex align-items-center justify-content-center">
                    <img src={chequingImage} className="img-fluid img3" alt="Chequing" style={{borderRadius:'15px'}}/>
                </div>
            </div>
        </div>

        <div className="col-lg-6" style={{ textAlign: 'center', padding:'20px' }}>
            <div className="row justify-content-center align-items-center point-list">
                <div className="col-lg-12 col-md-12 col-sm-12 align-items-center justify-content-center" style={{}} >
                    <div className="d-flex align-items-center justify-content-center" style={{marginBottom:'25px' ,marginLeft:'110px'}}>
                        <h5 className="features-heading">Explore IDB's Business Line of Credit</h5>
                    </div>

                    <p>The Business Line of Credit from IDB provides flexible<br/>
                    credit lines ranging from $1,500 to $275,000. Larger initial<br/>
                    credit lines exceeding $145,999 are exclusively accessible<br/>
                    to eligible borrowers with an existing relationship with IDB<br/>
                    and meeting specified criteria. Terms and conditions may<br/>
                    vary.</p>

                    <div className="col-lg-7 mt-sm-1 main-heading d-flex align-items-center justify-content-center" style={{marginLeft:'130px'}}>
                        <h5 className="text-center" style={{ whiteSpace: 'nowrap' }}>Learn more</h5>
                    </div>
                </div>
            </div>
        </div>

    </div>


  </div>
  )
}

export default BusinessLearnMore
