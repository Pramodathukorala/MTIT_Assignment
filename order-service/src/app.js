const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const orderRoutes = require("./routes/order.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Order Service API",
      version: "1.0.0",
      description: "CRUD API for managing orders in the E-commerce System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8083}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/orders", orderRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Order Service is running" });
});

module.exports = app;
