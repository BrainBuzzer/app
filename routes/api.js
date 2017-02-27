var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var Citizen = require('../models/Citizen');
/** Middleware **/
var verifyToken = (req, res, next) => {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	if(token) {
		jwt.verify(token, 'keepitsecret', (err, decoded) => {
			if(err) {
				res.json({ success: false, message: 'Failed to verofy token' });
			} else {
				req.decoded = decoded;
				next();
			}
		})
	} else {
		res.status(403).send({
			success: false,
			message: 'No Token Provided'
		})
	}
}

router.get('/', function(req, res, next) {
  res.json({ message: 'Oh, hi there..' });
});

router.post('/authenticate', (req, res) => {
	User.findOne({ username: req.body.username }, (err, user) => {
		if (err) throw err;
		console.log(req.body);
		if(!user) {
			res.json({ success: false, message: 'Invalid Username' });
		} else if (user) { 
			if(user.password !=req.body.password) {
				res.json({ success: false, message: 'Invalid Credentials' });
			} else {
				var tk = jwt.sign(user, 'keepitsecret', {
					expiresIn: 60*60*24
				});
				res.json({
					success: true,
					message: 'Authenticated Successfully',
					villageId: user.id,
					token: tk
				})
			}
		}
	})
})

router.get('/citizen_list/:user_id', verifyToken, (req, res) => {
	Citizen.find({villageId: req.params.user_id }, (err, citizen) => {
		res.json({list: citizen});
	})
})

router.get('/citizen/:id', verifyToken, (req, res) => {
	Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
		res.json(citizen);
	})
})

module.exports = router;
