const mongoose = require("mongoose");
const Subtask = require("../model/subtaskModel");

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please Enter task title"],
    },
    description: {
        type: String,
        required: [true, "Please Enter task description"],
    },
    deadline: {
        type: Date,
        required: [true, "Please Enter task deadline"],
    },
    club: {
        type: mongoose.Schema.ObjectId,
        ref: "Club",
        required: [true, "Please provide club ID"],
    },
    status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
        default: "Not Started",
    },
    assignee: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        default: null,
    },
    subtasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Subtask",
        },
    ],
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide user ID of the creator"],
    },
});

module.exports = mongoose.model("Task", taskSchema);