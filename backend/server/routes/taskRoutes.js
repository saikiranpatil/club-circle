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
    extractClubId,
    authorizeRoles,
} = require("../middleware/authentication.js");

router.route("/tasks/:id")
    .get(isAuthenticatedUser, extractClubId("club"), authorizeRoles("member", "cadmin"), getTasks);
router.route("/task/create/:id")
    .post(isAuthenticatedUser, extractClubId("club"), authorizeRoles("cadmin"), createTask);
router.route("/task/:id")
    .get(isAuthenticatedUser, extractClubId("task"), authorizeRoles("member", "cadmin"), getTask)
    .put(isAuthenticatedUser, extractClubId("task"), authorizeRoles("cadmin"), updateTask)
    .delete(isAuthenticatedUser, extractClubId("task"), authorizeRoles("cadmin"), deleteTask);

module.exports = router;