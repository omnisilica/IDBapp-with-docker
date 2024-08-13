import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserProfile, digestUserProfile } from "../../module/UserProfile";
import { FieldValues, useForm, Controller } from "react-hook-form";
import apiClient from "../../services/api-client";
import { PatternFormat } from "react-number-format";
import { get } from "http";
import { phoneNumberToString } from "../../Utility";
import {
  phonePattern,
  emailPattern,
  provincePattern,
  postalCodePattern,
} from "../Validations";
import "./UpdateUserDetail.scss";

interface data {
  status: number;
  message: string;
  customer: UserProfile;
}

const UpdateUserDetail = () => {
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>();
  const [userUpdatedStatus, setUserUpdatedStatus] = useState(true);

  const {
    register,
    getValues,
    setValue,
    formState: { errors },
    handleSubmit,
    control,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: JSON.parse(localStorage.getItem("loggedInUser")),
  });

  let navigate = useNavigate();

  const onSubmit = (updatedUserProfile: FieldValues) => {
    console.log(updatedUserProfile);
    apiClient
      .patch<data>("/customers/customer/updateCustomer", updatedUserProfile)
      .then((res) => {
        const response: data = res.data;

        if (response.customer) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(digestUserProfile(response))
          );
          navigate("/userDetail", { state: { userUpdatedStatus } });
        }
      })
      .catch((err) => {
        console.log("ERROR: " + err.message);
      });
  };

  function FakeField(props) {
    let fieldKeys = props.field.split(".");

    return (
      <div className={props.className} key={props.field + "-container"}>
        <label className="form-label" htmlFor={props.field}>
          {props.label} {props.required && <b>*</b>}
        </label>
        <span
          className="uneditable-input"
          style={{ backgroundColor: "var(--bs-secondary-bg)" }}
        >
          {getValues(props.field)}
        </span>
      </div>
    );
  }

  function DetailField(props) {
    let fieldKeys = props.field.split(".");
    let error =
      fieldKeys[0] === "address" && errors.address
        ? errors.address[fieldKeys[1]]
        : errors[props.field];

    return (
      <div className={props.className} key={props.field + "-container"}>
        <label className="form-label" htmlFor={props.field}>
          {props.label} {props.required && <b>*</b>}
        </label>
        <input
          type={props.type}
          inputMode={props.type === "tel" ? "tel" : "text"}
          id={props.field}
          key={props.field}
          {...register(props.field, {
            required: props.required,
            pattern: props.pattern ? props.pattern : null,
            maxLength: 199,
          })}
          disabled={props.disabled != null}
        />
        {error?.type === "required" && (
          <p role="alert">{props.label} is required</p>
        )}
        {error?.type === "pattern" && (
          <p role="alert">{props.patternMessage}</p>
        )}
        {error?.type === "maxLength" && (
          <p role="alert">
            {props.label} should be less than 200 characters long
          </p>
        )}
      </div>
    );
  }

  function PhoneNumberField(props) {
    return (
      <div className={props.className}>
        <label className="form-label" htmlFor="phoneNumber">
          Phone Number <b>*</b>
        </label>
        <Controller
          render={() => (
            <PatternFormat
              className={`form-control`}
              type="tel"
              format="+1 (###) ###-####"
              mask="_"
              placeholder="Mobile Number"
              value={getValues("phoneNumber")}
              onValueChange={(value) => setValue("phoneNumber", value.value)}
              required
            />
          )}
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone number is required",
            validate: {
              inputTelRequired: (value: string) => {
                return value.length != 10
                  ? "Phone number length is incorrect"
                  : undefined;
              },
            },
          }}
        />
        {errors["phoneNumber"] && (
          <p role="alert">{errors["phoneNumber"]?.message?.toString()}</p>
        )}
      </div>
    );
  }

  return (
    <div className="box-container" key="user-details-container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="row g-3"
        key="user-details-form"
      >
        {FakeField({
          className: "col-12",
          type: "text",
          field: "username",
          label: "Username",
        })}
        {FakeField({
          className: "col-md-6",
          type: "text",
          field: "firstName",
          label: "First Name",
        })}
        {FakeField({
          className: "col-md-6",
          type: "text",
          field: "lastName",
          label: "Last Name",
        })}
        {DetailField({
          className: "col-12",
          type: "email",
          field: "email",
          label: "Email",
          required: true,
          pattern: emailPattern,
          patternMessage: "Email must match format name@domain.tld",
        })}
        {PhoneNumberField({ className: "col-12" })}
        {DetailField({
          className: "col-12",
          type: "text",
          field: "address.address_one",
          label: "Address",
          required: true,
        })}
        {DetailField({
          className: "col-12",
          type: "text",
          field: "address.address_two",
          label: "Address Line 2",
        })}
        {DetailField({
          className: "col-md-6",
          type: "text",
          field: "address.city",
          label: "City",
          required: true,
        })}
        <div className="col-md-4" key="address-province-container">
          <label className="form-label" htmlFor="address.province">
            Province <b>*</b>
          </label>
          <select
            id="address.province"
            key="address.province"
            {...register("address.province", { required: true })}
          >
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
        </div>
        {DetailField({
          className: "col-md-2",
          type: "text",
          field: "address.postal_code",
          label: "Postal Code",
          required: true,
          pattern: postalCodePattern,
          patternMessage: "Postal code must be in format A1A 1A1 or A1A1A1",
        })}
        {DetailField({
          className: "col-md-6",
          type: "text",
          field: "income_type",
          label: "Income Source",
          required: true,
        })}
        {DetailField({
          className: "col-md-6",
          type: "number",
          field: "income_amount",
          label: "Income Amount",
          required: true,
        })}
        <div>
          {/* TODO: add update functionality request call here */}
          <button
            type="submit"
            className="btn-outline-secondary"
            //onClick={handleSubmitEditUserDetail}
          >
            {" "}
            Update{" "}
          </button>
          <Link to="/profile" className="btn btn-outline-danger">
            {" "}
            Cancel{" "}
          </Link>
        </div>
      </form>
    </div>
  );
};

export default UpdateUserDetail;