import { useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

import Select from "../../../utils/Select";
import EmploymentForm from "./EmploymentForm";
import EmploymentTable from "./EmploymentTable";

import { mortgageActions } from "../../../../store/mortgage-account-slice";

const EmploymentInfo = (props) => {
    const dispatch = useDispatch()

    const [addMode, setAddMode] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const [selectedEmployment, setSelectedEmployment] = useState({});

    const employmentList = useSelector( (state:any) => state.mortgage.employment );

    const onAddMode = ()=>{
        setEditMode(false);
        setAddMode(true);
        setSelectedEmployment({})
    }

    const onEditMode = (employment:any)=>{
        setEditMode(true);
        setSelectedEmployment(employment)
    }

    const deleteEmploymentHandler = (id:any)=>{
        dispatch(mortgageActions.deleteEmploymentInfo(id))
    }

    const editEmploymentHandler = (employment:any)=>{
        dispatch(mortgageActions.editEmploymentInfo(employment))
    }

    const closeAddEmployment = ()=>{
        setAddMode(false);
        setEditMode(false);
    }

    const [error, setError] = useState<String>("");
    const [submitted, setSubmitted] = useState(false);

    const addEmploymentHandler = (newEmployment:any)=>{
        dispatch(mortgageActions.addEmploymentInfo(newEmployment))
        setAddMode(false);
        setEditMode(false);
        setError(null);
    }

    const errorNoEmploymentProvided = "Please provide at least one employment entry.";

    const validate = () => {
        setSubmitted(true);
        if (employmentList.length > 0 || props.skipValidation) props.nextCallback();
        else setError(errorNoEmploymentProvided);
    }

    return <>
        <h5 className="tab-heading mb-4">Employment Info</h5>
        <p className="info-text">In this section we'll ask you for information about your employment history and income</p>
        {employmentList.length > 0 &&
            <EmploymentTable employmentList     = { employmentList }
                             viewEditMode       = { (employment:any) => onEditMode(employment)  }
                             onDeleteEmployment = { (id:any) => deleteEmploymentHandler(id)     }/>}
        {(addMode || editMode) &&
            <EmploymentForm onAddEmployment     = { (employment:any) => addEmploymentHandler(employment)  }
                            onEditEmployment    = { (employment:any) => editEmploymentHandler(employment) }
                            closeEmploymentForm = { closeAddEmployment }
                            employment          = { selectedEmployment }
                            editMode            = { editMode           }/>}
        {(!editMode && !addMode) && <button onClick={onAddMode} className="rounded-button next mt-3">Add employment</button>}
        {submitted && <p className="text-danger">{error}</p>}
        <div className="justify-content-md-end footer d-md-flex">
            <button onClick={() => props.backCallback() }
                className="btn-outline-light-2"> Back </button>
            <button onClick={validate}
                className="btn-outline-primary"> Next </button>
        </div>
    </>
}

export default EmploymentInfo;