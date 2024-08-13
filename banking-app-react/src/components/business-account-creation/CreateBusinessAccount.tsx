import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import Radio from "../utils/Radio";
import changeHandler from "../utils/ChangeHandler";
import { useDispatch } from "react-redux/es/exports";
import Select from "../utils/Select";
import './BusinessAccountSetup.scss';

const CreateBusinessAccount = (props) => {
    const [errors, setErrors] = useState({
        legalBusinessStructure: "Please select an option.",
        isPubliclyTraded: "Please select an option."
    });

    const [boxesChecked, setBoxesChecked] = useState({
        legalBusinessStructure: false,

    });

    const [isNonProfitSelected, setIsNonProfitSelected] = useState(false);

    const [isPubliclyTraded, setIsPubliclyTraded] = useState(false);

    const [submitted, setSubmitted] = useState(false);



    const validateField = (name: string, value: string) => {
        let errorMessage = '';
        if (name === 'legalBusinessStructure' && value === '') {
            errorMessage = 'Please select a legal business structure.';
        } else if (name === 'businessType' && value === '') {
            errorMessage = 'Please select a business type.';
        }
        return errorMessage;
    };

    const [legalBusinessStructure, setLegalBusinessStructure] = useState<string>('');

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        // Update boxesChecked state
        setBoxesChecked(prev => ({ ...prev, [name]: true }));

        if (name === 'legalBusinessStructure') {
            setLegalBusinessStructure(value); // Update legalBusinessStructure state
            const isNonProfit = value === 'Non Profit';
            setIsNonProfitSelected(isNonProfit);
            setIsPubliclyTraded(!isNonProfit); // Directly set isPubliclyTraded as a boolean
            // Ensure isPubliclyTraded checkbox is considered checked when Non Profit is selected
            if (isNonProfit) {
                setBoxesChecked(prev => ({ ...prev, isPubliclyTraded: true }));
            }
        }
        const errorMessage = validateField(name, value);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
        // Update formData in the parent component
        props.setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const giveError = (field: string) => {
        if (submitted && !boxesChecked[field]) return "Please select an option.";
        else return "";
    };

    function validate() {
		setSubmitted(true);
		if (props.skipValidation || !Object.values(boxesChecked).includes(false)) {
			props.nextCallback();
		}
	}

    return <>
        <form>
            <div className="container p-5 pt-4 mt-4">
            <h1 className="tab-heading mb-4">Tell us about your business structure.</h1>
                <div className="text-div">
                    <Select
                        name="legalBusinessStructure"
                        label="1. Legal Business Structure"
                        options={[
                            { value: "Sole Proprietorship", txt: "Sole Proprietorship" },
                            { value: "Limited Liability Corporation", txt: "Limited Liability Corporation" },
                            { value: "Corporation", txt: "Corporation" },
                            { value: "Partnership/Other", txt: "Partnership/Other" },
                            { value: "Non Profit", txt: "Non Profit"}
                        ]}
                        onChange={onChangeHandler}
                        error={submitted ? errors.legalBusinessStructure : ""}
                    />
                </div>
                { !isNonProfitSelected && (
                    <div className="text-div">
                        <Radio
                        label="2. Is your Business publicly traded?"
                        name="isPubliclyTraded"
                        options={["Yes", "No"]}
                        onChange={onChangeHandler}
                        error={giveError("isPubliclyTraded")}
                        />
                    </div>
                    )}

                <div className="justify-content-md-end footer d-md-flex">
                    <button type="button" onClick={() => props.backCallback() } className="btn-outline-light-2">
                        Back
                    </button>
                    <button type="button" onClick={validate} className="btn-outline-primary">
                        Next
                    </button>
                </div>
            </div>
        </form>
    </>
};

export default CreateBusinessAccount;
