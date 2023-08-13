const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Club = require("../model/clubModel");
const User = require("../model/userModel");
const Task = require("../model/taskModel");
const Subtask = require("../model/subtaskModel");

// Get all clubs
exports.getClubs = catchAsyncError(async (req, res, next) => {
    const clubs = await Club.find();

    res.status(200).json({
        sucess: true,
        clubs
    })
})

// Get all clubs
exports.getClub = catchAsyncError(async (req, res, next) => {
    const club = await Club.findById(req.params.id);

    if (!club) {
        return next(new ErrorHandler(`Club not found with Id ${req.params.id}`, 401));
    }

    let clubMembers = [];

    for (const [memberId, role] of club.members) {
        const user = await User.findById(memberId);
        if (user) {
            clubMembers.push({ ...user.toObject(), role });
        }
    }

    const tasksWithSubtasks = await Promise.all(club.tasks.map(async (task) => {
        const taskDetails = await Task.findById(task);
        
        const subtaskPromises = taskDetails.subtasks.map(async (subtaskId) => {
            const subtask = await Subtask.findById(subtaskId);
            return subtask;
        });

        const subtasks = await Promise.all(subtaskPromises);

        return {
            ...taskDetails.toObject(),
            subtasks,
        };
    }));

    const clubWithDetails = { ...club.toObject(), members: clubMembers, tasks: tasksWithSubtasks };

    res.status(200).json({
        sucess: true,
        club: clubWithDetails
    })
})

// create club
exports.createClub = catchAsyncError(async (req, res, next) => {
    const { name, description } = req.body;

    const club = await Club.create({
        name, description
    });

    club.members.set(req.user._id, "cadmin");
    await club.save();

    res.status(200).json({
        sucess: true,
        club
    })
})

// set role
exports.setRole = catchAsyncError(async (req, res, next) => {
    const { userId, role } = req.body;

    const club = await Club.findById(req.params.id);
    const user = await User.findById(userId);

    if (!club) {
        return next(new ErrorHandler(`Club not found with Id ${req.params.id}`, 401));
    }

    if (!user) {
        return next(new ErrorHandler(`User not found with Id ${userId}`, 401));
    }

    if (role === "") {
        if (club.members.has(userId)) {
            club.members.delete(userId);
            await club.save();

            res.status(200).json({
                success: true,
                message: `Removed user with Id ${userId} from club members`
            });
        } else {
            res.status(200).json({
                success: true,
                message: `User with Id ${userId} was not a member of the club`
            });
        }
    } else {
        if (!["cadmin", "member"].includes(role)) {
            return next(new ErrorHandler("Invalid role. Must be 'cadmin' or 'member'", 401));
        }

        club.members.set(userId, role);
        await club.save();

        res.status(200).json({
            success: true,
            club,
            message: `User with Id ${userId} was added to the club`
        });
    }
});

// delete club
exports.deleteClub = catchAsyncError(async (req, res, next) => {
    const club = await Club.findById(req.params.id);

    if (!club) {
        return next(new ErrorHandler(`Club not found with id:${req.params.id}`));
    }

    const tasksToBeDeleted = await Task.find({ club: club._id });

    for (const task of tasksToBeDeleted) {
        // delete all the subtasks of the individual tasks in the club
        await Subtask.deleteMany({ task: task._id });
    }

    // delete all tasks of the club
    await Task.deleteMany({ club: club._id });
    // delete the club
    await Club.deleteOne({ _id: club._id });

    res.status(200).json({
        sucess: true,
        message: 'Club deleted successfully',
    })
})