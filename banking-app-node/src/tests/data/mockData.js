const mockMortgageData = {
    // Consent for credit check
    consentCreditCheck: "true",

    // Mortgage Information
    mortgage: {
        isFirstHome: "true",
        isWithCoApplicant: "false",
        isThirdParty: "false",
        docSentMethod: 'Email',
    },

    extraIncome: [{
        incomeAmount: "12000",
        incomeDesc: "Spice",
        incomeFrequency: "Monthly",
        incomeType: "Seasonal",
    }],

    // Third Party Information
    thirdPartyInfo: {
        informationType: 'None',
        relationshipToCustomer: '',
        firstName: 'Joe',
        lastName: 'Conner',
        title: 'Quality Engineer',
        dateOfBirth: new Date('2000-01-01')
    },

    // Address Information
    addressInfo: {
        martialStatus: 'Single',
        numberOfDependents: 0,
        postalCode: 'A1A 1A1',
        streetNumber: '123',
        streetName: 'Main St',
        city: 'City',
        province: 'Province',
        livingSituation: 'Renting'
    },

    // Purchase Numbers
    purchaseNumbers: {
        purchasePrice: 300000,
        downPayment: 60000,
        downPaymentFunds: ['Savings', 'Investment'],
        purpose: 'Purchase',
        intendedUseOfAccount: 'Primary Residence',
        mortgageType: 'Fixed Rate',
        mortgageTerm: '5 years',
        amortizationPeriod: '25 years',
        paymentFrequency: 'Monthly'
    },

    // Home Purchase Details
    homePurchaseDetails: {
        hasPostalCode: true,
        closingDay: new Date('2024-05-01'), 
        madeOffer: true,
        deadline: new Date('2024-04-30') 
    },

    // Property Details
    aboutProperty: {
        propertyAge: 10,
        squareFootage: 2000,
        typeOfHousing: 'Detached',
        storeyNumber: 2,
        propertyZoning: ['Residential'],
        heatingSource: 'Gas',
        waterSupply: 'Municipal'
    },

    // Employment Information
    employment: [
        {
            employmentIndustry: 'Technology',
            yearsInIndustry: 5,
            employmentType: 'Full-time',
            occupation: 'Software Engineer',
            employerName: 'Tech Company',
            employmentYears: 3,
            employmentMonths: 6,
            isCurrentWorkplace: true,
            employerStreetNumber: '456',
            employerStreetName: 'Tech St',
            employerUnit: 'Suite 100',
            employerCity: 'Tech City',
            employerCountry: 'Canada',
            employerProvince: 'Tech Province',
            employerPostalCode: 'B2B 2B2',
            employerPhoneNumber: '123-456-7890',
            employerPhoneExt: '1234'
        }
    ],

    haveEquityCredit: "",

    extraIncome: [{
        incomeAmount: "12000",
        incomeDesc: "Spice",
        incomeFrequency: "Monthly",
        incomeType: "Seasonal"
    }],
};

module.exports = mockMortgageData;
