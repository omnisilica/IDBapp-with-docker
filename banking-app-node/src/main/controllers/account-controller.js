// Purpose: Process incoming http requests, interacts with service layer and sends responses back to the client

// Imports
const express = require("express");
const AccountService = require("../services/account-service");
const Account = require("../model/account-model");

// Variables
// Use a router to handle incoming requests with the service
const router = express.Router();

// Function to create a new account
async function createAccount(request, response) {
    const accountData = request.body;
    try {

        console.log(accountData);

        // Check if the account type is valid
        if (accountData.accountType !== "chequing" && accountData.accountType !== "savings" && accountData.accountType !== "business" ) {
            return response.status(400).json({ error: "Account type is invalid. Possible values are: 'chequing', 'savings' or 'business' " });
        }

        // Check if the balance is negative
        if (accountData.balance < 0) {
            return response.status(400).json({ error: "Balance cannot be negative" });
        }

        // Check if the ineterest is negative
        if (accountData.interestRate < 0) {
            return response.status(400).json({ error: "Interest rate cannot be negative" });
        }

        // Create account only if validation passed
        const account = await AccountService.createAccount(accountData);
        
        // Send status code 201 together with newly created account to indicate that document has been created successfully
        response.status(201).json(account);

    } catch (error) {
  
        // Send status code 500 to indicate that an issue has been encountered with the server-side while processing the request
        response.status(500).json({ error: error.message });
        console.error("Error: ", error);
    }
}


// Function to get all accounts
async function getAllAccounts(request, response) {
    try {
        // Call the service to get all accounts
        const accounts = await AccountService.getAllAccounts();
        // Send status code 200 together with all accounts to indicate that the request has been successfully processed
        response.status(200).json(accounts);
        // Catch any errors and send status code 500 to indicate that an issue has been encountered with the server-side while processing the request
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

async function getAccounstFromCustomerById(request, response) {
    customer_id = request.params.customerId;

    try {
        const accounts = await AccountService.getAllAccountsFromCustomerbyId(customer_id);

        if (accounts.length === 0) {
            response.status(404).json({error: "No accounts were found with the given customer id"});
        } else {
            response.status(200).json({accounts});
        }
    } catch (error) {
        response.status(500).json({ error: error });
    }
}

// Function to get account by accountNumber
async function getAccountByAccountNumber(request, response) {
    const accountNumber = request.params.accountNumber;
    try {

        // Check if the account exists before attempting to get account
        const existingAccount = await AccountService.getAccountByAccountNumber(accountNumber);
        if (!existingAccount) {
            // If the account does not exist, return a 404 Not Found error
            return response.status(404).json({ error: "Account not found" });
        }
        
        response.status(200).json(existingAccount);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

// Function to get accountNumber and balance by accountNumber
async function getAccountBalanceByAccountNumber(request, response) {
    const accountNumber = request.params.accountNumber;
    try {
        // Check if the account exists before attempting to read the balance
        const existingAccount = await AccountService.getAccountByAccountNumber(accountNumber);
        if (!existingAccount) {
            // If the account does not exist, return a 404 Not Found error
            return response.status(404).json({ error: "Account not found" });
        }
    const balance = await AccountService.getAccountBalanceByAccountNumber(accountNumber);
        response.status(200).json(balance);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

// Function to update account by accountNumber
async function updateAccount(request, response) {
    const accountNumber = request.params.accountNumber;
    const accountData = request.body;
    try {

        // Check if the account exists before attempting to update
        const existingAccount = await AccountService.getAccountByAccountNumber(accountNumber);
        if (!existingAccount) {
            // If the account does not exist, return a 404 Not Found error
            return response.status(404).json({ error: "Account not found" });
        }
        
        // Check if user is attempting to change account number
        if (accountData.accountNumber) {
            return response.status(400).json({ error: "Account number cannot be updated " });
        }

        // Check if user is attempting to change account type
        if (accountData.accountType) {
            return response.status(400).json({ error: "Account type cannot be updated " });
        }

        // Check if the ineterest is negative
        if (accountData.interestRate < 0) {
            return response.status(400).json({ error: "Interest rate cannot be negative" });
        }

        // Check if the balance is negative
        if (accountData.balance < 0) {
            return response.status(400).json({ error: "Balance cannot be negative" });
        }
        
        const account = await AccountService.updateAccount(accountNumber, accountData);
        response.status(200).json(account);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}
// Function to delete account by accountNumber
async function deleteAccount(request, response) {
    const accountNumber = request.params.accountNumber;
    try {
        // Check if the account exists before attempting to delete
        const existingAccount = await AccountService.getAccountByAccountNumber(accountNumber);
        if (!existingAccount) {
            // If the account does not exist, return a 404 Not Found error
            return response.status(404).json({ error: "Account not found" });
        }
        const account = await AccountService.deleteAccount(accountNumber);
        response.status(200).json(account);
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
}

// Handles POST request to create a new account
router.post('/', createAccount);

// Handles GET request to get all accounts
router.get('/', getAllAccounts);

// Handles GET request to get account by accountNumber
router.get('/:accountNumber', getAccountByAccountNumber);

// Handles GET request for getting all accounts from a single account holder
router.get('/customer/:customerId', getAccounstFromCustomerById)

// Handles GET request to get account balance by accountNumber
router.get('/:accountNumber/balance', getAccountBalanceByAccountNumber);

// Handles PUT request to update an account
router.put('/:accountNumber', updateAccount);

// Handles DELETE request to delete an account
router.delete('/:accountNumber', deleteAccount);

// Export
module.exports = router;
