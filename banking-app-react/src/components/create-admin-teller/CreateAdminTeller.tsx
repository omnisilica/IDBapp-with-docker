import { useEffect, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { emailPattern, passwordPattern, postalCodePattern } from '../Validations';
import { PatternFormat } from "react-number-format";
import axios from "axios";
import backendUrl from "../../config";
import { useNavigate } from "react-router-dom";
import apiClient from "../../services/api-client";


interface formData {
  username: string;
  password: string,
  confirmPassword: string,
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string,
  phoneNumber: string
}

interface Address {
    address_one: string,
	  address_two: string,
	  city: string,
	  province: string,
	  postal_code: string
}

interface roles {
  [key: number]: string;
}

// This is the format of the data returned from the
//   backend by the "roles" request.
interface roleRequestData {
  "roles": {
    "role": {
      "id": string;
      "name": string;
    }
    "permissions": [];
  }[]
}

const CreateAdminTeller = () => {


  const [formData, setFormData] = useState<formData>({
    firstName: "" ,
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    dateOfBirth: "",
    phoneNumber: ""
  });

  const [address, setAddress] = useState<Address>({
	  address_one: "",
	  address_two: "",
	  city: "",
	  province: "",
	  postal_code: ""
  })

  const [employeeRoles, setEmployeeRoles] = useState({});
  const [roleName, setRoleName] = useState("");
  const [errors, setErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [passwordType, setpasswordType] = useState('password');
  const [icon, setIcon] = useState("BsEyeSlash");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmIcon, setConfirmIcon] = useState("BsEyeSlash");
  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [registrationStatus, setRegistrationStatus] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        getRoleData(token);
      } catch (e) {
        console.log("FATAL ERROR: Please log out and try logging back in.");
      }
    }
  }, []);

  const getRoleData = (token: string | null): void => {
    const bearer: string = "Bearer " + token;
    apiClient
      .get<roleRequestData>("/roles", {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        const roleRefData = res.data
        const roleDataContainer: roles = {}
        for (let r of roleRefData.roles) {
          roleDataContainer[parseInt(r.role.id)] = r.role.name
        }
        setEmployeeRoles(roleDataContainer);
      })
      .catch((err) => {
        console.log(err);
      })
  }



  const navigate = useNavigate();


  const handleRoleChange = (event) => {
    setRoleName(event.target.value);
  }

  function printError(component) {
    if (errors[component] && formSubmitted) {
      return <p className="warning">{errors[component]}</p>;
    }
  }

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddressChange = (e: {target: { name: any; value: any }}) => {
    const { name, value } = e.target;
    setAddress((prevData) => ({ ...prevData, [name]: value }));
  }

  function InputGroup(name, label, description, elaboration = "") {
    return (
      <>
        <h4>{description}</h4>
        {elaboration !== "" && <p className="tip">{elaboration}</p>}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={label}
            aria-label={name}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
          />
        </div>
        {printError(name)}
      </>
    )
  };

  function AddressGroup(name, label, description, elaboration = "") {
    return (
      <>
        <h4>{description}</h4>
        {elaboration !== "" && <p className="tip">{elaboration}</p>}
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder={label}
            aria-label={name}
            name={name}
            value={address[name]}
            onChange={handleAddressChange}
          />
        </div>
        {printError(name)}
      </>
    )
  };

  const returnIcon = () => {
    return icon === "BsEyeSlash" ? <BsEyeSlash /> : <BsEye />;
  };

  const returnConfirmIcon = () => {
    return confirmIcon === "BsEyeSlash" ? <BsEyeSlash /> : <BsEye />;
  };

  const toggleVisible = () => {
    if (passwordType === 'password') {
      setIcon("BsEye");
      setpasswordType('text');
    } else {
      setIcon("BsEyeSlash");
      setpasswordType('password');
    }
  }

  const toggleConfirmVisible = () => {
    if (confirmPasswordType === "password") {
      setConfirmIcon("BsEye");
      setConfirmPasswordType("text");
    } else {
      setConfirmIcon("BsEyeSlash");
      setConfirmPasswordType("password");
    }
  };

  const containsOnlyNumbers = (str: string) => {
    return /^[0-9]+$/.test(str);
  };

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  maxDate.setMonth(maxDate.getMonth());
  maxDate.setDate(maxDate.getDate());

  const handleFinish = (event) => {
    const token = localStorage.getItem("token");
    const bearer: string = "Bearer " + token;
    event.preventDefault();
    const formattedDateOfBirth = formData.dateOfBirth.replace(
      /-/g,
      "/"
    );

    const data = {
      ...formData,
      dateOfBirth: formattedDateOfBirth,
      phoneNumber: formData.phoneNumber,
      address: address,
      roleName: roleName
    };

    console.log("Form data contains: ");
    console.log(data);

    axios
      .post<any>(`${backendUrl}/employees`, data, {
        headers: {
          Authorization: bearer,
        },
      })
      .then((res) => {
        console.log(res)
        if (res.status == 200 || res.status == 201 || true) {
          console.log("Registration succeeded");
          navigate("/admindashboard", { state: { registrationStatus } });
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let updatedErrors = { ...errors };

    // Email errors
    if (formData.email === "") updatedErrors.email = "Please provide your email address.";
    else if (!emailPattern.test(formData.email)) updatedErrors.email = "Please provide a valid email."
    else if (formData.email.length >= 200) updatedErrors.email = "Please provide a shorter email address."
    else delete updatedErrors.email;

    // Username errors
    if (formData.username.length < 8) updatedErrors.username = "Please provide a valid username that contains at least 8 characters.";
    else if (formData.username.length >= 200) updatedErrors.username = "Please provide a shorter username.";
    else delete updatedErrors.username;

    // Password errors
    if (!passwordPattern.test(formData.password)) updatedErrors.password = "Please provide a valid password.";
    else if (formData.password.length >= 200) updatedErrors.password = "Please provide a shorter password.";
    else delete updatedErrors.password;

    if (formData.password !== formData.confirmPassword) updatedErrors.passwordMatch = "Passwords do not match!";
    else delete updatedErrors.passwordMatch;

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

    // Address-related errors
    if (address.address_one === "") updatedErrors.address_one = "Please provide address.";
    else if (address.address_one.length >= 200) updatedErrors.address_one = "Please provide a shorter address.";
    else delete updatedErrors.address_one;

    if (address.address_two.length >= 200) updatedErrors.address_two = "Please provide a shorter address.";
    else delete updatedErrors.address_two;

    // City-related errors
    if (address.city === "") updatedErrors.city = "Please provide city.";
    else if (address.city.length >= 200) updatedErrors.city = "Please provide a shorter city.";
    else delete updatedErrors.city;

    // Province-related errors
    if (address.province === "") updatedErrors.province = "Please provide province.";
    else delete updatedErrors.province;

    // Postal-code related errors
    if (address.postal_code === "") updatedErrors.postal_code = "Please provide postal code.";
    else if (!address.postal_code.match(postalCodePattern)) updatedErrors.postal_code = "Postal code must match format A1A 1A1 or A1A1A1";
    else delete updatedErrors.postal_code;

    if (address.province === "") updatedErrors.province = "Please select province.";
    else delete updatedErrors.province;

    // Update the errors
    setErrors(updatedErrors);
  }, [formData]);

  function handleSubmit(event) {
    event.preventDefault();
    console.log(employeeRoles);
  }



  return (
    <form onSubmit={handleFinish}>
      <div className="step-content">
        <h4>Choose Employee Role</h4>
        <select value={roleName} onChange={handleRoleChange}>
          {Object.values(employeeRoles).map((role , index) => (
            <option key={index} value={role}>{role}</option>
          ))}
        </select>
        <h4>Username</h4>
        {InputGroup("username", "Username")}
        {InputGroup("email", "Email address", "Enter the employee's email address",
          "Please make sure the email addess you enter is correct. We'll send a confirmation email to this address.")}
        <h4>Employee Name</h4>
        {InputGroup("firstName", "First Name")}
        {InputGroup("lastName", "Last Name")}
        <h4>Employee Date of Birth</h4>
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
        <h4>Employee Phone Number</h4>
        <div className="input-group mb-3">
          <PatternFormat
            className={`form-control ${errors.phoneNumber ? 'error' : ''}`}
            type="tel"
            format="+1 (###) ###-####"
            mask="_"
            placeholder="Mobile Number"
            value={formData.phoneNumber}
            onValueChange={(value) => { formData.phoneNumber = value.value }}
            onChange={handleInputChange}
            required
          />
        </div>
        {AddressGroup("address_one", "Address One", "Employee Address")}
        {AddressGroup("address_two", "Address Two")}
        {AddressGroup("city", "City")}
        <div className="col-4" key="address-province-container">
          <label className="form-label" htmlFor="province">Province <b>*</b></label>
          <select
            id="province"
            key="province"
            className="form-control"
            aria-label="province"
            name="province"
            value={address["province"]}
            onChange={handleAddressChange}
            >
              <option value="" disabled hidden>Please select province</option>
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
          {errors.province && (
            <p className="warning">{errors.province}</p>
          )}
        </div>
        {AddressGroup("postal_code", "Postal Code")}
        {errors.postal_code && (
            <p className="warning">{errors.postal_code}</p>
          )}
        <h4>Create Employee Password</h4>
        <div className="input-group mb-3">
          <input
            type={passwordType}
            className={`form-control ${passwordMismatch ? "mismatch" : ""}`}
            placeholder="Password"
            aria-label="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <span className="visibleIcon" onClick={toggleVisible}>
            {returnIcon()}
          </span>
        </div>
        <div className="input-group mb-3">
          <input
            type={confirmPasswordType}
            className={`form-control ${passwordMismatch ? "mismatch" : ""}`}
            placeholder="Confirm password"
            aria-label="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <span className="visibleIcon" onClick={toggleConfirmVisible}>
            {returnConfirmIcon()}
          </span>
        </div>
        {errors.passwordMatch && <p className="warning">{errors.passwordMatch}</p>}

        <p className="tip">
          Your password should be at least 8 characters long and include a mix of
          uppercase and lowercase letters, numbers, and symbols.
        </p>
        <button className="btn-outline-secondary" type="submit">Submit</button>
      </div>
    </form>

  )
};

export default CreateAdminTeller;
