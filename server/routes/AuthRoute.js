const { Signup } = require("../Controllers/AuthController");
const router = require("express").Router();

router.post("/postusers", Signup);

module.exports = router;