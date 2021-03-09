const router = require("express").Router();
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Car = require("../models/Car");

calculateTotalCost = async (carId, fromDateTime, toDateTime) => {
	const { price, pricePerHour, securityDeposit } = await Car.findOne({ _id: carId });
	const timeDifference = toDateTime - fromDateTime;
	const hours = Math.ceil(timeDifference / 3600000);
	return price + securityDeposit + pricePerHour * hours;
};

validateDateTime = (fromDateTime, toDateTime) => {
	if (fromDateTime >= toDateTime || Date.now() > fromDateTime || Date.now() < fromDateTime - 3600000 * 24 * 50) {
		return -1;
	} else {
		return 1;
	}
};

// /:id/book/:user
router.post("/:id/book/:user", async (req, res) => {
	const { fromDateTime, toDateTime } = req.body;
	if (validateDateTime(fromDateTime, toDateTime)) {
		const totalCost = await calculateTotalCost(req.params.id, fromDateTime, toDateTime);
		const newBooking = new Booking({
			fromDateTime,
			toDateTime,
			user: mongoose.Types.ObjectId(req.params.user),
			car: mongoose.Types.ObjectId(req.params.id),
			cost: totalCost,
		});
		newBooking
			.save()
			.then(() => res.json(newBooking))
			.catch((err) => console.log(err));
	} else {
		res.send("Invalid dateTime");
	}
});

// All Bookings
router.get("/bookings", async (req, res) => {
	let bookings = await Booking.find({}).populate(["user", "car"]);
	res.json(bookings);
});

// /search-cars
router.get("/search-cars/:fromDateTime/:toDateTime", async (req, res) => {
	const { fromDateTime, toDateTime } = req.params;
	const cars = await Car.find();

	let availableCars = Array();
	for (let i = 0; i < cars.length; i++) {
		let bookings = await Booking.findOne({ car: cars[i]._id, fromDateTime: { $lt: toDateTime }, toDateTime: { $gt: fromDateTime } });
		if (bookings === null) {
			availableCars.push(cars[i]);
		}
	}
	res.json(availableCars);
});

// /calculate-price
router.get("/calculate-price/:id/:fromDateTime/:toDateTime", async (req, res) => {
	if (validateDateTime(req.params.fromDateTime, req.params.toDateTime)) {
		const totalCost = await calculateTotalCost(req.params.id, req.params.fromDateTime, req.params.toDateTime);
		res.json(totalCost);
	} else {
		res.send("Invalid dateTime");
	}
});

module.exports = router;
