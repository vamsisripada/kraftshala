const express = require("express");
const controller = require("../interface/userController");

const router = express.Router();

router.post("/login", controller.login);

module.exports = router;
