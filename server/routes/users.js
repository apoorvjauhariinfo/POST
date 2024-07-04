const router = require("express").Router();
const { User, validate } = require("../model/user");
const Token = require("../model/token");
const crypto = require("crypto");
const codeEmail = require("../utils/sendCodeEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: req.body.password }).save();

		const token = await new Token({
			userId: user._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		// const url = `http://localhost:3000/users/${user.id}/verify/${token.token}`;
		// const newtoken = token.token.toString()
		 await codeEmail(user.email, token.userId.toString().substring(1,5));

		res
			.status(201)
			.send({ message: "An Email is stopped for this version", token:token.token.toString(),id:user.id.toString() });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });
		console.log("User:", user); // Debugging statement

		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userId: user._id,
			token: req.params.token,
		});
		console.log("User:", user); // Debugging statement

		if (!token) return res.status(400).send({ message: "Invalid link" });

	// 	const { id } = req.params;
      

    //   const { batchno,unitcost,totalquantity,buffervalue,doe,dom } = req.body;
    
    //   // Assuming Stock is your Mongoose model
    //   const document = await Stock.findByIdAndUpdate(id, { batchno, unitcost,totalquantity,buffervalue,doe,dom }, { new: true });
	await User.findByIdAndUpdate(req.params.id, { verified: true }, { new: true });
			// await User.updateOne({ _id: req.params.id , "verified": true });
		//await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.error("Error:", error); // Debugging statement

		res.status(500).send({ message: "Internal Server Error" });
		
	}
});

module.exports = router;