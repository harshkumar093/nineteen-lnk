const express = require("express");
const router = express.Router();
const subTaskController = require("../controllers/subtask.controller");

// SubTask routes
router.post("", subTaskController.createSubTask);
router.get("", subTaskController.getAllSubTasks);
router.get("/:id", subTaskController.getSubTaskById);
router.get("/task/:taskId", subTaskController.getSubTasksByTaskId);
router.put("/:id", subTaskController.updateSubTask);
router.delete("/:id", subTaskController.deleteSubTask);

module.exports = router;
