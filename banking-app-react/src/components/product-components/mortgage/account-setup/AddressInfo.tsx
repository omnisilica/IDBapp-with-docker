import { useDispatch }				from "react-redux/es/exports";
import { ChangeEvent, useState }	from "react";

import Input			from "../../../utils/Input";
import Radio			from "../../../utils/Radio";
import Select			from "../../../utils/Select";
import changeHandler 	from "../../../utils/ChangeHandler";

import {
	postalCodePattern,
	provincePattern,
	Validatable
} from "../../../Validations";

const AddressInfo = (props) => {
	const dispatch = useDispatch()

	const fieldNouns = {
		numberOfDependents: "how many dependents you have",
		postalCode: "your postal code",
		streetNumber: "your street number",
		streetName: "your street",
		city: "your city",
		maritalStatus: "marital status",
		province: "your province",
		livingSituation: "the option which best describes your living situation"
	}

	const defaultErrors = {}
	for (var key of Object.keys(fieldNouns)) {
		defaultErrors[key] = Validatable.validate("", fieldNouns[key]).fieldPresent().fail().getError();
	}

	const [errors, setErrors] = useState({ ...defaultErrors });
	const [submitted, setSubmitted] = useState(false);
	
	function validate() {
		setSubmitted(true);

		for (var error of Object.values(errors)) {
			if (!props.skipValidation && error !== null) return;
		}
		
		props.nextCallback();
	}



	const onChangeHandler = (e: ChangeEvent)=>{
		changeHandler(e, dispatch);

		let updatedErrors = { ...errors };
		const { name, value } = e.target;

		function getValidation() : Validatable {
			return Validatable.validate(value, fieldNouns[name]);
		}

		function validateField() : Validatable {
			switch (name) {
			case "numberOfDependents":
				return getValidation().fieldPresent().notNegative();
			case "postalCode":
				return getValidation().fieldPresent().matches(postalCodePattern, "A1A 1A1 or A1A1A1");
			case "streetNumber":
				return getValidation().fieldPresent().maxLength(49).overrideError("Please split the street name into the next input box.");
			case "streetName":
			case "city":
				return getValidation().fieldPresent().maxLength(199);
			case "maritalStatus":
			case "province":
			case "livingSituation":
				return getValidation().fieldPresent();
			}
		}

		updatedErrors[name] = validateField().getError();

		setErrors(updatedErrors);
	}

	return <>
		<h5 className="tab-heading mb-4">Your address and household information</h5>
		<p className="info-text">
			Here's the home address we have on file for you. 
			Please make sure it's complete and up-to-date
		</p>

		<Select name="maritalStatus"
			label="Marital Status"
			options={[
				{value: 1, txt:"Married"}, 
				{value: 2, txt:"Single"}]}
			onChange={onChangeHandler}
			error={submitted? errors.maritalStatus : undefined}/>

		<Input name="numberOfDependents"
			label="Number Of Dependents"
			type="number"
			onChange={onChangeHandler}
			min={0}
			error={submitted? errors.numberOfDependents : undefined}/>

		<h5 className="tab-heading">Current home address</h5>

		<Input name="postalCode"
			label="Postal code"
			type="text"
			onChange={onChangeHandler}
			error={submitted? errors.postalCode : undefined}/>

		<div className="flex2">
			<Input name="streetNumber"
				label="Street Number"
				type="text"
				onChange={onChangeHandler}
				error={submitted? errors.streetNumber : undefined}/>

			<Input name="streetName"
				label="Street Name"
				type="text"
				onChange={onChangeHandler}
				error={submitted? errors.streetName : undefined}/>
		</div>

		<div className="flex2">
			<Input name="city"
				label="City"
				type="text"
				onChange={onChangeHandler}
				error={submitted? errors.city : undefined}/>

			<Select name="province"
				label="Province"
				options={[
					{value: "ON", txt: "Ontario"},
					{value: "QC", txt: "Quebec"},
					{value: "NS", txt: "Nova Scotia"},
					{value: "NB", txt: "New Brunswick"},
					{value: "MB", txt: "Manitoba"},
					{value: "BC", txt: "British Columbia"},
					{value: "PE", txt: "Prince Edward Island"},
					{value: "SK", txt: "Saskatchewan"},
					{value: "AB", txt: "Alberta"},
					{value: "NL", txt: "Newfoundland"},
				]}
				onChange={onChangeHandler}
				error={submitted? errors.province : undefined}/>
		</div>

		<Radio label="Describe the option that best describes your current living situation"
			name="livingSituation"
			options={['Rent','Own', 'Live with parents']} 
			onChange={onChangeHandler}
			error={submitted? errors.livingSituation : undefined}/>

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>
}

export default AddressInfo;