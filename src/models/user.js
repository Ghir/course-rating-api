const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require('validator');
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	fullName: {
    type: String,
    required: true
  },
	emailAddress: {
    type: String,
    required: true,
    validate: {
      validator: validator.isEmail,
      message: 'Please enter a valid email address.',
    }
  },
	password: {
    type: String,
    required: true
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
