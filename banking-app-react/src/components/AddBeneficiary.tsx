import React, { FormEvent, useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import apiClient from "../services/api-client";
import { useNavigate, useLocation, Link } from "react-router-dom";
import "./AddBeneficiary.css"
import { AxiosError } from "axios";
import { NavProgressBar, NavTabLink } from "./navigation-tabs/NavTab";
interface FormData {
  name: string;
  relationship: string;
  bank: string;
  accountNumber: number;
  routingNumber: number;
  nickname: string;
}

interface data{
  name: string;
}

const AddBeneficiary = () => {
  const [inCorrectBeneficiaryAccount, setIncorrectBeneficiaryAccount] = useState(false);
  const [show, setShow] = useState(false);
  const [invalidInput, setInvalidInput] = useState(false);
  const [beneficiaryName, setBeneficiaryName] = useState("");
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleClick
  //   }, 2000);
  // }
  // ), [invalidInput];
  const handleClick = (() => {
    setInvalidInput(false);
  });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>();
  console.log(register("name"));
  console.log(errors);
  const onSubmit = (data: FieldValues) => {
    console.log(data);
    const id = JSON.parse(localStorage.getItem("loggedInUser") ?? "").id;
     apiClient
        .post<data>(`/beneficiaries/customer/${id}`, {
          customer_id: id,
          name: data.name,
          relationship: data.relationship,
          bank: data.bank,
          accountNumber: data.accountNumber,
          routingNumber: data.routingNumber,
          nickname: data.nickname,
        })
        .then((res) => {
          console.log(res.data);
          setBeneficiaryName(data.name);
          setShow(true);
          setTimeout(() => {
            navigate("/transferMoney");
          }, 3000);
        })
        .catch((err) => {
          console.log((err as AxiosError).message);
          setInvalidInput(true);
          // setTimeout(() => {
          //   // window.location.reload();
          // }, 5000);
          navigate("/error");
        });

  }

  return (
    <div className="outerDiv">
       <div className="beneficiariesNavWrapUp">
         <NavProgressBar>
           <NavTabLink  to="/addBeneficiary">Add New Beneficiaries</NavTabLink>
           <NavTabLink to="/currentBeneficiary">Current Beneficiaries</NavTabLink>
           {/* <NavTabLink  to="/removeBeneficiary">Remove Beneficiaries</NavTabLink> */}
           {/* <NavTabLink  to="/updateBeneficiary">Update </NavTabLink> */}
         </NavProgressBar>
      </div>

      {/* <h1>Please enter the Beneficiary details.</h1> */}
      <form className= "formDiv" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="name" className="form-label addBeneficiaryLabel">
            Name
          </label>
          <input
            {...register("name", { required: true, minLength: 2 })}
            type="text"
            // pattern="/^[A-Za-z]+$/"
            className="form-control addBeneficiaryInput"
            id="name"
          />
          <span className="warning">
          {errors.name?.type === "required" && (
            <span className="warning">The name field is required.</span>
            )}
            {errors.name?.type === "minLength" && (
            <span className="warning">
              The name field must be atleast 2 characters.
            </span>
            )}
          </span>
        </div>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="relationship" className="form-label addBeneficiaryLabel">
            Relationship
          </label>
          <input
            {...register("relationship", { required: true, minLength: 1 })}
            type="text"
            className="form-control addBeneficiaryInput"
            id="relationship"
          />
          <span className="warning">
          {errors.relationship?.type === "required" && (
            <span className="warning">The relationship field is required.</span>
          )}
          {errors.relationship?.type === "minLength" && (
            <span className="warning">
              The relationship field must be atleast 1 characters.
            </span>
            )}
            </span>
        </div>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="bank" className="form-label addBeneficiaryLabel">
            Bank Name
          </label>
          <input
            {...register("bank", { required: true, minLength: 1 })}
            type="text"
            className="form-control addBeneficiaryInput"
            id="bank"
          />
          <span className="warning">
          {errors.bank?.type === "required" && (
            <span className="warning">The bank name field is required.</span>
          )}
          {errors.bank?.type === "minLength" && (
            <span className="warning">
              The bank name field must be atleast 1 characters.
            </span>
            )}
            </span>
        </div>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="accountNumber" className="form-label addBeneficiaryLabel">
            Account Number
          </label>
          <input
            {...register("accountNumber", {required: true, minLength: 16, maxLength: 16})}
            type="number"
            className="form-control addBeneficiaryInput"
            id="accountNumber"
          />
          <span className="warning">
          {errors.accountNumber?.type === "required" && (
            <span className="warning">The account number field is required.</span>
          )}
          {errors.accountNumber?.type === "minLength" && (
            <span className="warning">
              The account number must be 16 digits long.
            </span>
          )}
          {errors.accountNumber?.type === "maxLength" && (
            <span className="warning">
              The account number must not exceed 16 digits.
            </span>
          )}
          </span>
        </div>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="routingNumber" className="form-label addBeneficiaryLabel">
          Routing Number
          </label>
          <input
            {...register("routingNumber", { required: true, minLength: 4, maxLength: 4 })}
            type="number"
            className="form-control addBeneficiaryInput"
            id="routingNumber"
          />
          <span className="warning">
         {errors.routingNumber?.type === "required" && (
            <span className="warning">The routing number field is required.</span>
          )}
          {errors.routingNumber?.type === "minLength" && (
            <span className="warning">
              The routing number must be 4 digits long.
            </span>
          )}
          {errors.routingNumber?.type === "maxLength" && (
            <span className="warning">
              The routing number must not exceed 4 digits.
            </span>
          )}
          </span>
        </div>
        <div className="form-group mb-3 addBeneficiary">
          <label htmlFor="nickname" className="form-label addBeneficiaryLabel">
            Nick Name
          </label>
          <input
            {...register("nickname", { required: true, minLength: 1 })}
            type="text"
            className="form-control addBeneficiaryInput"
            id="nickname"
          />
          <span className="warning">
          {errors.nickname?.type === "required" && (
            <span className="warning">The nickname field is required.</span>
          )}
          {errors.nickname?.type === "minLength" && (
            <span className="warning">
              The nick name must be atleast 1 characters.
            </span>
            )}
            </span>
        </div>

        <button type="submit" disabled={invalidInput} className="btn btn-outline-secondary">
          Submit
        </button>
      </form>
      {show && (
          <div className="custom-div-alert">
            <div
              className="alert alert-success"
              role="alert"
              style={{ marginTop: "35rem" }}
            >
              <span className="custom-div-alert-message">
              <strong>Beneficiary "{beneficiaryName}" has been successfully added.</strong>
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
      )}
      { invalidInput && (
          <div className="custom-div-alert">
            <div
              className="alert alert-danger"
              role="alert"
              style={{ marginTop: "35rem" }}
            >
              <span className="custom-div-alert-message">
                <strong>Invalid input.</strong>
              </span>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
              aria-label="Close"
              onClick={handleClick}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
        )}
      {/* {show && <p className="warning">Beneficiary added.</p>} */}
    </div>
  );
};
export default AddBeneficiary;
