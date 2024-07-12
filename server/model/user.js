const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	hospitalname: { type: String, required: true },
	//registeras: { type: String, required: true },
	//address: { type: String, required: true },
	firstname: { type: String, required: true },
	lastname: { type: String, required: true },
	email: { type: String, required: true },
	phone: { type: String, required: true },
	// state: { type: String, required: true },
	// district: { type: String, required: true },
	// landmark: { type: String, required: true },
	// pincode: { type: String, required: true },
	password: { type: String, required: true },
	verified: { type: Boolean, default: false },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstname: Joi.string().required().label("First Name"),
		lastname: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
		//address: Joi.string().required().label("Address"),
		phone: Joi.string().required().label("Phone"),
		// landmark: Joi.string().required().label("Landmark"),
		// pincode: Joi.string().required().label("Pincode"),
		// district: Joi.string().required().label("District"),
		// state: Joi.string().required().label("State"),
		hospitalname: Joi.string().required().label("Hospital Name"),
		//registeras:Joi.string().required().label("Register As"),
		verified:Joi.boolean().required().label("Verified"),
	});
	return schema.validate(data);	
};

module.exports = { User, validate };