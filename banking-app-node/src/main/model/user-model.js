// establish database schema
const AddressSchema = require("./address-model");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  id: Number,
  username: { type: String, required: true, unique: true },
  password: String,
  securityQuestion: String,
  securityQuestionCustom: String,
  securityAnswer: String,
  firstName: String,
  lastName: String,

  email: { type: String, required: true, unique: true },
  dateOfBirth: String,
  phoneNumber: String,
  address: AddressSchema,
  income_type: String,
  income_amount: Number,
});

// Pre-save hook to hash password before saving
UserSchema.pre("save", function (next) {
  // Only hash the password if it has been modified (or is new)
  console.log("Before hashing password:", this.password);

  if (!this.isModified("password")) return next();
  // Auto-generate a salt and hash
  bcrypt.hash(this.password, 10, (err, hash) => {
    if (err) return next(err);
    // Replace the password with the hash
    this.password = hash;
    console.log("After hashing password:", this.password);
    next();
  });
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
