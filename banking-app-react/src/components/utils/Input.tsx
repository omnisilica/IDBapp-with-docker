import "./Input.css"
import InputProps from "../../module/InputProps";

const Input: React.FC<InputProps> = ({ name, label, error, ...props }) => {
  let obj = { ...props };
    return<div className="form-group">
    {label && <label htmlFor={name}>{label}</label>}
    <input className="form-control" name={name} {...props}/>
    {error && <p className="text-danger">{error}</p>}
  </div>
}

export default Input;