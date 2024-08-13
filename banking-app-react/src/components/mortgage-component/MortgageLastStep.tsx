import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavProgressBar, NavTabLink } from "../navigation-tabs/NavTab";

// import "../product-components/mortgage/account-setup/AccountSetupTab.scss"
import "./MortgageLastStep.css"
const MortgageLastStep = (props: any) => {
  const [error, setError] = useState("");
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
    const data = useSelector((state: any) => {
      console.log("state starts");
      console.log(state.mortgage);
      console.log("state ends");
    return state.mortgage;
  });
  const handleFinish = () => {
    axios
      .post<any>("http://localhost:3000/mortgages", data)
      .then((res) => {
        console.log(res);
        if (res.status == 200 || res.status == 201) {
          console.log("mortgage registration succeeded");
          setError("");
          setDisableSubmitButton(true);
        }
        else {
          console.log("Mortgage Application Not Successful");
          setDisableSubmitButton(false);
          setError("Failed to make mortgage request. Response code: " + res.status)
        }
      })
      .catch((err) => setError(err.message));
  };
  return (
  <>
    {!disableSubmitButton && <p>Please click on the submit button to submit the mortgage application.</p>}
    {disableSubmitButton && <p>Mortgage application successfully submitted.</p>}
    {error && <p style={{"color": "red"}}>Mortgage request was not successful. Please wait a while and try again</p>}

    <div className="justify-content-md-end footer d-md-flex">
      <button onClick={() => props.backCallback() }
            className="btn-outline-light-2"> Back </button>
      <button className="btn btn-outline-primary wrapUpButton"
        disabled={disableSubmitButton}
        onClick={handleFinish}>Submit</button>
    </div>

  </>)
};

export default MortgageLastStep;
