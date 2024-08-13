import { ChangeEvent } from "react";
import { mortgageActions } from "../../store/mortgage-account-slice";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

const changeHandler = (e: ChangeEvent<any> , dispatch:Dispatch<AnyAction>)=>{
    const name = e.target.name;
    
    //check if mortgageActions has a reducer named 'name'
    //and if it is a function
    if (mortgageActions[name] && typeof mortgageActions[name] === "function") {
        dispatch(mortgageActions[name](e.target.value)); 
    } 
}

export default changeHandler;