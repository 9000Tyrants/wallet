const Transaction = require('../models/Transaction');
const User = require('../models/User');
const { checkFraud } = require('../utils/fraudDetection');

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  if (amount <= 0) return res.status(400).json({ msg: 'Invalid amount' });

  const user = await User.findById(req.user.id);
  user.balance += amount;
  await user.save();

  await Transaction.create({ to: user._id, amount, type: 'deposit' });
  res.json({ balance: user.balance });
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  const user = await User.findById(req.user.id);

  if (amount <= 0 || user.balance < amount)
    return res.status(400).json({ msg: 'Insufficient balance' });

  user.balance -= amount;
  await user.save();

  const isFraud = amount > 1000; // Example rule
  await Transaction.create({ from: user._id, amount, type: 'withdraw', flagged: isFraud });
  res.json({ balance: user.balance });
};

exports.transfer = async (req, res) => {
  const { recipient, amount } = req.body;
  const sender = await User.findById(req.user.id);
  const receiver = await User.findOne({ username: recipient });

  if (!receiver || sender.balance < amount || amount <= 0)
    return res.status(400).json({ msg: 'Invalid transaction' });

  sender.balance -= amount;
  receiver.balance += amount;
  await sender.save();
  await receiver.save();

  const isFraud = await checkFraud(sender._id);

  await Transaction.create({
    from: sender._id, to: receiver._id, amount, type: 'transfer', flagged: isFraud
  });

  res.json({ balance: sender.balance });
};
