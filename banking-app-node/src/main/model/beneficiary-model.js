const mongoose = require("mongoose");

const BeneficiarySchema = new mongoose.Schema({
  customer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  bank: { type: String, required: true },
  accountNumber: { type: String, required: true },
  routingNumber: { type: String, required: true },
  nickname: { type: String, required: true },
});

const Beneficiary = mongoose.model("Beneficiary", BeneficiarySchema);
module.exports = Beneficiary;
