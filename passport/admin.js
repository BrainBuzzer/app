var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var db = require('../db/index');

passport.use('local', new Strategy({ passReqToCallback: true }, (req, username, password, done) => {
	db.users.findByUsername(username, (err, user) => {
		if(err) return done(err);
		if(!user) {
			return done(null, false, req.flash('message', 'Invalid Credentials'));
		} else if(user) {
			if(user.password != password) {
				return done(null, false, req.flash('message', 'Invalid Credentials'));
			} else {
				return done(null, user);
			}
		}
	})
}));

module.exports.isLocal = () => {
	return true;
}
