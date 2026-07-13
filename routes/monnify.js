const express = require("express");
const router = express.Router();

const {
    testConnection,
    getBanks,
    nameEnquiry
} = require("../controllers/monnifyController");

router.get("/test", testConnection);
router.get("/banks", getBanks);
router.post("/name-enquiry", nameEnquiry);

module.exports = router;
