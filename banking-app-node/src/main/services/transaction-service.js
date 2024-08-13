const transactionRepository = require("../repository/transaction-repository");

class TransactionService {
  async notifyDeath(accountNumber) {
    const account = await transactionRepository.findAccountByAccountNumber(
      accountNumber
    );
    if (!account) {
      throw new Error("Account not found");
    }

    account.status = "deceased";
    await transactionRepository.saveAccount(account);
    return { message: "Account status updated to deceased" };
  }

  async transferToBeneficiary(accountNumber, beneficiaryAccountNumber, amount) {
    try {
      // Find the sending account by account number
      const account = await transactionRepository.findAccountByAccountNumber(
        accountNumber
      );
      if (!account || account.status !== "deceased") {
        throw new Error("Account not found or not deceased");
      }

      // Find the beneficiary by ID
      const beneficiary =
        await transactionRepository.findBeneficiaryByAccountNumber(
          beneficiaryAccountNumber
        );
      if (!beneficiary) {
        throw new Error("Beneficiary not found");
      }

      // Check if sending account has sufficient balance
      if (account.balance < amount) {
        throw new Error("Insufficient balance");
      }

      // Find the beneficiary's account by their account number
      const beneficiaryAccount =
        await transactionRepository.findAccountByAccountNumber(
          beneficiary.accountNumber
        );
      if (!beneficiaryAccount) {
        throw new Error("Beneficiary's account not found");
      }

      // Deduct the amount from the sending account and add it to the beneficiary's account
      account.balance -= amount;
      beneficiaryAccount.balance += amount;

      // Save the updated account balances
      await transactionRepository.saveAccount(account);
      await transactionRepository.saveAccount(beneficiaryAccount);

      // Create a transaction record
      const transactionData = {
        sending_account_num: account.accountNumber,
        receiving_account_num: beneficiary.accountNumber,
        amount,
        date: new Date(),
        description: `Transfer to beneficiary ${beneficiary.name}`,
      };

      const transaction = await transactionRepository.createTransaction(
        transactionData
      );
      return { message: "Transfer successful", transaction };
    } catch (error) {
      console.error("Error during transfer:", error);
      throw new Error(`Transaction failed: ${error.message}`);
    }
  }
}

module.exports = new TransactionService();
