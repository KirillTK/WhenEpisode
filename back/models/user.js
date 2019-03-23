const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  nickName: String,
  password: String,
  date: { type: String, default: moment().format('MMMM Do YYYY') },
});

UserSchema.methods.generateHash = function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
};

UserSchema.methods.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
};


const User = mongoose.model('User', UserSchema);
mongoose.set('useCreateIndex', true);

module.exports = User;
