const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

// Middleware
app.use(cors());

// Swagger configuration for API Gateway
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API Gateway",
      version: "1.0.0",
      description: "Unified API Gateway for all E-commerce microservices",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8080}`,
      },
    ],
  },
  apis: ["./src/app.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Service URLs
const PRODUCT_SERVICE_URL = process.env.PRODUCT_SERVICE_URL || "http://localhost:8081";
const CUSTOMER_SERVICE_URL = process.env.CUSTOMER_SERVICE_URL || "http://localhost:8082";
const ORDER_SERVICE_URL = process.env.ORDER_SERVICE_URL || "http://localhost:8083";
const PAYMENT_SERVICE_URL = process.env.PAYMENT_SERVICE_URL || "http://localhost:8084";

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products (proxied to Product Service)
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a product (proxied to Product Service)
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Product created
 *
 * /products/{id}:
 *   get:
 *     summary: Get product by ID (proxied to Product Service)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product found
 *   put:
 *     summary: Update product (proxied to Product Service)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated
 *   delete:
 *     summary: Delete product (proxied to Product Service)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers (proxied to Customer Service)
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 *   post:
 *     summary: Create a customer (proxied to Customer Service)
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Customer created
 *
 * /customers/{id}:
 *   get:
 *     summary: Get customer by ID (proxied to Customer Service)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer found
 *   put:
 *     summary: Update customer (proxied to Customer Service)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Customer updated
 *   delete:
 *     summary: Delete customer (proxied to Customer Service)
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders (proxied to Order Service)
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 *   post:
 *     summary: Create an order (proxied to Order Service)
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created
 *
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID (proxied to Order Service)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order found
 *   put:
 *     summary: Update order (proxied to Order Service)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order updated
 *   delete:
 *     summary: Delete order (proxied to Order Service)
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order deleted
 */

/**
 * @swagger
 * /payments:
 *   get:
 *     summary: Get all payments (proxied to Payment Service)
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: List of payments
 *   post:
 *     summary: Create a payment (proxied to Payment Service)
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Payment created
 *
 * /payments/{id}:
 *   get:
 *     summary: Get payment by ID (proxied to Payment Service)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment found
 *   put:
 *     summary: Update payment (proxied to Payment Service)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Payment updated
 *   delete:
 *     summary: Delete payment (proxied to Payment Service)
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Payment deleted
 */

// Proxy routes — NOTE: proxy middleware must be registered BEFORE express.json()
// because http-proxy-middleware needs the raw request body stream

app.use("/products", createProxyMiddleware({
  target: PRODUCT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => "/products" + path,
}));

app.use("/customers", createProxyMiddleware({
  target: CUSTOMER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => "/customers" + path,
}));

app.use("/orders", createProxyMiddleware({
  target: ORDER_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => "/orders" + path,
}));

app.use("/payments", createProxyMiddleware({
  target: PAYMENT_SERVICE_URL,
  changeOrigin: true,
  pathRewrite: (path, req) => "/payments" + path,
}));

// JSON parsing for gateway-level routes (health check, etc.)
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "API Gateway is running",
    services: {
      products: PRODUCT_SERVICE_URL,
      customers: CUSTOMER_SERVICE_URL,
      orders: ORDER_SERVICE_URL,
      payments: PAYMENT_SERVICE_URL,
    },
  });
});

module.exports = app;
