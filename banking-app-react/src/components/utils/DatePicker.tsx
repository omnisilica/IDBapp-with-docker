// DEPRECATED
// This component causes tons of problems around validation and should not be used
// Instead please use the standard Input component with type=date

import Input from "./Input";
import Select from "./Select";
import "./DatePicker.css"
import { ChangeEvent, useEffect, useState } from "react";

const DatePicker = (props:any)=>{
    const [dateFields, setDateFields] = useState({
        day: '',
        month: '',
        year: '',
    });

    let newDate = null;

    const changeHandler = (e: ChangeEvent<any>) => {
        const { name, value } = e.target;
        setDateFields((prevFields) => ({
          ...prevFields,
          [name]: value,
        }));

        props.onDateChange(new Date(`${dateFields.year}-${dateFields.month}-${dateFields.day}`).toISOString());
    }

    return <div>
    <h5 className="field-heading">{props.title}</h5>
    <div className="d-flex date-picker">
        <Input name="day"
               label="Day"
               type="text"
               placeholder="dd"
               maxLength={2}
               onChange={changeHandler}/>
        <Select name="month"
                label="Month"
                options={[{txt: "Jan", value:"1"}, 
                          {txt: "Feb", value:"2"},
                          {txt: "Mar", value:"3"}, 
                          {txt: "Apr", value:"4"},
                          {txt: "May", value:"5"}, 
                          {txt: "Jun", value:"6"},
                          {txt: "Jul", value:"7"}, 
                          {txt: "Aug", value:"8"},
                          {txt: "Sep", value:"9"}, 
                          {txt: "Oct", value:"10"},
                          {txt: "Nov", value:"11"}, 
                          {txt: "Dec", value:"12"}]}
                onChange={changeHandler}/>
        <Input name="year"
               label="Year"
               type="text"
               placeholder="yyyy"
               maxLength={4}
               onChange={changeHandler}/>
    </div></div>
}

export default DatePicker;