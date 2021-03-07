const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	userId: {
		type: String,
		required: true,
	},
	mobileNumber: {
		type: Number,
		required: true,
		min: 10,
		max: 10,
	},
});

module.exports = mongoose.model("User", UserSchema);
