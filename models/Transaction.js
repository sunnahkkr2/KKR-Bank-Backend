const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    default: "Bank Transfer"
  },
  status: {
    type: String,
    default: "Successful"
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Transaction", transactionSchema);
