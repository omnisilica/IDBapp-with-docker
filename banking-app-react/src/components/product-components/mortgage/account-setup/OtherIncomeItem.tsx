import Input  from "../../../utils/Input";
import Select from "../../../utils/Select";
import "./OtherIncomesTable.css"

const OtherIncomeItem = (props:any)=>{
    const deleteIncomeHandler = (income:any)=>{
        props.onDeleteIncome(income);
    }

    return <tr key={props.index}>
                <td>{props.income.incomeType}
                </td>
                <td>{props.income.incomeDesc}
                </td>
                <td>{props.income.incomeFrequency}
                </td>
                <td>{props.income.incomeAmount}</td>
                <td><button type="button" className="rounded-button" onClick={()=>deleteIncomeHandler(props.income)}>X</button></td>
          </tr> 
}

export default OtherIncomeItem;