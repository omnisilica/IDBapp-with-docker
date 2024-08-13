import { ChangeEvent, useState }	from "react";
import { useDispatch, useSelector } from "react-redux";

import Checkbox 		from "../../../utils/Checkbox";
import Input			from "../../../utils/Input";
import Radio			from "../../../utils/Radio";
import Select 			from "../../../utils/Select";
import changeHandler 	from "../../../utils/ChangeHandler";

import { Validatable } from "../../../Validations";

const Numbers = (props) => {

	const dispatch = useDispatch();

	const fieldNouns = {
		purchasePrice: "purchase price",
		downPayment: "down payment",
		downPaymentFunds: "source of funds",
		purpose: "purpose",
		intendedUseOfAccount: "intended use",
		mortgageType: "type of mortgage",
		mortgageTerm: "mortgage term",
		amortizationPeriod: "period of amortization",
		paymentFrequency: "frequency of payment"
	}

	let initialErrors = {}
	for (var key of Object.keys(fieldNouns)) {
		initialErrors[key] = Validatable.validate("", fieldNouns[key]).fieldPresent().fail().getError();
	}
	const [errors, setErrors] = useState({ ...initialErrors });
	const [submitted, setSubmitted] = useState(false);

	function validate() {
		setSubmitted(true);

		for (var error of Object.values(errors)) {
			if (!props.skipValidation && error !== null) return;
		}

		props.nextCallback();
	}

	const [fundingSource, setFundingSource] = useState({
		"RSPs" : false,
		"Gift" : false,
		"Equity from existing property" : false,
		"Sale of property" : false,
		"Cash (Personal savings)" : false,
		"Investments" : false,
		"Other" : false,
	});

	const onChangeHandler = (e: ChangeEvent)=>{
		changeHandler(e, dispatch);

		let updatedErrors = { ...errors };
		const { name, value } = e.target;

		if (name === "purchasePrice") updatedErrors.purchasePrice = Validatable
			.validate(value, fieldNouns.purchasePrice)
			.numeric()
			.fieldPresent()
			.notNegative()
			.getError();

		if (name === "downPayment") updatedErrors.downPayment = Validatable
			.validate(value, fieldNouns.downPayment)
			.numeric()
			.fieldPresent()
			.notNegative()
			.getError();

		if (name === "downPaymentFunds") {
			let fundingChange = { ...fundingSource };
			fundingChange[value.toString()] = e.target.checked;

			updatedErrors.downPaymentFunds = Validatable
				.validate(Object.values(fundingChange), fieldNouns.downPaymentFunds)
				.oneOrMoreOption()
				.getError();

			setFundingSource(fundingChange);
		}

		if (name === "purpose") updatedErrors.purpose = Validatable
			.validate(value, fieldNouns.purpose)
			.fieldPresent()
			.getError();

		if (name === "intendedUseOfAccount") updatedErrors.intendedUseOfAccount = Validatable
			.validate(value, fieldNouns.intendedUseOfAccount)
			.fieldPresent()
			.getError();

		if (name === "mortgageType") updatedErrors.mortgageType = Validatable
			.validate(value, fieldNouns.mortgageType)
			.fieldPresent()
			.getError();

		if (name === "mortgageTerm") updatedErrors.mortgageTerm = Validatable
			.validate(value, fieldNouns.mortgageTerm)
			.fieldPresent()
			.getError();

		if (name === "amortizationPeriod") updatedErrors.amortizationPeriod = Validatable
			.validate(value, fieldNouns.amortizationPeriod)
			.fieldPresent()
			.getError();

		if (name === "paymentFrequency") updatedErrors.paymentFrequency = Validatable
			.validate(value, fieldNouns.paymentFrequency)
			.fieldPresent()
			.getError();

		setErrors(updatedErrors);
	}

	return <>
		<h5 className="tab-heading mb-4">Let's take a look at the numbers</h5>
		<p className="info-text">
			Once you select a term below, you'll be able to see how altering the amortization period
			and payment frequency impacts your Mortgage amount and payment amount. One of our Mortgage Specialists can go over
			your options with you and help you make the right choice for you.
		</p>

		<Input name="purchasePrice"
			label="Purchase Price"
			type="number"
			placeholder="Enter amount"
			onChange={onChangeHandler}
			error={submitted? errors.purchasePrice : undefined}/>

		<Input name="downPayment"
			label="Down Payment"
		// type="text"
			type="number"
			placeholder="Enter amount"
			onChange={onChangeHandler}
			error={submitted? errors.downPayment : undefined}/>

		<Checkbox name="downPaymentFunds"
			label="How will you fund your down payment? (Select all that apply)"
			options={[
				"RSPs",
				"Gift",
				"Equity from existing property",
				"Sale of property",
				"Cash (Personal savings)",
				"Investments",
				"Other"]}
			onChange={onChangeHandler}
			error={submitted? errors.downPaymentFunds : undefined}/>

		<Radio label="Are you planning to live in the property yourself, or will it be used as a rental?"
			name="purpose"
			options={[
				'Owner occupied',
				'Rental',
				'Owner occupied and rental']}
			onChange={onChangeHandler}
			error={submitted? errors.purpose : undefined}/>

		<Select name="intendedUseOfAccount"
			label="What is the Intended Use of this Account"
			options={[
				{value: 1, txt:"Buy a new Home"},
				{value: 2, txt:"Title 2"}]}
			onChange={onChangeHandler}
			error={submitted? errors.intendedUseOfAccount : undefined}/>

		<Radio label="Motgage Type"
			info={"Want to learn more about variable and fixed to see which is right for you?"}
			name="mortgageType"
			options={[
				'Fixed rate',
				'Variable rate']}
			onChange={onChangeHandler}
			error={submitted? errors.mortgageType : undefined}/>

		<Radio label="Motgage Term"
			name="mortgageTerm"
			options={[
				'1 year (7.89%)',
				'2 year (7.19%)',
				'3 year (6.69%)',
				'4 year (6.54%)',
				'5 year (6.49%)',
				'7 year (6.79%)',
				'10 year (7.09%)']}
			onChange={onChangeHandler}
			error={submitted? errors.mortgageTerm : undefined}/>

		<div className="flex2">
			<Select name="amortizationPeriod"
				label="Amortization period"
				options={[
					{value: 1, txt:"25 years"},
					{value: 2, txt:"30 years"}]}
				onChange={onChangeHandler}
				error={submitted? errors.amortizationPeriod : undefined}/>


			<Select name="paymentFrequency"
				label="Payment Frequency"
				options={[
					{value: 1, txt:"monthly"},
					{value: 2, txt:"biweekly"}]}
				onChange={onChangeHandler}
				error={submitted? errors.paymentFrequency : undefined}/>
		</div>

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>
}

export default Numbers;
