import React, { useEffect, useState } from "react";
import ProfileInfo from "./register-components/ProfileInfo";
import PersonalInfo from "./register-components/PersonalInfo";
import FormDataProfile from "../module/FormDataProfile";
import FormDataPersonalInfo from "../module/FormDataPersonalInfo";
import { Address } from "../module/Address";
import AddressInfo from "./register-components/AddressInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import backendUrl from "../config";

const navItems = ["Set up Profile", "Add personal info", "Add address"];

const RegisterPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formDataProfile, setFormDataProfile] = useState<FormDataProfile>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    securityQuestion: "Select a security question",
    securityQuestionCustom: "",
    securityAnswer: ""
  });

  const [formDataPersonalInfo, setFormDataPersonalInfo] =
    useState<FormDataPersonalInfo>({
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phoneNumber: "",
      income_type: "",
      income_amount: 0
    });

  const [formDataAddress, setFormDataAddress] = useState<Address>({
    address_one: "",
    address_two: "",
    city: "",
    province: "",
    postal_code: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [registrationStatus, setRegistrationStatus] = useState(true);

  const handleNextClick = (formData: any) => {
    switch (currentStep) {
      case 1:
        setFormDataProfile(formData);
        break;
      case 2:
        setFormDataPersonalInfo(formData);
        break;
    }
    setCurrentStep(currentStep + 1);
  };

  const navigate = useNavigate();

  const handleFinish = (formData: any) => {
    const {
      securityQuestionCustom,
      confirmPassword,
      ...formDataProfileWithoutCustom
    } = formDataProfile;

    const formattedDateOfBirth = formDataPersonalInfo.dateOfBirth.replace(
      /-/g,
      "/"
    );
    setFormDataAddress(formData);
    const data = {
      ...formDataProfileWithoutCustom,
      ...formDataPersonalInfo,
      dateOfBirth: formattedDateOfBirth,
      phoneNumber: formDataPersonalInfo.phoneNumber,
      address: formData,
      securityQuestion:
        formDataProfile.securityQuestion === "Custom question"
          ? securityQuestionCustom
          : formDataProfile.securityQuestion,
    };

    axios
      .post<any>(`${backendUrl}/customers`, data)
      .then((res) => {
        console.log(res)
        if (res.status == 200 || res.status == 201 || true) {
          console.log("Registration succeeded");
          navigate("/login", { state: { registrationStatus } });
        }
      })
      .catch((err) => {
        if (err.response.status === 422) {
          let errorsContainer = [];
          if (err.response.data.messages.includes("Username has already been taken")) {
            errorsContainer.push("Username has already been taken");
          }
          if (err.response.data.messages.includes("Email has already been taken")) {
            errorsContainer.push("Email has already been taken");
          }
          if (err.response.data.messages.includes("Phonenumber has already been taken")) {
            errorsContainer.push("Phone Number has already been taken");
          }
          setErrors(errorsContainer);
        } else {
          setErrors([err.message])
        }
      });
  };

  const handleBackClick = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileInfo data={formDataProfile} onNextClick={handleNextClick} />
        );
      case 2:
        return (
          <PersonalInfo
            data={formDataPersonalInfo}
            onBackClick={handleBackClick}
            onNextClick={handleNextClick}
          />
        );
      case 3:
        return (
          <AddressInfo
            data={formDataAddress}
            onBackClick={handleBackClick}
            onNextClick={handleFinish}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-steps">
        <nav className="registration-nav">
          {navItems.map((itemName, index) => (
            <button
              key={index}
              className={currentStep === index + 1 ? "active" : ""}
              onClick={() => setCurrentStep(index + 1)}
            >
              <span>{itemName}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="step-content-container form-size">
        <div className="step-content">{renderStep()}</div>
      </div>
      {errors && errors.map((error, index) => (
        <p className="text-danger ms-4" key={index}>{error}</p>
      ))}
    </div>
  );
};

export default RegisterPage;
