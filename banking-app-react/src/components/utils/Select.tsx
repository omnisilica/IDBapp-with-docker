import InputProps from "../../module/InputProps";
import "./Select.css"

const Select: React.FC<InputProps> = ({name, label, error,options,info, ...props})=>{
    return <div className="select-div">
            {label && <label className="mr-sm-2" htmlFor={name}>{label}</label>}
            {info && <p className="info-text">{info}</p>}

            <select className="custom-select mr-sm-2" name={name} {...props}>
                <option value="" selected disabled hidden>Select</option>
                {options &&
                options.map((option:any)=>{
                    return <option value={option.value} key={option.value}>{option.txt}</option>
                })}
            </select>
            {error && <p className="text-danger">{error}</p>}
        </div>
}

export default Select;
