const router = require("express").Router();
const mongoose = require("mongoose");

const Booking = require("../models/Booking");

// /:id/book/:user
router.post("/:id/book/:user", async (req, res) => {
	const { fromDateTime, toDateTime } = req.body;
	const newTrip = new Booking({
		fromDateTime,
		toDateTime,
		user: mongoose.Types.ObjectId(req.params.user),
		car: mongoose.Types.ObjectId(req.params.id),
	});
	newTrip.save();
	res.json(newTrip);
});

// All Bookings
router.get("/bookings", async (req, res) => {
	let trips = await Booking.find({}).populate(["user", "car"]);
	res.json(trips);
});

module.exports = router;

// router.post("/:id/book/:user", async (req, res) => {
// 	const { fromDateTime, toDateTime } = req.body;
// 	Car.findByIdAndUpdate({ _id: req.params.id }).then((carToBeBooked) => {
// 		// if (carToBeBooked.trips.length >= 0 || carToBeBooked.trips[carToBeBooked.trips.length - 1].toDateTime < fromDateTime) {
// 		if (carToBeBooked.trips.length >= 0) {
// 			const newTrip = new Trip({
// 				fromDateTime,
// 				toDateTime,
// 				user: mongoose.Types.ObjectId(req.params.user),
// 				car: mongoose.Types.ObjectId(req.params.id),
// 			});
// 			carToBeBooked.trips.push(newTrip);
// 			carToBeBooked.save();
// 			res.json(carToBeBooked);
// 		} else {
// 			res.send("Not Booked!");
// 		}
// 	});
// });
