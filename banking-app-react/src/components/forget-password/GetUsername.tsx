import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { useLocation, useNavigate } from "react-router-dom";
import backendUrl from "../../config";

const GetUsername = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const userId = location.state?.userId;
  const [username, setUsername] = useState("");

  const url = `${backendUrl}/customers/customer/username`;

  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    setLoaded(false);
    (async () => {
      try {
        const response = await axios.get<any>(
          url,
          {
            params: { id: userId },
          }
        );
        if(response.data.username){
        setUsername(response.data.username);
        }
        else{
          setError(response.data.message);
          setShow(true);
          const timeId = setTimeout(() => {
            // After 5 seconds set the show value to false
            setShow(false);
          }, 5000);
        }
      } catch (error: any) {
        setError(error);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

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
            {!loaded && (
              <div className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              disabled
              value={username}
            />
          </div>
          <div>
            <Button
              onClick={() => navigate("/login")}
              className="btn btn-outline-primary mx-2 shadow-sm"
            >
              Go Back to Login
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GetUsername;
