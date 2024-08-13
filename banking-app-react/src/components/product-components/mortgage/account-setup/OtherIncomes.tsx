import { useSelector, useDispatch } from "react-redux";
import OtherIncomesTable from "./OtherIncomesTable";
import { useState } from "react";

const OtherIncomes= (props) => {
    const [viewIncomeTable, setViewIncomeTable] = useState(false);
    const [error, setError] = useState<String>("");
    const [submitted, setSubmitted] = useState(false);
    const extraIncomeList = useSelector( (state:any) => state.mortgage.extraIncome );

    const onAddIncome = () => {
        setViewIncomeTable(true)
    }
    const errorNoExtraIncomeProvided = "Please provide at least one extra income entry.";

     const validate = () => {
        setSubmitted(true);
        if (extraIncomeList.length > 0 || props.skipValidation) props.nextCallback();
        else setError(errorNoExtraIncomeProvided);
    }

    return <>
        <h5 className="tab-heading mb-4">Do you have any other sources of income?</h5>
        <p className="info-text">The more information you provide, the easier it is for us to understand
        your financial situation, which will help us as we review your Mortgage application.</p>

        {viewIncomeTable && <OtherIncomesTable/>}
        {!viewIncomeTable && <button onClick={onAddIncome} className="rounded-button next mt-3">Add income</button>}
        {submitted && <p className="text-danger">{error}</p>}
        <div className="justify-content-md-end footer d-md-flex">
            <button onClick={() => props.backCallback()}
                className="btn-outline-light-2"> Back </button>
            {/* <button onClick={() => props.nextCallback()}
                className="btn-outline-primary"> Next </button> */}
            <button onClick={validate}
                className="btn-outline-primary"> Next </button>
        </div>
    </>
}

export default OtherIncomes;
