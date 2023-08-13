const express = require('express');
const router = express.Router();
const {
    createSubtask,
    getSubtask,
    updateSubtask,
    deleteSubtask,
    getSubtasks,
} = require('../controller/subTaskController');
const { isAuthenticatedUser } = require('../middleware/authentication');

router.route('/subtasks/:id').get(isAuthenticatedUser, getSubtasks);
router.route('/subtask/create/:id').post(isAuthenticatedUser, createSubtask);
router.route('/subtask/:id').get(isAuthenticatedUser, getSubtask).put(isAuthenticatedUser, updateSubtask).delete(isAuthenticatedUser, deleteSubtask);

module.exports = router;