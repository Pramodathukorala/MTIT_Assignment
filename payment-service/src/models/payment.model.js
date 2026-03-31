const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    orderId: {
      type: String,
      required: true,
    },
    customerId: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      enum: ["credit_card", "debit_card", "paypal", "bank_transfer", "cash_on_delivery"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
