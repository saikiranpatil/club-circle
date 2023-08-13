const express = require("express");
const router = express.Router();
const {
    loginUser,
    logoutUser,
    registerUser,
    resetPassword,
    forgotPassword,
    updatePassword,
    getUserDetails,
    updateProfile,
    getSingleUser,
    updateUser,
    deleteUser,
    getAllUsers
} = require("../controller/userController");
const {
    isAuthenticatedUser,
    isAdmin,
    authorizeRoles
} = require("../middleware/authentication.js");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/forgot/password").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/cadmin/user/:id").get(isAuthenticatedUser, isAdmin, getSingleUser).put(isAuthenticatedUser, isAdmin, updateUser).delete(isAuthenticatedUser, deleteUser);
router.route("/users").get(isAuthenticatedUser, getAllUsers);

module.exports = router; 