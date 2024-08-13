const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  id: Number,
  address_one: { type: String, required: true },
  address_two: String,
  city: { type: String, required: true },
  province: { type: String, required: true },
  postal_code: { type: String, required: true },
});

module.exports = AddressSchema;
