const router = require("express").Router();
const Car = require("../models/Car");
const Booking = require("../models/Booking");

// /car/book

// /car/bookings

sanitizeCarLicenseNumber = (carLicenseNumber) => {
	return String(carLicenseNumber).toUpperCase();
};

// /cars Read All
router.get("/", async (req, res) => {
	var cars = await Car.find({});
	res.json(cars);
});

// /cars Read
router.get("/:id", async (req, res) => {
	res.json(await Car.findOne({ _id: req.params.id }));
});

// /cars Create
router.post("/", async (req, res) => {
	const { carLicenseNumber, manufacturer, model, price, pricePerHour, securityDeposit } = req.body;

	const findCar = await Car.findOne({ carLicenseNumber: sanitizeCarLicenseNumber(carLicenseNumber) });

	if (findCar) {
		res.send(`Car with LicenseNumber ${carLicenseNumber} already exists.`);
	} else {
		const newCar = new Car({
			carLicenseNumber: sanitizeCarLicenseNumber(carLicenseNumber),
			manufacturer,
			model,
			price,
			pricePerHour,
			securityDeposit,
		});
		newCar
			.save()
			.then(() => res.json(newCar))
			.catch((err) => console.log(err));
	}
});

// /cars Update
router.put("/:id", async (req, res) => {
	const updatedCar = await Car.findOneAndUpdate({ _id: req.params.id }, { ...req.body });
	res.json(updatedCar);
});

// /cars Delete
router.delete("/:id", async (req, res) => {
	const deleteCar = await Car.findByIdAndDelete({ _id: req.params.id });
	res.json(deleteCar);
});

// /cars/:id/bookings
router.get("/:id/bookings", async (req, res) => {
	const bookings = await Booking.find({ car: req.params.id }).populate("user");
	res.json(bookings);
});



module.exports = router;
