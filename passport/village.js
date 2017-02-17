var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var User = require('../models/User');

passport.use('village', new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
	User.findOne({username: username}, (err, village) => {
		if(err) return done(err);
		if(!village) {
			return done(null, false, req.flash('message', 'Invalid Credentials'));
		} else if(village) {
			if(village.password != password) {
				return done(null, false, req.flash('message', 'Invalid Credentials'));
			} else {
				return done(null, village);
			}
		}
	})
}));

module.exports.isVillage = () => {
	return true;
}
