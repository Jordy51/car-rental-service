const router = require("express").Router();
const mongoose = require("mongoose");
const { Car, Trip } = require("../models/Car");

// /car/:id/book
router.post("/:id/book/:user", async (req, res) => {
	const { fromDateTime, toDateTime } = req.body;
	Car.findOne({ _id: req.params.id }).then((carToBeBooked) => {
		if (carToBeBooked.trips.length == 0 || carToBeBooked.trips[carToBeBooked.trips.length - 1].toDateTime < fromDateTime) {
			const newTrip = new Trip({
				fromDateTime,
				toDateTime,
				user: mongoose.Types.ObjectId(req.params.user),
			});
			console.log(newTrip);
			carToBeBooked.update({
				$push: {
					trips: newTrip,
				},
			})
			console.log(carToBeBooked);
			res.json(carToBeBooked);
		} else {
			res.send("Not Booked!");
		}
	});
});

// /:id/bookings
router.get("/:id/bookings", async (req, res) => {
	const bookings = await Car.findOne({ _id: req.params.id });
	res.json(bookings.trips);
});

module.exports = router;
