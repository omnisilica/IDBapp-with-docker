const express = require("express");
const beneficiaryService = require("../services/beneficiary-service");
const router = express.Router();
const mongoose = require("mongoose");

class BeneficiaryController {
  constructor() {
    this.createBeneficiary = this.createBeneficiary.bind(this);
    this.getAllBeneficiaries = this.getAllBeneficiaries.bind(this);
    this.getBeneficiary = this.getBeneficiary.bind(this);
    this.deleteBeneficiary = this.deleteBeneficiary.bind(this);
    this.updateBeneficiary = this.updateBeneficiary.bind(this);

    router.post("/:customerId", this.createBeneficiary);
    router.get("/:customerId", this.getAllBeneficiaries);
    router.get("/:customerId/:beneficiaryId", this.getBeneficiary);
    router.put("/:customerId/:beneficiaryId", this.updateBeneficiary);
    router.delete("/:customerId/:beneficiaryId", this.deleteBeneficiary);
  }

  async createBeneficiary(req, res) {
    try {
      const { customerId } = req.params;
      console.log("customerId: ==========", customerId);
      console.log("req.body: ========", req.body);
      const isValidObjectId = mongoose.Types.ObjectId.isValid(customerId);
      if (!isValidObjectId) {
        return res.status(400).json({ message: "Invalid customerId format" });
      }
      const beneficiary = await beneficiaryService.createBeneficiary(
        customerId,
        req.body
      );
      res.status(201).json(beneficiary);
    } catch (error) {
      console.error("Error createBeneficiary beneficiary:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getAllBeneficiaries(req, res) {
    try {
      const { customerId } = req.params;
      const isValidObjectId = mongoose.Types.ObjectId.isValid(customerId);
      if (!isValidObjectId) {
        return res.status(400).json({ message: "Invalid customerId format" });
      }
      const beneficiaries = await beneficiaryService.getAllBeneficiaries(
        customerId
      );
      res.status(200).json(beneficiaries);
    } catch (error) {
      console.log("Error getAllBeneficiaries beneficiary:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async getBeneficiary(req, res) {
    try {
      const { customerId, beneficiaryId } = req.params;
      const beneficiary = await beneficiaryService.getBeneficiary(
        customerId,
        beneficiaryId
      );
      console.log(
        `Fetching beneficiary with beneficiaryId: ${req.params.beneficiaryId} and customerId: ${req.params.customerId}`
      );
      if (beneficiary) {
        res.status(200).json(beneficiary);
      } else {
        console.log(`req.param.beneficiaryId:  ${req.params.beneficiaryId}`);
        res.status(404).json({ message: "Beneficiary not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateBeneficiary(req, res) {
    try {
      const { customerId, beneficiaryId } = req.params;
      const updatedData = req.body;

      console.log("Update beneficiary request. Customer ID:", customerId);
      console.log("Update beneficiary request. Beneficiary ID:", beneficiaryId);
      console.log("Update beneficiary request. Updated data:", updatedData);

      const updatedBeneficiary = await beneficiaryService.updateBeneficiary(
        customerId,
        beneficiaryId,
        updatedData
      );

      console.log("Updated beneficiary response:", updatedBeneficiary);

      res.status(200).json(updatedBeneficiary);
    } catch (error) {
      console.error("Error updating beneficiary:", error);
      res.status(500).json({ message: error.message });
    }
  }

  async deleteBeneficiary(req, res) {
    try {
      const { customerId, beneficiaryId } = req.params;
      const deletionResult = await beneficiaryService.deleteBeneficiary(
        customerId,
        beneficiaryId
      );
      if (deletionResult.deletedCount === 0) {
        return res.status(404).json({ message: "Beneficiary not found" });
      }
      res.status(200).json({ message: "Beneficiary deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

new BeneficiaryController();
module.exports = router;
