import "./Checkbox.css"

const Checkbox = (props: any)=>{
    return <>
    <div className="checkbox-div" >
        {props.label &&<h5 className="field-heading">{props.label}</h5>}
        {props.options.map((option:any)=>{
            return <div className="form-check checkbox-item"  key={option}>
                        <input name={props.name}
                            value={option}
                            type="checkbox"
                            className="form-check-input"
                            id={option}
                            onChange={props.onChange}
                           />
                           <label className="form-check-label" htmlFor={option}>{option}</label>
                    </div>
         })}
    </div>
    {props.error && <p className="text-danger">{props.error}</p>}
    </>
}

export default Checkbox;