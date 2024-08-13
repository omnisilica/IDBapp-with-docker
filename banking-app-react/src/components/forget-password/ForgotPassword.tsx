import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const ForgotPassword = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUsername(val);
  };

  const url =
    `${backendUrl}/customers/idAndSecurityQuestion/byUsername`;
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    axios
      .get<any>(url, { params: { username: username } })
      .then((res: any) => {
        if (!res.data.status) {
          // nav to reset password page
          const data = res.data;
          navigate("/auth-user", { state: { valueStatus: "1", data } });
        } else {
          setError(res.data.message);
          setShow(true);
          const timeId = setTimeout(() => {
            // After 5 seconds set the show value to false
            setShow(false);
          }, 5000);
          // On componentDidMount set the timer
        }
      })
      .catch((err: any) => setError(err.message));
  };

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
        <h3>Forgot Password</h3>
        <form className="align-middle">
          <div className="form-group">
            <label htmlFor="username">Enter Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Username"
              onChange={onUsernameChange}
            />
          </div>
          <div>
            <Link
              to="/login"
              className="btn btn-outline-light-2 mx-2 shadow-sm"
            >
              Go Back
            </Link>
            <Button
              className="btn-outline-primary mx-2 shadow-sm"
              onClick={handleSubmit}
            >
              Continue
            </Button>
          </div>
          <div>
            <label>
              Forgot <Link to="/forgot-username">Username?</Link>
            </label>
          </div>
          <div>
            <label>Don't have Account</label>
            <Link
              to="/register"
              className="btn btn-outline-light-2 mx-2 shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotPassword;
