import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link, useNavigate } from "react-router-dom";


import changeHandler from "../../../utils/ChangeHandler";
import Radio from "../../../utils/Radio";

const CreditCheckConsent = (props) => {
    let navigate = useNavigate();
    const dispatch = useDispatch()

    const [error, setError] = useState<String>("Please indicate your consent to a credit check.");
    const [submitted, setSubmitted] = useState(false);

    const onChangeHandler = (e: ChangeEvent) => {
      changeHandler(e, dispatch);

      if (e.target.value === "No") setError("We are sorry to here you do not consent to a credit check. Unfortunately, your application cannot continue unless you consent.");
      else setError(null);
    }

    const validate = () => {
        setSubmitted(true);

        if (error === null) props.nextCallback();
    }

    return <>
        <h5 className="tab-heading">Information from your credit bureau report</h5>
        <p className="info-text">
        By clicking "Yes' and continuing with this application, you consent to Tangerine
        immediately disclosing your personal information, including your SIN, to a credit
        bureau to obtain your credit report in order to process this application.
        Please note that if you do not agree to a credit check, this application can't
        proceed further.
        </p>
        <Radio label="Do you agree to a full credit check?"
                     name="consentCreditCheck"
                     options={['Yes','No']}
                     onChange={onChangeHandler}
                     error={submitted? error : undefined}/>
        <div className="justify-content-md-end footer d-md-flex">
            <button onClick={() => props.backCallback() }
                className="btn-outline-light-2"> Back </button>
            <button onClick={validate}
                className="btn-outline-primary"> Next </button>
        </div>
    </>
}

export default CreditCheckConsent;