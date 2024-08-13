const request = require("supertest");
const express = require("express");
const router = require("../../main/routes/transaction-routes");
const accountService = require("../../main/services/account-service");
const transactionService = require("../../main/services/transaction-service");
const Transaction = require("../../main/model/transaction-model");

jest.mock("../../main/services/account-service");
jest.mock("../../main/services/transaction-service");
jest.mock("../../main/model/transaction-model");

const app = express();
app.use(express.json());
app.use("/transactions", router);

describe("TransactionController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should transfer funds between accounts", async () => {
    accountService.getAccountByAccountNumber
      .mockResolvedValueOnce({ balance: 500, save: jest.fn() })
      .mockResolvedValueOnce({ balance: 300, save: jest.fn() });

    Transaction.prototype.save = jest.fn().mockResolvedValue({});

    const response = await request(app).post("/transactions/transfer").send({
      sending_account_num: "123",
      receiving_account_num: "456",
      amount: 200,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Transfer successful");
  });

  it("should get transactions by account number", async () => {
    Transaction.find.mockResolvedValue([
      { sending_account_num: "123", amount: 100 },
      { receiving_account_num: "123", amount: 200 },
    ]);

    const response = await request(app).get("/transactions/account/123");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
  });

  it("should get transaction by ID", async () => {
    Transaction.findById.mockResolvedValue({
      sending_account_num: "123",
      receiving_account_num: "456",
      amount: 200,
    });

    const response = await request(app).get("/transactions/123");

    expect(response.status).toBe(200);
    expect(response.body.amount).toBe(200);
  });

  it("should transfer funds to a beneficiary", async () => {
    transactionService.transferToBeneficiary.mockResolvedValue({
      message: "Transfer to beneficiary successful",
    });

    const response = await request(app)
      .post("/transactions/transfer-to-beneficiary")
      .send({
        accountNumber: "123",
        beneficiaryId: "60f5ad4d53b4b900178b6d3b", // Ensure this is a valid ObjectId
        amount: 100,
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Transfer to beneficiary successful");
  });

  it("should notify death of account holder", async () => {
    transactionService.notifyDeath.mockResolvedValue({
      message: "Account status updated to deceased",
    });

    const response = await request(app).put("/transactions/notify-death/123");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Account status updated to deceased");
  });

  it("should handle errors when transferring to a beneficiary with invalid ID", async () => {
    transactionService.transferToBeneficiary.mockRejectedValue(
      new Error(
        'Transaction failed: Cast to ObjectId failed for value "0000000000000018" (type string) at path "_id" for model "Beneficiary"'
      )
    );

    const response = await request(app)
      .post("/transactions/transfer-to-beneficiary")
      .send({
        accountNumber: "123",
        beneficiaryId: "0000000000000018", // Invalid ObjectId
        amount: 100,
      });

    expect(response.status).toBe(500);
    expect(response.body.error).toBe("Invalid beneficiary ID format");
  });
});
