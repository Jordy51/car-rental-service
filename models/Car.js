const mongoose = require("mongoose");

const CarSchema = mongoose.Schema({
	carLicenseNumber: {
		type: String,
		required: true,
		validate: (n) => {
			return /[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}/.test(n);
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
