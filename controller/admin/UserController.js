const User = require('../../models/User');
const Upkar = require('../../models/Upkar');
var exports = module.exports = {};

exports.newUser = (body) => {
	var user = new User();
	user.id = body.id;
	user.username = body.username;
	user.password = body.password;
	user.village = body.village;
	user.save((err) => {
		if(err) throw err;
	});
	var upkar = new Upkar();
	upkar.villageId = body.id;
	upkar.save((err) => {
		if(err) throw err;
	})
	return true;
}

exports.updateUser = (body) => {
	console.log(body);
	User.findOneAndUpdate({ id: body.id }, { $set: { username: body.username, password: body.password, village: body.village }}, function (err, tank) {
		if (err) { console.log(err); return handleError(err) };
	});
	return true;
}
