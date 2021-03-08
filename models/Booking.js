const mongoose = require("mongoose");

const BookingSchema = mongoose.Schema({
	fromDateTime: {
		type: Date,
		required: true,
	},
	toDateTime: {
		type: Date,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	car: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Car",
	},
});

module.exports = mongoose.model("Booking", BookingSchema);
