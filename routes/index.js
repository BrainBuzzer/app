var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
var moment = require('moment');
var msg91 = require('msg91-sms');
var village = require('../controller/admin/UserController');
var upkar_editor = require('../controller/UpkarController');
var citizen_editor = require('../controller/CitizenController');
var User = require('../models/User');
var Upkar = require('../models/Upkar');
var Wards = require('../models/Wards')
var Citizen = require('../models/Citizen')
var adminLoggedIn = require('connect-ensure-login').ensureLoggedIn({
    redirectTo: '/admin/login'
});

var isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login')
}

router.get('/', (req, res) => {
    res.render('index');
})

router.get('/admin/login', function(req, res) {
    res.render('admin/login', {
        message: req.flash('message'),
        title: 'अड्मीन लोगिन'
    });
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
    res.render('admin/home', {
        user: req.user,
        title: 'Home'
    });
})

router.get('/admin/addUsers', adminLoggedIn, (req, res) => {
    User.find((err, villages) => {
        if (err) console.log(err);
        res.render('admin/addUsers', {
            user: req.user,
            villages: villages,
            title: 'Users अॅड करा'
        });
    });
})

router.post('/admin/addUsers', adminLoggedIn, (req, res) => {
    village.newUser(req.body);
    res.redirect('/admin/addUsers');
})

router.post('/admin/updateUser', adminLoggedIn, (req, res) => {
    if (req.body.action == 'edit') {
        village.updateUser(req.body);
        res.redirect('/admin/addUsers');
    } else if (req.body.action == 'delete') {
        User.remove({
            id: req.body.id
        }, err => {
            if (err) {
                console.log(err);
                return handleError(err);
            }
            res.redirect('/admin/addUsers');
        });
    }
})

router.get('/admin/village/:id', adminLoggedIn, (req, res) => {
    Citizen.find({ villageId: req.params.id }, (err, citizens) => {
        res.render('admin/village-citizens', { user: req.user, citizens: citizens, title: 'गावाचे नाव' })
    })
})

router.get('/login', (req, res) => {
    res.render('village/login', {
        message: req.flash('message'),
        title: 'लोगिन करा'
    });
})

