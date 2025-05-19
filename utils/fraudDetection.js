const Transaction = require('../models/Transaction');

const FRAUD_LIMIT = 3;
const FRAUD_TIME = 60 * 1000;

exports.checkFraud = async (userId) => {
  const now = new Date();
  const recent = await Transaction.find({
    from: userId,
    createdAt: { $gte: new Date(now - FRAUD_TIME) }
  });

  return recent.length > FRAUD_LIMIT;
};
