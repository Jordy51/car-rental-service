const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
	carLicenseNumber: {
		type: String,
		required: true,
		validate: (n) => {
			return /[A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{4}/.test(v);
		},
	},
	manufacturer: {
		type: String,
		required: true,
	},
	model: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
		mix: 0,
	},
	pricePerHour: {
		type: Number,
		required: true,
		mix: 0,
	},
	securityDeposit: {
		type: Number,
		required: true,
		mix: 0,
	},
});

module.exports = mongoose.model("Car", CarSchema);
// carLicenseNumber(Unique true) = KA01EM7070,
// Manufacturer - honda,
// Model - city,
// base-price (Base price for any KM) - Rs500,
// PPH (Price per hour) - Rs150,
// security deposit - Rs1000
