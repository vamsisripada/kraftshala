const express = require("express");
const auth = require("../../../middlewares/auth");
const controller = require("../interface/meetingController");

const router = express.Router();

router.post("/", auth, controller.createMeeting);
router.get("/", auth, controller.listMeetings);
router.get("/:id", auth, controller.getMeeting);
router.put("/:id", auth, controller.updateMeeting);
router.delete("/:id", auth, controller.deleteMeeting);

module.exports = router;
