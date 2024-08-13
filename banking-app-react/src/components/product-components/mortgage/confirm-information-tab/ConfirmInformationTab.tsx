import { useState, useRef } from "react";
import "./ConfirmInformationTab.css"
import { NavTabBar, NavTabLink } from '../../../navigation-tabs/NavTab';
import { digestUserProfile } from "../../../../module/UserProfile";
import Acknowledgement from "./Acknowledgement";
import ReviewCurrentInfo from "./ReviewCurrentInfo";
import apiClient from "../../../../services/api-client";
import { useNavigate } from "react-router-dom";

const ConfirmInformationTab = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [checkBoxStatus, setCheckBoxStatus] = useState(false);
    const submitRef = useRef();
    const navigate = useNavigate();

    const handleCheckBox = (e: any) => {
        setCheckBoxStatus(e.target.checked);
    };

    const handleInfoSubmit = (e: any) => {
        console.log("handleInfoSubmit ran");
        console.log(e);

        navigate("/tab");
        // apiClient
        //     .patch<any>("/customers/customer/updateCustomer", e)
        //     .then((res) => {
        //         const response = res.data;

        //         if (response.customer) {
        //             localStorage.setItem("loggedInUser", JSON.stringify(digestUserProfile(response)));
        //             // navigate
        //             // navigate("/userDetail", { state: { userUpdatedStatus } });
        //         }
        //     })
        //     .catch((err) => {
        //         console.log("ERROR: " + err.message);
        //     });
    };

    const handleNextTab = () => {
        if (activeTab === 1) {
            setActiveTab((prevTab) => prevTab + 1);
        }
        else if (activeTab === 2) {
            submitRef.current.click();
        } else {
            setActiveTab((prevTab) => prevTab + 1);
        }
    };
    const handlePrevTab = () => {
        setActiveTab((prevTab: number) => {
            return prevTab - 1;
        });
    };

    return <div className="container">
        {/* <NavTabBar>
            <NavTabLink to="/test/navtabbar1">1 Confirm Accounts</NavTabLink>
            <NavTabLink to="/test/navtabbar2">2 Confirm Information</NavTabLink>
            <NavTabLink to="/test/navtabbar3">3 Set up Account</NavTabLink>
            <NavTabLink to="/test/navtabbar4">4 Wrap up</NavTabLink>
        </NavTabBar> */}

        <div className="confirm-info-tabs">
            <div className={`confirm-info-tab ${activeTab === 1 ? 'active' : ''}`}>
                <Acknowledgement handleCheckBox={handleCheckBox} />
            </div>
            <div className={`confirm-info-tab ${activeTab === 2 ? 'active' : ''}`}>
                <ReviewCurrentInfo submitRef={submitRef} handleInfoSubmit={handleInfoSubmit} />
            </div>
        </div>

        <div>
            <button
                onClick={handlePrevTab}
                disabled={activeTab === 1}
                className={`rounded-button white-button ml-3 mb-3 mr-4`}>
                Back
            </button>
            <button
                onClick={handleNextTab}
                disabled={checkBoxStatus === false}
                className={`rounded-button mb-3 ${checkBoxStatus ? 'next' : ''}`}>
                Next
            </button>
        </div>
    </div>
}

export default ConfirmInformationTab;