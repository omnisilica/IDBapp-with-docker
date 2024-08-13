const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");
const transactionService = require("../services/transaction-service");

// Route to initiate a fund transfer between accounts
router.post("/transfer", transactionController.transferFunds);

// Route to get transactions by account number
router.get(
  "/account/:accountNumber",
  transactionController.getTransactionsByAccountNumber
);

// Route to get transaction by ID
router.get("/:transactionId", transactionController.getTransactionById);

// Transfer funds to a beneficiary
router.post(
  "/transfer-to-beneficiary",
  transactionController.transferToBeneficiary
);

// Route for updating account status to deceased
router.put("/notify-death/:accountNumber", async (req, res) => {
  const { accountNumber } = req.params;
  try {
    const result = await transactionService.notifyDeath(accountNumber);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
