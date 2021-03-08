const router = require("express").Router();
const User = require("../models/User");
const Booking = require("../models/Booking");

// /user Read All
router.get("/", (req, res) => {
	User.find({})
		.then((users) => res.json(users))
		.catch((err) => console.log(err));
});

// /user Read
router.get("/:id", (req, res) => {
	User.findById({ _id: req.params.id })
		.then((user) => res.json(user))
		.catch((err) => console.log(err));
});

// /user Create
router.post("/", async (req, res) => {
	const { userId, mobileNumber, name } = req.body;

	const findUser = await User.findOne({ userId: userId });

	if (mobileNumber.length != 10) {
		res.send(`Invalid mobileNumber`);
	} else if (findUser) {
		res.send(`User with UserId ${findUser.userId} already exist.`);
	} else {
		const newUser = new User({
			userId,
			mobileNumber,
			name,
		});

		newUser
			.save()
			.then((newUser) => res.json(newUser))
			.catch((err) => console.log(err));
	}
});

// /user Update
router.put("/:id", (req, res) => {
	User.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
		.then((user) => res.json(user))
		.catch((err) => console.log(err));
});

// /user Delete
router.delete("/:id", (req, res) => {
	User.findByIdAndDelete({ _id: req.params.id })
		.then((user) => res.json(user))
		.catch((err) => console.log(err));
});

// /user/:id/bookings
router.get("/:id/bookings", async (req, res) => {
	const bookings = await Booking.find({ user: req.params.id }).populate("car");
	res.json(bookings);
});

module.exports = router;
