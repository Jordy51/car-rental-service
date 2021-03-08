const router = require("express").Router();
const mongoose = require("mongoose");

const Booking = require("../models/Booking");
const Car = require("../models/Car");

calculateTotalCost = async (carId, fromDateTime, toDateTime) => {
	const { price, pricePerHour, securityDeposit } = await Car.findOne({ _id: carId });
	const timeDifference = toDateTime - fromDateTime;
	const hours = Math.ceil(timeDifference / 3600000);
	console.log(price, pricePerHour, securityDeposit, hours);
	return price + securityDeposit + pricePerHour * hours;
};

// /:id/book/:user
router.post("/:id/book/:user", async (req, res) => {
	const { fromDateTime, toDateTime } = req.body;
	const totalCost = await calculateTotalCost(req.params.id, fromDateTime, toDateTime);
	console.log(totalCost);
	const newBooking = new Booking({
		fromDateTime,
		toDateTime,
		user: mongoose.Types.ObjectId(req.params.user),
		car: mongoose.Types.ObjectId(req.params.id),
		cost: totalCost,
	});
	console.log(newBooking);
	newBooking.save();
	res.json(newBooking);
});

// All Bookings
router.get("/bookings", async (req, res) => {
	let bookings = await Booking.find({}).populate(["user", "car"]);
	res.json(bookings);
});

// /search-cars
router.get("/search-cars/:fromDateTime/:toDateTime", async (req, res) => {
	const cars = await Car.find();
	let availableCars = Array();
	for (let i = 0; i < cars.length; i++) {
		let flag = 1;
		let bookings = cars[i].bookings;
		for (let j = bookings.length; j != 0; j--) {
			if (bookings[j].toDateTime < req.params.fromDateTime || bookings[j].fromDateTime > req.params.toDateTime) {
			} else {
				flag = 0;
			}
		}
		if (!flag) {
			availableCars.push(cars[i]);
		}
	}
});

// /calculate-price
router.get("/calculate-price/:id/:fromDateTime/:toDateTime", async (req, res) => {
	const totalCost = await calculateTotalCost(req.params.id, req.params.fromDateTime, req.params.toDateTime);
	res.json(totalCost);
});

module.exports = router;
