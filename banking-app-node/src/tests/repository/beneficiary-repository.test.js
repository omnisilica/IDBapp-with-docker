const Beneficiary = require("../../main/model/beneficiary-model");
const beneficiaryRepository = require("../../main/repository/beneficiary-repository");

jest.mock("../../main/model/beneficiary-model");

describe("BeneficiaryRepository", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("createBeneficiary", () => {
    it("should create a new beneficiary", async () => {
      const customerId = "60c72b2f9b1e8b2f9c8b4567";
      const beneficiaryData = {
        name: "John Doe",
        relationship: "Friend",
        bank: "Bank of Test",
        accountNumber: "123456789",
        routingNumber: "987654321",
        nickname: "JD",
      };
      const mockSave = jest.fn().mockResolvedValue(beneficiaryData);
      Beneficiary.mockImplementation(() => ({
        save: mockSave,
      }));

      const result = await beneficiaryRepository.createBeneficiary(
        customerId,
        beneficiaryData
      );

      expect(Beneficiary).toHaveBeenCalledWith({
        customer_id: customerId,
        name: beneficiaryData.name,
        relationship: beneficiaryData.relationship,
        bank: beneficiaryData.bank,
        accountNumber: beneficiaryData.accountNumber,
        routingNumber: beneficiaryData.routingNumber,
        nickname: beneficiaryData.nickname,
      });
      expect(mockSave).toHaveBeenCalled();
      expect(result).toEqual(beneficiaryData);
    });
  });

  describe("findAllBeneficiaries", () => {
    it("should return all beneficiaries", async () => {
      const beneficiaries = [{ name: "John Doe" }, { name: "Jane Doe" }];
      Beneficiary.find.mockResolvedValue(beneficiaries);

      const result = await beneficiaryRepository.findAllBeneficiaries();

      expect(Beneficiary.find).toHaveBeenCalled();
      expect(result).toEqual(beneficiaries);
    });
  });

  describe("findAllBeneficiariesByCustomerId", () => {
    it("should return beneficiaries for the given customer ID", async () => {
      const customerId = "60c72b2f9b1e8b2f9c8b4567";
      const beneficiaries = [{ name: "John Doe", customer_id: customerId }];
      Beneficiary.find.mockResolvedValue(beneficiaries);

      const result =
        await beneficiaryRepository.findAllBeneficiariesByCustomerId(
          customerId
        );

      expect(Beneficiary.find).toHaveBeenCalledWith({
        customer_id: customerId,
      });
      expect(result).toEqual(beneficiaries);
    });
  });

  describe("findByBeneficiaryId", () => {
    it("should return the beneficiary for the given customer ID and beneficiary ID", async () => {
      const customerId = "60c72b2f9b1e8b2f9c8b4567";
      const beneficiaryId = "60c72b3a9b1e8b2f9c8b4568";
      const beneficiary = {
        name: "John Doe",
        customer_id: customerId,
        _id: beneficiaryId,
      };
      Beneficiary.findOne.mockResolvedValue(beneficiary);

      const result = await beneficiaryRepository.findByBeneficiaryId(
        customerId,
        beneficiaryId
      );

      expect(Beneficiary.findOne).toHaveBeenCalledWith({
        customer_id: customerId,
        _id: beneficiaryId,
      });
      expect(result).toEqual(beneficiary);
    });
  });

  describe("updateBeneficiary", () => {
    it("should update the beneficiary with the given data", async () => {
      const customerId = "60c72b2f9b1e8b2f9c8b4567";
      const beneficiaryId = "60c72b3a9b1e8b2f9c8b4568";
      const updatedData = { name: "John Doe Updated" };
      const updatedBeneficiary = {
        name: "John Doe Updated",
        customer_id: customerId,
        _id: beneficiaryId,
      };
      Beneficiary.findOneAndUpdate.mockResolvedValue(updatedBeneficiary);

      const result = await beneficiaryRepository.updateBeneficiary(
        customerId,
        beneficiaryId,
        updatedData
      );

      expect(Beneficiary.findOneAndUpdate).toHaveBeenCalledWith(
        { _id: beneficiaryId, customer_id: customerId },
        updatedData,
        { new: true }
      );
      expect(result).toEqual(updatedBeneficiary);
    });
  });

  describe("deleteByBeneficiaryId", () => {
    it("should delete the beneficiary with the given customer ID and beneficiary ID", async () => {
      const customerId = "60c72b2f9b1e8b2f9c8b4567";
      const beneficiaryId = "60c72b3a9b1e8b2f9c8b4568";
      Beneficiary.deleteOne.mockResolvedValue({ deletedCount: 1 });

      const result = await beneficiaryRepository.deleteByBeneficiaryId(
        customerId,
        beneficiaryId
      );

      expect(Beneficiary.deleteOne).toHaveBeenCalledWith({
        _id: beneficiaryId,
        customer_id: customerId,
      });
      expect(result).toEqual({ deletedCount: 1 });
    });
  });
});
