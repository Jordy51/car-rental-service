const router = require("express").Router();
const Car = require("../models/Car")

// /car/book

// /car/bookings



// /car  GET
router.get("/", (req, res) => {
	res.send("THis is GET page of Car");
});

// /car  POST
router.post("/", async (req, res) => {
	const { carLicenseNumber } = req.body;

    if(await Car.findOne(carLicenseNumber)){
        res.send(`Car with LicenseNumber ${carLicenseNumber} already exists.`)
    }
    else{
        const newCar = new Car({
            ...req.body
        })
        newCar
            .save()
            .then(() =>res.send(newCar))
            .catch((err) => console.log(err))
    }
});

module.exports = router