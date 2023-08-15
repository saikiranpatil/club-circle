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
        const clubRole = req.user.roles[req.params.clubId];
        if (!clubRole || !roles.includes(clubRole)) {
            next(new ErrorHandler(`Role:${req.user.role} is not authorized to acess this resource`, 403));
        }
        next();
    }
}

exports.extractClubId = (fromId) => {

    return (req, res, next) => {
        switch (fromId) {
            case "club":
                req.params.clubId = req.params.id;
                break;

            default:
                break;
        }

        next();
    }
}

exports.isAdmin = catchAsyncError(async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(new ErrorHandler("Only Admin is authorized to access this resource", 403));
    }

    next();
})