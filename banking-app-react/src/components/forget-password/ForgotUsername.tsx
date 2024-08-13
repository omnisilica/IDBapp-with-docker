import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const ForgotUsername = () => {
  let navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState("");
  const [error, setError] = useState("");
  const onEmailAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setEmailAddress(val);
  };
  const url =
  `${backendUrl}/customers/idAndSecurityQuestion/byEmailAddress`;
  const [show, setShow] = useState(false);

  const handleSubmit = () => {  
    axios
      .get<any>(
        url,
        { params: { emailAddress: emailAddress } }
      )
      .then((res:any) => {
        if (!res.data.status) {
          // nav to reset password page
          const data = res.data;
          navigate("/auth-user", { state: { valueStatus: "2", data } });
        } 
        else {
          setError(res.data.message);
          setShow(true);
          const timeId = setTimeout(() => {
            // After 5 seconds set the show value to false
            setShow(false);
          }, 5000);
          // On componentDidMount set the timer
        }
      })
      .catch((err:any) => setError(err.message));
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
        <h3>Forgot Username</h3>
        <form className="align-middle">
          <div className="form-group">
            <label htmlFor="emailaddress">Enter Email Address</label>
            <input
              type="text"
              id="emailaddress"
              placeholder="Email Address"
              onChange={onEmailAddressChange}
            />
          </div>
          <div>
            <Button
              onClick={() => navigate("/forgot-password")}
              className="btn btn-outline-light-2 mx-2 shadow-sm"
            >
              Go Back
            </Button>
            <Button
              onClick={handleSubmit}
              className="btn btn-outline-primary mx-2 shadow-sm"
            >
              Continue
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ForgotUsername;
