const User = require("../models/User");

exports.lookupAccount = async (req, res) => {
  try {
    const { accountNumber } = req.body;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.json({
      fullName: user.fullName,
      accountNumber: user.accountNumber
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.getBalance = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.json({
      accountNumber: user.accountNumber,
      fullName: user.fullName,
      balance: user.balance
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const bcrypt = require("bcryptjs");

exports.setTransferPin = async (req, res) => {
  try {
    const { accountNumber, pin } = req.body;

    if (!pin || pin.length !== 4) {
      return res.status(400).json({
        message: "PIN must be exactly 4 digits"
      });
    }

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const hashedPin = await bcrypt.hash(pin, 10);

    user.transferPin = hashedPin;
    await user.save();

    res.json({
      message: "Transfer PIN set successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
