const express = require("express");
const router = express.Router();

const {
  lookupAccount,
  getBalance,
  setTransferPin
} = require("../controllers/userController");

router.post("/lookup", lookupAccount);
router.get("/balance/:accountNumber", getBalance);
router.post("/set-pin", setTransferPin);
module.exports = router;
