const Beneficiary = require("../model/beneficiary-model");

class BeneficiaryRepository {
  async createBeneficiary(customerId, beneficiaryData) {
    const beneficiary = new Beneficiary({
      customer_id: customerId,
      name: beneficiaryData.name,
      relationship: beneficiaryData.relationship,
      bank: beneficiaryData.bank,
      accountNumber: beneficiaryData.accountNumber,
      routingNumber: beneficiaryData.routingNumber,
      nickname: beneficiaryData.nickname,
    });
    return beneficiary.save();
  }

  async findAllBeneficiaries() {
    return Beneficiary.find();
  }

  async findAllBeneficiariesByCustomerId(customerId) {
    return Beneficiary.find({ customer_id: customerId });
  }

  async findByBeneficiaryId(customerId, beneficiaryId) {
    console.log("customerId: ", customerId);
    console.log("beneficiaryId: ", beneficiaryId);
    return Beneficiary.findOne({ customer_id: customerId, _id: beneficiaryId });
  }

  async updateBeneficiary(customerId, beneficiaryId, updatedData) {
    try {
      console.log(
        "Updating beneficiary (repository). Customer ID:",
        customerId
      );
      console.log(
        "Updating beneficiary (repository). Beneficiary ID:",
        beneficiaryId
      );

      const updatedBeneficiary = await Beneficiary.findOneAndUpdate(
        { _id: beneficiaryId, customer_id: customerId },
        updatedData,
        { new: true } // return updated doc
      );

      console.log("Updated beneficiary:", updatedBeneficiary);

      return updatedBeneficiary;
    } catch (error) {
      throw new Error("Error updating beneficiary: " + error.message);
    }
  }

  async deleteByBeneficiaryId(customerId, beneficiaryId) {
    console.log("customerId: ", customerId);
    console.log("beneficiaryId: ", beneficiaryId);
    return Beneficiary.deleteOne({
      _id: beneficiaryId,
      customer_id: customerId,
    });
  }
}

module.exports = new BeneficiaryRepository();
