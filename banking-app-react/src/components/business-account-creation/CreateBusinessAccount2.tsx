import React, { ChangeEvent, useState } from 'react';
import Select from '../utils/Select';

import Radio from '../utils/Radio';
import changeHandler from '../utils/ChangeHandler';
import { useNavigate } from "react-router-dom";
import './BusinessAccountSetup.scss';
import { useDispatch } from 'react-redux';

const CreateBusinessAccount2 = (props) => {
    const [businessName, setBusinessName] = useState('');
    const [boxesChecked, setBoxesChecked] = useState({
        businessTaxID: false,
        businessRevenue: false,
        confirmation: false

    });

    const [errors, setErrors] = useState({
        confirmation: "",
        taxIdType: "",
        businessRevenue: "",
        businessLegalName: "",
        suffix: "",
        businessAddress: "",
        businessPhoneNumber: "",
        businessEmail: "",
        fiscalMonthYear: "",
        stateProvince: ""
    });

    const [submitted, setSubmitted] = useState(false);


    const handleBusinessNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessName(event.target.value);
        const { name, value } = event.target;
        props.setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateField = (name: string, value: string) => {
        let errorMessage = '';
        if (name === 'businessLegalName' && value.trim() === '') {
            errorMessage = 'Please enter a business legal name.';
        } else if (name === 'suffix' && value.trim() === '') {
            errorMessage = 'Please enter a suffix.';
        } else if (name === 'confirmation' && value !== 'Yes') {
            errorMessage = 'Please confirm the full name of your business.';
        } else if (name === 'businessTaxID' && value === '') {
            errorMessage = 'Please select a tax ID type.';
        } else if (name === 'businessRevenue' && value === '') {
            errorMessage = 'Please select a business revenue.';
        } else if (name === 'businessAddress' && value.trim() === '') {
            errorMessage = 'Please enter a business address.';
        } else if (name === 'businessPhone' && value.trim() === '') {
            errorMessage = 'Please enter a business phone number.';
        }
        else if (name === 'businessEmail' && value.trim() === '') {
            errorMessage = 'Please enter a business email.';
        }
        else if (name === 'fiscalMonthYear' && value.trim() === '') {
            errorMessage = 'Please enter a fiscal month/year.';
        }
        else if (name === 'businessState' && value.trim() === '') {
            errorMessage = 'Please enter a state/province.';
        }
        return errorMessage;
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        setBoxesChecked((prevBoxesChecked) => ({ ...prevBoxesChecked, [name]: true }));
        props.setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const giveError = (field: string) => {
        if (submitted && !boxesChecked[field]) return "Please select an option.";
        else return "";
    }

    function validate() {
		setSubmitted(true);
		if (props.skipValidation || !Object.values(boxesChecked).includes(false)) {
			props.nextCallback();
		}
	}

    return (
        <form>
            <div className="container p-5 pt-4 mt-4">
                <h1 className="tab-heading mb-4">Tell us about your business.</h1>

                <div className='text-div'>
                    <label htmlFor="businessLegalName">1. Business Legal Name:</label>
                    <input type="text" id="businessLegalName" name="businessLegalName" onChange={handleBusinessNameChange} />
                </div>

                <div className='text-div'>
                    <label htmlFor="suffix">2. Suffix:</label>
                    <input type="text" id="suffix" name="suffix" />
                </div>

                <div className='text-div'>
                    <Radio
                        label={`I confirm the full name of my business is: ${businessName}`}
                        name="confirmation"
                        options={['Yes', 'No']}
                        onChange={onChangeHandler}
                        error={giveError("confirmation")}
                    />
                </div>

                <div className='text-div'>
                    <Select
                        name="businessTaxID"
                        label="3. Tax ID Type"
                        options={[
                            { value: "SSN", txt: "SSN" },
                            { value: "EIN", txt: "EIN" },
                            { value: "ITIN", txt: "ITIN" }
                        ]}
                        onChange={onChangeHandler}
                        error={submitted ? errors.taxIdType : ""}
                    />
                </div>

                <div className='text-div'>
                    <label htmlFor="businessAddress">4. Physical Business Address:</label>
                    <input type="text" id="businessAddress" name="businessAddress" onChange={onChangeHandler} />
                </div>

                <div className='text-div'>
                    <label htmlFor="businessPhone">5. Business Phone Number:</label>
                    <input type="tel" id="businessPhone" name="businessPhone" pattern="\+1 \(\d{3}\) \d{3}-\d{4}" onChange={onChangeHandler} />
                </div>

                <div className='text-div'>
                    <label htmlFor="businessEmail">6. Business Email:</label>
                    <input type="text" id="businessEmail" name="businessEmail" onChange={onChangeHandler}/>
                </div>

                <div className='text-div'>
                    <Select
                        name="businessRevenue"
                        label="7. Business Revenue"
                        options={[
                            { value: "Sales", txt: "Sales" },
                            { value: "Advertising", txt: "Advertising" },
                            { value: "Licensing", txt: "Licensing" },
                            { value: "Rent", txt: "Rent" }
                        ]}
                        onChange={onChangeHandler}
                        error={submitted ? errors.businessRevenue : ""}
                    />
                </div>

                <div className='text-div'>
                    <label htmlFor="fiscalMonthYear">8. Fiscal Month/Year:</label>
                    <input type="date" id="fiscalMonthYear" name="fiscalMonthYear" />
                </div>

                <div className='text-div'>
                    <label htmlFor="businessState">9. State/Province of Business:</label>
                    <input type="text" id="businessState" name="businessState" onChange={onChangeHandler}/>
                </div>

                <div className="justify-content-md-end footer d-md-flex">
                    <button type="button" onClick={() => props.backCallback() } className="btn-outline-light-2"> Back </button>
                    <button type="button" onClick={validate} className="btn-outline-primary"> Next </button>
                </div>
            </div>
        </form>
    );
};

export default CreateBusinessAccount2;
