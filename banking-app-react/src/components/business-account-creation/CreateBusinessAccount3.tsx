import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserProfile } from '../../module/UserProfile';
import apiClient from '../../services/api-client';
import { getToken } from '../../Utility';
import { useNavigate } from 'react-router-dom';
import { CloseButton } from '../CloseButton';


function CreateBusinessAccount3(props) {
  const [showBeneficialOwners, setShowBeneficialOwners] = useState(true);
  const [showBeneficialOwnerFields, setShowBeneficialOwnerFields] = useState(false);
  const [businessDescription, setBusinessDescription] = useState('');
  const [sourceOfFunds, setSourceOfFunds] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [primaryOwner, setPrimaryOwner] = useState({ name: '', percent: '' });
  const [beneficialOwners, setBeneficialOwners] = useState([]);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>();
  const [accountSuccessStatus, setAccountSuccessStatus] = useState(true);
  const [showBusiness, setShowBusiness] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleClose = () => {
    setShowBusiness(false);
  };

  const EventModal = (props: any) => {
    return (
      <>
        <Modal show={props.title}>
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
          accountType: "business",
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
            "ERROR: number of " + "business" + " accounts limit exceeded!"
          );
        } else {
          setError("Unexpected error please try again later!");
        }
        setShowError(true);
      });
  };

  useEffect(() => {
    // Assuming legalBusinessStructure is passed as a prop or stored in global state
    if (props.formData.legalBusinessStructure === 'Sole Proprietorship') {
      setShowBeneficialOwners(false);
    } else {
      setShowBeneficialOwners(true);
    }
  }, [props.formData.legalBusinessStructure]);

  const addBeneficialOwner = () => {
    setShowBeneficialOwnerFields(true);
    setBeneficialOwners([...beneficialOwners, { name: '', percent: '' }]);
  };

  const updateBeneficialOwner = (owners, index, field, value) => {
    if (typeof owners[index] === 'object') {
      const updatedOwners = [...owners];
      updatedOwners[index] = { ...updatedOwners[index], [field]: value };
      return updatedOwners;
    }
    return owners;
  };

  const onChangeHandler = (e, index) => {
    const { name, value } = e.target;
    setBeneficialOwners(prevOwners => {
      const updatedOwners = [...prevOwners];
      if (name.includes('Percent')) {
        updatedOwners[index].percent = value;
      } else {
        updatedOwners[index].name = value;
      }
      // Update formData with the new beneficialOwners array
      props.setFormData(prevFormData => ({
        ...prevFormData,
        beneficialOwners: updatedOwners,
      }));
      return updatedOwners;
    });
  };

  const handlePrimaryOwnerChange = (event) => {
    const { name, value } = event.target;
    setPrimaryOwner(prevOwner => {
        const updatedOwner = {
            ...prevOwner,
            [name]: value, // This will work for both name and percent fields
        };

        if (name.includes('Percent')) {
          updatedOwner.percent = value;
        } else {
          updatedOwner.name = value;
        }

        // Assuming updateFormData is a prop function that updates formData in the parent component
        props.setFormData((prevFormData) => ({
            ...prevFormData,
            primaryOwner: updatedOwner,
        }));

        return updatedOwner;
    });
};

  const handleBusinessDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBusinessDescription(event.target.value);
    const { name, value } = event.target;
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
  }));
  };

  const handleSourceOfFundsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSourceOfFunds(event.target.value);
    const { name, value } = event.target;
    props.setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
  }));
  };


  function validate() {
    setSubmitted(true);
    if (props.skipValidation || !Object.values(boxesChecked).includes(false)) {
      props.nextCallback();
    }
  }

  return (
    <><div>
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
    <form>
        <div className="container p-5 pt-4 mt-4">
          <h1 className="tab-heading mb-4">Tell us more about your business.</h1>
          <div className='text-div'>
          <label htmlFor="businessDescription">1. Business Description:</label>
          <input type="text" name="businessDescription" value={businessDescription} onChange={handleBusinessDescriptionChange} />
        </div>
        <div className='text-div'>
          <label htmlFor='sourceOfFunds'>2. Source of Funds:</label>
          <input type='text' name='sourceOfFunds' value={sourceOfFunds} onChange={handleSourceOfFundsChange} />
        </div>
        <div className='text-div'>
          <label htmlFor='primaryOwner'>3. Primary Owner:</label>
          <input
            type="text"
            name="primaryOwner"
            value={primaryOwner.name}
            onChange={handlePrimaryOwnerChange}
          />
          <label htmlFor='primaryOwnerPercent'>Percentage Owned:</label>
          <input
            type="text"
            name="primaryOwnerPercent"
            value={primaryOwner.percent}
            onChange={handlePrimaryOwnerChange}
          />
        </div>
        {showBeneficialOwnerFields && beneficialOwners.map((owner, index) => (
          <div key={index} className='text-div'>
            <label htmlFor={`beneficialOwner${index}`}>Beneficial Owner:</label>
            <input type="text" name={`beneficialOwner${index}`} value={owner.name} onChange={(e) => onChangeHandler(e, index)} />
            <label htmlFor={`beneficialOwner${index}Percent`}>Percentage Owned:</label>
            <input type="number" name={`beneficialOwner${index}Percent`} value={owner.percent} onChange={(e) => onChangeHandler(e, index)} />
          </div>
        ))}
        {showBeneficialOwners && (
          <div className='text-div'>
            <button type="button" onClick={addBeneficialOwner}>Add Beneficial Owner</button>
          </div>
        )}

        <div className="justify-content-md-end footer d-md-flex">
          <button type="button" onClick={() => props.backCallback()} className="btn-outline-light-2"> Back </button>
          <Button
            className="btn-outline-secondary"
            onClick={() => {
              setShowBusiness(true);
            }}
          >Open Business Account</Button>
          {showBusiness && EventModal({ title: "Business" })}
        </div>
        </div>
      </form></>
  );
}

export default CreateBusinessAccount3;
