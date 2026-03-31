const Payment = require("../models/payment.model");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const payment = new Payment(req.body);
    const saved = await payment.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single payment by paymentId
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findOne({ paymentId: req.params.id });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a payment by paymentId
const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndUpdate(
      { paymentId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a payment by paymentId
const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findOneAndDelete({ paymentId: req.params.id });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
