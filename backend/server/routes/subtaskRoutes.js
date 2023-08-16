const express = require('express');
const router = express.Router();
const {
    createSubtask,
    getSubtask,
    updateSubtask,
    deleteSubtask,
    getSubtasks,
} = require('../controller/subTaskController');
const {
    isAuthenticatedUser,
    extractClubId,
    authorizeRoles,
} = require('../middleware/authentication');

router.route('/subtasks/:id').get(isAuthenticatedUser, getSubtasks);
router.route('/subtask/create/:id')
    .post(isAuthenticatedUser, extractClubId("task"), authorizeRoles("member", "cadmin"), createSubtask);
router.route('/subtask/:id')
    .get(isAuthenticatedUser, extractClubId("subtask"), authorizeRoles("member", "cadmin"), getSubtask)
    .put(isAuthenticatedUser, extractClubId("subtask"), updateSubtask)
    .delete(isAuthenticatedUser, extractClubId("subtask"), authorizeRoles("cadmin"), deleteSubtask);

module.exports = router;