const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const Club = require("../model/clubModel");
const User = require("../model/userModel");
const Task = require("../model/taskModel");
const Subtask = require("../model/subtaskModel");
const sendEmail = require("../utils/sendEmail");

// Get all clubs
exports.getClubs = catchAsyncError(async (req, res, next) => {
    const clubs = await Club.find();

    res.status(200).json({
        success: true,
        clubs
    })
})

// Get all clubs
exports.getClub = catchAsyncError(async (req, res, next) => {
    const club = req.club;

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
        success: true,
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
        success: true,
        club
    })
})

// set role
exports.setRole = catchAsyncError(async (req, res, next) => {
    const club = req.club;

    const { userId, role } = req.body;
    const user = await User.findById(userId);

    if (!user) {
        return next(new ErrorHandler(`User not found with Id ${userId}`, 401));
    }

    if (role === "") {
        if (club.members.has(userId)) {
            club.members.delete(userId);
            await club.save();

            res.status(200).json({
                success: true,
                message: `${user.name} was removed from this Club`
            });
        } else {
            res.status(200).json({
                success: true,
                message: `${user.name} was not a member of this club`
            });
        }
    } else {
        if (!["cadmin", "member"].includes(role)) {
            return next(new ErrorHandler("Invalid role. Must be 'cadmin' or 'member'", 401));
        }

        club.members.set(userId, role);
        await club.save();

        const message = `Your have been assigned as ${role === "cadmin" ? "Club Admin" : "Member"} in the club ${club.name}
        \n \n click link below to visit the Club Page 
        \n \n ${req.protocol}://${req.get('host')}/club/${club._id}`;

        try {
            await sendEmail({
                email: user.email,
                subject: `🎉 You have been Added to "${club.name}" Club in Club Circle`,
                message
            })
        } catch (err) {
            console.log("error while sending mail to club member", err);
        }

        res.status(200).json({
            success: true,
            club,
            message: `${user.name} was added to the club as ${role === "cadmin" ? "Club Admin" : "Club Member"}`
        });
    }
});

// delete club
exports.deleteClub = catchAsyncError(async (req, res, next) => {
    const club = req.club;

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
        success: true,
        message: 'Club deleted successfully',
    })
})