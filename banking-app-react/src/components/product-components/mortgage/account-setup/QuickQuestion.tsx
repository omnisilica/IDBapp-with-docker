import { useDispatch } from "react-redux";
import changeHandler from "../../../utils/ChangeHandler";
import Radio         from "../../../utils/Radio";
import { ChangeEvent, useState } from "react";

const QuickQuestion = (props) => {
    const dispatch = useDispatch()
    const onChangeHandler = (e: ChangeEvent)=>{
      changeHandler(e, dispatch);

      setError(null);
    }
    
    const [ error, setError ] = useState("Please select an option");
    const [ submitted, setSubmitted ] = useState(false);

    const validate = () => {
        setSubmitted(true);

        if (error === null) props.nextCallback();
    }

    return <>
        <h5 className="tab-heading">Before we get started, we have a quick question for you.</h5>
        <p className="info-text">
             A home equity line of credit is a revolving line of credit secured by a mortgage against your property. 
             You can borrow money, pay it back and re-borrow up to a maximum limit, usually at interest rates lower 
             than for unsecured lines of credit.
        </p>
        <Radio label="Do you currently have a home equity line of credit attached to your property?"
                     name="haveEquityCredit"
                     options={['Yes','No']} 
                     onChange={onChangeHandler}
                     error={submitted? error : undefined}/>
        <div className="justify-content-md-end footer d-md-flex">
            <button onClick={() => props.backCallback()}
                className="btn-outline-light-2"> Back </button>
            <button onClick={validate}
                className="btn-outline-primary"> Next </button>
        </div>
    </>
}

export default QuickQuestion;