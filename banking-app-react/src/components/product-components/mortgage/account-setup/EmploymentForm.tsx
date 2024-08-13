import {
	ChangeEvent,
	FormEvent,
	FormEventHandler,
	useEffect,
	useState
} from "react";

import Select   from "../../../utils/Select";
import Input    from "../../../utils/Input";
import Checkbox from "../../../utils/Checkbox";

import { Validatable, postalCodePattern, phonePattern }  from "../../../Validations";

const EmploymentForm = (props:any) => {
	const initialState = {}
	const [formData, setFormData] = useState<any>(initialState);
	const [submitted, setSubmitted] = useState(false);

	const fieldNouns = {
		employmentIndustry: "industry of employment",
		yearsInIndustry: "number of years in your industry",
		employmentType: "type of employment",
		occupation: "title of your occupation",
		employerName: "name of your employer",
		employmentYears: "years of employment",
		employmentMonths: "months of employment",
		isCurrentWorkplace: "whether this is your current workplace",
		employerStreetNumber: "street number",
		employerStreetName: "street name",
		employerUnit: "unit number",
		employerCity: "city",
		employerCountry: "country",
		employerProvince: "province",
		employerPostalCode: "postal code",
		employerPhoneNumber: "phone number",
		employerPhoneExt: "line extension"
	}

	let initialErrors = {};
	const requiredFields = [ "employmentIndustry", "yearsInIndustry", "employmentType", "occupation", "employerName",
		"employmentYears", "employerStreetNumber", "employerStreetName",
		"employerCity", "employerCountry", "employerProvince", "employerPostalCode", "employerPhoneNumber" ]
	for (var field of requiredFields) {
		initialErrors[field] = Validatable.validate("", fieldNouns[field]).fieldPresent().fail().getError();
	}

	const [errors, setErrors] = useState({ ...initialErrors });

	useEffect(() => { setFormData(props.employment); }, [props.employment]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });

		let updatedErrors = { ...errors };
		const { name, value } = e.target;
		console.log("name is " + name + " value is " + value);
		function getValidation() : Validatable {
			return Validatable.validate(value, fieldNouns[name]);
		}

		function validateField(): Validatable {
				console.log("name is switch case is " + name);
			switch (name) {
			case "employmentIndustry":
			case "employmentType":
			case "employerCountry":
			case "employerProvince":
				return getValidation().fieldPresent();
			case "yearsInIndustry":
			case "employmentYears":
				return getValidation().fieldPresent().notNegative();
			case "employmentMonths":
				return getValidation().notNegative().maxValue(11);
			case "occupation":
			case "employerName":
			case "employerStreetName":
			case "employerCity":
				return getValidation().fieldPresent().maxLength(199);
			case "employerStreetNumber":
				return getValidation().fieldPresent().maxLength(19)
					.overrideError("Please split street name into second field.");
			case "employerPostalCode":
				return getValidation().fieldPresent()
					.matches(postalCodePattern, "A1A 1A1 or A1A1A1");
			case "employerPhoneNumber":
				return getValidation().fieldPresent()
					.matches(phonePattern, "(000) 000 0000");
			}
		}
		for (let i = 0; i < requiredFields.length; i++) {
			if (requiredFields[i] === name) {
		updatedErrors[name] = validateField().getError();
			}
		}

		setErrors(updatedErrors);
	};

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, isCurrentWorkplace: !!e.target.checked });
	};

	const onSubmit = (e: any)=>{
		setSubmitted(true);
		e.preventDefault();

		// If there are any errors present, do not continue submitting
		for (var error of Object.values(errors)) {
			if (error !== null) {
				console.error(error);
				return;
			}
		}

		console.log("No errors found.");
		// Otherwise wrap up submission
		const fd = new FormData(e.currentTarget);
		const data = Object.fromEntries(fd.entries());
		if (props.editMode) {
			props.onEditEmployment(formData);
		} else {
			const id = (new Date()).getTime();
			props.onAddEmployment({...data, id});
		}
		e.target.reset();
		props.closeEmploymentForm()
	}

	const closeForm = ()=>{
		props.closeEmploymentForm()
	}

	return (
		<form onSubmit={onSubmit}>
		<Select name="employmentIndustry"
			label="Industry"
			value={formData.employmentIndustry}
			options={[
				{value: "IT", txt:"IT"},
				{value: "Marketing", txt:"Marketing"},
				{value: "Banking", txt:"Banking"}]}
			onChange={handleChange}
			error={submitted? errors.employmentIndustry : undefined}/>
		<div className="flex2">
			<Input name="yearsInIndustry"
				label="Years in industry"
				type="number"
				placeholder="Years"
				value={formData.yearsInIndustry}
				min={0}
				max={50}
				onChange={handleChange}
				error={submitted? errors.yearsInIndustry : undefined}/>
			<Select name="employmentType"
				label="Employment type"
				value={formData.employmentType}
				options={[
					{value: "FT", txt:"Full-time"},
					{value: "C", txt:"Contract"}]}
				onChange={handleChange}
				error={submitted? errors.employmentType : undefined}/>
		</div>
		<div className="flex2">
			<Input name="occupation"
				label="Occupation"
				type="text"
				value={formData.occupation}
				placeholder="Occupation"
				onChange={handleChange}
				error={submitted? errors.occupation : undefined}/>
			<Input name="employerName"
				label="Employer name"
				type="text"
				value={formData.employerName}
				placeholder="Employer name"
				onChange={handleChange}
				error={submitted? errors.employerName : undefined}/>
		</div>
		<h5 className="field-heading">How long have you been working here?</h5>
		<div className="flex2">
			<Input name="employmentYears"
				label="Years"
				type="number"
				value={formData.employmentYears}
				min={0}
				max={50}
				onChange={handleChange}
				error={submitted? errors.employmentYears : undefined}/>
			<Input name="employmentMonths"
				label="Month"
				type="number"
				value={formData.employmentMonths}
				min={0}
				max={11}
				onChange={handleChange}
				error={submitted? errors.employmentMonths : undefined}/>
		</div>
		<Checkbox name="isCurrentWorkplace"
			checked={formData.isCurrentWorkplace}
			options={["I'm currently working here."]}
			onChange={handleCheckboxChange}/>
		<h5 className="field-heading">Employer address</h5>
		<div className="flex2">
			<Input name="employerStreetNumber"
				label="Street number"
				type="text"
				value={formData.employerStreetNumber}
				onChange={handleChange}
				error={submitted? errors.employerStreetNumber : undefined}/>
			<Input name="employerStreetName"
				label="Street name"
				type="text"
				value={formData.employerStreetName}
				onChange={handleChange}
				error={submitted? errors.employerStreetName : undefined}/>
		</div>
		<div className="flex2">
			<Input name="employerUnit"
				label="Unit/Apartment"
				type="text"
				value={formData.employerUnit}
				onChange={handleChange}
				error={submitted? errors.employerUnit : undefined}/>
			<Input name="employerCity"
				label="City"
				type="text"
				value={formData.employerCity}
				onChange={handleChange}
				error={submitted? errors.employerCity : undefined}/>
		</div>
		<div className="flex2">
			<Select name="employerCountry"
				label="Country"
				value={formData.employerCountry}
				options={[
					{value: 'CA', txt:"Canada"},
					{value: 'US', txt:"USA"}]}
				onChange={handleChange}
				error={submitted? errors.employerCountry : undefined}/>
			<Select name="employerProvince"
				label="Province"
				value={formData.employerProvince}
				options={[
					{value: "ON", txt:"Ontario"},
					{value: "QC", txt:"Quebec"}]}
				onChange={handleChange}
				error={submitted? errors.employerProvince : undefined}/>
		</div>
		<Input name="employerPostalCode"
			label="Postal code"
			type="text"
			value={formData.employerPostalCode}
			onChange={handleChange}
			error={submitted? errors.employerPostalCode : undefined}/>
		<div className="flex2">
			<Input name="employerPhoneNumber"
				label="Employer's phone number"
				type="tel"
				value={formData.employerPhoneNumber}
				placeholder="(000) 000-0000"
				onChange={handleChange}
				error={submitted? errors.employerPhoneNumber : undefined}/>
			<Input name="employerPhoneExt"
				label="Ext."
				value={formData.employerPhoneExt}
				type="text"
				onChange={handleChange}
				error={submitted? errors.employerPhoneExt : undefined}/>
		</div>
		<button className="rounded-button back mr-4" type="submit" onClick={closeForm}> Cancel </button>
		<button className="rounded-button next" type="submit"> { props.editMode? "Update" : "Add" } </button>
	</form>);
}

export default EmploymentForm;