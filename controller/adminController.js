const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.flaggedTransactions = async (req, res) => {
  const flagged = await Transaction.find({ flagged: true }).populate('from to', 'username');
  res.json(flagged);
};

exports.totalBalances = async (req, res) => {
  const users = await User.find();
  const total = users.reduce((acc, u) => acc + u.balance, 0);
  res.json({ total });
};

exports.topUsers = async (req, res) => {
  const top = await User.find().sort({ balance: -1 }).limit(5);
  res.json(top);
};
