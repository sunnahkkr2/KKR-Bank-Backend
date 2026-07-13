const express = require("express");
const router = express.Router();

const {
  transfer,
  history
} = require("../controllers/transactionController");

router.post("/transfer", transfer);
router.get("/history/:accountNumber", history);

module.exports = router;