router.post('/login', passport.authenticate('village', {
    successRedirect: '/home',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/home', isAuthenticated, (req, res) => {
    res.render('village/home', {
        user: req.user,
        title: 'Home'
    })
})

router.get('/upkar', isAuthenticated, (req, res) => {
    Upkar.findOne({
        villageId: req.user.id
    }, (err, upkar) => {
        if (err) throw err;
        res.render('village/upkar', {
            user: req.user,
            upkar: upkar,
            title: 'कर'
        });
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
    upkar_editor.deleteVarshikMulya(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/add_veej_kar', isAuthenticated, (req, res) => {
    upkar_editor.addVeejKar(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/updateVeejKarRate', isAuthenticated, (req, res) => {
    upkar_editor.deleteVeejKar(req.body, req.user.id);
})

router.post('/add_aarogya_kar', isAuthenticated, (req, res) => {
    upkar_editor.addAarogyaKar(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/updateAarogyaKarRate', isAuthenticated, (req, res) => {
    upkar_editor.deleteAarogyaKar(req.body, req.user.id);
})

router.post('/add_panipatti', isAuthenticated, (req, res) => {
    upkar_editor.addPanipatti(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/updatePanipattiRate', isAuthenticated, (req, res) => {
    upkar_editor.deletePanipatti(req.body, req.user.id);
})

router.post('/manora_talghar_rate_update', isAuthenticated, (req, res) => {
    upkar_editor.talgharRateUpdate(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/manora_khulli_jaga_update', isAuthenticated, (req, res) => {
    upkar_editor.khulliRateUpdate(req.body, req.user.id);
    res.redirect('/upkar');
})

router.post('/update_imarat', isAuthenticated, (req, res) => {
    upkar_editor.imaratRateUpdate(req.body, req.user.id);
    res.redirect('/upkar');
})

router.get('/wards', isAuthenticated, (req, res) => {
    Wards.find({
        villageId: req.user.id
    }, (err, wards) => {
        if (err) return handleError(err);
        res.render('village/wards', {
            user: req.user,
            wards: wards,
            title: 'वार्ड'
        })
    })
})

router.post('/wards', isAuthenticated, (req, res) => {
    var w = new Wards();
    w.villageId = req.user.id;
    w.name = req.body.ward_name;
    w.save(err => {
        if (err) return handleError(err);
        console.log("saved");
    })
    res.redirect('/wards');
})

router.post('/deleteWard', isAuthenticated, (req, res) => {
    Wards.remove({
        _id: req.body.type
    }, err => {
        if (err) return handleError(err);
        console.log("removed");
    });
    res.redirect('/wards');
})

router.get('/entry', isAuthenticated, (req, res) => {
    Upkar.findOne({villageId: req.user.id}, (err, upkar) => {
        Wards.find({villageId: req.user.id}, (err, wards) => {
            res.render('village/entry', {
                user: req.user,
                malmatta: upkar.varshik_mulya,
                panipatti: upkar.panipatti,
                wards: wards,
                aarogya: upkar.aarogya_kar,
                veej: upkar.veej_kar,
                title: 'नवीन एन्ट्री'
            });
        })
    })
})

router.post('/entry', isAuthenticated, (req, res) => {
    citizen_editor.newCitizen(req.user.id, req.body);
    res.redirect('/entry');
})

router.get('/citizens', isAuthenticated, (req, res) => {
    Citizen.find({ villageId: req.user.id }, (err, citizens) => {
        res.render('village/citizens', { user: req.user, citizens: citizens, title: 'जनतेची यादी' });
    });
});

router.post('/deleteCitizen', isAuthenticated, (req, res) => {
    citizen_editor.deleteCitizen(req.body.type);
    res.redirect('/citizens')
})

router.get('/citizen/:id', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        var current_gharpatti = 0;
        var current_panipatti = 0;
        var current_veej = 0;
        var current_aarogya = 0;
        var previous_gharpatti = 0;
        var previous_panipatti = 0;
        var previous_veej = 0;
        var previous_aarogya = 0;
        var current_paid_gharpatti = 0;
        var current_paid_panipatti = 0;
        var current_paid_veej = 0;
        var current_paid_aarogya = 0;
        var previous_paid_gharpatti = 0;
        var previous_paid_panipatti = 0;
        var previous_paid_veej = 0;
        var previous_paid_aarogya = 0;
        citizen.malmatta.forEach(m => {
            current_gharpatti = current_gharpatti + parseInt(m.current_gharpatti);
            current_panipatti = current_panipatti + parseInt(m.current_panipatti);
            current_veej = current_veej + parseInt(m.current_veej);
            current_aarogya = current_aarogya + parseInt(m.current_aarogya);
            previous_gharpatti = previous_gharpatti + parseInt(m.previous_gharpatti);
            previous_panipatti = previous_panipatti + parseInt(m.previous_panipatti);
            previous_veej = previous_veej + parseInt(m.previous_veej);
            previous_aarogya = previous_aarogya + parseInt(m.previous_aarogya);
            current_paid_gharpatti = current_paid_gharpatti + parseInt(m.current_paid_gharpatti);
            current_paid_panipatti = current_paid_panipatti + parseInt(m.current_paid_panipatti);
            current_paid_veej = current_paid_veej + parseInt(m.current_paid_veej);
            current_paid_aarogya = current_paid_aarogya + parseInt(m.current_paid_aarogya);
            previous_paid_gharpatti = previous_paid_gharpatti + parseInt(m.previous_paid_gharpatti);
            previous_paid_panipatti = previous_paid_panipatti + parseInt(m.previous_paid_panipatti);
            previous_paid_veej = previous_paid_veej + parseInt(m.previous_paid_veej);
            previous_paid_aarogya = previous_paid_aarogya + parseInt(m.previous_paid_aarogya);
        })
        res.render('village/citizen_info', {
            user: req.user,
            citizen: citizen,
            title: citizen.name,
            current_gharpatti: current_gharpatti,
            current_panipatti: current_panipatti,
            current_veej: current_veej,
            current_aarogya: current_aarogya,
            previous_gharpatti: previous_gharpatti,
            previous_panipatti: previous_panipatti,
            previous_veej: previous_veej,
            previous_aarogya: previous_aarogya,
            current_paid_gharpatti: current_paid_gharpatti,
            current_paid_panipatti: current_paid_panipatti,
            current_paid_veej: current_paid_veej,
            current_paid_aarogya: current_paid_aarogya,
            previous_paid_gharpatti: previous_paid_gharpatti,
            previous_paid_panipatti: previous_paid_panipatti,
            previous_paid_veej: previous_paid_veej,
            previous_paid_aarogya: previous_paid_aarogya
        });
    })
})

router.get('/citizen/:id/edit', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        res.render('village/edit', { user: req.user, citizen: citizen, title: citizen.name});
    })
})

router.post('/citizen/:id/edit', isAuthenticated, (req, res) => {
    citizen_editor.updateCitizenInfo(req.body, req.params.id);
    res.redirect('/citizen/' + req.params.id);
})

router.get('/citizen/:id/malmatta', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        res.render('village/malmatta', { citizen: citizen, title: 'मालमत्ता', user: req.user });
    })
})

router.post('/citizen/:id/delete_m', isAuthenticated, (req, res) => {
    citizen_editor.deleteMalmatta(req.body, req.params.id);
    res.redirect('/citizen/' + req.params.id + '/malmatta');
})

router.get('/citizen/:id/addMalmatta', isAuthenticated, (req, res) => {
    Upkar.findOne({villageId: req.user.id}, (err, upkar) => {
        Wards.find({villageId: req.user.id}, (err, wards) => {
            Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
                res.render('village/add_malmatta', {
                    user: req.user,
                    name: citizen.name,
                    malmatta: upkar.varshik_mulya,
                    panipatti: upkar.panipatti,
                    aarogya: upkar.aarogya_kar,
                    veej: upkar.veej_kar,
                    wards: wards,
                    title: 'नवीन मालमत्ता'
                });
            })
        })
    })
})

