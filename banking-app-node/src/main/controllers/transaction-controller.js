const Transaction = require("../model/transaction-model");
const accountService = require("../services/account-service");
const transactionService = require("../services/transaction-service");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

async function transferFunds(req, res) {
  const { sending_account_num, receiving_account_num, amount } = req.body;

  try {
    const sendingAccount = await accountService.getAccountByAccountNumber(
      sending_account_num
    );
    const receivingAccount = await accountService.getAccountByAccountNumber(
      receiving_account_num
    );

    if (!sendingAccount || !receivingAccount) {
      return res.status(404).json({ error: "Account not found" });
    }

    if (sendingAccount.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    // Update the account balances
    sendingAccount.balance -= amount;
    receivingAccount.balance += amount;

    await sendingAccount.save();
    await receivingAccount.save();

    // Create a transfer record
    const transfer = new Transaction({
      name: "Transfer between own accounts",
      sending_account_num,
      receiving_account_num,
      amount,
      date: new Date(),
    });

    await transfer.save();

    res.status(200).json({ message: "Transfer successful", transfer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function transferToBeneficiary(req, res) {
  // Extracts accountNumber, beneficiaryId, and amount from the request body
  const { accountNumber, beneficiaryId, amount } = req.body;

  try {
    if (!ObjectId.isValid(beneficiaryId)) {
      throw new Error("Invalid beneficiary ID format");
    }

    const transfer = await transactionService.transferToBeneficiary(
      accountNumber,
      beneficiaryId,
      amount
    );

    res.status(200).json(transfer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function notifyDeath(req, res) {
  const { accountNumber } = req.params;

  try {
    const response = await transactionService.notifyDeath(accountNumber);

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTransactionsByAccountNumber(req, res) {
  try {
    const { accountNumber } = req.params; // Assuming the route parameter is named `accountNumber`
    const transactions = await Transaction.find({
      $or: [
        { sending_account_num: accountNumber },
        { receiving_account_num: accountNumber },
      ],
    });

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTransactionById(req, res) {
  try {
    const { transactionId } = req.params; // Assuming the route parameter is named `transactionId`
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    res.status(200).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  transferFunds,
  getTransactionById,
  getTransactionsByAccountNumber,
  transferToBeneficiary,
  notifyDeath,
};
