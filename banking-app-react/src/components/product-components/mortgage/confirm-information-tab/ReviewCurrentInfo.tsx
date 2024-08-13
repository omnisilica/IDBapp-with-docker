import { useForm, Controller } from "react-hook-form";
import { PatternFormat } from 'react-number-format';
import { phoneNumberToString } from "../../../../Utility";
import { emailPattern, postalCodePattern } from '../../../Validations';

const ReviewCurrentInfo = (props: any) => {
    const {
        register,
        getValues,
        setValue,
        formState: { errors },
        handleSubmit,
        control
    } = useForm({
        defaultValues: JSON.parse(localStorage.getItem("loggedInUser")),
    });

    function DetailField(fieldProps) {
        let fieldKeys = fieldProps.field.split(".");
        let error = (fieldKeys[0] === "address" && errors.address) ? errors.address[fieldKeys[1]] : errors[fieldProps.field];

        return (
            <div className={fieldProps.className} key={fieldProps.field + "-container"}>
                <label className="form-label" htmlFor={fieldProps.field}>{fieldProps.label} {fieldProps.required && <b>*</b>}</label>
                <input
                    type={fieldProps.type}
                    inputMode={fieldProps.type === "tel" ? "tel" : "text"}
                    id={fieldProps.field}
                    key={fieldProps.field}
                    {...register(fieldProps.field, {
                        required: fieldProps.required,
                        pattern: fieldProps.pattern ? fieldProps.pattern : null,
                        maxLength: fieldProps.length ? fieldProps.length : null,
                        minLength: fieldProps.length ? fieldProps.length : null,
                    })}
                    disabled={fieldProps.disabled != null}
                />
                {error?.type === "required" && <p role="alert">{fieldProps.label} is required</p>}
                {error?.type === "pattern" && <p role="alert">{fieldProps.patternMessage}</p>}
                {(error?.type === "maxLength" || error?.type === "minLength") && <p role="alert">{fieldProps.label} should be {fieldProps.length} digits long</p>}
            </div>
        )
    };

    function PhoneNumberField(fieldProps) {
        return (
            <div className={fieldProps.className}>
                <label className="form-label" htmlFor="phoneNumber">Phone Number <b>*</b></label>
                <Controller render={() => (
                    <PatternFormat
                        className={`form-control`}
                        type="tel"
                        format="+1 (###) ###-####"
                        mask="_"
                        placeholder="Mobile Number"
                        value={phoneNumberToString(getValues("phoneNumber").replace('+1', ''))}
                        onValueChange={value => setValue("phoneNumber", "+1" + value.value)}
                        required
                    />
                )}
                    name="phoneNumber"
                    control={control}
                    rules={{
                        required: "Phone number is required",
                        validate: {
                            inputTelRequired: (value: string) => {
                                return value.length != 12 ? "Phone number is required" : undefined;
                            },
                        },
                    }}
                />
                {errors['phoneNumber'] && <p role="alert">{errors['phoneNumber']?.message?.toString()}</p>}
            </div>
        )
    };

    function PersonalInfoForm() {
        return (
            <div className="box-container" key="user-details-container">
                <form onSubmit={handleSubmit(e => { props.handleInfoSubmit(e) })} className="row g-3" key="user-details-form">
                    {DetailField({ className: "col-md-6", type: "text", field: "firstName", label: "First Name", required: true })}
                    {DetailField({ className: "col-md-6", type: "text", field: "lastName", label: "Last Name", required: true })}
                    {DetailField({
                        className: "col-12", type: "email", field: "email", label: "Email", required: true,
                        pattern: emailPattern, patternMessage: "Email must match format name@domain.tld"
                    })}

                    {PhoneNumberField({ className: "col-12" })}

                    {DetailField({ className: "col-12", type: "text", field: "address.address_one", label: "Address", required: true })}
                    {DetailField({ className: "col-12", type: "text", field: "address.address_two", label: "Address Line 2", })}
                    {DetailField({ className: "col-md-6", type: "text", field: "address.city", label: "City", required: true })}
                    <div className="col-md-4" key="address-province-container">
                        <label className="form-label" htmlFor="address.province">Province <b>*</b></label>
                        <select
                            id="address.province"
                            key="address.province"
                            {...register("address.province", { required: true })}>
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
                        className: "col-md-2", type: "text", field: "address.postal_code", label: "Postal Code", required: true,
                        pattern: postalCodePattern, patternMessage: "Postal code must be in format A1A 1A1"
                    })}
                    <div>
                        <button ref={props.submitRef} type="submit" style={{ display: 'none' }}></button>
                    </div>
                </form>
            </div>
        )
    }

    return <>
        <h5 className="font-weight-bold">Is your info current?</h5>
        <h6 className="confirm-info-subtitle">Please take a moment to ensure that the information we have on file is up-to-date.</h6>

        <br />

        <p className="font-weight-bold">Personal Information</p>
        {PersonalInfoForm()}
    </>
};

export default ReviewCurrentInfo;