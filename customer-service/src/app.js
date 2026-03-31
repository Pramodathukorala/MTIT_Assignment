const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const customerRoutes = require("./routes/customer.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Customer Service API",
      version: "1.0.0",
      description: "CRUD API for managing customers in the E-commerce System",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 8082}`,
      },
    ],
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/customers", customerRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Customer Service is running" });
});

module.exports = app;
