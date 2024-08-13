import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import backendUrl from "../../config";

const ResetPassword = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const id = location.state?.userId;

  const userLoggedIn = location.state?.userLoggedIn
    ? location.state?.userLoggedIn
    : false;

  console.log("userLoggedIn", userLoggedIn);
  const [duplicatePasswordError, setDuplicatePasswordError] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordChangedStatus, setPasswordChangedStatus] = useState(true);

  const successMessage = "Successfully updated the password";
  const url = `${backendUrl}/customers/customer/updatePassword`;

  const [passwordMismatch, setPasswordMismatch] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setPassword(val);
    if (!passwordPattern.test(val)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };
  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setConfirmPassword(val);
    if (!passwordPattern.test(val) || password != val) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
  };
  const [show, setShow] = useState(false);

  useEffect(() => {
    setPassword("");
    setConfirmPassword("");
  }, []);

  const handleSubmit = async () => {
    if (!passwordPattern.test(password)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
    if (!passwordPattern.test(confirmPassword) || password != confirmPassword) {
      setPasswordMismatch(true);
    } else {
      setPasswordMismatch(false);
    }
    if (
      !passwordError &&
      !passwordMismatch &&
      password.length > 7 &&
      confirmPassword.length > 7
    ) {
      await axios
        .patch<any>(url, {
          id,
          password,
        })
        .then((res: any) => {
          if (
            res.data.message ==
            "The new password you entered is the same as your old password. Enter a different password."
          ) {
            setDuplicatePasswordError(
              "The new password you entered is the same as your old password. Enter a different password."
            );
            setTimeout(() => {
              setDuplicatePasswordError("");
            }, 5000);
          } else if (res.data.message == successMessage) {
            // nav to login page
            navigate(userLoggedIn ? "/userdetail" : "/login", {
              state: { passwordChangedStatus },
            });
          }
        })
        .catch((err: any) => {
          setError((err as AxiosError).message);
        });
    }
  };

  if (id || userLoggedIn) {
    return (
      <>
        <div>
          {error != "" && show && (
            <div className="custom-div-alert">
              <div className="alert alert-danger" role="alert">
                <span className="custom-div-alert-message">
                  <strong>{error}</strong>
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
        </div>
        <div className="box-container">
          <h3>Reset Password</h3>
          <form className="align-middle">
            <div className="form-group">
              <label htmlFor="password">Enter New Password</label>
              <div className="passwordRow">
                <input
                  type={isPasswordVisible ? "text" : "password"}
                  id="password"
                  placeholder="New Password"
                  onChange={onPasswordChange}
                  value={password}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsPasswordVisible(!isPasswordVisible);
                  }}>
                  {isPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              <small id="TextHelp" className="form-text text-muted">
                Your password should be at least 8 characters long and include a
                mix of uppercase and lowercase letters, numbers, and symbols.
              </small>
            </div>
            {passwordError && (
              <p className="warning">Please provide a valid password. </p>
            )}
            <div className="form-group">
              <label htmlFor="confirmPassword">Re-Enter New Password</label>
              <div className="passwordRow">
                <input
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={onConfirmPasswordChange}
                  value={confirmPassword}
                />
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
                  }}>
                  {isConfirmPasswordVisible ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
              {passwordMismatch && (
                <p className="warning">Passwords do not match!</p>
              )}
            </div>
            <div>
              <Button
                onClick={handleSubmit}
                className="btn btn-outline-primary mx-2 shadow-sm"
              >
                Continue
              </Button>
              {duplicatePasswordError && (
                <p className="warning mt-3">{duplicatePasswordError}</p>
              )}
            </div>
          </form>
        </div>
      </>
    );
  } else {
    useEffect(() => {
      navigate("/login");
    }, []);
  }
};

export default ResetPassword;
