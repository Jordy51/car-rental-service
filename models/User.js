const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
	_Id: {
		type: mongoose.Types.ObjectId,
	},
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
	},
});

module.exports = mongoose.model("User", UserSchema);
