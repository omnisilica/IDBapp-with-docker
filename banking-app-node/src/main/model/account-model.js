// Purpose: Establish database schema for 'account' object

// Imports
const mongoose = require("mongoose"); // Dependency to be able to use MongoDb
const { ObjectId } = require("mongodb");
// Variables
const Schema = mongoose.Schema;

// Schema for 'Account' object
const AccountSchema = new Schema(
  {
    accountNumber: {
      type: String,
      minlength: 16,
      maxlength: 16,
      match: /\d{16}/,
      unique: true,
    },
    accountType: {
      type: String,
      required: true,
      enum: ["chequing", "savings", "business"],
    },
    balance: {
      type: Number,
      default: 60000,
      min: 0,
    },
    interestRate: {
      type: Number,
      default: 0,
      min: 0,
    },
    customer_id: {
      type: ObjectId,
      required: true,
      ref: "User",
    },
    status: {
      type: String,
      default: "active",
    },
  },

  // Auto logs the time for when the account was created and updated
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

// Ensure unique index on accountNumber
AccountSchema.index({ accountNumber: 1 }, { unique: true });

//Create a counter schema to keep track of the number of accounts in the seq field
var CounterSchema = Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});
// Create a model for the counter schema
var counter = mongoose.model("counter", CounterSchema);

// Create a function to increment counter
//Uses upsert to create a new counter if it doesn't exist
async function incrementCounter(counterId) {
  const counterDoc = await counter.findByIdAndUpdate(
    { _id: counterId },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return counterDoc.seq;
}

// Pre-save hook to auto-generate account number and ensure that it is 16 digits long
AccountSchema.pre("save", async function (next) {
  // Only generate account number for new accounts
  if (this.isNew) {
    try {
      // Increment counter and generate account number
      const seq = await incrementCounter("entityId");
      this.accountNumber = String("0000000000000000" + seq).slice(-16);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Create model for "Account" based on the schema defined above
const Account = mongoose.model("Account", AccountSchema);

// Export
module.exports = Account;
