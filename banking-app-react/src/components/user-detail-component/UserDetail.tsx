import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../module/UserProfile";
import { phoneNumberToString, currencyString } from "../../Utility";
import { CloseButton } from "../CloseButton";

function UserDetail() {
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>();

  const location = useLocation();
  const passwordChangedStatus = location.state?.passwordChangedStatus;
  const userUpdatedStatus = location.state?.userUpdatedStatus;
  const [show, setShow] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => { setShow(false) }, 5000); // After 5 seconds set the show value to false
    return () => { clearTimeout(timeId) };
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) { setLoggedInUser(JSON.parse(user)); }
  }, []);

  // console.log(localStorage.getItem("loggedInUser"))

  let navigate = useNavigate();
  const onCancel = () => { navigate("/profile"); };

  const TableRow = (props) => {
    return (
      <tr>
        <th scope="row">{props.label}</th>
        <td>{props.field}</td>
      </tr>
    )
  }

  return (
    <>
      <div>
        {userUpdatedStatus && show && (
          <div className="custom-div-alert">
            <div className="alert alert-success" role="alert">
              <span className="custom-div-alert-message">
                <strong>User Details Updated!</strong>
              </span>
              <CloseButton/>
            </div>
          </div>
        )}
        {passwordChangedStatus && show && (
          <div className="custom-div-alert">
            <div className="alert alert-success" role="alert">
              <span className="custom-div-alert-message">
                <strong>Password Updated!</strong>
              </span>
              <CloseButton/>
            </div>
          </div>
        )}
      </div>
      <div className="box-container ">
        <h1>Profile & Settings</h1>
        <form>
          <h4>Basic Info</h4>
          <table className="table">
            <tbody>
              <TableRow label="Username" field={loggedInUser?.username}/>
              <TableRow label="Name" field={loggedInUser?.firstName + " " + loggedInUser?.lastName}/>
              <TableRow label="Email" field={loggedInUser?.email}/>
              <TableRow label="Date Of Birth" field={loggedInUser?.dateOfBirth}/>
              <tr>
                <th scope="row">Phone Number</th>
                <td>{phoneNumberToString(loggedInUser?.phoneNumber ? loggedInUser?.phoneNumber : "")}</td>
              </tr>
              <tr>
                <th scope="row">Address</th>
                <td>
                  {loggedInUser?.address.address_one}<br/>
                  {loggedInUser?.address.address_two}{loggedInUser?.address.address_two && <br/>}
                  {loggedInUser?.address.city}, {loggedInUser?.address.province}<br/>
                  {loggedInUser?.address.postal_code}<br/>
                </td>
              </tr>
              <TableRow label="Income Source" field={loggedInUser?.income_type}/>
              <TableRow label="Income Amount" field={(loggedInUser?.income_amount) ? currencyString(loggedInUser?.income_amount) : ""}/>
            </tbody>
          </table>
          <div>
            <Link to="/updateuserdetail" className="btn-outline-secondary">  Update </Link>
            <Link to="/profile"          className="btn btn-outline-danger"> Cancel </Link>
          </div>
          <div>
            <Link
              to="/reset-password"
              state={{ userId: loggedInUser?.id, userLoggedIn: true }}
              className="btn btn-outline-primary mx-2 shadow-sm"
            >
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserDetail;