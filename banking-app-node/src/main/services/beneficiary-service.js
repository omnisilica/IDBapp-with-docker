const beneficiaryRepository = require("../repository/beneficiary-repository");
const mongoose = require("mongoose");

class BeneficiaryService {
  async createBeneficiary(customerId, beneficiaryData) {
    console.log("customerId:", customerId);
    console.log("beneficiaryData: ", beneficiaryData);
    return beneficiaryRepository.createBeneficiary(customerId, beneficiaryData);
  }

  async getAllBeneficiaries(customerId) {
    return beneficiaryRepository.findAllBeneficiariesByCustomerId(customerId);
  }

  async getBeneficiary(customerId, beneficiaryId) {
    if (
      !mongoose.Types.ObjectId.isValid(customerId) ||
      !mongoose.Types.ObjectId.isValid(beneficiaryId)
    ) {
      throw new Error("Invalid ObjectId format");
    }
    return beneficiaryRepository.findByBeneficiaryId(customerId, beneficiaryId);
  }

  async updateBeneficiary(customerId, beneficiaryId, updatedData) {
    try {
      console.log("Updating beneficiary. Customer ID:", customerId);
      console.log("Updating beneficiary. Beneficiary ID:", beneficiaryId);
      console.log("Updating beneficiary. Updated data:", updatedData);

      const updatedBeneficiary = await beneficiaryRepository.updateBeneficiary(
        customerId,
        beneficiaryId,
        updatedData
      );

      console.log("Updated beneficiary:", updatedBeneficiary);

      if (!updatedBeneficiary) {
        throw new Error("Beneficiary not found.");
      }

      return updatedBeneficiary;
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      throw error;
    }
  }

  async deleteBeneficiary(customerId, beneficiaryId) {
    if (
      !mongoose.Types.ObjectId.isValid(customerId) ||
      !mongoose.Types.ObjectId.isValid(beneficiaryId)
    ) {
      throw new Error("Invalid ObjectId format");
    }

    const deletionResult = await beneficiaryRepository.deleteByBeneficiaryId(
      customerId,
      beneficiaryId
    );

    if (deletionResult.deletedCount === 0) {
      throw new Error("Beneficiary not found");
    }

    return { message: "Beneficiary deleted successfully" };
  }
}

module.exports = new BeneficiaryService();
