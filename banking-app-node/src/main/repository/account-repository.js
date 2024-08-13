// Purpose: Import the database schema here and implement basic CRUD functions

// Imports
const Account = require('../model/account-model');

// Main
class AccountRepository{

    // Asynchronous function to create a new account
    async createAccount(accountData) {
        try {
            return await Account.create(accountData);
        } catch (error) {
            throw new Error(`Error creating account ${error.message}`);
        }
    }

    // Asynchronous function to retrieve all accounts
    async getAllAccounts() {
        try {
            return await Account.find();
        }
        catch (error) {
            throw new Error(`Error getting all accounts: ${error.message}`);
            
        }
    }

    async getAllAccountsFromCustomer(customer_id) {
        try {
            return await Account.find({'customer_id': customer_id});
        } catch (error) {
            throw new Error(`Error getting all accounts belonging to customer ${customer_id}: ${error.message}`);
        }
    }

    // Asynchronous function to retrieve an account by accountNumber
    async getAccountByAccountNumber(accountNumber) {
        try {
            return await Account.findOne({ accountNumber });
        } catch (error) {
            throw new Error(`Error getting account ${error.message}`);
        }
    }

    //Asynchronous function to retrieve accountNumber and balance by accountNumber
    async getAccountBalanceByAccountNumber(accountNumber) {
        try {
            return await Account.findOne({ accountNumber }).select('accountNumber balance -_id');
        } catch (error) {
            throw new Error(`Error getting account balance ${error.message}`);
        }
    }

    // Asynchronous function to update an account
    async updateAccount(accountNumber, accountData) {
        try {
            return await Account.findOneAndUpdate({ accountNumber }, accountData, { new: true });
        } catch (error) {
            throw new Error(`Error updating account ${error.message}`);
        }
    }

    // Asynchronous function to delete an account
    async deleteAccount(accountNumber) {
        try {
            return await Account.findOneAndDelete({ accountNumber });
        } catch (error) {
            throw new Error(`Error deleting account ${error.message}`);
        }
    }
}

// Export
module.exports = new AccountRepository();
