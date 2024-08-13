import { useState }        from "react";

import QuickQuestion       from "./QuickQuestion";
import AboutYou            from "./AboutYou";
import ThirdPartyInfo      from "./ThirdPartyInfo";
import AddressInfo         from "./AddressInfo";
import Numbers             from "./Numbers";
import HomePurchaseDetails from "./HomePurchaseDetails";
import AboutProperty       from "./AboutProperty";
import EmploymentInfo      from "./EmploymentInfo";
import OtherIncomes        from "./OtherIncomes";
import InitialOptions      from "./InitialOptions";
import CreditCheckConsent  from "./CreditCheckConsent";

import { NavProgressBar, NavTabNoLink } from "../../../navigation-tabs/NavTab";

import "./AccountSetupTab.scss"
import MortgageLastStep from "../../../mortgage-component/MortgageLastStep";

const AccountSetupTab = () => {
	const [activeTab, setActiveTab] = useState(1);
	const [isSwitchMortgage, setIsSwitchMortgage] = useState(false);

	const onNewHome = () => {
		setIsSwitchMortgage(false);
	    setActiveTab((prevTab) => prevTab + 2); //skip the tab 2 
	}

	const onSwitcMortgage = () => {
		setIsSwitchMortgage(true);
		setActiveTab((prevTab) => prevTab + 1);
	}

	const handleNextTab = () => { setActiveTab((prevTab) => prevTab + 1) };

	const handlePrevTab = () => {
		setActiveTab((prevTab:number) => {
	      if(prevTab === 3 && !isSwitchMortgage) //If 'buy a new home option' selected then skip the tab 2 
	      	return 1;
	      else
	      	return prevTab - 1;
	  });
	};

	const submitApplication = () => {
		// TODO: Connect to "wrap up" step
	}

	function SetupPage (props: any) {
		return (
			<div className={`tab ${activeTab === props.pageNumber ? 'active' : ''}`}>
				<props.component backCallback={props.backCallback} nextCallback={props.nextCallback} skipValidation={props.skipValidation}/>
			</div>
		);
	}

	return (
		<div className="account-setup-container">
			<NavProgressBar>
				<NavTabNoLink active={activeTab === 1 || activeTab === 2} onClick={() => setActiveTab(1)}><b>1</b> Select Application</NavTabNoLink>
				<NavTabNoLink active={activeTab === 3} onClick={() => setActiveTab(3)}><b>2</b> Mortgage Info</NavTabNoLink>
				<NavTabNoLink active={activeTab === 4} onClick={() => setActiveTab(4)}><b>3</b> Personal Info</NavTabNoLink>
				<NavTabNoLink active={activeTab === 5} onClick={() => setActiveTab(5)}><b>4</b> Household & Address</NavTabNoLink>
				<NavTabNoLink active={activeTab === 6} onClick={() => setActiveTab(6)}><b>5</b> Financial Info</NavTabNoLink>
				<NavTabNoLink active={activeTab === 7} onClick={() => setActiveTab(7)}><b>6</b> New Home Details 1</NavTabNoLink>
				<NavTabNoLink active={activeTab === 8} onClick={() => setActiveTab(8)}><b>7</b> New Home Details 2</NavTabNoLink>
				<NavTabNoLink active={activeTab === 9} onClick={() => setActiveTab(9)}><b>8</b> Employment Info</NavTabNoLink>
				<NavTabNoLink active={activeTab === 10} onClick={() => setActiveTab(10)}><b>9</b> Additional Income</NavTabNoLink>
				<NavTabNoLink active={activeTab === 11} onClick={() => setActiveTab(11)}><b>10</b> Credit Report</NavTabNoLink>
				<NavTabNoLink active={activeTab === 12} onClick={() => setActiveTab(12)}><b>11</b> Wrap Up</NavTabNoLink>
			</NavProgressBar>
			<div className="tabs">
				<div className={`tab ${activeTab === 1 ? 'active' : ''}`}>
					<InitialOptions onNewHomeSelected={onNewHome} onSwitchMortgageSelected={onSwitcMortgage}/>
				</div>
				{isSwitchMortgage? SetupPage({ pageNumber: 2, backCallback: handlePrevTab, nextCallback: handleNextTab, component: QuickQuestion }) : null}
				{SetupPage({ pageNumber: 3 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: AboutYou })}
				{SetupPage({ pageNumber: 4 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: ThirdPartyInfo })}
				{SetupPage({ pageNumber: 5 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: AddressInfo })}
				{SetupPage({ pageNumber: 6 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: Numbers })}
				{SetupPage({ pageNumber: 7 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: HomePurchaseDetails })}
				{SetupPage({ pageNumber: 8 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: AboutProperty })}
				{SetupPage({ pageNumber: 9 , backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: EmploymentInfo })}
				{SetupPage({ pageNumber: 10, backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: OtherIncomes })}
				{SetupPage({ pageNumber: 11, backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, component: CreditCheckConsent })}
				{SetupPage({ pageNumber: 12, backCallback: handlePrevTab, nextCallback: null, skipValidation: false, component: MortgageLastStep })}
			</div>
		</div>
	);
}

export default AccountSetupTab;