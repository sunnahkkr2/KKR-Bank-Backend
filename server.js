const transactionRoutes = require("./routes/transaction");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/transaction", transactionRoutes);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("KKR Bank Backend is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
