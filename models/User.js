const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('User', new Schema({
	id: String,
	username: String,
	password: String,
	village: String,
	messages: { type: Number, default: 5000 }
}))
