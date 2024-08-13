import { ChangeEvent, useState }	from "react";
import { useDispatch }				from "react-redux/es/exports";
import { useSelector }				from "react-redux/es/hooks/useSelector";

import { mortgageActions }	from "../../../../store/mortgage-account-slice";
import DatePicker			from "../../../utils/DatePicker";
import Input				from "../../../utils/Input";
import Radio				from "../../../utils/Radio";
import Select				from "../../../utils/Select";

import changeHandler	from "../../../utils/ChangeHandler";

const ThirdPartyInfo = (props) => {
	const dispatch = useDispatch();

	const [errors, setErrors] = useState({
		thirdPartyType: "Please select option.",
		thirdPartyRelationshipToCustomer: "Please select relationship.",
		thirdPartyTitle: "Please provide title matching your government issued ID.",
		thirdPartyFirstname: "Please provide your first name as matching your ID.",
		thirdPartyLastname: "Please provide your last name as matching your ID.",
		thirdPartyDob: "Please provide your date of birth."
	});

	const [submitted, setSubmitted] = useState(false);

	const onChangeHandler = (e: ChangeEvent) => {
		let updatedErrors = { ...errors };

		function errorFieldValue(field : String, value : String, error: String) {
			if (e.target.name === field) {
				if (e.target.value === value) updatedErrors[field] = error;
				else delete updatedErrors[field];
			}
		}

		function fieldValueEquals(field : String, value : String) {
			return e.target.name === field && e.target.value === value;
		}

		function fieldValueLengthExceedsMax(field : String, value : Number) {
			return e.target.name === field && e.target.value.length >= value;
		}

		changeHandler(e, dispatch);

		// Individual or business
		errorFieldValue("thirdPartyType", "", "Please select option.");
		errorFieldValue("thirdPartyRelationshipToCustomer", "", "Please select option.");
		errorFieldValue("thirdPartyTitle", "", "Please select option.");

		// First Name errors
		if (e.target.name === "thirdPartyFirstname") {
			if (fieldValueEquals("thirdPartyFirstname", "")) updatedErrors.thirdPartyFirstname = "Please provide your first name.";
			else if (fieldValueLengthExceedsMax("thirdPartyFirstname", 200))
				updatedErrors.thirdPartyFirstname = "Please provide a shorter first name.";
			else delete updatedErrors.thirdPartyFirstname;
		}

    	// Last Name errors
    	if (e.target.name === "thirdPartyLastname") {
			if (fieldValueEquals("thirdPartyLastname", "")) updatedErrors.thirdPartyLirstname = "Please provide your last name.";
			else if (fieldValueLengthExceedsMax("thirdPartyLastname", 200))
				updatedErrors.thirdPartyLastname = "Please provide a shorter last name.";
			else delete updatedErrors.thirdPartyLastname;
		}

    	// Date of birth errors
		if (e.target.name === "thirdPartyDob") {
			if (e.target.value === "") updatedErrors.thirdPartyDob = "Please provide your date of birth.";
			else {
				console.log("Entered date: " + e.target.value);
				const currentDate = new Date();
				const minDate = new Date(
					currentDate.getFullYear() - 18,
					currentDate.getMonth(),
					currentDate.getDate()
					);
				console.log("Minimum date: " + minDate);
				if (new Date(e.target.value) > minDate) updatedErrors.thirdPartyDob = "Minimim age limit is 18 years.";
				else delete updatedErrors.thirdPartyDob;
			}
		}

		setErrors({ ...updatedErrors });
	}

	function validate() {
		setSubmitted(true);

		if (props.skipValidation || Object.keys(errors).length === 0 ) {
			props.nextCallback();
		}
	}

	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() - 18);
	maxDate.setMonth(maxDate.getMonth());
	maxDate.setDate(maxDate.getDate());

	return <>
		<h5 className="tab-heading mb-4">Third Party Information & Intended Use</h5>
		<p className="info-text">
			Ant-Money Loundering legislation requires us to obtain the following information.
			We cannot open an Account for you without this information which will remain strictly confidential.
		</p>

		<Radio label="Is this an individual or a Business?"
			name="thirdPartyType"
			options={['Individual','Business']}
			onChange={onChangeHandler}
			error={submitted? errors.thirdPartyType : ""}/>

		<Select name="thirdPartyRelationshipToCustomer"
			label="Relationship to You"
			options={[
				{value: 1, txt:"Self"},
				{value: 2, txt:"Owner"}]}
			onChange={onChangeHandler}
			error={submitted? errors.thirdPartyRelationshipToCustomer : ""}/>

		<h5 className="field-heading">Name</h5>
		<p className="info-text">Please use legal name as it appears on Government issued ID.</p>

		<Select name="thirdPartyTitle"
			label="Title"
			options={[
				{ value: "Mr",  txt:"Mr"  },
				{ value: "Ms",  txt:"Ms"  },
				{ value: "Mx",  txt:"Mx"  },
				{ value: "Mrs", txt:"Mrs" }]}
			onChange={onChangeHandler}
			error={submitted? errors.thirdPartyTitle : ""}/>

		<Input name="thirdPartyFirstname"
			label="First name"
			type="text"
			placeholder=""
			onChange={onChangeHandler}
			error={submitted? errors.thirdPartyFirstname : ""}/>

		<Input name="thirdPartyLastname"
			label="Last name"
			type="text"
			placeholder=""
			onChange={onChangeHandler}
			error={submitted? errors.thirdPartyLastname : ""}/>

		<div className="form-group">
			<label htmlFor="thirdPartyDob">Date of Birth</label>
			<input
				type="date"
				className="form-control"
				placeholder="Date of Birth"
				aria-label="thirdPartyDob"
				name="thirdPartyDob"
				onChange={onChangeHandler}
				max={maxDate.toISOString().split("T")[0]} // Set the maximum allowed date
	        />
	        {(submitted && errors.thirdPartyDob) && <p className="text-danger">{errors.thirdPartyDob}</p>}
	    </div>

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>
}

export default ThirdPartyInfo;
