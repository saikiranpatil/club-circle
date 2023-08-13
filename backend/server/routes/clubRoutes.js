const express = require("express");
const router = express.Router();
const {
    createClub,
    setRole,
    deleteClub,
    getClub,
    getClubs,
} = require("../controller/clubController");
const {
    isAuthenticatedUser,
} = require("../middleware/authentication.js");

router.route("/clubs").get(isAuthenticatedUser, getClubs);
router.route("/club/create").post(isAuthenticatedUser, createClub);
router.route("/club/:id").get(isAuthenticatedUser, getClub).put(isAuthenticatedUser, setRole).delete(isAuthenticatedUser, deleteClub);

module.exports = router;