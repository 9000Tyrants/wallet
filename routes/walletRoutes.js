const express = require('express');
const { deposit, withdraw, transfer } = require('../controllers/walletController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/deposit', auth, deposit);
router.post('/withdraw', auth, withdraw);
router.post('/transfer', auth, transfer);

module.exports = router;
