import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux/es/exports";

import Radio from "../../../utils/Radio";
import changeHandler from "../../../utils/ChangeHandler";

const AboutYou = (props) => {

	const [boxesChecked, setBoxesChecked] = useState({
		isFirstHome: false,
		isWithCoApplicant: false,
		isThirdParty: false,
		docSentMethod: false
	});

	const [submitted, setSubmitted] = useState(false);

	const dispatch = useDispatch()

	const onChangeHandler = (e: ChangeEvent) => {
		console.log(e.target.name);
		const { name, value } = e.target;
		setBoxesChecked((prevBoxesChecked) => ({ ...prevBoxesChecked, [e.target.name]: true }));
		console.log(boxesChecked);
		changeHandler(e, dispatch);
	}

	function validate() {
		setSubmitted(true);
		if (props.skipValidation || !Object.values(boxesChecked).includes(false)) {
			props.nextCallback();
		}
	}

	function giveError(field) {
		if (submitted && !boxesChecked[field]) return "Please select an option.";
		else return "";
	}

	return <>
		<h5 className="tab-heading mb-4">A bit about you</h5>
		<p className="info-text">With a few details about you, we'll guide you through your Mortgage application</p>

		<Radio label="Are you building your first home?"
			name="isFirstHome"
			options={['Yes','No']}
			onChange={onChangeHandler}
			error={giveError("isFirstHome")} />

		<Radio label="Are you applying with a co-applicant?"
			name="isWithCoApplicant"
			options={['Yes','No']}
			onChange={onChangeHandler}
			error={giveError("isWithCoApplicant")} />

		<Radio label="Third Party Information ®"
			info="Anti-Money Laundering legislation requires us to obtain the following information.
				We cannot open an Account for you without this information which will remain strictly confidential.
				Will this Account be used on behalf of a third party other than the named Account holder?"
			name="isThirdParty"
			options={['Yes','No']}
			onChange={onChangeHandler}
			error={giveError("isThirdParty")} />

		<Radio label="How would you like approval document sent to you?"
			name="docSentMethod"
			options={['Email','Fax', 'Mail']}
			onChange={onChangeHandler}
			error={giveError("docSentMethod")} />

		<div className="justify-content-md-end footer d-md-flex">
			<button onClick={() => props.backCallback() }
				className="btn-outline-light-2"> Back </button>
			<button onClick={validate}
				className="btn-outline-primary"> Next </button>
		</div>
	</>
}

export default AboutYou;