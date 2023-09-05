const Task = require('../model/taskModel');
const User = require('../model/userModel');
const catchAsyncError = require("../middleware/catchAsyncError");
const Subtask = require('../model/subtaskModel');
const ErrorHandler = require('../utils/errorHandler');

// create a task
exports.createTask = catchAsyncError(async (req, res, next) => {
    const club = req.club;

    const { title, description, deadline } = req.body;

    const task = await Task.create({
        title,
        description,
        deadline,
        createdBy: req.user._id,
        club: club._id,
    })

    club.tasks.push(task._id);
    await club.save();

    res.status(201).json({
        success: true,
        task
    });
})

// get single task
exports.getTask = catchAsyncError(async (req, res, next) => {
    const task = req.task;
    const club = req.club;

    const assignee = await User.findById(task.assignee);
    const clubMembers = await Promise.all(
        Array.from(club.members).map(async ([memberId, role]) => {
            const user = await User.findById(memberId);
            if (user) {
                return { ...user.toObject(), role };
            }
            return null;
        })
    );

    const taskWithAssignee = { ...task.toObject(), assignee, clubMembers };

    res.status(200).json({
        success: true,
        task: taskWithAssignee
    })
})


// update Task
exports.updateTask = catchAsyncError(async (req, res, next) => {
    const newTask = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        status: req.body.status,
        assignee: req.body.assignee
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTask, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        task: updatedTask
    })
})

exports.deleteTask = catchAsyncError(async (req, res, next) => {
    const task = req.task;
    const club = req.club;

    const upadtedClubTasks = club.tasks.filter(taskId => !taskId.equals(task._id));
    club.tasks = upadtedClubTasks;

    await Subtask.deleteMany({ task: task._id });
    await Task.deleteOne(task._id);
    await club.save();

    res.status(200).json({
        success: true,
        message: "Task Deleted successfully",
    })
})

// get tasks
exports.getTasks = catchAsyncError(async (req, res, next) => {
    const club = req.club;

    const tasks = await Task.find({ club: club._id });

    res.status(200).json({
        success: true,
        tasks
    })
})