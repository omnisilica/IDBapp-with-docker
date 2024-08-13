import { FormEvent, useState }      from "react";
import { useDispatch, useSelector } from "react-redux";

import Input               from "../../../utils/Input";
import Select              from "../../../utils/Select";
import { mortgageActions } from "../../../../store/mortgage-account-slice";
import { Validatable }     from "../../../Validations";

import OtherIncomeItem from "./OtherIncomeItem";

import "./OtherIncomesTable.css"

const OtherIncomesTable = () => {
	const dispatch = useDispatch();
	const [totalIncome, setTotalIncome] = useState(0);
	const initialState = {}
	const [formData, setFormData] = useState<any>(initialState);
	const [submitted, setSubmitted] = useState(false);
	const incomeList = useSelector( (state:any) => state.mortgage.extraIncome )

	const addIncome = (income:any)=>{
		const id = (new Date()).getTime();
		income = { ...income, id }
		dispatch(mortgageActions.addOtherIncome(income))
		setTotalIncome(prev=>+prev+(+income.incomeAmount));
	}

	const deleteIncome = (income:any)=>{
		dispatch(mortgageActions.deleteOtherIncome(income.id))
		setTotalIncome(prev=>prev-income.incomeAmount);
	}

	// const [submitted, setSubmitted] = useState(false);

	const onSubmit = (e: FormEvent<HTMLFormElement>)=>{
		e.preventDefault();
		setSubmitted(true);

		// If there are any errors present, do not continue submitting
		for (var error of Object.values(errors)) {
			if (error !== null) {
				console.log(error);
				return;
		}  }

		const fd = new FormData(e.currentTarget);
		const data = Object.fromEntries(fd.entries());
		addIncome(data)
		// setSubmitted(false);
		setSubmitted(true);
	}

	const fieldNouns = {
		incomeType: "type of income",
		incomeDesc: "description",
		incomeFrequency: "frequency of income",
		incomeAmount: "amount"
	}

	let initialErrors = {};
	for (var field of Object.keys(fieldNouns)) {
		initialErrors[field] = Validatable.validate("", fieldNouns[field]).fieldPresent().fail().getError();
	}
	const [errors, setErrors] = useState({ ...initialErrors });

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
		let updatedErrors = { ...errors };
		const { name, value } = e.target;

		function getValidation() : Validatable {
			return Validatable.validate(value, fieldNouns[name]);
		}

		function validateField() : Validatable {
			switch(name) {
			case "incomeType":
			case "incomeFrequency":
			case "incomeDesc":
				return getValidation().fieldPresent();
			case "incomeAmount":
				return getValidation().fieldPresent().notNegative();
			}
		}

		updatedErrors[name] = validateField().getError();

		setErrors(updatedErrors);
	}

	return (
	<form onSubmit={onSubmit}>
		<table className="table income-table">
			<thead>
				<tr>
					<th scope="col">Income type</th>
					<th scope="col">Description</th>
					<th scope="col">Frequency</th>
					<th scope="col">Amount</th>
					<th scope="col">Action</th>
				</tr>
			</thead>
			<tbody>
				{/* List of all other incomes */}
				{incomeList.map((income:any, index: number) => {
					return <OtherIncomeItem key={index} income={income} onDeleteIncome={deleteIncome}/>
				})}
				{incomeList.length > 0 &&
					<tr className="table-active">
						<th scope="col">Total gross annual income</th>
						<th scope="col"></th>
						<th scope="col"></th>
						<th scope="col">{totalIncome}</th>
						<th scope="col"></th>
					</tr>
				}
				{/* Add other income form*/}
				<tr>
					<td>
						<Select name="incomeType"
							options={[
								{value: 'Other Property', txt:"Other Property"},
								{value: 'Seasonal',       txt:"Seasonal"      }]}
							// error={submitted? errors.incomeType : ""}
								error={submitted? errors.incomeType : undefined}
							onChange={handleChange}/>
					</td>
					<td>
						<Input name="incomeDesc"
							type="text"
							// error={submitted? errors.incomeDesc : ""}
							error={submitted? errors.incomeDesc : undefined}
							onChange={handleChange}/>
					</td>
					<td>
						<Select name="incomeFrequency"
							options={[
								{value: 'Monthly',  txt:"Monthly" },
								{value: 'Weekly',   txt:"Weekly"  },
								{value: 'Biweekly', txt:"Biweekly"}]}
							// error={submitted? errors.incomeFrequency : ""}
							error={submitted? errors.incomeFrequency : undefined}
							onChange={handleChange}/>
					</td>
					<td>
						<Input name="incomeAmount"
							type="number"
							// error={submitted? errors.incomeAmount : ""}
							error={submitted? errors.incomeAmount : undefined}
							onChange={handleChange}/>
					</td>
					<td>
						<button type="submit" className="rounded-button next mt-4" >Add</button>
					</td>
				</tr>
			</tbody>
		</table>
	</form>);
}

export default OtherIncomesTable;