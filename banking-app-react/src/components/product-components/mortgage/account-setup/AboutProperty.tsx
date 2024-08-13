import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector }         from "react-redux";

import Checkbox      from "../../../utils/Checkbox";
import Input         from "../../../utils/Input";
import Select        from "../../../utils/Select";
import changeHandler from "../../../utils/ChangeHandler";

import { Validatable }  from "../../../Validations";

const AboutProperty = (props) => {
	const dispatch = useDispatch()

	// Descriptors for each field, used in error validation
	const fieldNouns = {
		propertyAge: "age of property",
		squareFootage: "square footage",
		typeOfHousing: "type of housing",
		storeyNumber: "number of storeys",
		propertyZoning: "zoning of property",
		heatingSource: "source of heating",
		waterSupply: "water supply"
	}

	// Preperation of initial error states - if you submit a blank form, it should give errors.
	let initialErrors = {}
	for (var key of Object.keys(fieldNouns)) {
		initialErrors[key] = Validatable.validate("", fieldNouns[key]).fieldPresent().fail().getError();
	}

	const [errors, setErrors] = useState({ ...initialErrors });
	const [submitted, setSubmitted] = useState(false);

	// Core validation function that runs whenever you attempt to submit a page
	function validate() {
		setSubmitted(true);

		for (var error of Object.values(errors)) {
			if (!props.skipValidation && error !== null) return;
		}

		props.nextCallback();
	}

	// State tracker for property zoning checkbox
	const [ propertyZoning, setPropertyZoning ] = useState({
		Residential: false,
		Commercial: false
	})

	const onChangeHandler = (e: ChangeEvent) => {
		changeHandler(e, dispatch);

		let updatedErrors = { ...errors };
		const { name, value } = e.target;

		// Validation shorthand
		function getValidation() : Validatable {
			return Validatable.validate(value, fieldNouns[name]);
		}

		// Core validation switch that runs each field through the validations it requires
		function validateField() : Validatable {
			switch (name) {
			case "propertyAge":
			case "squareFootage":
				return getValidation().fieldPresent().notNegative();
			case "typeOfHousing":
			case "storeyNumber":
			case "heatingSource":
			case "waterSupply":
				return getValidation().fieldPresent();
			case "propertyZoning":
				let propertyZoningChange = { ...propertyZoning };
				propertyZoningChange[value.toString()] = e.target.checked;
				setPropertyZoning(propertyZoningChange);
				return Validatable
					.validate(Object.values(propertyZoningChange), fieldNouns[name])
					.oneOrMoreOption();
			}
		}

		// Updates error for the updated field
		updatedErrors[name] = validateField().getError();
		setErrors(updatedErrors);
	}

	return <>
		<h5 className="tab-heading mb-4">About the property</h5>
		<p className="info-text">
			We'll just need some more details about your new home.
		</p>

		<div className="flex2">
			<Input name="propertyAge"
				label="Property age"
				type="number"
				placeholder="Enter 0 for brand new"
				onChange={onChangeHandler}
				error={submitted? errors.propertyAge : undefined}/>

			<Input name="squareFootage"
				label="Square footage"
				type="number"
				onChange={onChangeHandler}
				error={submitted? errors.squareFootage : undefined}/>
		</div>

		<Select name="typeOfHousing"
			label="Type of housing"
			options={[
				{value: 1, txt:"Condo"},
				{value: 2, txt:"House"},
				{value: 3, txt:"Townhouse"}]}
			onChange={onChangeHandler}
			error={submitted? errors.typeOfHousing : undefined}/>

		<Select name="storeyNumber"
			label="Number of storey"
			info="Living areas primarily above ground level."
			options={[
				{value: 1, txt:"1"},
				{value: 2, txt:"2"},
				{value: 3, txt:"3"}]}
			onChange={onChangeHandler}
			error={submitted? errors.storeyNumber : undefined}/>

		<Checkbox name="propertyZoning"
			label="Property zoning. Select both if applicable."
			options={[
				"Residential",
				"Commericial"]}
			onChange={onChangeHandler}
			error={submitted? errors.propertyZoning : undefined}/>

		<div className="flex2">
			<Select name="heatingSource"
				label="Heating source"
				options={[
					{value: 1, txt:"Steam Radiators"},
					{value: 2, txt:"Electric Baseboard Heaters"},]}
				onChange={onChangeHandler}
				error={submitted? errors.heatingSource : undefined}/>

			<Select name="waterSupply"
				label="Water supply"
				options={[
					{value: 1, txt:"Surface Water Source"},
					{value: 2, txt:"Ground Water Source"}]}
				onChange={onChangeHandler}
				error={submitted? errors.waterSupply : undefined}/>
		</div>

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>
}

export default AboutProperty;
