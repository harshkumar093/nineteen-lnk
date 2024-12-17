const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.get("/:id", projectController.getProjectById);
router.get("/user/:userId", projectController.getProjectsByUserId);
router.put("/:id", projectController.updateProject);
router.delete("/:id", projectController.deleteProject);

module.exports = router;
