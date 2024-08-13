import "./Radio.css"
import InputProps from "../../module/InputProps";

const Radio: React.FC<InputProps> = ({name, label, error,options, ...props}) => {
    return<>
        <h6 className="field-heading">{label}</h6>
        {props.info && <p className="info-text">{props.info}</p>}
        {options && 
        options.map((value:string)=>{
            let id = (name + value).replace(/\s/g, '');

           return(<div key={value} className="form-check">
                    <input className="form-check-input" id={id} name={name} type="radio" value={value} {...props}/>
                    <label className="form-check-label" htmlFor={id}>{value}</label>
                  </div>)
        })}
        {error && <p className="text-danger">{error}</p>}
    </>
}

export default Radio;