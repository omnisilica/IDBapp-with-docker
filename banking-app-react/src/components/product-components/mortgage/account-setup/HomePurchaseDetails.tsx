import { ChangeEvent, useState }    from "react";
import { useDispatch }              from "react-redux";

import DatePicker       from "../../../utils/DatePicker";
import Radio            from "../../../utils/Radio";
import Input            from "../../../utils/Input";
import changeHandler    from "../../../utils/ChangeHandler";

import { mortgageActions }  from "../../../../store/mortgage-account-slice";

import { postalCodePattern, Validatable }  from "../../../Validations";

const HomePurchaseDetails = (props) => {

	const dispatch = useDispatch();

	const fieldNouns = {
		hasPostalCode: "whether you know the postal code",
		postalCode: "postal code",
		closingDate: "closing date",
		madeOffer: "whether you have made an offer that is conditional on financing",
		deadlineDate: "deadline date"
	}

	let initialErrors = {}
	for (var key of Object.keys(fieldNouns)) {
		initialErrors[key] = Validatable.validate("", fieldNouns[key]).fieldPresent().fail().getError();
	}
	const [errors, setErrors] = useState({ ...initialErrors });
	const [submitted, setSubmitted] = useState(false);

	const [knowPostalCode, setKnowPostalCode] = useState(false);
	const [conditionalFinancing, setConditionalFinancing] = useState(false);

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
			case "madeOffer":
			case "hasPostalCode":
			case "closingDate":
			case "deadlineDate":
				return getValidation().fieldPresent();
			case "postalCode":
				return getValidation().fieldPresent().matches(postalCodePattern, "A1A 1A1 or A1A1A1");
			}
		}

		if (name === "hasPostalCode") {
			if (value === "Yes") {
				setKnowPostalCode(true);
				updatedErrors.postalCode = Validatable
					.validate("", fieldNouns.postalCode)
					.fieldPresent().fail().getError();
			} else {
				setKnowPostalCode(false);
				delete updatedErrors.postalCode;
			}
		}

		if (name === "madeOffer") {
			if (value === "Yes") {
				setConditionalFinancing(true);
				updatedErrors.deadlineDate = Validatable
					.validate("", fieldNouns.deadlineDate)
					.fieldPresent().fail().getError();
			} else {
				setConditionalFinancing(false);
				delete updatedErrors.deadlineDate;
			}
		}

		updatedErrors[name] = validateField().getError();

		setErrors(updatedErrors);
	}

	return <>
		<h5 className="tab-heading mb-4">Home purchase details</h5>
		<p className="info-text">Found your dream home? Great! Tell us more about it below.</p>

		<Radio label="Do you know the postal code of this property?"
			name="hasPostalCode"
			options={['Yes','No']} 
			onChange={onChangeHandler}
			error={submitted? errors.hasPostalCode : undefined}/>

		{ knowPostalCode && <Input label="Postal code"
			type="text"
			name="postalCode"
			onChange={onChangeHandler}
			error={submitted? errors.postalCode : undefined}/> }

		<Input label="Closing date"
			type="date"
			name="closingDate"
			onChange={onChangeHandler}
			error={submitted? errors.closingDate : undefined}/>

		<Radio label="Have you made an offer that's conditional on financing?"
			name="madeOffer"
			options={['Yes','No']} 
			onChange={onChangeHandler}
			error={submitted? errors.madeOffer : undefined}/>

		{ conditionalFinancing && <Input label="Condition deadline"
			type="date"
			name="deadlineDate"
			onChange={onChangeHandler}
			error={submitted? errors.deadlineDate : undefined}/> }

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>;
}

export default HomePurchaseDetails;