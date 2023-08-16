const Task = require('../model/taskModel');
const Subtask = require('../model/subtaskModel');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');

// create a subtask
exports.createSubtask = catchAsyncError(async (req, res, next) => {
  const task = req.task;

  const { title, description, deadline, assignee } = req.body;
  let subtaskData = {
    title,
    description,
    deadline,
    createdBy: req.user._id,
    task: task._id
  };

  if (assignee && assignee !== "") {
    subtaskData.assignee = assignee;
  }

  const subtask = await Subtask.create(subtaskData);

  task.subtasks.push(subtask._id);
  await task.save();

  res.status(201).json({
    success: true,
    subtask,
  });
});

// get single subtask
exports.getSubtask = catchAsyncError(async (req, res, next) => {
  const subtask = req.subtask;

  res.status(200).json({
    success: true,
    subtask,
  });
});

// update subtask
exports.updateSubtask = catchAsyncError(async (req, res, next) => {
  if (req.user.roles[req.club._id] !== "cadmin" && !req.subtask.assignee.equals(req.user._id)) {
    return next(new ErrorHandler("You are not accesed to edit this subtask", 403));
  }

  const newSubtaskData = {
    title: req.body.title,
    description: req.body.description,
    deadline: req.body.deadline,
    assignee: req.body.assignee !== "" ? req.body.assignee : null,
    completed: req.body.completed,
    file: req.body.file,
  };

  const updatedSubtask = await Subtask.findByIdAndUpdate(
    req.params.id,
    newSubtaskData,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    subtask: updatedSubtask,
  });
});

exports.deleteSubtask = catchAsyncError(async (req, res, next) => {
  const subtask = req.subtask;
  const task = req.task;

  const updatedSubtasks = task.subtasks.filter(subtaskId => !subtaskId.equals(subtask._id));
  task.subtasks = updatedSubtasks;

  await Subtask.deleteOne({ _id: subtask._id });
  await task.save();

  res.status(200).json({
    success: true,
    message: 'Subtask deleted successfully',
  });
});

// get subtasks
exports.getSubtasks = catchAsyncError(async (req, res, next) => {
  const task = Task.findById(req.params.id);

  if (!task) {
    return next(new ErrorHandler(`Task not found with id ${req.params.id}`, 404));
  }

  const subtasks = await Subtask.find({ task: req.params.id });

  res.status(200).json({
    success: true,
    subtasks,
  });
});