const express = require("express");
const router = express.Router();
const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTasks,
} = require("../controller/taskController.js");
const {
    isAuthenticatedUser,
} = require("../middleware/authentication.js");

router.route("/tasks/:id").get(isAuthenticatedUser, getTasks);
router.route("/task/create/:id").post(isAuthenticatedUser, createTask);
router.route("/task/:id").get(isAuthenticatedUser, getTask).put(isAuthenticatedUser, updateTask).delete(isAuthenticatedUser, deleteTask);

module.exports = router;