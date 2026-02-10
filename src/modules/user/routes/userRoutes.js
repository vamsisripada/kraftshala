const express = require("express");
const controller = require("../interface/userController");

const router = express.Router();

router.post("/", controller.createUser);
router.get("/:id", controller.getUser);

module.exports = router;
