import Card from "react-bootstrap/Card";
import Chequing from "../images/WalletIcon.png";
import Savings from "../images/SavingsIcon.png";
import Business from "../images/BusinessIcon.png";
import { useEffect, useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { UserProfile } from "../../module/UserProfile";
import apiClient from "../../services/api-client";
import { useNavigate } from "react-router-dom";
import { CloseButton } from "../CloseButton";
import { getToken } from "../../Utility";
import "./AddAccount.css";

const AddAccount = () => {
  const navigate = useNavigate();
  const [accountSuccessStatus, setAccountSuccessStatus] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(true);

  // On componentDidMount set the timer
  useEffect(() => {
    const timeId = setTimeout(() => {
      setShowError(false);
    }, 5000); // After 5 seconds set the show value to false
    return () => {
      clearTimeout(timeId);
    };
  }, [error]);
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>();
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);
  console.log(loggedInUser);
  const [selected, setSelected] = useState("");
  const InputFields = (props: any) => {
    console.log("Val:", props.value);
    return (
      <div className={props.className} key={props.field + "-container"}>
        <label className="form-label" htmlFor={props.field}>
          {props.label} {props.required && <b>*</b>}
        </label>
        {props.type == "textarea" && (
          <textarea
            id={props.field}
            key={props.field}
            disabled={props.disabled != null}
            rows={4}
            value={props.value.addressTemp}
          ></textarea>
        )}
        {props.type == "text" && (
          <input
            type={props.type}
            inputMode={props.type}
            id={props.field}
            key={props.field}
            disabled={props.disabled != null}
            value={props.value.nameTemp}
          />
        )}
      </div>
    );
  };
  const submitEvent1 = (event: any) => {
    alert(
      "Selected: " +
        selected +
        " Name: " +
        loggedInUser?.firstName +
        " Address: " +
        addressTemp
    );
    event.preventDefault();
  };

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShowChequing(false);
    setShowSaving(false);
    setShowBusiness(false);
  };
  const handleShow = () => setShow(true);

  const [showChequing, setShowChequing] = useState(false);
  const [showSaving, setShowSaving] = useState(false);
  const [showBusiness, setShowBusiness] = useState(false);

  const EventModal = (props: any) => {
    return (
      <>
        <Modal show={show + props.title} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{props.title.toUpperCase()} ACCOUNT</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Please click confirm to open the <b>{props.title} Account</b>.{" "}
            <br />
            Or press close to cancel the request.
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn-outline-secondary" onClick={handleSubmit}>
              Confirm
            </Button>
            <Button className="btn-outline-primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  const handleSubmit = async () => {
    apiClient
      .post<any>(
        `/accounts`,
        {
          accountType: selected,
          customer_id: loggedInUser?.id,
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((response) => {
        // Navigate to completed page
        navigate("/profile", { state: { accountSuccessStatus } });
      })
      .catch((error) => {
        handleClose();
        window.scrollTo(0, 0);
        console.log("[CreateAccount] Error " + error.message);
        console.log(error);

        if (error.response.request.status == 403) {
          setError(
            "ERROR: number of " + selected + " accounts limit exceeded!"
          );
        } else {
          setError("Unexpected error please try again later!");
        }
        setShowError(true);
      });
  };

  const addressTwoTemp =
    loggedInUser?.address.address_two === null ||
    loggedInUser?.address.address_two === ""
      ? "".toString()
      : "\n" + loggedInUser?.address.address_two;

  const addressTemp =
    loggedInUser?.address.address_one +
    addressTwoTemp +
    "\n" +
    loggedInUser?.address.city +
    "," +
    loggedInUser?.address.province +
    "\n" +
    loggedInUser?.address.postal_code +
    "\n";

  const nameTemp = loggedInUser?.firstName + " " + loggedInUser?.lastName;
  return (
    <>
      <div>
        {error && showError && (
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
        <h1>Add Account</h1>
        <form onSubmit={submitEvent1}>
          {InputFields({
            className: "col-12",
            type: "text",
            field: "name",
            label: "Name",
            disabled: true,
            value: { nameTemp },
          })}
          {InputFields({
            className: "col-12",
            type: "textarea",
            field: "address",
            label: "Address",
            disabled: true,
            value: { addressTemp },
          })}
          <div className="row">
            <div
              className={
                selected === "chequing"
                  ? "col selectedaccountcardholder d-flex align-items-center justify-content-center"
                  : "col accountcardholder  d-flex align-items-center justify-content-center"
              }
            >
              <Card className="shadow" onClick={() => setSelected("chequing")}>
                <Card.Img variant="top" src={Chequing} />
                <Card.Body className="center">
                  <b>
                    <Card.Title className="bold">Chequing Account</Card.Title>
                    Experience no-fee daily chequing with Visa* Debit
                  </b>
                  <ul className="listed">
                    <li>No fees for daily transactions</li>
                    <li>Free Interac e-Transfer® transactions</li>
                    <li>Free access to 3,500 A B M'sABMs</li>
                    <li>Use your money your way</li>
                  </ul>
                  <Button
                    className="btn-outline-secondary"
                    onClick={() => {
                      setShowChequing(true);
                    }}
                  >
                    Open an Account
                  </Button>
                </Card.Body>
                {selected == "chequing" && (
                  <IoMdCheckboxOutline size={70} color="#F5F5F5" />
                )}
              </Card>
            </div>
            {showChequing && EventModal({ title: "Chequing" })}
            <div
              className={
                selected === "savings"
                  ? "col selectedaccountcardholder d-flex align-items-center justify-content-center"
                  : "col accountcardholder d-flex align-items-center justify-content-center"
              }
            >
              <Card className="shadow" onClick={() => setSelected("savings")}>
                <Card.Img variant="top" src={Savings} />
                <Card.Body className="center">
                  <b>
                    <Card.Title className="bold">Savings Account</Card.Title>
                    Earn a great interest rate on your hard-earned money.
                  </b>
                  <ul className="listed">
                    <li>
                      Our Savings Account earns you high interest on every
                      dollar
                    </li>
                    <li>Requires no minimum balance and charges no fees.</li>
                  </ul>
                  <Button
                    className="btn-outline-secondary"
                    onClick={() => {
                      setShowSaving(true);
                    }}
                  >
                    Open an Account
                  </Button>
                </Card.Body>
                {selected == "savings" && (
                  <IoMdCheckboxOutline size={70} color="#F5F5F5" />
                )}
              </Card>
            </div>
            {showSaving && EventModal({ title: "Savings" })}
            <div
              className={
                selected === "business"
                  ? "col selectedaccountcardholder d-flex align-items-center justify-content-center"
                  : "col accountcardholder d-flex align-items-center justify-content-center"
              }
            >
              <Card className="shadow" onClick={() => setSelected("business")}>
                <Card.Img variant="top" src={Business} />
                <Card.Body className="center">
                  <b>
                    <Card.Title className="bold">Business Account</Card.Title>
                    Earn a great interest rate on your business savings.
                  </b>
                  <ul className="listed">
                    <li>
                      Help grow your business savings at a great interest rate.
                    </li>
                    <li>We simply don’t believe in unfair fees.</li>
                    <li>With no minimum balance requirement</li>
                    <li>Use your money your way</li>
                  </ul>
                  <Button
                    className="btn-outline-secondary"
                    onClick={() => {
                      navigate("/business-account-setup");
                    }}
                  >
                    Open an Account
                  </Button>
                </Card.Body>
                {selected == "business" && (
                  <IoMdCheckboxOutline size={70} color="#F5F5F5" />
                )}
              </Card>
            </div>
            {showBusiness && EventModal({ title: "Business" })}
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAccount;
