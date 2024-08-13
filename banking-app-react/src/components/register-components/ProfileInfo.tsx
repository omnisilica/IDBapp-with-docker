import React, { useEffect, useState } from "react";
import FormDataProfile from "../../module/FormDataProfile";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { emailPattern, passwordPattern } from "../Validations";

interface ProfileSetUpProps {
  onNextClick: (formData: FormDataProfile) => void;
  data: FormDataProfile;
}

const ProfileInfo: React.FC<ProfileSetUpProps> = ({ onNextClick, data }) => {
  const [formData, setFormData] = useState<FormDataProfile>(data);

  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [badQuestion, setBadQuestion] = useState<boolean>(false);
  const [badAnswer, setBadAnswer] = useState<boolean>(false);

  const [errors, setErrors] = useState({});

  const securityQuestions = [
    "Select a security question",
    "What is your pet's name?",
    "What is your mother's maiden name?",
    "What city were you born in?",
    "What is your favorite book?",
    "What was your first job?",
    "What is your favorite movie?",
    "Custom question",
  ];

  const [passwordType, setpasswordType] = useState("password");
  const [icon, setIcon] = useState("BsEyeSlash");
  const toggleVisible = () => {
    if (passwordType === "password") {
      setIcon("BsEye");
      setpasswordType("text");
    } else {
      setIcon("BsEyeSlash");
      setpasswordType("password");
    }
  };

  const returnIcon = () => {
    return icon === "BsEyeSlash" ? <BsEyeSlash /> : <BsEye />;
  };

  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [confirmIcon, setConfirmIcon] = useState("BsEyeSlash");

  const toggleConfirmVisible = () => {
    if (confirmPasswordType === "password") {
      setConfirmIcon("BsEye");
      setConfirmPasswordType("text");
    } else {
      setConfirmIcon("BsEyeSlash");
      setConfirmPasswordType("password");
    }
  };

  const returnConfirmIcon = () => {
    return confirmIcon === "BsEyeSlash" ? <BsEyeSlash /> : <BsEye />;
  };

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  // HANDLE FORM ERRORS HERE
  useEffect(() => {
    let updatedErrors = { ...errors };

    // Email errors
    if (formData.email === "")
      updatedErrors.email = "Please provide your email address.";
    else if (!emailPattern.test(formData.email))
      updatedErrors.email = "Please provide a valid email.";
    else if (formData.email.length >= 200)
      updatedErrors.email = "Please provide a shorter email address.";
    else delete updatedErrors.email;

    // Username errors
    let validUsernameLength = true;
    if (formData.username.length < 8) {
      updatedErrors.username =
        "Please provide a valid username that contains at least 8 characters.";
      validUsernameLength = false;
    }
    else if (formData.username.length >= 200) {
      updatedErrors.username = "Please provide a shorter username.";
      validUsernameLength = false;
    }
    else {
      validUsernameLength = true;
    }

    let validUsernameEmailCombo = true;
    if (formData.email.toLowerCase().includes(formData.username.toLowerCase())) {
      updatedErrors.username =
        "username should be distinct from the email address";
      validUsernameEmailCombo = false;
    } else {
      validUsernameEmailCombo = true;
    }

    if (validUsernameLength && validUsernameEmailCombo) {
      delete updatedErrors.username
    }

    // Password errors
    if (!passwordPattern.test(formData.password))
      updatedErrors.password = "Please provide a valid password.";
    else if (formData.password.length >= 200)
      updatedErrors.password = "Please provide a shorter password.";
    else delete updatedErrors.password;

    if (formData.password !== formData.confirmPassword)
      updatedErrors.passwordMatch = "Passwords do not match!";
    else delete updatedErrors.passwordMatch;

    // Security Question errors
    if (formData.securityQuestion === "Select a security question")
      updatedErrors.securityQuestion =
        "Please select a valid security question.";
    else if (
      formData.securityQuestion === "Custom question" &&
      formData.securityQuestionCustom === ""
    )
      updatedErrors.securityQuestion =
        "Please provide a custom security question.";
    else if (formData.securityQuestionCustom.length >= 200)
      updatedErrors.securityQuestion =
        "Please provide a shorter security question.";
    else delete updatedErrors.securityQuestion;

    // Security Answer errors
    if (formData.securityAnswer === "")
      updatedErrors.securityAnswer = "Please provide a security answer.";
    else if (formData.securityAnswer.length >= 200)
      updatedErrors.securityAnswer =
        "Please provide a shorter security answer.";
    else delete updatedErrors.securityAnswer;

    // Update the errors
    setErrors(updatedErrors);
  }, [formData]);

  const handleNextClick = () => {
    setFormSubmitted(true);
    if (Object.keys(errors).length === 0) onNextClick(formData);
  };

  function printError(component) {
    if (errors[component] && formSubmitted) {
      return <p className="warning">{errors[component]}</p>;
    }
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
    );
  }

  return (
    <div className="textbox-container">
      <h1>Let's start with profile info</h1>
      {InputGroup(
        "email",
        "Email address",
        "Enter your email address",
        "Please make sure the email addess you enter is correct. We'll send a confirmation email to this addess."
      )}
      {InputGroup("username", "Username", "Create your banking username")}
      <h4>Create your password</h4>
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
      {errors.password && formSubmitted && (
        <p className="warning">{errors.password}</p>
      )}

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
      {errors.passwordMatch && (
        <p className="warning">{errors.passwordMatch}</p>
      )}

      <p className="tip">
        Your password should be at least 8 characters long and include a mix of
        uppercase and lowercase letters, numbers, and symbols.
      </p>
      <h4>Select a security question</h4>
      <div className="input-group mb-3">
        <select
          className="form-control"
          name="securityQuestion"
          aria-label="securityQuestion"
          value={formData.securityQuestion}
          onChange={handleInputChange}
        >
          {securityQuestions.map((question, index) => (
            <option key={index} value={question}>
              {question}
            </option>
          ))}
        </select>
      </div>
      {formData.securityQuestion === "Custom question" && (
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Custom security question"
            aria-label="securityQuestionCustom"
            name="securityQuestionCustom"
            value={formData.securityQuestionCustom || ""}
            onChange={handleInputChange}
          />
        </div>
      )}
      {errors.securityQuestion && formSubmitted && (
        <p className="warning">{errors.securityQuestion}</p>
      )}
      {InputGroup(
        "securityAnswer",
        "Security Answer",
        "Provide an answer to the security question"
      )}
      <div>
        <button className="btn-outline-primary" onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
