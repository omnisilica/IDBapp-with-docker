const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// Define employment schema
const employmentSchema = new mongoose.Schema({
  // needed for mongoose to interpret strings into objectid when querying
  _id: {
    type: ObjectId,
    auto: true,
  },
  employmentIndustry: String,
  yearsInIndustry: Number,
  employmentType: String,
  occupation: String,
  employerName: String,
  employmentYears: Number,
  employmentMonths: Number,
  isCurrentWorkplace: String,
  employerStreetNumber: String,
  employerStreetName: String,
  employerUnit: String,
  employerCity: String,
  employerCountry: String,
  employerProvince: String,
  employerPostalCode: String,
  employerPhoneNumber: String,
  employerPhoneExt: String,
  mortgageId: {
    type: ObjectId,
    ref: 'Mortgage'
  }
});

// Define income Schema
const incomeSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    auto: true,
  },
  incomeAmount: String,
  incomeDesc: String,
  incomeFrequency: String,
  incomeType: String,
  mortgageId: {
    type: ObjectId,
    ref: 'Mortgage'
  }
});

// Define mortgage schema
const mortgageSchema = new mongoose.Schema({
  _id: {
    type: ObjectId,
    auto: true,
  },
  // Consent for credit check
  consentCreditCheck: String,

  // Mortgage Information
  mortgage: {
    isFirstHome: String,
    isWithCoApplicant: String,
    isThirdParty: String,
    docSentMethod: String,
  },

  // Third Party Information
  thirdPartyInfo: {
    informationType: String,
    relationshipToCustomer: String,
    firstName: String,
    lastName: String,
    title: String,
    dateOfBirth: Date
  },

  // Address Information
  addressInfo: {
    martialStatus: String,
    numberOfDependents: Number,
    postalCode: String,
    streetNumber: String,
    streetName: String,
    city: String,
    province: String,
    livingSituation: String
  },

  // Purchase Numbers
  purchaseNumbers: {
    purchasePrice: Number,
    downPayment: Number,
    downPaymentFunds: [String],
    purpose: String,
    intendedUseOfAccount: String,
    mortgageType: String,
    mortgageTerm: String,
    amortizationPeriod: String,
    paymentFrequency: String
  },

  // Home Purchase Details
  homePurchaseDetails: {
    hasPostalCode: String,
    closingDay: Date,
    madeOffer: String,
    deadline: Date
  },

  // Property Details
  aboutProperty: {
    propertyAge: Number,
    squareFootage: Number,
    typeOfHousing: String,
    storeyNumber: Number,
    propertyZoning: [String],
    heatingSource: String,
    waterSupply: String
  },

  haveEquityCredit: String,

  // Employment Information
  employment: [{
    type: ObjectId,
    ref: 'Employment'
  }],
  // Income information
  extraIncome: [{
    type: ObjectId,
    ref: 'Income'
  }],
});

// Create Mortgage model
const Mortgage = mongoose.model('Mortgage', mortgageSchema);
const Employment = mongoose.model('Employment', employmentSchema);
const Income = mongoose.model('Income', incomeSchema);

module.exports = { Mortgage, Employment, Income };