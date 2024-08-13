import { useState } from "react";
import NavBarContainer, {NavTabLink} from "./BusinessNavTab";
import CreateBusinessAccount from "./CreateBusinessAccount";
import CreateBusinessAccount2 from "./CreateBusinessAccount2";
import CreateBusinessAccount3 from "./CreateBusinessAccount3";



interface BusinessFormData {
	businessLegalName: string;
	businessType: string;
	legalBusinessStructure: string;
	businessTaxID: string;
	businessAddress: string;
	businessState: string;
	businessPhone: string;
	businessEmail: string;
	businessRevenue: string;
	businessDescription: string;
	sourceOfFunds: string;
	primaryOwner: { name: string; percent: string };
	beneficialOwners: { name: string; percent: string }[];
  }



/**
 * Represents the component for the business account setup tab.
 */
const BusinessSetupTab = () => {
	const [activeTab, setActiveTab] = useState(1);

	const [formData, setFormData] = useState<BusinessFormData>({
		businessLegalName: "",
		businessType: "",
		legalBusinessStructure: "",
		businessTaxID: "",
		businessAddress: "",
		businessState: "",
		businessPhone: "",
		businessEmail: "",
		businessRevenue: "",
		businessDescription: "",
		sourceOfFunds: "",
		primaryOwner: { name: "", percent: "" },
		beneficialOwners: [{ name: "", percent: "" }],
	  });

	/**
	 * Handles the click event of a tab.
	 * @param {number} tabNumber - The number of the tab clicked.
	 */
	const handleTabClick = (tabNumber) => {
		setActiveTab(tabNumber);
	};

	/**
	 * Handles the next tab navigation.
	 */
	const handleNextTab = () => {
		setActiveTab((prevTab) => prevTab + 1);
	};

	/**
	 * Handles the previous tab navigation.
	 */
	const handlePrevTab = () => {
		setActiveTab((prevTab) => prevTab - 1);
	};

	/**
	 * Submits the application.
	 */
	const submitApplication = () => {
		// TODO: Connect to "wrap up" step
	};

	/**
	 * Renders a setup page component.
	 * @param {object} props - The props for the setup page component.
	 * @returns {JSX.Element} The rendered setup page component.
	 */
	function SetupPage(props) {
		return (
			<div className={`tab ${activeTab === props.pageNumber ? 'active' : ''}`}>
				<props.component backCallback={props.backCallback} nextCallback={props.nextCallback} skipValidation={props.skipValidation} formData={props.formData} setFormData={props.setFormData}/>
			</div>
		);
	}

	return (
		<div className="business-account-setup-container">
			<NavBarContainer handleTabClick={handleTabClick} activeTab={activeTab} />
			<div className="tabs">
				{SetupPage({ pageNumber: 1, backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, formData: formData, setFormData: setFormData, component: CreateBusinessAccount })}
				{SetupPage({ pageNumber: 2, backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, formData: formData, setFormData: setFormData, component: CreateBusinessAccount2 })}
				{SetupPage({ pageNumber: 3, backCallback: handlePrevTab, nextCallback: handleNextTab, skipValidation: false, formData: formData, setFormData: setFormData,  component: CreateBusinessAccount3 })}
			</div>
		</div>
	);
}

export default BusinessSetupTab;
