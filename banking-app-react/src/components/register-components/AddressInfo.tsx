import React, { useState, useEffect } from "react";
import { Address } from "../../module/Address";
import { postalCodePattern } from '../Validations';

interface AddressInfoProps {
  onBackClick: () => void;
  onNextClick: (formData: Address) => void;
  data: Address;
}

const AddressInfo: React.FC<AddressInfoProps> = ({
  onBackClick,
  onNextClick,
  data,
}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState<Address>({ ...data }); // Initialize with prop data
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleNextClick = () => {
    setFormSubmitted(true);
    if ( Object.keys(errors).length === 0 ) {
      onNextClick(formData);
    }
  };

  useEffect(() => {
    // ERROR CHECKING
    let updatedErrors = { ...errors };

    // Address-related errors
    if (formData.address_one === "") updatedErrors.address_one = "Please provide address.";
    else if (formData.address_one.length >= 200) updatedErrors.address_one = "Please provide a shorter address.";
    else delete updatedErrors.address_one;

    if (formData.address_two.length >= 200) updatedErrors.address_two = "Please provide a shorter address.";
    else delete updatedErrors.address_two;

    // City-related errors
    if (formData.city === "") updatedErrors.city = "Please provide city.";
    else if (formData.city.length >= 200) updatedErrors.city = "Please provide a shorter city.";
    else delete updatedErrors.city;

    // Province-related errors
    if (formData.province === "") updatedErrors.province = "Please provide province.";
    else delete updatedErrors.province;

    // Postal-code related errors
    if (formData.postal_code === "") updatedErrors.postal_code = "Please provide postal code.";
    else if (!formData.postal_code.match(postalCodePattern)) updatedErrors.postal_code = "Postal code must match format A1A 1A1 or A1A1A1";
    else delete updatedErrors.postal_code;

    if (formData.province === "") updatedErrors.province = "Please select province.";
    else delete updatedErrors.province;

    // Update the errors
    setErrors(updatedErrors);
  }, [formData]);

  function AddressField(props) {
    return (
      <div className={props.className}>
        <label className="form-label" htmlFor={props.field}>
          {props.label}{props.required? <b> *</b> : null}
        </label>
        <input
          type="text"
          className="form-control"
          placeholder={props.label}
          aria-label={props.field}
          name={props.field}
          value={formData[props.field]}
          onChange={handleInputChange}
        />
        {errors[props.field] && formSubmitted && (
          <p className="warning">{errors[props.field]}</p>
        )}
      </div>
    );
  }

  return (
    <div className="textbox-container">
      <h1>Let's add your address</h1>
      <h4>Address Information</h4>
      <div className="row g-3">
        {AddressField({
          field: "address_one",
          label: "Address",
          className: "col-12",
          required: true,
        })}
        {AddressField({
          field: "address_two",
          label: "Address Line 2",
          className: "col-12",
        })}
        {AddressField({ field: "city", label: "City", className: "col-6", required: true })}
        <div className="col-4" key="address-province-container">
          <label className="form-label" htmlFor="province">Province <b>*</b></label>
          <select 
            id="province"
            key="province"
            className="form-control"
            aria-label="province"
            name="province"
            value={formData["province"]}
            onChange={handleInputChange}
            >
              <option value="" selected disabled hidden>Please select province</option>
              <option value="ON">Ontario</option>
              <option value="QC">Quebec</option>
              <option value="NS">Nova Scotia</option>
              <option value="NB">New Brunswick</option>
              <option value="MB">Manitoba</option>
              <option value="BC">British Columbia</option>
              <option value="PE">Prince Edward Island</option>
              <option value="SK">Saskatchewan</option>
              <option value="AB">Alberta</option>
              <option value="NL">Newfoundland and Labrador</option>
          </select>
          {errors.province && formSubmitted && (
            <p className="warning">{errors.province}</p>
          )}
        </div>
        {AddressField({
          field: "postal_code",
          label: "Postal Code",
          className: "col-2",
          required: true,
        })}
      </div>
      <br />
      <div>
        <button className="btn btn-outline-light-2" onClick={onBackClick}>
          Back
        </button>
        <span className="button-spacing"></span>
        <button className="btn btn-outline-primary" onClick={handleNextClick}>
          Finish          
        </button>
      </div>
    </div>
  );
};

export default AddressInfo;
