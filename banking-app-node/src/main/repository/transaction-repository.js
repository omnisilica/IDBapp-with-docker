const Transaction = require("../model/transaction-model");
const Beneficiary = require("../model/beneficiary-model");
const Account = require("../model/account-model");

class TransactionRepository {
  async createTransaction(transactionData) {
    const transaction = new Transaction(transactionData);
    return await transaction.save();
  }

  async getTransactionById(transactionId) {
    return await Transaction.findById(transactionId);
  }

  async getTransactionsByAccountNumber(accountNumber) {
    return await Transaction.find({
      $or: [
        { sending_account_num: accountNumber },
        { receiving_account_num: accountNumber },
      ],
    });
  }

  async findAccountByAccountNumber(accountNumber) {
    console.log(
      `==============Finding account with account number: ${accountNumber} ==========================`
    );
    const account = await Account.findOne({ accountNumber });
    console.log("******************Found account with data:", account);
    return account;
  }

  async findBeneficiaryByAccountNumber(beneficiaryId) {
    console.log(`Finding beneficiary with ID: ${beneficiaryId}`);
    const beneficiary = await Beneficiary.findById(beneficiaryId);
    console.log("Found beneficiary:", beneficiary); // Add this line
    return beneficiary;
  }

  async saveAccount(account) {
    return await account.save();
  }
}

module.exports = new TransactionRepository();
