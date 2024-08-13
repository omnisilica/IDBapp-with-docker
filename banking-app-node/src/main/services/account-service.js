// Purpose: Import the repository here and handle complex buisness logic

// Imports
const AccountRepository = require('../repository/account-repository');


class AccountService {

    // Asynchronous function to create a new account
    async createAccount(accountData){
        try {
            return await AccountRepository.createAccount(accountData);
        } catch (error) {
            throw new Error(`Error creating account: ${error.message}`);
        }
    }

    // Asynchronous function to retrieve all accounts
    async getAllAccounts() {
        try {
            return await AccountRepository.getAllAccounts();
        } catch (error) {
            throw new Error(`Error getting all accounts: ${error.message}`);
        }
    }

    // Asynchronous function to retrieve all accouts from a custromer with customer ID
    async getAllAccountsFromCustomerbyId(customer_id) {
        try {
            return await AccountRepository.getAllAccountsFromCustomer(customer_id);
        } catch (error) {
            throw new Error(`Service Error getting all accounts from customer ${customer_id}: ${error.message}`);
        }
    }

    // Asynchronous function to retrieve an account by accountNumber
    async getAccountByAccountNumber(accountNumber) {
        try {
            return await AccountRepository.getAccountByAccountNumber(accountNumber);
        } catch (error) {
            throw new Error(`Error getting account: ${error.message}`);
        }
    }

    // Asynchronous function to retrieve accountNumber and balance by accountNumber
    async getAccountBalanceByAccountNumber(accountNumber) {
        try {
            return await AccountRepository.getAccountBalanceByAccountNumber(accountNumber);
        } catch (error) {
            throw new Error(`Error getting account balance: ${error.message}`);
        }
    }

    // Asynchronous function to update an account
    async updateAccount(accountNumber, accountData) {
        try {
            return await AccountRepository.updateAccount(accountNumber, accountData);
        } catch (error) {
            throw new Error(`Error updating account: ${error.message}`);
        }
    }

    // Asynchronous function to delete an account
    async deleteAccount(accountNumber) {
        try {
            return await AccountRepository.deleteAccount(accountNumber);
        } catch (error) {
            throw new Error(`Error deleting account: ${error.message}`);
        }
    }
}

// Export
module.exports = new AccountService();

