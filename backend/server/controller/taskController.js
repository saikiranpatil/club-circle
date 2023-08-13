const Task = require('../model/taskModel');
const Club = require('../model/clubModel');
const User = require('../model/userModel');
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Subtask = require('../model/subtaskModel');

// create a task
exports.createTask = catchAsyncError(async (req, res, next) => {
    const club = await Club.findById(req.params.id);

    if (!club) {
        return next(new ErrorHandler(`Club not found with id ${req.params.id}`, 404));
    }

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
        sucess: true,
        task
    });
})

// get single task
exports.getTask = catchAsyncError(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(new ErrorHandler(`Task not found with id ${req.params.id}`, 404));
    }

    const club = await Club.findById(task.club);

    if (!club) {
        return next(new ErrorHandler(`Club Not found`, 404));
    }

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
        sucess: true,
        task: taskWithAssignee
    })
})


// update Task
exports.updateTask = catchAsyncError(async (req, res, next) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        return next(new ErrorHandler(`Task not found with id ${req.params.id}`, 404));
    }

    const newTaskData = {
        title: req.body.title,
        description: req.body.description,
        deadline: req.body.deadline,
        assignee: req.body.assignee,
        status: req.body.status
    };

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, newTaskData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        sucess: true,
        task: updatedTask
    })
})

exports.deleteTask = catchAsyncError(async (req, res, next) => {
    const task = await Task.findById(req.params.id);
    const club = await Club.findById(task.club);

    if (!task) {
        return next(new ErrorHandler(`Task not found with id ${req.params.id}`, 404));
    }

    const upadtedClubTasks = club.tasks.filter(taskId => !taskId.equals(task._id));
    club.tasks = upadtedClubTasks;

    await Subtask.deleteMany({ task: task._id });
    await Task.deleteOne(task._id);
    await club.save();

    res.status(200).json({
        sucess: true,
        message: "Task Deleted Sucessfully",
    })
})

// get tasks
exports.getTasks = catchAsyncError(async (req, res, next) => {
    const club = await Club.findById(req.params.id);
    if (!club) {
        return next(new ErrorHandler(`Club not found with id ${req.params.id}`, 404));
    }

    const tasks = await Task.find({ club: club._id });

    res.status(200).json({
        sucess: true,
        tasks
    })
})