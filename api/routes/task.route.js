const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("", taskController.createTask);
router.get("", taskController.getAllTasks);
router.get("/:id", taskController.getTaskById);
router.get("/story/:storyId", taskController.getTasksByStoryId);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

module.exports = router;
