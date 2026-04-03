const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");

/**
 * @swagger
 * components:
 *   schemas:
 *     OrderItem:
 *       type: object
 *       required:
 *         - productId
 *         - productName
 *         - quantity
 *         - price
 *       properties:
 *         productId:
 *           type: string
 *           description: Product identifier
 *           example: "P001"
 *         productName:
 *           type: string
 *           description: Product name
 *           example: "Wireless Mouse"
 *         quantity:
 *           type: number
 *           description: Quantity ordered
 *           example: 2
 *         price:
 *           type: number
 *           description: Price per unit
 *           example: 29.99
 *     Order:
 *       type: object
 *       required:
 *         - orderId
 *         - customerId
 *         - items
 *         - totalAmount
 *       properties:
 *         orderId:
 *           type: string
 *           description: Unique order identifier
 *           example: "ORD001"
 *         customerId:
 *           type: string
 *           description: Customer who placed the order
 *           example: "C001"
 *         items:
 *           type: array
 *           description: List of ordered items
 *           items:
 *             $ref: '#/components/schemas/OrderItem'
 *         totalAmount:
 *           type: number
 *           description: Total order amount
 *           example: 59.98
 *         status:
 *           type: string
 *           description: Order status
 *           enum: [pending, confirmed, shipped, delivered, cancelled]
 *           example: "pending"
 */

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request
 */
router.post("/", createOrder);

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of all orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", getAllOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get("/:id", getOrderById);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     summary: Update an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.put("/:id", updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete an order by orderId
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete("/:id", deleteOrder);

module.exports = router;
