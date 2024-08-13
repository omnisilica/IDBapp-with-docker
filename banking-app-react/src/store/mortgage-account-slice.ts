import { createSlice } from "@reduxjs/toolkit";
import EmploymentInfo from "../module/EmploymentInfo";

const mortgageSlice = createSlice({
    name: 'mortgage-account',
    initialState: {
        mortgage: {
            isFirstHome: "",
            isWithCoApplicant: "",
            isThirdParty: "",
            docSentMethod: "",
        },
        haveEquityCredit: "",
        thirdPartyInfo:{
            infoType: "",
            relationshipToCustomer: "",
            firstName: "",
            lastName: "",
            title: "",
            dateOfBirth: ""
        },
        addressInfo:{
            maritalStatus: "",
            numberOfDependents: "",
            postalCode: "",
            streetNumber:"",
            streetName:"",
            city:"",
            province:"",
            livingSituation:""
        },
        purchaseNumbers: {
            purchasePrice: 0,
            downPayment: 0,
            downPaymentFunds: [],
            purpose: "",
            intendedUseOfAccount: "",
            mortgageType: "",
            mortgageTerm : "",
            amortizationPeriod: "",
            paymentFrequency: ""
        },
        homePurchaseDetails:{
            hasPostalCode: "",
            closingDay: "",
            madeOffer: "",
            deadline: ""
        },
        aboutProperty:{
            propertyAge: 0,
            squareFootage: 0,
            typeOfHousing :"",
            storeyNumber: 0,
            propertyZoning: [],
            heatingSource: "",
            waterSupply: ""
        },
        employment: [],
        consentCreditCheck: "",
        extraIncome:[]
    },
    reducers:{
        haveEquityCredit(state :any,  action){
            state.haveEquityCredit = action.payload;
        },

        isFirstHome(state :any,  action){
            state.mortgage.isFirstHome = action.payload;
        },
        isWithCoApplicant(state :any,  action){
            state.mortgage.isWithCoApplicant = action.payload;
        },
        isThirdParty(state :any,  action){
            state.mortgage.isThirdParty = action.payload;
        },
        docSentMethod(state :any,  action){
            state.mortgage.docSentMethod = action.payload;
        },

        thirdPartyType(state :any,action){
            state.thirdPartyInfo.infoType = action.payload;
        },
        thirdPartyRelationshipToCustomer(state :any,  action){
            state.thirdPartyInfo.relationshipToCustomer = action.payload;
        },
        thirdPartyFirstname(state :any,  action){
            state.thirdPartyInfo.firstName = action.payload;
        },
        thirdPartyLastname(state :any,  action){
            state.thirdPartyInfo.lastName = action.payload;
        },
        thirdPartyTitle(state :any,  action){
            state.thirdPartyInfo.title = action.payload;
        },
        thirdPartyDob(state :any,  action){
            state.thirdPartyInfo.dateOfBirth = action.payload;
        },

        maritalStatus(state :any,  action){
            state.addressInfo.maritalStatus = action.payload;
        },
        numberOfDependents(state :any,  action){
            state.addressInfo.numberOfDependents = action.payload;
        },
        postalCode(state :any,  action){
            state.addressInfo.postalCode = action.payload;
        },
        streetNumber(state :any,  action){
            state.addressInfo.streetNumber = action.payload;
        },
        streetName(state :any,  action){
            state.addressInfo.streetName = action.payload;
        },
        city(state :any,  action){
            state.addressInfo.city = action.payload;
        },
        province(state :any,  action){
            state.addressInfo.province = action.payload;
        },
        livingSituation(state :any,  action){
            state.addressInfo.livingSituation = action.payload;
        },

        purchasePrice(state :any,  action){
            state.purchaseNumbers.purchasePrice = parseFloat(action.payload);
        },
        downPayment(state :any,  action){
            state.purchaseNumbers.downPayment = parseFloat(action.payload);
        },
        downPaymentFunds(state :any,  action){
            state.purchaseNumbers.downPaymentFunds.push(action.payload);
        },
        purpose(state :any,  action){
            state.purchaseNumbers.purpose = action.payload;
        },
        intendedUseOfAccount(state :any,  action){
            state.purchaseNumbers.intendedUseOfAccount = action.payload;
        },
        mortgageType(state :any,  action){
            state.purchaseNumbers.mortgageType = action.payload;
        },
        mortgageTerm(state :any,  action){
            state.purchaseNumbers.mortgageTerm = action.payload;
        },
        amortizationPeriod(state :any,  action){
            state.purchaseNumbers.amortizationPeriod = action.payload;
        },
        paymentFrequency(state :any,  action){
            state.purchaseNumbers.paymentFrequency = action.payload;
        },

        hasPostalCode(state :any,  action){
            state.homePurchaseDetails.hasPostalCode = action.payload;
        },
        closingDate(state :any,  action){
            state.homePurchaseDetails.closingDay = action.payload;
        },
        madeOffer(state :any,  action){
            state.homePurchaseDetails.madeOffer = action.payload;
        },
        deadline(state :any,  action){
            state.homePurchaseDetails.deadline = action.payload;
        },

        propertyAge(state :any,  action){
            state.aboutProperty.propertyAge = parseInt(action.payload);
        },
        squareFootage(state :any,  action){
            state.aboutProperty.squareFootage = parseFloat(action.payload);
        },
        typeOfHousing(state :any,  action){
            state.aboutProperty.typeOfHousing = action.payload;
        },
        storeyNumber(state :any,  action){
            state.aboutProperty.storeyNumber = parseInt(action.payload);
        },
        propertyZoning(state :any,  action){
            state.aboutProperty.propertyZoning.push(action.payload);
        },
        heatingSource(state :any,  action){
            state.aboutProperty.heatingSource = action.payload;
        },
        waterSupply(state :any,  action){
            state.aboutProperty.waterSupply = action.payload;
        },
        consentCreditCheck(state :any,  action){
            state.consentCreditCheck = action.payload;
        },

        addEmploymentInfo(state: any, action:any){
            state.employment.push(action.payload)
        },

        editEmploymentInfo(state: any, action:any){
            const index = state.employment.findIndex((empInfo:any)=>{
                return empInfo.id === action.payload.id;
            });
            state.employment[index] = action.payload;
        },

        deleteEmploymentInfo(state: any, action:any){
            const index = state.employment.findIndex((empInfo:any)=>{
                return empInfo.id === action.payload;
            });
            state.employment.splice(index,1)
        },

        addOtherIncome(state: any, action:any){
            state.extraIncome.push(action.payload)
        },

        deleteOtherIncome(state: any, action:any){
            const index = state.extraIncome.findIndex((income:any)=>{
                return income.id === action.payload;
            });
            state.extraIncome.splice(index,1)
        }
    }
})

export const mortgageActions = mortgageSlice.actions;

export default mortgageSlice;