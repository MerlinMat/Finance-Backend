const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ["INCOME", "EXPENSE"],
    required: true
  },
  category: String,
  date: {
    type: Date,
    default: Date.now
  },
  note: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Record", recordSchema);