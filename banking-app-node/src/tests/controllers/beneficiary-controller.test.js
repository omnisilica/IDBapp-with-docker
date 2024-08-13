// beneficiaryController.test.js
const request = require("supertest");
const express = require("express");
const router = require("../../main/controllers/beneficiary-controller"); // updated path
const beneficiaryService = require("../../main/services/beneficiary-service"); // updated path
const mongoose = require("mongoose");

jest.mock("../../main/services/beneficiary-service"); // updated path

const app = express();
app.use(express.json());
app.use("/beneficiaries", router);

describe("BeneficiaryController", () => {
  // test for creating a beneficiary
  describe("POST /beneficiaries/:customerId", () => {
    it("should create a beneficiary successfully and return a 201 status", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryData = { name: "John Doe", relationship: "Friend" };
      const createdBeneficiary = {
        ...beneficiaryData,
        _id: new mongoose.Types.ObjectId().toString(),
      };

      beneficiaryService.createBeneficiary.mockResolvedValue(
        createdBeneficiary
      );

      const response = await request(app)
        .post(`/beneficiaries/${customerId}`)
        .send(beneficiaryData)
        .expect(201);

      expect(response.body).toEqual(createdBeneficiary);
      expect(beneficiaryService.createBeneficiary).toHaveBeenCalledWith(
        customerId,
        beneficiaryData
      );
    });

    it("should return a 400 status for an invalid customerId", async () => {
      const invalidCustomerId = "invalidCustomerId";
      const beneficiaryData = { name: "John Doe", relationship: "Friend" };

      const response = await request(app)
        .post(`/beneficiaries/${invalidCustomerId}`)
        .send(beneficiaryData)
        .expect(400);

      expect(response.body).toEqual({ message: "Invalid customerId format" });
    });

    it("should return a 500 status if there is an error creating the beneficiary", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryData = { name: "John Doe", relationship: "Friend" };

      beneficiaryService.createBeneficiary.mockRejectedValue(
        new Error("Something went wrong")
      );

      const response = await request(app)
        .post(`/beneficiaries/${customerId}`)
        .send(beneficiaryData)
        .expect(500);

      expect(response.body).toEqual({ message: "Something went wrong" });
    });
  });
  // test for getting all beneficiaries
  describe("GET /beneficiaries/customer/:customerId", () => {
    it("should get all beneficiaries successfully and return a 200 status", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaries = [
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "John Doe",
          relationship: "Friend",
        },
        {
          _id: new mongoose.Types.ObjectId().toString(),
          name: "Jane Doe",
          relationship: "Family",
        },
      ];

      beneficiaryService.getAllBeneficiaries.mockResolvedValue(beneficiaries);

      const response = await request(app)
        .get(`/beneficiaries/${customerId}`)
        .expect(200);

      expect(response.body).toEqual(beneficiaries);
      expect(beneficiaryService.getAllBeneficiaries).toHaveBeenCalledWith(
        customerId
      );
    });

    it("should return a 500 status if there is an error getting all beneficiaries", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();

      beneficiaryService.getAllBeneficiaries.mockRejectedValue(
        new Error("Something went wrong")
      );

      const response = await request(app)
        .get(`/beneficiaries/${customerId}`)
        .expect(500);

      expect(response.body).toEqual({ message: "Something went wrong" });
    });
  });

  // test for getting a single beneficiary
  describe("GET /beneficiaries/:customerId/:beneficiaryId", () => {
    it("should get a single beneficiary successfully and return a 200 status", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();
      const beneficiary = {
        _id: beneficiaryId,
        name: "John Doe",
        relationship: "Friend",
      };

      beneficiaryService.getBeneficiary.mockResolvedValue(beneficiary);

      const response = await request(app)
        .get(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .expect(200);

      expect(response.body).toEqual(beneficiary);
      expect(beneficiaryService.getBeneficiary).toHaveBeenCalledWith(
        customerId,
        beneficiaryId
      );
    });

    it("should return a 500 status if there is an error getting the beneficiary", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();

      beneficiaryService.getBeneficiary.mockRejectedValue(
        new Error("Something went wrong")
      );

      const response = await request(app)
        .get(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .expect(500);

      expect(response.body).toEqual({ message: "Something went wrong" });
    });
  });

  // test for updating a beneficiary
  describe("PUT /beneficiaries/:customerId/:beneficiaryId", () => {
    it("should update a beneficiary successfully and return a 200 status", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();
      const updatedData = { name: "John Doe", relationship: "Family" };
      const updatedBeneficiary = {
        _id: beneficiaryId,
        ...updatedData,
      };

      beneficiaryService.updateBeneficiary.mockResolvedValue(
        updatedBeneficiary
      );

      const response = await request(app)
        .put(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .send(updatedData)
        .expect(200);

      expect(response.body).toEqual(updatedBeneficiary);
      expect(beneficiaryService.updateBeneficiary).toHaveBeenCalledWith(
        customerId,
        beneficiaryId,
        updatedData
      );
    });

    it("should return a 500 status if there is an error updating the beneficiary", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();
      const updatedData = { name: "John Doe", relationship: "Family" };

      beneficiaryService.updateBeneficiary.mockRejectedValue(
        new Error("Something went wrong")
      );

      const response = await request(app)
        .put(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .send(updatedData)
        .expect(500);

      expect(response.body).toEqual({ message: "Something went wrong" });
    });
  });

  // test for deleting a beneficiary
  describe("DELETE /beneficiaries/:customerId/:beneficiaryId", () => {
    it("should delete a beneficiary successfully and return a 200 status", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();

      beneficiaryService.deleteBeneficiary.mockResolvedValue({});

      const response = await request(app)
        .delete(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .expect(200);

      expect(response.body).toEqual({
        message: "Beneficiary deleted successfully",
      });
      expect(beneficiaryService.deleteBeneficiary).toHaveBeenCalledWith(
        customerId,
        beneficiaryId
      );
    });

    it("should return a 500 status if there is an error deleting the beneficiary", async () => {
      const customerId = new mongoose.Types.ObjectId().toString();
      const beneficiaryId = new mongoose.Types.ObjectId().toString();

      beneficiaryService.deleteBeneficiary.mockRejectedValue(
        new Error("Something went wrong")
      );

      const response = await request(app)
        .delete(`/beneficiaries/${customerId}/${beneficiaryId}`)
        .expect(500);

      expect(response.body).toEqual({ message: "Something went wrong" });
    });
  });
});
