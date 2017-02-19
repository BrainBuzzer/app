const Citizen = require('../models/Citizen');

var exports = module.exports = {}

exports.newCitizen = (id, body) => {
	var person = new Citizen();
	person.villageId = id;
	person.name = body.name;
	person.wife_name = body.wife_name;
	person.mobile_no = body.cell_no;
	person.address = body.address;
	person.malmatta_number = body.malmatta_no;
	person.malmatta_type = body.malmatta_type;
	person.formula = body.formula;
	person.area = body.area;
	person.majla_tal_use = body.tal_use;
	person.majla_tal_year = body.tal_year;
	person.majla_tal_area = body.tal_area;
	person.majla_tal_type = body.tal_type;
	if(body.first_floor_yes_no == 'yes') {
		person.majla_first_use = body.first_floor_use;
		person.majla_first_year = body.first_floor_year;
		person.majla_first_area = body.first_floor_area;
		person.majla_first_type = body.first_floor_type;
	}
	if(body.second_floor_yes_no == 'yes') {
		person.majla_second_use = body.second_floor_use;
		person.majla_second_year = body.second_floor_year;
		person.majla_second_area = body.second_floor_area;
		person.majla_second_type = body.second_floor_type;
	}
	person.land_type = body.land_type;
	person.ward_name = body.ward_type;
	person.payee_name = body.payee_name;
	person.home_number = body.home_number;
	person.survey_number = body.survey_number;
	person.previous_gharpatti = body.previous_gharpatti;
	person.previous_veej = body.previous_veej;
	person.previous_aarogya = body.previous_aarogya;
	person.previous_panipatti = body.previous_panipatti;
	person.east = body.east;
	person.west = body.west;
	person.south = body.south;
	person.north = body.north;
	person.door = body.door;
	person.panipatti_kar_type = body.panipatti_type;
	person.save(err => {
		if(err) throw err;
		console.log("saved...");
	})
}