const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Wards', new Schema({
	id: String,
	villageId: String,
	name: String
}))
