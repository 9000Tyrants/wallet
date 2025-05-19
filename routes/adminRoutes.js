const express = require('express');
const { flaggedTransactions, totalBalances, topUsers } = require('../controllers/adminController');
const router = express.Router();

router.get('/flags', flaggedTransactions);
router.get('/total-balances', totalBalances);
router.get('/top-users', topUsers);

module.exports = router;
