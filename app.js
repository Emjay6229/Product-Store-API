require('express-async-errors')
const express = require("express");

const app = express();

const errorHandler = require("./middleware/error-handler")
const notFoundMiddleware = require("./middleware/not-found")
const productRoute = require("./routes/products")

// Mount route
app.use("/api/v1/products", productRoute);

// Middleware
app.use(errorHandler);
app.use(notFoundMiddleware)
app.use(express.json())

module.exports = app;