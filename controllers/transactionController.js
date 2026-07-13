const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

exports.transfer = async (req, res) => {
  try {
    const {
  senderAccount,
  receiverAccount,
  amount,
  description,
  pin
} = req.body;

    const sender = await User.findOne({ accountNumber: senderAccount });
    const receiver = await User.findOne({ accountNumber: receiverAccount });
if (!sender.transferPin) {
  return res.status(400).json({
    message: "Please set your Transfer PIN first"
  });
}

const pinMatch = await bcrypt.compare(pin, sender.transferPin);

if (!pinMatch) {
  return res.status(401).json({
    message: "Invalid Transfer PIN"
  });
}
    if (!sender) {
      return res.status(404).json({ message: "Sender account not found" });
    }

    if (!receiver) {
      return res.status(404).json({ message: "Receiver account not found" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    sender.balance -= Number(amount);
    receiver.balance += Number(amount);

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      sender: sender._id,
      receiver: receiver._id,
      amount,
      description: description || "Bank Transfer"
    });

    await transaction.save();

    res.json({
      message: "Transfer successful",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.history = async (req, res) => {
  try {
    const { accountNumber } = req.params;

    const user = await User.findOne({ accountNumber });

    if (!user) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const transactions = await Transaction.find({
      $or: [
        { sender: user._id },
        { receiver: user._id }
      ]
    })
      .populate("sender", "fullName accountNumber")
      .populate("receiver", "fullName accountNumber")
      .sort({ createdAt: -1 });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