router.post('/citizen/:id/addMalmatta', isAuthenticated, (req, res) => {
    citizen_editor.addMalmatta(req.params.id, req.user.id, req.body);
    res.redirect('/citizen/' + req.params.id);
})

router.get('/citizen/:id/kar', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        res.render('village/kar', {user: req.user, citizen: citizen, title: 'कर आकारा'});
    })
})

router.post('/citizen/:id/kar', isAuthenticated, (req, res) => {
    citizen_editor.updateKar(req.params.id, req.body);
    res.redirect('/citizen/' + req.params.id + '/kar');
})

router.get('/citizen/:id/eight', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना ८';
        res.render('village/eight', {user: req.user, citizen: citizen, title: title});
    })
})

router.get('/citizen/:id/eight/:n_id', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना ८';
        res.render('village/eight_namuna', {user: req.user, citizen: citizen, title: title, n: req.params.n_id});
    })
});

router.get('/citizen/:id/nine', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना ९';
        res.render('village/nine_namuna', { user: req.user, citizen: citizen, title: title, date: moment().format('Do MMM YYYY') });
    })
})

router.get('/citizen/:id/nine_k', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना ९(क)';
        res.render('village/nine_k', { user: req.user, citizen: citizen, title: title });
    })
})

router.post('/citizen/:id/nine_k', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना ९(क)';
        res.render('village/nine_k_generated', { user: req.user, malmatta: citizen.malmatta[req.body.malmatta_id], title: title, date: moment().format('Do MMM YYYY') });
    })
})

router.post('/citizen/:id/ten', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना १०';
        res.render('village/ten_info', { user: req.user, id: req.params.id, malmatta: citizen.malmatta[req.body.malmatta_id], title: title, date: moment().format('Do MMM YYYY'), body: req.body });
    })
})

router.post('/citizen/:id/ten_paavati', isAuthenticated, (req, res) => {
    citizen_editor.payKar(req.params.id, req.body);
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'नमुना १०';
        res.render('village/ten_paavati', { user: req.user, id: req.params.id, malmatta: citizen.malmatta[req.body.m_id], title: title, date: moment().format('Do MMM YYYY'), body: req.body });
    })
})

router.post('/citizen/:id/malmattaEdit', isAuthenticated, (req, res) => {
    Citizen.findOne({ _id: req.params.id }, (err, citizen) => {
        title = 'मालमत्ता बदल';
        res.render('village/malmattaEdit', { user: req.user, id: req.params.id, malmatta: citizen.malmatta[req.body.mal_id], title: title, body: req.body });
    })
})

router.post('/citizen/:id/confirmEdit', isAuthenticated, (req, res) => {
    citizen_editor.editMalmatta(req.params.id, req.body);
    res.redirect('/citizen/' + req.params.id + '/malmatta');
})

router.get('/send_message', isAuthenticated, (req, res) => {
    if(req.user.messages <= 0) {
        res.redirect('/home')
    }
    Citizen.find({ villageId: req.user.id }, (err, citizens) => {
        var authkey = '142667ACfRzkmtG58b1262f';
        var sender_id = 'AMBTAX';
        var route = 4;
        var dialcode = 91;
        var sent_number = 0;
        citizens.forEach(citizen => {
            var total_tax=0;
            for (var i = 0; i < citizen.malmatta.length; i++) {
                total_tax_remaining = (parseInt(citizen.malmatta[i].previous_gharpatti)+parseInt(citizen.malmatta[i].previous_panipatti)+parseInt(citizen.malmatta[i].previous_veej)+parseInt(citizen.malmatta[i].previous_aarogya)+parseInt(citizen.malmatta[i].current_gharpatti)+parseInt(citizen.malmatta[i].current_panipatti)+parseInt(citizen.malmatta[i].current_veej)+parseInt(citizen.malmatta[i].current_aarogya))-(parseInt(citizen.malmatta[i].previous_paid_gharpatti)+parseInt(citizen.malmatta[i].previous_paid_panipatti)+parseInt(citizen.malmatta[i].previous_paid_veej)+parseInt(citizen.malmatta[i].previous_paid_aarogya)+parseInt(citizen.malmatta[i].current_paid_gharpatti)+parseInt(citizen.malmatta[i].current_paid_panipatti)+parseInt(citizen.malmatta[i].current_paid_veej)+parseInt(citizen.malmatta[i].current_paid_aarogya));
            }
            var msg = "आपल्याकडे " + total_tax + "₹ कर बाकी आहे. ग्रामपंचायतीकडे तात्काळ कर भरावा.";
            msg91.sendOnewithUnicode(authkey,parseInt(citizen.mobile_no),msg,sender_id,route,dialcode,function(response){})
            sent_number = sent_number+1;
        })
        village.removeMessages(req.user.id, sent_number);
    })
    res.redirect('/home')
})

router.get('/L-a9po0', (req, res) => {
    village.checkTotal();
    res.json({ success: true });
})

module.exports = router;
