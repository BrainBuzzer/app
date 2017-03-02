const User = require('../../models/User');
const Upkar = require('../../models/Upkar');
const Citizen = require('../../models/Citizen');
var exports = module.exports = {};

exports.newUser = (body) => {
    var user = new User();
    user.id = body.id;
    user.username = body.username;
    user.password = body.password;
    user.village = body.village;
    user.save((err) => {
        if (err) throw err;
    });
    var upkar = new Upkar();
    upkar.villageId = body.id;
    upkar.save((err) => {
        if (err) throw err;
    })
    return true;
}

exports.updateUser = (body) => {
    console.log(body);
    User.findOneAndUpdate({
        id: body.id
    }, {
        $set: {
            username: body.username,
            password: body.password,
            village: body.village
        }
    }, function(err, tank) {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    });
    return true;
}

exports.removeMessages = (id, no) => {
    User.findOne({ id: id }, (err, user) => {
        console.log(no);
        user.messages = parseInt(user.messages) - parseInt(no);
        console.log(user.messages);
        user.save(err => {
            if (err) return handleError(err);
        })
    })
}

var int = (no) => {
    return parseInt(no);
}

exports.checkTotal = () => {
    User.find({}, (err, user) => {
        user.forEach(village => {
            var remaining = 0;
            var paid = 0;
            Citizen.find({ villageId: village.id }, (err, citizen) => {
                citizen.forEach(c => {
                    c.malmatta.forEach(m => {
                        remaining = ((int(m.previous_gharpatti) + int(m.previous_panipatti) + int(m.previous_veej) + int(m.previous_aarogya) + int(m.current_gharpatti) + int(m.current_panipatti) + int(m.current_aarogya) + int(m.current_veej)) - (int(m.previous_paid_gharpatti) + int(m.previous_paid_panipatti) + int(m.previous_paid_veej) + int(m.previous_paid_aarogya) + int(m.current_paid_gharpatti) + int(m.current_paid_panipatti) + int(m.current_paid_aarogya) + int(m.current_paid_veej))) + remaining;
                        paid = (int(m.previous_paid_gharpatti) + int(m.previous_paid_panipatti) + int(m.previous_paid_veej) + int(m.previous_paid_aarogya) + int(m.current_paid_gharpatti) + int(m.current_paid_panipatti) + int(m.current_paid_aarogya) + int(m.current_paid_veej)) + paid;
                        village.remaining_tax = int(remaining);
                        village.paid_tax = int(paid);
                        village.save(err => {
                            if(err) return handleError(err);
                            console.log('done');
                        });
                    });
                })
            })
        });
    })
}
