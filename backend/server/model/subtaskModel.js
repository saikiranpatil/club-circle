const mongoose = require("mongoose");

const subTaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter subtask title"],
    },
    description: {
        type: String,
        required: [true, "Please Enter subtask description"],
    },
    task: {
        type: mongoose.Schema.ObjectId,
        ref: "Task",
        default: null,
    },
    assignee: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: null,
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide user ID of the creator"],
    },
    completed: {
        type: Boolean,
        default: false
    },
    file: {
        type: String,
        default: ""
    }
});

module.exports = mongoose.model("SubTask", subTaskSchema);
