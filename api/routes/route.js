const express = require("express");
const router = express.Router();
const projectRoute = require("./project.route");
const storyRoute = require("./story.route");
const taskRoute = require("./task.route");
const subtaskRoute = require("./subtask.route");
const userRoute = require("./user.route");

router.use("/project", projectRoute);
router.use("/story", storyRoute);
router.use("/task", taskRoute);
router.use("/subtask", subtaskRoute);
router.use("/user", userRoute);

module.exports = router;
