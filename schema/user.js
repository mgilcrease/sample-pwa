const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true, select: false },
	created: { type: Date, default: Date.now() },
	modified: { type: Date, default: Date.now() }
});

// Handle modified dates in all the places
UserSchema.pre("save", function () {
	this.modified = Date.now();
});

UserSchema.pre("update", function () {
	this.update({}, { $set: { modified: Date.now() } });
});

UserSchema.pre("updateOne", function () {
	this.updateOne({}, { $set: { modified: Date.now() } });
});

UserSchema.pre("updateMany", function () {
	this.updateMany({}, { $set: { modified: Date.now() } });
});

// Handle password encryption and validation
UserSchema.pre("save", async function (next) {
	let user = this;

	if (!user.isModified("password"))  {
		console.log("password unchanged");
		return next();
	}
	console.log("password unchanged");

	try {
		user.password = await bcrypt.hash(user.password, SALT_WORK_FACTOR);
		console.log(user.password);
	} catch(ex) {
		return next(ex);
	}

	next();
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
	return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
