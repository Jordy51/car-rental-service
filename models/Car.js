const mongoose = require("mongoose");

const TripSchema = mongoose.Schema({
	fromDateTime: {
		type: Date,
		required: true,
	},
	toDateTime: {
		type: Date,
		required: true,
	},
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
});

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
	trips: [TripSchema],
});

const Car = mongoose.model("Car", CarSchema);
const Trip = mongoose.model("Trip", TripSchema);

module.exports = { Car, Trip };
// carLicenseNumber(Unique true) = KA01EM7070,
// Manufacturer - honda,
// Model - city,
// base-price (Base price for any KM) - Rs500,
// PPH (Price per hour) - Rs150,
// security deposit - Rs1000