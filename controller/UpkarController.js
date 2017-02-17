const Upkar = require('../models/Upkar');

var exports = module.exports = {};

exports.updateImaratKarRate = (body) => {
	if(body.type==1) {
		console.log(body.type);
		Upkar.findOneAndUpdate({ id: body.id }, { $set: { zopdi_per_thousand: body.rate_per_thousand, zopdi_reknar_dar: body.reknar_dar }}, function (err, tank) {
			if (err) { console.log(err); return handleError(err) };
		});
		return true;
	} else if(body.type==2) {
		console.log(body.type);
		Upkar.findOneAndUpdate({ id: body.id }, { $set: { vita_per_thousand: body.rate_per_thousand, vita_reknar_dar: body.reknar_dar }}, function (err, tank) {
			if (err) { console.log(err); return handleError(err) };
		});
		return true;
	} else if(body.type==3) {
		console.log(body.type);
		Upkar.findOneAndUpdate({ id: body.id }, { $set: { cement_per_thousand: body.rate_per_thousand, cement_reknar_dar: body.reknar_dar }}, function (err, tank) {
			if (err) { console.log(err); return handleError(err) };
		});
		return true;
	} else if(body.type==4) {
		console.log(body.type);
		Upkar.findOneAndUpdate({ id: body.id }, { $set: { rcc_per_thousand: body.rate_per_thousand, rcc_reknar_dar: body.reknar_dar }}, function (err, tank) {
			if (err) { console.log(err); return handleError(err) };
		});
		return true;
	} else if(body.type==5) {
		console.log(body.type);
		Upkar.findOneAndUpdate({ id: body.id }, { $set: { khulli_jamin_per_thousand: body.rate_per_thousand }}, function (err, tank) {
			if (err) { console.log(err); return handleError(err) };
		});
		return true;
	}
}

exports.addVarshikMulya = (body) => {
	Upkar.findOneAndUpdate({ id: body.id }, { $push: { varshik_mulya: { name: body.mulya_name, rate: body.mulya_rate } } }, (err, up) => {
		if(err) { console.log(err); return handleError(err) };
	})
}