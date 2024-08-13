const Acknowledgement = (props: any) => {
    return <>
        <h5 className="font-weight-bold">Is the Avengers Bank Mortgage (Variable Rate) right for you?</h5>
        <h6 className="confirm-info-subtitle">Variable Rate</h6>
        <div className="confirm-info-container">
            <div className="confirm-info-container-item">
                <p className="font-weight-bold">May be right for you if:</p>
                <ul className="confirm-info-list">
                    <li>
                        You'd like an interest rate that can vary during your term as the Avengers Bank Prime Rate changes, and you're comfortable with fluctuating regular payments as a result
                    </li>
                    <li>
                        You're interested in a 5 year term
                    </li>
                    <li>
                        You are comfortable with a closed Mortgage that includes charges to prepay more than your permitted allocation or discharge fully during its term
                    </li>
                </ul>
            </div>
            <div className="confirm-info-container-item">
                <p className="font-weight-bold">May not be right for you if:</p>
                <ul className="confirm-info-list">
                    <li>
                        You're looking for a second mortgage on your existing property
                    </li>
                    <li>
                        You want a term that is shorter or longer than 5 years
                    </li>
                    <li>
                        You're interested in secured revolving credit which allows you to repay the Loan with greater flexibility
                    </li>
                    <li>
                        You want a set interest rate that won't fluctuate during the Mortgage term, so that your regular payments remain the same for the entire term
                    </li>
                </ul>
            </div>
        </div>

        <br />

        <h5 className="font-weight-bold">Is the Avengers Bank Mortgage (Fixed Rate) right for you?</h5>
        <h6 className="confirm-info-subtitle">Fixed Rate</h6>
        <div className="confirm-info-container">
            <div className="confirm-info-container-item">
                <p className="font-weight-bold">May be right for you if:</p>
                <ul className="confirm-info-list">
                    <li>
                        You want a set interest rate that won't fluctuate during the Mortgage term, so that your regular payments remain the same for the entire term
                    </li>
                    <li>
                        You are comfortable with a closed Mortgage that includes charges to prepay more than your permitted allocation or discharge fully during its term
                    </li>
                </ul>
            </div>
            <div className="confirm-info-container-item">
                <p className="font-weight-bold">May not be right for you if:</p>
                <ul className="confirm-info-list">
                    <li>
                        You're looking for a second mortgage on your existing property
                    </li>
                    <li>
                        You're interested in secured revolving credit which allows you to repay the Loan with greater flexibility
                    </li>
                    <li>
                        You're comfortable with an interest rate that fluctuates based on the Avengers Bank Prime Rate
                    </li>
                </ul>
            </div>
        </div>

        <br />

        <div className="confirm-info-checkbox-section">
            <input type="checkbox" onChange={(e) => { props.handleCheckBox(e) }} />
            <div>
                I acknowledge that, based upon the key benefits and risks I have been informed of, my selection is appropriate for me given my financial needs, circumstances, and goals.
            </div>
        </div>
    </>
}

export default Acknowledgement;