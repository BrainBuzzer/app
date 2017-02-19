var villageLogin = require('./village');
var adminLogin = require('./admin');
var passport = require('passport')
var User = require('../models/User');
var db = require('../db');

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.count({
        id: id
    }, (err, count) => {
        if (count > 0) {
            User.findOne({
                id: id
            }, (err, user) => {
                if (err) throw err;
                done(null, user);
            })
        } else {
            db.users.findById(id, (err, user) => {
                if (err) throw err;
                done(null, user);
            })
        }
    })

});