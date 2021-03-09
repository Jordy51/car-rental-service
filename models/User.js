const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: Number,
		required: true,
		min: 1000000000,
		max: 9999999999,
	},
	name: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", UserSchema);
