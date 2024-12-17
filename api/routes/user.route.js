const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
// Import other controllers as needed

// user routes
router.post("", userController.createUser);
router.get("", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

// Define routes for Story, Task, SubTask similarly

module.exports = router;
