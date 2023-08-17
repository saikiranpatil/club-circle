const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/userModel");
const Task = require("../model/taskModel");
const Subtask = require("../model/subtaskModel");
const Club = require("../model/clubModel");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary")


// register an user 
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 250,
        crop: "scale",
    });

    const { name, email, password, about } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        about,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });

    sendToken(user, 201, res);
});

// login user 
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter Email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Username or password", 401));
    }

    const isUserPasswordMatched = await user.comparePassword(password);

    if (!isUserPasswordMatched) {
        return next(new ErrorHandler("Invalid Username or password", 401));
    }

    sendToken(user, 200, res);
})


// logout user  
exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });

    res.status(200).json({
        sucess: true,
        message: "logged Out"
    })
})

// forget password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // get reset token 
    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is :\n\n ${resetPasswordUrl} \n\n if you have not requsted this please ignore it`;

    try {
        await sendEmail({
            email: user.email,
            subject: "Club Circle Password recovery",
            message
        })

        res.status(200).json({
            sucess: true,
            message: `email has been sent to ${user.email} sucessfully`
        })

    } catch (err) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(err.message, 500))
    }
})

// forget password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpiry: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Reset Password token is invalid or has been expired", 400));
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password Does not Match"))
    }

    user.password = req.body.password;
    user.resetPasswordToken = null;
    user.resetPasswordExpiry = null;

    await user.save();

    sendToken(user, 200, res);
})

// update password 
exports.updatePassword = catchAsyncError(async function (req, res, next) {
    const user = await User.findById(req.user.id).select("+password");
    const isUserPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isUserPasswordMatched) {
        return next(new ErrorHandler("Invalid old Password", 401));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("New Password does not match", 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);
})

// get user details
exports.getUserDetails = catchAsyncError(async function (req, res, next) {
    if (!req.user) {
        return next(new ErrorHandler("User Not found", 401));
    }

    const userData = await User.findById(req.user._id);

    const searchStr = "members." + userData._id;
    const query = {};
    query[searchStr] = { $in: ["member", "cadmin"] };

    const [clubs, tasksAssigned, subTasksAssigned] = await Promise.all([
        Club.find(query),
        Task.find({ assignee: userData._id }),
        Subtask.find({ assignee: userData._id }),
    ]);

    const tasksWithSubtasks = await Promise.all(tasksAssigned.map(async (task) => {
        const subtaskPromises = task.subtasks.map(async (subtaskId) => {
            const subtask = await Subtask.findById(subtaskId);
            return subtask;
        });

        const subtasks = await Promise.all(subtaskPromises);

        return {
            ...task.toObject(),
            subtasks,
        };
    }));

    const user = {
        ...userData.toObject(),
        clubs,
        tasksAssigned: tasksWithSubtasks,
        subTasksAssigned,
    };

    res.status(200).json({
        sucess: true,
        user
    })
})

// update User Profile
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        about: req.body.about
    };

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user._id);

        const imageId = user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(imageId);

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };
    }

    const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// get single user
exports.getSingleUser = exports.getSingleUser = catchAsyncError(async function (req, res, next) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id:${req.params.id}`));
    }

    res.status(200).json({
        sucess: true,
        user
    })
})

// update user role by admin
exports.updateUserRole = catchAsyncError(async function (req, res, next) {
    if (req.body.role !== 'admin' && req.body.role !== 'cadmin') {
        return next(new ErrorHandler('Roles can only be updated by Admin or Club Admin', 401));
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        sucess: true,
        user
    })
})

// update user
exports.updateUser = catchAsyncError(async function (req, res, next) {
    if (req.body.role !== 'cadmin' && req.body.role !== 'user') {
        return next(new ErrorHandler('Club Admin can only upadte user role to Club Admin', 401));
    }

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
        club: req.body.club
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        sucess: true,
        user
    })
})


// delete user
exports.deleteUser = catchAsyncError(async function (req, res, next) {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User not found with id:${req.params.id}`));
    }

    await user.deleteOne({ _id: req.params.id });

    res.status(200).json({
        sucess: true,
        message: 'User deleted successfully'
    })
})

// get all users 
exports.getAllUsers = catchAsyncError(async function (req, res, next) {
    const users = await User.find();

    res.status(200).json({
        sucess: true,
        users
    })
})