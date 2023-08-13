const mongoose = require("mongoose");
const Task = require("../model/taskModel");

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter club name"],
    },
    description: {
        type: String,
        required: [true, "Please Enter club description"],
    },
    members: {
        type: Map,
        of: {
            type: String,
            enum: ["cadmin", "member"],
        },
        default: {},
    },
    tasks: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "Task",
        }
    ],
    createdOn: {
        type: Date,
        default: Date.now(),
    },
});

module.exports = mongoose.model("Club", clubSchema);