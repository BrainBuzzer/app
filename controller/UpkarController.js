const Upkar = require('../models/Upkar');

var exports = module.exports = {};

exports.updateImaratKarRate = (body) => {
    if (body.type == 1) {
        console.log(body.type);
        Upkar.findOneAndUpdate({
            id: body.id
        }, {
            $set: {
                zopdi_per_thousand: body.rate_per_thousand,
                zopdi_reknar_dar: body.reknar_dar
            }
        }, function(err, tank) {
            if (err) {
                console.log(err);
                return handleError(err)
            };
        });
        return true;
    } else if (body.type == 2) {
        console.log(body.type);
        Upkar.findOneAndUpdate({
            id: body.id
        }, {
            $set: {
                vita_per_thousand: body.rate_per_thousand,
                vita_reknar_dar: body.reknar_dar
            }
        }, function(err, tank) {
            if (err) {
                console.log(err);
                return handleError(err)
            };
        });
        return true;
    } else if (body.type == 3) {
        console.log(body.type);
        Upkar.findOneAndUpdate({
            id: body.id
        }, {
            $set: {
                cement_per_thousand: body.rate_per_thousand,
                cement_reknar_dar: body.reknar_dar
            }
        }, function(err, tank) {
            if (err) {
                console.log(err);
                return handleError(err)
            };
        });
        return true;
    } else if (body.type == 4) {
        console.log(body.type);
        Upkar.findOneAndUpdate({
            id: body.id
        }, {
            $set: {
                rcc_per_thousand: body.rate_per_thousand,
                rcc_reknar_dar: body.reknar_dar
            }
        }, function(err, tank) {
            if (err) {
                console.log(err);
                return handleError(err)
            };
        });
        return true;
    } else if (body.type == 5) {
        console.log(body.type);
        Upkar.findOneAndUpdate({
            id: body.id
        }, {
            $set: {
                khulli_jamin_per_thousand: body.rate_per_thousand
            }
        }, function(err, tank) {
            if (err) {
                console.log(err);
                return handleError(err)
            };
        });
        return true;
    }
}

exports.addVarshikMulya = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $push: {
            varshik_mulya: {
                name: body.mulya_name,
                rate: body.mulya_rate
            }
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.deleteVarshikMulya = (body) => {
    Upkar.findOne({
        id: body.id
    }, (err, upkar) => {
        if (err) return handleError(err);
        upkar.varshik_mulya.id(body.type).remove();
        upkar.save((err) => {
            if (err) throw err;
            console.log("removed");
        })
    });
}

exports.addVeejKar = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $push: {
            veej_kar: {
                name: body.veej_name,
                rate: body.veej_rate,
                from_sqft: body.veej_from_sqft,
                to_sqft: body.veej_to_sqft
            }
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.deleteVeejKar = (body) => {
    Upkar.findOne({
        id: body.id
    }, (err, upkar) => {
        if (err) return handleError(err);
        upkar.veej_kar.id(body.type).remove();
        upkar.save((err) => {
            if (err) throw err;
            console.log("removed");
        })
    });
}

exports.addAarogyaKar = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $push: {
            aarogya_kar: {
                name: body.aarogya_name,
                rate: body.aarogya_rate,
                from_sqft: body.aarogya_from_sqft,
                to_sqft: body.aarogya_to_sqft
            }
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.deleteAarogyaKar = (body) => {
    Upkar.findOne({
        id: body.id
    }, (err, upkar) => {
        if (err) return handleError(err);
        upkar.aarogya_kar.id(body.type).remove();
        upkar.save((err) => {
            if (err) throw err;
            console.log("removed");
        })
    });
}

exports.addPanipatti = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $push: {
            panipatti: {
                name: body.panipatti_name,
                rate: body.panipatti_rate
            }
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.deletePanipatti = (body) => {
    Upkar.findOne({
        id: body.id
    }, (err, upkar) => {
        if (err) return handleError(err);
        upkar.panipatti.id(body.type).remove();
        upkar.save((err) => {
            if (err) throw err;
            console.log("removed");
        })
    });
}

exports.talgharRateUpdate = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $set: {
            manora_talghar_rate: body.manora_rate
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.khulliRateUpdate = (body) => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $set: {
            manora_khulli_jaga_normal_rate: body.manora_khulla_rate
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}

exports.imaratRateUpdate = body => {
    Upkar.findOneAndUpdate({
        id: body.id
    }, {
        $set: {
            imarat: {
                home_rate: body.imarat_home_rate,
                sadnika: body.imarat_sadnika_rate,
                dukan: body.imarat_dukan_rate,
                etar: body.imarat_itar_rate
            }
        }
    }, (err, up) => {
        if (err) {
            console.log(err);
            return handleError(err)
        };
    })
}