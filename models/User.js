const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  balance: { type: Number, default: 0 }
});

module.exports = mongoose.model('User', userSchema);
