const Citizen = require('../models/Citizen');
const Upkar = require('../models/Upkar');

var bhandwali_mulya, current_gharpatti, malmatta = {},
    m_u = {};

var exports = module.exports = {}

var ghasara_dar = (year) => {
    if (year >= 0 && year <= 2) {
        return 1;
    } else if (year > 2 && year <= 5) {
        return 0.95;
    } else if (year > 5 && year <= 10) {
        return 0.85;
    } else if (year > 10 && year <= 20) {
        return 0.75;
    } else if (year > 20 && year <= 30) {
        return 0.60;
    } else if (year > 30 && year <= 40) {
        return 0.45;
    } else if (year > 40 && year <= 50) {
        return 0.30;
    } else if (year > 50 && year <= 60) {
        return 0.20;
    } else if (year > 60) {
        return 0.15;
    }
}

exports.newCitizen = (id, body) => {
    var person = new Citizen();
    var area = body.pupa * body.daut * 0.09290304;
    person.srno = body.srno;
    person.villageId = id;
    person.name = body.name;
    person.wife_name = body.wife_name;
    person.mobile_no = body.cell_no;
    person.address = body.address;
    malmatta.pupa = body.pupa;
    malmatta.dau = body.daut;
    malmatta.malmatta_number = body.malmatta_no;
    malmatta.formula = body.formula;
    malmatta.area = Math.round(area);
    malmatta.majla_tal_use = body.tal_use;
    malmatta.majla_tal_year = body.tal_year;
    malmatta.majla_tal_area = body.tal_area;
    if (body.first_floor_yes_no == 'yes') {
        malmatta.majla_first_use = body.first_floor_use;
        malmatta.majla_first_year = body.first_floor_year;
        malmatta.majla_first_area = body.first_floor_area;
        if (body.second_floor_yes_no == 'yes') {
            malmatta.majla_second_use = body.second_floor_use;
            malmatta.majla_second_year = body.second_floor_year;
            malmatta.majla_second_area = body.second_floor_area;
        }
    }
    malmatta.land_type = body.land_type;
    malmatta.ward_name = body.ward_type;
    malmatta.payee_name = body.payee_name;
    malmatta.home_number = body.home_number;
    malmatta.survey_number = body.survey_number;
    malmatta.previous_gharpatti = body.previous_gharpatti;
    malmatta.previous_veej = body.previous_veej;
    malmatta.previous_aarogya = body.previous_aarogya;
    malmatta.previous_panipatti = body.previous_panipatti;
    malmatta.east = body.east;
    malmatta.west = body.west;
    malmatta.south = body.south;
    malmatta.north = body.north;
    malmatta.door = body.door;
    malmatta.comment = body.comment;
    malmatta.current_panipatti = body.panipatti_type;
    malmatta.current_aarogya = body.aarogya_type;
    malmatta.current_veej = body.veej_type;
    if (body.malmatta_type === 'a') {
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            var bharank = upkar.varshik_mulya.id(body.land_type);
            bhandwali_mulya = (area * upkar.zopdi_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
            current_gharpatti = (bhandwali_mulya * upkar.zopdi_per_thousand) / 1000;
            malmatta.malmatta_type = 'झोपडी व मातीचे घर';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = bharank.rate;
            malmatta.ready_reknar = upkar.zopdi_reknar_dar;
            malmatta.kar_rate = upkar.zopdi_per_thousand;
            malmatta.ghasara_dar = ghasara_dar(2017 - body.tal_year);
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    } else if (body.malmatta_type === 'b') {
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            var bharank = upkar.varshik_mulya.id(body.land_type);
            bhandwali_mulya = (area * upkar.vita_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
            current_gharpatti = (bhandwali_mulya * upkar.vita_per_thousand) / 1000;
            malmatta.malmatta_type = 'दगड किंवा विटा वापरलेली मातीची इमारत';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = bharank.rate;
            malmatta.ready_reknar = upkar.vita_reknar_dar;
            malmatta.kar_rate = upkar.vita_per_thousand;
            malmatta.ghasara_dar = ghasara_dar(2017 - body.tal_year);
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    } else if (body.malmatta_type === 'c') {
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            var bharank = upkar.varshik_mulya.id(body.land_type);
            bhandwali_mulya = (area * upkar.cement_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
            current_gharpatti = (bhandwali_mulya * upkar.cement_per_thousand) / 1000;
            malmatta.malmatta_type = 'दगड, विटाची व चुना किंवा सिमेंट वापरून उभारलेली इमारत';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = bharank.rate;
            malmatta.ready_reknar = upkar.cement_reknar_dar;
            malmatta.kar_rate = upkar.cement_per_thousand;
            malmatta.ghasara_dar = ghasara_dar(2017 - body.tal_year);
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    } else if (body.malmatta_type === 'd') {
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            var bharank = upkar.varshik_mulya.id(body.land_type);
            bhandwali_mulya = (area * upkar.rcc_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
            current_gharpatti = (bhandwali_mulya * upkar.rcc_per_thousand) / 1000;
            malmatta.malmatta_type = 'आर.सी.सी. पद्धतीचे घर';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = bharank.rate;
            malmatta.ready_reknar = upkar.rcc_reknar_dar;
            malmatta.kar_rate = upkar.rcc_per_thousand;
            malmatta.ghasara_dar = ghasara_dar(2017 - body.tal_year);
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    } else if (body.malmatta_type === 'e') {
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            bhandwali_mulya = (area * 710);
            current_gharpatti = (bhandwali_mulya * upkar.khulli_jamin_per_thousand) / 1000;
            malmatta.malmatta_type = 'खुल्ली जमीन';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = '1';
            malmatta.ready_reknar = '710';
            malmatta.kar_rate = upkar.khulli_jamin_per_thousand;
            malmatta.ghasara_dar = '0';
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    } else if (body.malmatta_type === 'f') {
        malmatta.manora_talghar_area = body.manora_talghar_area;
        malmatta.manora_khulla_area = body.manora_khulla_area;
        malmatta.majla_tal_year = body.manora_year;
        Upkar.findOne({
            villageId: id
        }, (err, upkar) => {
            var bharank = upkar.varshik_mulya.id(body.land_type);
            bhandwali_mulya = ((body.manora_talghar_area * 0.09290304) * upkar.rcc_reknar_dar) + ((body.manora_khulla_area * 0.09290304) * 710);
            current_gharpatti = ((((body.manora_talghar_area * 0.09290304) * upkar.rcc_reknar_dar) * upkar.manora_talghar_rate) / 1000) + ((((body.manora_khulla_area * 0.09290304) * 710) * upkar.manora_khulli_jaga_normal_rate) / 1000);
            malmatta.malmatta_type = 'मनोरा';
            malmatta.bhandwali_mulya = Math.round(bhandwali_mulya);
            malmatta.current_gharpatti = Math.round(current_gharpatti);
            malmatta.bharank_rate = bharank.rate;
            malmatta.ready_reknar = '14000';
            malmatta.kar_rate = upkar.manora_talghar_rate;
            malmatta.ghasara_dar = 'N/A';
            malmatta.total = Math.round(current_gharpatti);
            person.malmatta.push(malmatta);
            person.save(err => {
                if (err) throw err;
            });
        })
    }
}

exports.addMalmatta = (id, villageId, body) => {
    Citizen.findOne({
        _id: id
    }, (err, citizen) => {
        var area = body.pupa * body.daut * 0.09290304;
        m_u.pupa = body.pupa;
        m_u.dau = body.daut;
        m_u.malmatta_number = body.malmatta_no;
        m_u.formula = body.formula;
        m_u.area = Math.round(area);
        m_u.majla_tal_use = body.tal_use;
        m_u.majla_tal_year = body.tal_year;
        m_u.majla_tal_area = body.tal_area;
        if (body.first_floor_yes_no == 'yes') {
            m_u.majla_first_use = body.first_floor_use;
            m_u.majla_first_year = body.first_floor_year;
            m_u.majla_first_area = body.first_floor_area;
            if (body.second_floor_yes_no == 'yes') {
                m_u.majla_second_use = body.second_floor_use;
                m_u.majla_second_year = body.second_floor_year;
                m_u.majla_second_area = body.second_floor_area;
            }
        }
        m_u.land_type = body.land_type;
        m_u.ward_name = body.ward_type;
        m_u.payee_name = body.payee_name;
        m_u.home_number = body.home_number;
        m_u.survey_number = body.survey_number;
        m_u.previous_gharpatti = body.previous_gharpatti;
        m_u.previous_veej = body.previous_veej;
        m_u.previous_aarogya = body.previous_aarogya;
        m_u.previous_panipatti = body.previous_panipatti;
        m_u.east = body.east;
        m_u.west = body.west;
        m_u.south = body.south;
        m_u.north = body.north;
        m_u.door = body.door;
        m_u.comment = body.comment;
        m_u.current_panipatti = body.panipatti_type;
        m_u.current_aarogya = body.aarogya_type;
        m_u.current_veej = body.veej_type;
        if (body.malmatta_type === 'a') {
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                var bharank = upkar.varshik_mulya.id(body.land_type);
                bhandwali_mulya = (area * upkar.zopdi_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
                current_gharpatti = (bhandwali_mulya * upkar.zopdi_per_thousand) / 1000;
                m_u.malmatta_type = 'झोपडी व मातीचे घर';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = bharank.rate;
                m_u.ready_reknar = upkar.zopdi_reknar_dar;
                m_u.kar_rate = upkar.zopdi_per_thousand;
                m_u.ghasara_dar = ghasara_dar(2017 - body.tal_year);
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        } else if (body.malmatta_type === 'b') {
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                var bharank = upkar.varshik_mulya.id(body.land_type);
                bhandwali_mulya = (area * upkar.vita_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
                current_gharpatti = (bhandwali_mulya * upkar.vita_per_thousand) / 1000;
                m_u.malmatta_type = 'दगड किंवा विटा वापरलेली मातीची इमारत';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = bharank.rate;
                m_u.ready_reknar = upkar.vita_reknar_dar;
                m_u.kar_rate = upkar.vita_per_thousand;
                m_u.ghasara_dar = ghasara_dar(2017 - body.tal_year);
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        } else if (body.malmatta_type === 'c') {
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                var bharank = upkar.varshik_mulya.id(body.land_type);
                bhandwali_mulya = (area * upkar.cement_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
                current_gharpatti = (bhandwali_mulya * upkar.cement_per_thousand) / 1000;
                m_u.malmatta_type = 'दगड, विटाची व चुना किंवा सिमेंट वापरून उभारलेली इमारत';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = bharank.rate;
                m_u.ready_reknar = upkar.cement_reknar_dar;
                m_u.kar_rate = upkar.cement_per_thousand;
                m_u.ghasara_dar = ghasara_dar(2017 - body.tal_year);
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        } else if (body.malmatta_type === 'd') {
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                var bharank = upkar.varshik_mulya.id(body.land_type);
                bhandwali_mulya = (area * upkar.rcc_reknar_dar * ghasara_dar(2017 - body.tal_year) * bharank.rate);
                current_gharpatti = (bhandwali_mulya * upkar.rcc_per_thousand) / 1000;
                m_u.malmatta_type = 'आर.सी.सी. पद्धतीचे घर';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = bharank.rate;
                m_u.ready_reknar = upkar.rcc_reknar_dar;
                m_u.kar_rate = upkar.rcc_per_thousand;
                m_u.ghasara_dar = ghasara_dar(2017 - body.tal_year);
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        } else if (body.malmatta_type === 'e') {
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                bhandwali_mulya = (area * 710);
                current_gharpatti = (bhandwali_mulya * upkar.khulli_jamin_per_thousand) / 1000;
                m_u.malmatta_type = 'खुल्ली जमीन';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = '1';
                m_u.ready_reknar = '710';
                m_u.kar_rate = upkar.khulli_jamin_per_thousand;
                m_u.ghasara_dar = '0';
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        } else if (body.malmatta_type === 'f') {
            m_u.manora_talghar_area = body.manora_talghar_area;
            m_u.manora_khulla_area = body.manora_khulla_area;
            m_u.majla_tal_year = body.manora_year;
            Upkar.findOne({
                villageId: villageId
            }, (err, upkar) => {
                var bharank = upkar.varshik_mulya.id(body.land_type);
                bhandwali_mulya = ((body.manora_talghar_area * 0.09290304) * upkar.rcc_reknar_dar) + ((body.manora_khulla_area * 0.09290304) * 710);
                current_gharpatti = ((((body.manora_talghar_area * 0.09290304) * upkar.rcc_reknar_dar) * upkar.manora_talghar_rate) / 1000) + ((((body.manora_khulla_area * 0.09290304) * 710) * upkar.manora_khulli_jaga_normal_rate) / 1000);
                m_u.malmatta_type = 'मनोरा';
                m_u.bhandwali_mulya = Math.round(bhandwali_mulya);
                m_u.current_gharpatti = Math.round(current_gharpatti);
                m_u.bharank_rate = bharank.rate;
                m_u.ready_reknar = '14000';
                m_u.kar_rate = upkar.manora_talghar_rate;
                m_u.ghasara_dar = 'N/A';
                m_u.total = Math.round(current_gharpatti);
                citizen.malmatta.push(m_u);
                citizen.save(err => {
                    if (err) throw err;
                });
            })
        }
    })
}

exports.deleteCitizen = id => {
    Citizen.remove({
        _id: id
    }, err => {
        if (err) throw err;
    })
}

exports.updateKar = (id, body) => {
    var loc_id = body.kar_id, a = {};
    a.current_veej = parseInt(body.veej);
    a.current_aarogya = parseInt(body.aarogya);
    a.current_panipatti = parseInt(body.pani);
    a.previous_veej = parseInt(body.previous_veej);
    a.previous_aarogya = parseInt(body.previous_aarogya);
    a.previous_panipatti = parseInt(body.previous_pani);
    a.total = parseInt(body.veej) + parseInt(body.aarogya) + parseInt(body.pani) + parseInt(body.gharpatti);
    Citizen.findOneAndUpdate(
    { "_id": id, "malmatta._id": loc_id },
    { 
        "$set": {
            "malmatta.$.current_veej": a.current_veej,
            "malmatta.$.current_aarogya": a.current_aarogya,
            "malmatta.$.current_panipatti": a.current_panipatti,
            "malmatta.$.total": a.total
        }
    },
    function(err,doc) {
        if(err) throw err;
    });
}

exports.payKar = (id, body) => {
    var loc_id = body.malmatta_id, a = {};
    a.previous_paid_gharpatti = parseInt(body.previous_paid_gharpatti);
    a.current_paid_gharpatti = parseInt(body.current_paid_gharpatti);
    a.previous_paid_veej = parseInt(body.previous_paid_veej);
    a.current_paid_veej = parseInt(body.current_paid_veej);
    a.previous_paid_aarogya = parseInt(body.previous_paid_aarogya);
    a.current_paid_aarogya = parseInt(body.current_paid_aarogya);
    a.previous_paid_panipatti = parseInt(body.previous_paid_panipatti);
    a.current_paid_panipatti = parseInt(body.current_paid_panipatti);
    Citizen.findOneAndUpdate(
    { "_id": id, "malmatta._id": loc_id },
    { 
        "$set": {
            "malmatta.$.previous_paid_gharpatti": a.previous_paid_gharpatti,
            "malmatta.$.previous_paid_panipatti": a.previous_paid_panipatti,
            "malmatta.$.previous_paid_veej": a.previous_paid_veej,
            "malmatta.$.previous_paid_aarogya": a.previous_paid_aarogya,
            "malmatta.$.current_paid_aarogya": a.current_paid_aarogya,
            "malmatta.$.current_paid_gharpatti": a.current_paid_gharpatti,
            "malmatta.$.current_paid_panipatti": a.current_paid_panipatti,
            "malmatta.$.current_paid_veej": a.current_paid_veej
        }
    },
    function(err,doc) {
        if(err) throw err;
    });
}

exports.updateCitizenInfo = (body, id) => {
    Citizen.findOneAndUpdate(
    { "_id": id },
    { 
        "$set": {
            "name": body.name,
            "wife_name": body.wife_name,
            "mobile_no": body.cell_no,
            "address": body.address
        }
    },
    function(err,doc) {
        if(err) throw err;
    });
}

exports.deleteMalmatta = (body, id) => {
    Citizen.findOne({
        _id: id
    }, (err, citizen) => {
        if (err) return handleError(err);
        citizen.malmatta.id(body.malmatta_number).remove();
        citizen.save((err) => {
            if (err) throw err;
            console.log("removed");
        })
    });
}