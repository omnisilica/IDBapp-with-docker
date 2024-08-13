const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sending_account_num: { type: Number, required: true },
  receiving_account_num: { type: Number, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Transaction", transactionSchema);
