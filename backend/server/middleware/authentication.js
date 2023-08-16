const catchAsyncError = require("./catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/userModel");
const Task = require("../model/taskModel");
const Subtask = require("../model/subtaskModel");
const Club = require("../model/clubModel");

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    if (!req.cookies.token) {
        return next(new ErrorHandler("Please Login to access the resource", 401));
    }

    const token = req.cookies.token;
    const decodedData = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    const searchStr = "members." + req.user._id;
    const query = {};
    query[searchStr] = { $in: ["member", "cadmin"] };

    const clubs = await Club.find(query);

    const roles = {};
    clubs.map((club) => {
        roles[club._id] = club.members.get(req.user._id);
    })

    req.user = {
        ...req.user.toObject(),
        roles
    };

    next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        const clubRole = req.user.roles[req.clubId];
        if (!clubRole || !roles.includes(clubRole)) {
            next(new ErrorHandler(`Role:${clubRole || "Non Club Member"} is not authorized to acess this resource`, 403));
        }
        next();
    }
}

exports.extractClubId = (fromId) => {
    return catchAsyncError(
        async (req, res, next) => {
            switch (fromId) {
                case "club":
                    req.clubId = req.params.id;

                    break;

                case "task":
                    req.taskId = req.params.id;
                    break;

                case "subtask":
                    const subtask = await Subtask.findById(req.params.id);

                    if (!subtask) {
                        return next(new ErrorHandler("Subtask not found eith given Id", 404));
                    }

                    req.subtask = subtask;
                    req.taskId = subtask.task;
                    break;

                default:
                    break;
            }

            if (req.taskId) {
                const task = await Task.findById(req.taskId);

                if (!task) {
                    return next(new ErrorHandler("Task Not present with given id", 404));
                }

                req.task = task;
                req.clubId = task.club;
            }

            const club = await Club.findById(req.clubId);
            if (!club) {
                return next(new ErrorHandler("Club Not present with given id", 404));
            }
            req.club = club;

            next();
        }
    )
};

exports.isAdmin = catchAsyncError(async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(new ErrorHandler("Only Admin is authorized to access this resource", 403));
    }

    next();
})