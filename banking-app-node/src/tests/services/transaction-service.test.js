// transaction-service.test.js

const transactionService = require("../../main/services/transaction-service");
const transactionRepository = require("../../main/repository/transaction-repository");

// Mock the transaction repository functions
jest.mock("../../main/repository/transaction-repository");

describe("TransactionService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("notifyDeath", () => {
    it("should update the account status to deceased", async () => {
      const account = { accountNumber: "12345", status: "active" };
      transactionRepository.findAccountByAccountNumber.mockResolvedValue(
        account
      );
      transactionRepository.saveAccount.mockResolvedValue();

      const response = await transactionService.notifyDeath("12345");

      expect(response).toEqual({
        message: "Account status updated to deceased",
      });
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
      expect(transactionRepository.saveAccount).toHaveBeenCalledWith({
        ...account,
        status: "deceased",
      });
    });

    it("should throw an error if the account is not found", async () => {
      transactionRepository.findAccountByAccountNumber.mockResolvedValue(null);

      await expect(transactionService.notifyDeath("12345")).rejects.toThrow(
        "Account not found"
      );
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
    });
  });

  describe("transferToBeneficiary", () => {
    it("should transfer funds to the beneficiary if all conditions are met", async () => {
      const sendingAccount = {
        accountNumber: "12345",
        status: "deceased",
        balance: 1000,
      };
      const beneficiary = { accountNumber: "67890", name: "John Doe" };
      const beneficiaryAccount = { accountNumber: "67890", balance: 500 };

      transactionRepository.findAccountByAccountNumber.mockImplementation(
        (accountNumber) => {
          if (accountNumber === "12345") return Promise.resolve(sendingAccount);
          if (accountNumber === "67890")
            return Promise.resolve(beneficiaryAccount);
        }
      );
      transactionRepository.findBeneficiaryByAccountNumber.mockResolvedValue(
        beneficiary
      );
      transactionRepository.saveAccount.mockResolvedValue();
      transactionRepository.createTransaction.mockResolvedValue({
        sending_account_num: "12345",
        receiving_account_num: "67890",
        amount: 100,
        date: new Date(),
        description: `Transfer to beneficiary ${beneficiary.name}`,
      });

      const response = await transactionService.transferToBeneficiary(
        "12345",
        "67890",
        100
      );

      expect(response.message).toBe("Transfer successful");
      expect(response.transaction).toMatchObject({
        sending_account_num: "12345",
        receiving_account_num: "67890",
        amount: 100,
        description: `Transfer to beneficiary ${beneficiary.name}`,
      });
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledTimes(2);
      expect(
        transactionRepository.findBeneficiaryByAccountNumber
      ).toHaveBeenCalledWith("67890");
      expect(transactionRepository.saveAccount).toHaveBeenCalledTimes(2);
      expect(transactionRepository.createTransaction).toHaveBeenCalledWith(
        expect.objectContaining({
          sending_account_num: "12345",
          receiving_account_num: "67890",
          amount: 100,
        })
      );
    });

    it("should throw an error if the sending account is not found or not deceased", async () => {
      transactionRepository.findAccountByAccountNumber.mockResolvedValue(null);

      await expect(
        transactionService.transferToBeneficiary("12345", "67890", 100)
      ).rejects.toThrow("Account not found or not deceased");
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
    });

    it("should throw an error if the beneficiary is not found", async () => {
      const sendingAccount = {
        accountNumber: "12345",
        status: "deceased",
        balance: 1000,
      };
      transactionRepository.findAccountByAccountNumber.mockResolvedValue(
        sendingAccount
      );
      transactionRepository.findBeneficiaryByAccountNumber.mockResolvedValue(
        null
      );

      await expect(
        transactionService.transferToBeneficiary("12345", "67890", 100)
      ).rejects.toThrow("Beneficiary not found");
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
      expect(
        transactionRepository.findBeneficiaryByAccountNumber
      ).toHaveBeenCalledWith("67890");
    });

    it("should throw an error if there are insufficient funds", async () => {
      const sendingAccount = {
        accountNumber: "12345",
        status: "deceased",
        balance: 50,
      };
      const beneficiary = { accountNumber: "67890", name: "John Doe" };

      transactionRepository.findAccountByAccountNumber.mockResolvedValue(
        sendingAccount
      );
      transactionRepository.findBeneficiaryByAccountNumber.mockResolvedValue(
        beneficiary
      );

      await expect(
        transactionService.transferToBeneficiary("12345", "67890", 100)
      ).rejects.toThrow("Insufficient balance");
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
      expect(
        transactionRepository.findBeneficiaryByAccountNumber
      ).toHaveBeenCalledWith("67890");
    });

    it("should throw an error if the beneficiary's account is not found", async () => {
      const sendingAccount = {
        accountNumber: "12345",
        status: "deceased",
        balance: 1000,
      };
      const beneficiary = { accountNumber: "67890", name: "John Doe" };

      transactionRepository.findAccountByAccountNumber.mockResolvedValue(
        sendingAccount
      );
      transactionRepository.findBeneficiaryByAccountNumber.mockResolvedValue(
        beneficiary
      );
      transactionRepository.findAccountByAccountNumber
        .mockResolvedValueOnce(sendingAccount)
        .mockResolvedValueOnce(null);

      await expect(
        transactionService.transferToBeneficiary("12345", "67890", 100)
      ).rejects.toThrow("Beneficiary's account not found");
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("12345");
      expect(
        transactionRepository.findBeneficiaryByAccountNumber
      ).toHaveBeenCalledWith("67890");
      expect(
        transactionRepository.findAccountByAccountNumber
      ).toHaveBeenCalledWith("67890");
    });
  });
});
