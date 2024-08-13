import React, { useState, useEffect } from "react";
import FormDataPersonalInfo from "../../module/FormDataPersonalInfo";
import { PatternFormat } from 'react-number-format';

interface PersonalInfoProps {
  onBackClick: () => void;
  onNextClick: (formData: FormDataPersonalInfo) => void;
  data: FormDataPersonalInfo;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  onBackClick,
  onNextClick,
  data,
}) => {
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  maxDate.setMonth(maxDate.getMonth());
  maxDate.setDate(maxDate.getDate());

  const [formData, setFormData] = useState<FormDataPersonalInfo>(data);
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") return;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const containsOnlyNumbers = (str: string) => {
    return /^[0-9]+$/.test(str);
  };

  function printError(component) {
    if (errors[component]) return <p className="warning">{errors[component]}</p>;
  }

  useEffect(() => {
    // ERROR HANDLING
    let updatedErrors = { ...errors };

    // First Name errors
    if (formData.firstName === "") updatedErrors.firstName = "Please provide your first name.";
    else if (formData.firstName.length >= 200) updatedErrors.firstName = "Please provide a shorter first name.";
    else delete updatedErrors.firstName;

    // Last Name errors
    if (formData.lastName === "") updatedErrors.lastName = "Please provide your last name.";
    else if (formData.lastName.length >= 200) updatedErrors.lastName = "Please provide a shorter last name.";
    else delete updatedErrors.lastName;

    // Date of birth errors
    if (formData.dateOfBirth === "") updatedErrors.dateOfBirth = "Please provide your date of birth.";
    else {
      const currentDate = new Date();
      const minDate = new Date(
        currentDate.getFullYear() - 18,
        currentDate.getMonth(),
        currentDate.getDate()
      );
      if (formData.dateOfBirth > minDate) updatedErrors.dateOfBirth = "Minimim age limit is 18 years.";
      else delete updatedErrors.dateOfBirth;
    }

    // Mobile number errors
    if (formData.phoneNumber === "") updatedErrors.phoneNumber = "Please provide your mobile number.";
    else if (!containsOnlyNumbers(formData.phoneNumber)) updatedErrors.phoneNumber = "Phone number must contain only numbers.";
    else if (formData.phoneNumber.length != 10) updatedErrors.phoneNumber = "Please enter full 10-digit number";
    else delete updatedErrors.phoneNumber;


    // Income errors
    if (formData.income_type === "") updatedErrors.income_type = "Please provide your income source.";
    else if (formData.income_type.length >= 200) updatedErrors.income_type = "Please provide a shorter first name.";
    else delete updatedErrors.income_type;
    if (formData.income_amount < 0) updatedErrors.income_amount = "Please provide your income amount.";
    else delete updatedErrors.income_amount;

    // Update the errors
    setErrors(updatedErrors);
      
  }, [formData]);

  const handleNextClick = () => {
    setFormSubmitted(true);
    if ( Object.keys(errors).length === 0 ) onNextClick(formData);
  };

  function FormInput (name, label) {
    return (
      <>
        <div className="input-group mb-3">
          <input
            type="text"
            className={`form-control ${errors[name] ? "error" : ""}`}
            placeholder={label}
            aria-label={name}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
          />
        </div>
        {formSubmitted && printError(name)}
      </>
    )
  }

  return (
    <div className="textbox-container">
      <h1>Let's confirm your identity</h1>
      <h4>Personal Information</h4>
      <h6>
        Make sure to enter your full name exactly as it appears on your
        government-issued ID.
      </h6>
      <h6>If it doesn't match exactly, your application may be delayed</h6>
      {FormInput("firstName", "First Name")}
      {FormInput("lastName", "Last Name")}
      <h4>Date of Birth</h4>
      <div className="input-group mb-3">
        <input
          type="date"
          className={`form-control ${errors.dateOfBirth ? "error" : ""}`}
          placeholder="Date of Birth"
          aria-label="dateOfBirth"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
          max={maxDate.toISOString().split("T")[0]} // Set the maximum allowed date
        />
      </div>
      {formSubmitted && printError("dateOfBirth")}
      <h4>Mobile Number</h4>
      <div className="input-group mb-3">
        <PatternFormat
            className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
            type="tel"
            format="+1 (###) ###-####" 
            mask="_"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onValueChange={ (value) => { formData.phoneNumber = value.value } }
            onChange={handleInputChange}
            required
        />
      </div>
      {formSubmitted && printError("phoneNumber")}
      <h4>Income</h4>
      {FormInput("income_type", "Income Source")}
      <input
            type="number"
            className={`form-control ${errors["income_amount"] ? "error" : ""}`}
            placeholder="Income Amount"
            aria-label="income_amount"
            name="income_amount"
            value={formData["income_amount"]}
            onChange={handleInputChange}
          />
      <div>
        <button className="btn btn-outline-light-2" onClick={onBackClick}>
          Back
        </button>
        <span className="button-spacing"></span>
        <button className="btn-outline-primary" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PersonalInfo;
