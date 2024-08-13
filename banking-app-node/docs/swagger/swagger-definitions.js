// Swagger schema definitions

module.exports = {
  Mortgage: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "The ID of the mortgage",
      },
      consentCreditCheck: {
        type: "string",
        description: "Consent for credit check",
      },
      mortgage: {
        type: "object",
        properties: {
          isFirstHome: {
            type: "string",
            description: "Is this the first home",
          },
          isWithCoApplicant: {
            type: "string",
            description: "Is with co-applicant",
          },
          isThirdParty: {
            type: "string",
            description: "Is third party involved",
          },
          docSentMethod: {
            type: "string",
            description: "Method of sending document",
          },
        },
      },
      thirdPartyInfo: {
        type: "object",
        properties: {
          informationType: {
            type: "string",
            description: "Type of information",
          },
          relationshipToCustomer: {
            type: "string",
            description: "Relationship to customer",
          },
          firstName: {
            type: "string",
            description: "First name",
          },
          lastName: {
            type: "string",
            description: "Last name",
          },
          title: {
            type: "string",
            description: "Title",
          },
        },
      },
      addressInfo: {
        type: "object",
        properties: {
          martialStatus: {
            type: "string",
            description: "Martial Status",
          },
          numberOfDependents: {
            type: "number",
            description: "Number of dependents",
          },
          postalCode: {
            type: "string",
            description: "Postal code",
          },
          streetNumber: {
            type: "string",
          },
          streetName: {
            type: "string",
          },
          city: {
            type: "string",
          },
          province: {
            type: "string",
          },
          livingSituation: {
            type: "string",
          },
        },
      },
      purchaseNumbers: {
        type: "object",
        properties: {
          purchasePrice: {
            type: "number",
            description: "Purchase price",
          },
          downPayment: {
            type: "number",
            description: "Down payment",
          },
          downPaymentFunds: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Funds for down payment",
          },
          purpose: {
            type: "string",
            description: "Purpose of the mortgage",
          },
          intendedUseOfAccount: {
            type: "string",
            description: "Intended use of the mortgage account",
          },
          mortgageType: {
            type: "string",
            description: "Type of mortgage",
          },
          mortgageTerm: {
            type: "string",
            description: "Term of the mortgage",
          },
          amortizationPeriod: {
            type: "string",
            description: "Amortization period of the mortgage",
          },
          paymentFrequency: {
            type: "string",
            description: "Frequency of mortgage payments",
          },
        },
      },
      homePurchaseDetails: {
        type: "object",
        properties: {
          hasPostalCode: {
            type: "string",
            description: "Has postal code",
          },
          closingDay: {
            type: "string",
            format: "date",
            description: "Closing day",
          },
          madeOffer: {
            type: "string",
            description: "Made offer",
          },
          deadline: {
            type: "string",
            format: "date",
            description: "Deadline",
          },
        },
      },
      aboutProperty: {
        type: "object",
        properties: {
          propertyAge: {
            type: "number",
            description: "Property age",
          },
          squareFootage: {
            type: "number",
            description: "Square footage",
          },
          typeOfHousing: {
            type: "string",
            description: "Type of housing",
          },
          storeyNumber: {
            type: "number",
            description: "Storey number",
          },
          propertyZoning: {
            type: "array",
            items: {
              type: "string",
            },
            description: "Property zoning",
          },
          heatingSource: {
            type: "string",
            description: "Heating source",
          },
          waterSupply: {
            type: "string",
            description: "Water supply",
          },
        },
      },
      haveEquityCredit: {
        type: "string",
        description: "Have equity credit",
      },
      employment: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Employment",
        },
      },
      extraIncome: {
        type: "array",
        items: {
          $ref: "#/components/schemas/Income",
        },
      },
    },
  },
  Employment: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "The ID of the employment",
      },
      employmentIndustry: {
        type: "string",
        description: "The industry of employment",
      },
      yearsInIndustry: {
        type: "integer",
        description: "The number of years in the industry",
      },
      employmentType: {
        type: "string",
        description: "The type of employment",
      },
      occupation: {
        type: "string",
        description: "The occupation",
      },
      employerName: {
        type: "string",
        description: "The name of the employer",
      },
      employmentYears: {
        type: "integer",
        description: "The number of years of employment",
      },
      employmentMonths: {
        type: "integer",
        description: "The number of months of employment",
      },
      isCurrentWorkplace: {
        type: "string",
        description: "Is this the current workplace",
      },
      employerStreetNumber: {
        type: "string",
        description: "The street number of the employer",
      },
      employerStreetName: {
        type: "string",
        description: "The street name of the employer",
      },
      employerUnit: {
        type: "string",
        description: "The unit of the employer",
      },
      employerCity: {
        type: "string",
        description: "The city of the employer",
      },
      employerCountry: {
        type: "string",
        description: "The country of the employer",
      },
      employerProvince: {
        type: "string",
        description: "The province of the employer",
      },
      employerPostalCode: {
        type: "string",
        description: "The postal code of the employer",
      },
      employerPhoneNumber: {
        type: "string",
        description: "The phone number of the employer",
      },
      employerPhoneExt: {
        type: "string",
        description: "The phone extension of the employer",
      },
      mortgageId: {
        type: "string",
        description: "The ID of the associated mortgage",
      },
    },
  },
  Income: {
    type: "object",
    properties: {
      _id: {
        type: "string",
        description: "The ID of the income",
      },
      incomeAmount: {
        type: "string",
        description: "The amount of the income",
      },
      incomeDesc: {
        type: "string",
        description: "The description of the income",
      },
      incomeFrequency: {
        type: "string",
        description: "The frequency of the income",
      },
      incomeType: {
        type: "string",
        description: "The type of the income",
      },
      mortgageId: {
        type: "string",
        description: "The ID of the associated mortgage",
      },
    },
  },
  Beneficiaries: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the beneficiary",
      },
      relationship: {
        type: "string",
        description: "Relationship with the beneficiary",
      },
      bank: {
        type: "string",
        description: "Bank of the beneficiary",
      },
      accountNumber: {
        type: "string",
        description: "Account number of the beneficiary",
      },
      routingNumber: {
        type: "string",
        description: "Routing number of the beneficiary",
      },
      nickname: {
        type: "string",
        description: "Nickname of the beneficiary",
      },
    },
  },
};
