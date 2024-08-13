import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useLocation, Link, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import apiClient from "../services/api-client";
import { BsEyeSlash, BsEye } from "react-icons/bs";
import { UserProfile, digestUserProfile } from "../module/UserProfile";
import { CloseButton } from "./CloseButton";

interface data {
  token: string;
  customer: UserProfile;
}

const Login = (props) => {
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const location = useLocation();
  const registrationStatus = location.state?.registrationStatus;
  const passwordChangedStatus = location.state?.passwordChangedStatus;
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/logged-in");
    }

    const timeId = setTimeout(() => {
      setShow(false);
    }, 5000); // After 5 seconds set the show value to false
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);

  console.log(registrationStatus);

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
    if (icon === "BsEyeSlash") {
      return <BsEyeSlash />;
    }
    return <BsEye />;
  };

  const onSubmit = (data: FieldValues) => {
    apiClient
      .post<data>("/login", data)
      .then((res) => {
        const response: data = res.data;

        if (response.token && response.customer) {
          const digestedUserProfile = digestUserProfile(response);
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify(digestedUserProfile)
          );
          props.setUser({
            id: digestedUserProfile.id,
            firstName: digestedUserProfile.firstName,
            lastName: digestedUserProfile.lastName,
            username: digestedUserProfile.username,
          });
          localStorage.setItem("token", response.token);
          if (localStorage.getItem("unLoggedInUser") === "yes") {
            navigate("/test/navtabbar1");
          } else {
            navigate("/profile");
          }
        }
      })
      .catch((err) => {
        if (err.response.request.status == 401) {
          setError("Incorrect username or password");
        } else {
          setError("Unexpected error please try again later!");
        }
        setShow(true);
      });
  };

  return (
    <>
      <div>
        {registrationStatus && show && (
          <div className="custom-div-alert">
            <div className="alert alert-success" role="alert">
              <span className="custom-div-alert-message">
                <strong>Registration Successful!</strong>
              </span>
              <CloseButton />
            </div>
          </div>
        )}
        {passwordChangedStatus && show && (
          <div className="custom-div-alert">
            <div className="alert alert-success" role="alert">
              <span className="custom-div-alert-message">
                <strong>Password Change Request Successful!</strong>
              </span>
              <CloseButton />
            </div>
          </div>
        )}
        {error && show && (
          <div className="custom-div-alert">
            <div className="alert alert-danger" role="alert">
              <span className="custom-div-alert-message">
                <strong>{error}</strong>
              </span>
              <CloseButton />
            </div>
          </div>
        )}
      </div>
      <div className="box-container">
        <label>
          <h3>Customer Login</h3>
        </label>
        <Form onSubmit={handleSubmit(onSubmit)} className="align-middle">
          <Form.Group className="mb-3">
            <Form.Control
              {...register("username")}
              type="text"
              className="form-control shadow-sm"
              id="username"
              placeholder="Username"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <div className="passwordRow">
              <Form.Control
                {...register("password")}
                type={passwordType}
                className="form-control shadow-sm"
                id="password"
                placeholder="Password"
              />
              <div className="visibleIcon" onClick={toggleVisible}>
                {returnIcon()}
              </div>
            </div>
          </Form.Group>

          <div className="button">
            <button
              className="btn-outline-primary"
              style={{ backgroundColor: "#F28500", color: "white" }}
            >
              Log In
            </button>
          </div>
          <div>
            <p className="forgot-password text-left mt-2">
              Forgot{" "}
              <Link to="/forgot-password" className="btn-link">
                {" "}
                Password?{" "}
              </Link>
            </p>
          </div>
          <div>
            <label>If not a Customer already!</label>
            <Link
              to="/register"
              className="btn btn-outline-light-2 mx-2 shadow-sm"
            >
              Sign Up
            </Link>
          </div>
          <div>
          <label>Looking for the Employee sign in?</label>
            <Link
              to="/login-employee"
              className="btn btn-outline-light-2 mx-2 shadow-sm"
            >
              Employee Login
            </Link>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
