const router = require("express").Router();
const User = require("../models/User");
const Booking = require("../models/Booking");
const bcrypt = require("bcryptjs");

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

// /user create
router.post("/", (req, res) => {
	const { userId, email, password, mobileNumber } = req.body;
	let errors = [];

	if (!userId || !email || !password || !mobileNumber) {
		errors.push({ msg: "Please enter all fields" });
	}

	if (password.length < 6) {
		errors.push({ msg: "Password must be at least 6 characters" });
	}

	if (errors.length > 0) {
		res.json(errors);
	} else {
		User.findOne({ email: email }).then((user) => {
			if (user) {
				errors.push({ msg: "Email already exists" });
				res.json(errors);
			} else {
				const newUser = new User({
					userId,
					email,
					password,
					mobileNumber,
				});

				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if (err) throw err;
						newUser.password = hash;
						newUser
							.save()
							.then((user) => {
								res.json(user);
							})
							.catch((err) => console.log(err));
					});
				});
			}
		});
	}
});

// /user Update
router.put("/:id", (req, res) => {
	User.findOneAndUpdate({ _id: req.params.id }, { ...req.body })
		.then((user) => res.json({ msg: "User updated!", userId: user.userId }))
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
