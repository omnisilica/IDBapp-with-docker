import axios from "axios";
import { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation, useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const SecurityQuestion = () => {
  const location = useLocation();
  
  if(location.state != null){
  const pageStatus = location.state?.valueStatus;
  const securityQuestion = location.state.data.securityQuestion;
  const userId = location.state.data.id;

  const url =
     `${backendUrl}/customers/customer/authenticateSecurityAnswer`;
  const resetPasswordPage = "/reset-password";
  const usernamePage = "/username";

  const [securityAnswer, setSecurityAnswer] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState("");
  const onAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSecurityAnswer(val);
  };
  const [show, setShow] = useState(false);

  const handleSubmit = () => {
    axios
      .get<any>(
        url,
        { params: { id: userId, securityAnswer: securityAnswer } }
      )
      .then((res:any) => {
        if (res.data.authentication) {
          // nav to reset password page
          const data = res.data;
          navigate(pageStatus == 1 ? resetPasswordPage : usernamePage, {
            state: { userId },
          });
        } else {
          setError("Invalid Answer");
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
          <h3>Enter Security Question</h3>
          <form className="align-middle">
            <label>
              {securityQuestion ? securityQuestion : "Security Question..."}
            </label>
            <div className="form-group">
              <label htmlFor="answer">Answer</label>
              <input
                type="password"
                className="form-control"
                id="text"
                placeholder="answer"
                onChange={onAnswerChange}
              />
            </div>
            <div>
              <Button
                className="btn btn-outline-primary mx-2 shadow-sm"
                onClick={handleSubmit}
              >
                Continue
              </Button>
            </div>
          </form>
        </div>
      </>
    );
}
else{
  return (
    <div className="box-container">
      <h2>404 Page not found</h2>
    </div>
  );
}
};

export default SecurityQuestion;
