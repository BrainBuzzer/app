var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var village = require('../controller/admin/UserController');
var upkar_editor = require('../controller/UpkarController');
var User = require('../models/User');
var Upkar = require('../models/Upkar');
var Wards = require('../models/Wards')
var adminLoggedIn = require('connect-ensure-login').ensureLoggedIn({ redirectTo: '/admin/login' });

var isAuthenticated = (req, res, next) => {
	if(req.isAuthenticated())
		return next();
	res.redirect('/login')
}

router.get('/admin/login', function(req, res) {
  res.render('admin/login', { message: req.flash('message')});
});

router.post('/admin/login', passport.authenticate('local', { 
	successRedirect: '/admin/home',
	failureRedirect: '/admin/login',
	failureFlash: true
}));

router.get('/logout', adminLoggedIn, (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/admin/home', adminLoggedIn, (req, res) => {
	console.log(req.user);
	res.render('admin/home', { user: req.user });
})

router.get('/admin/addUsers', adminLoggedIn, (req, res) => {
	User.find((err, villages) => {
		if(err) console.log(err);
		res.render('admin/addUsers', { user: req.user, villages: villages });
	});
})

router.post('/admin/addUsers', adminLoggedIn, (req, res) => {
	village.newUser(req.body);
	res.redirect('/admin/addUsers');
})

router.post('/admin/updateUser', adminLoggedIn, (req, res) => {
	if(req.body.action=='edit') {
		village.updateUser(req.body);
		res.redirect('/admin/addUsers');
	} else if (req.body.action == 'delete') {
		User.remove({ id: req.body.id }, err => {
			if(err) { console.log(err); return handleError(err);}
			res.redirect('/admin/addUsers');
		});
	}
})

router.get('/login', (req, res) => {
	res.render('village/login', { message: req.flash('message')});
})

router.post('/login', passport.authenticate('village', {
	successRedirect: '/home',
	failureRedirect: '/login',
	failureFlash: true
}));

router.get('/home', isAuthenticated, (req, res) => {
	res.render('village/home', { user: req.user })
})

router.get('/upkar', isAuthenticated, (req, res) => {
	Upkar.findOne({ villageId: req.user.id }, (err, upkar) => {
		if(err) throw err;
		res.render('village/upkar', { user: req.user, upkar: upkar });
	})
})

router.post('/admin/updateImaratKarRate', isAuthenticated, (req, res) => {
	upkar_editor.updateImaratKarRate(req.body, req.user.id);
	res.redirect('/upkar')
})

router.post('/add_varshik_mulya', isAuthenticated, (req, res) => {
	upkar_editor.addVarshikMulya(req.body, req.user.id);
	res.redirect('/upkar');
})

router.post('/updateVarshikMulyaRate', isAuthenticated, (req, res) => {
	upkar_editor.deleteVarshikMulya(req.body);
	res.redirect('/upkar');
})

router.post('/add_veej_kar', isAuthenticated, (req, res) => {
	upkar_editor.addVeejKar(req.body);
	res.redirect('/upkar');
}) 

router.post('/updateVeejKarRate', isAuthenticated, (req, res) => {
	upkar_editor.deleteVeejKar(req.body);
})

router.post('/add_aarogya_kar', isAuthenticated, (req, res) => {
	upkar_editor.addAarogyaKar(req.body);
	res.redirect('/upkar');
})

router.post('/updateAarogyaKarRate', isAuthenticated, (req, res) => {
	upkar_editor.deleteAarogyaKar(req.body);
})

router.post('/add_panipatti', isAuthenticated, (req, res) => {
	upkar_editor.addPanipatti(req.body);
	res.redirect('/upkar');
})

router.post('/updatePanipattiRate', isAuthenticated, (req, res) => {
	upkar_editor.deletePanipatti(req.body);
})

router.post('/manora_talghar_rate_update', isAuthenticated, (req, res) => {
	upkar_editor.talgharRateUpdate(req.body);
	res.redirect('/upkar');
})

router.post('/manora_khulli_jaga_update', isAuthenticated, (req, res) => {
	upkar_editor.khulliRateUpdate(req.body);
	res.redirect('/upkar');
})

router.post('/update_imarat', isAuthenticated, (req, res) => {
	upkar_editor.imaratRateUpdate(req.body);
	res.redirect('/upkar');
})

router.get('/wards', isAuthenticated, (req, res) => {
	Wards.find({ villageId: req.user.id }, (err, wards) => {
		if(err) return handleError(err);
		res.render('village/wards', { user: req.user, wards: wards })
	})
})

router.post('/wards', isAuthenticated, (req, res) => {
	var w = new Wards();
	w.villageId = req.user.id;
	w.name = req.body.ward_name;
	w.save(err => {
		if(err) return handleError(err);
		console.log("saved");
	})
	res.redirect('/wards');
})

router.post('/deleteWard', isAuthenticated, (req, res) => {
	Wards.remove({ _id: req.body.type }, err => {
		if(err) return handleError(err);
		console.log("removed");
	});
	res.redirect('/wards');
})

module.exports = router;
