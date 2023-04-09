const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: 'string',
      required: true,
      unique: true,
    },
    email: {
      required: true,
      unique: true,
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);
