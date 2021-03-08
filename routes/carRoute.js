const router = require("express").Router();
const { Car } = require("../models/Car");

// /car/book

// /car/bookings

sanitizeCarLicenseNumber = (carLicenseNumber) => {
	return String(carLicenseNumber).toUpperCase();
};

// /cars Read All
router.get("/", async (req, res) => {
	res.json(await Car.find({}));
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

// /cars/search-cars
router.get("/search-cars/:fromDateTime/:toDateTime", async (req, res) => {
	const searchedCars = await Car.find({});
});

// /cars/calculate-price
router.get("/calculate-price/:id/:fromDateTime/:toDateTime", async (req, res) => {
	const { price, pricePerHour, securityDeposit } = await Car.findOne({ _id: req.params.id });
	const timeDifference = req.params.toDateTime - req.params.fromDateTime;
	const hours = Math.ceil(timeDifference / 3600000);
	res.json(price + pricePerHour * hours + securityDeposit);
});

module.exports = router;
