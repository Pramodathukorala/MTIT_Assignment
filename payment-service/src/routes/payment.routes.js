const express = require("express");
const router = express.Router();
const {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
} = require("../controllers/payment.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       required:
 *         - paymentId
 *         - orderId
 *         - customerId
 *         - amount
 *         - method
 *       properties:
 *         paymentId:
 *           type: string
 *           description: Unique payment identifier
 *           example: "PAY001"
 *         orderId:
 *           type: string
 *           description: Associated order ID
 *           example: "ORD001"
 *         customerId:
 *           type: string
 *           description: Customer who made the payment
 *           example: "C001"
 *         amount:
 *           type: number
 *           description: Payment amount
 *           example: 59.98
 *         method:
 *           type: string
 *           description: Payment method
 *           enum: [credit_card, debit_card, paypal, bank_transfer, cash_on_delivery]
 *           example: "credit_card"
 *         status:
 *           type: string
 *           description: Payment status
 *           enum: [pending, completed, failed, refunded]
 *           example: "pending"
 */

/**
 * @swagger
 * /payments:
 *   post:
 *     summary: Create a new payment
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *         description: Payment created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createPayment);

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of all payments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Payment'
 */
router.get("/", getAllPayments);

/**
 * @swagger
 * /payments/{id}:
 *   get:
 *     summary: Get a payment by paymentId
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment found
 *       404:
 *         description: Payment not found
 */
router.get("/:id", getPaymentById);

/**
 * @swagger
 * /payments/{id}:
 *   put:
 *     summary: Update a payment by paymentId
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Payment'
 *     responses:
 *       200:
 *         description: Payment updated successfully
 *       404:
 *         description: Payment not found
 */
router.put("/:id", updatePayment);

/**
 * @swagger
 * /payments/{id}:
 *   delete:
 *     summary: Delete a payment by paymentId
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The payment ID
 *     responses:
 *       200:
 *         description: Payment deleted successfully
 *       404:
 *         description: Payment not found
 */
router.delete("/:id", deletePayment);

module.exports = router;
