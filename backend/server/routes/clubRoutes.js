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
    isAdmin,
    authorizeRoles,
    extractClubId
} = require("../middleware/authentication.js");

router.route("/clubs").get(isAuthenticatedUser, isAdmin, getClubs);
router.route("/club/create").post(isAuthenticatedUser, createClub);
router.route("/club/:id")
    .get(isAuthenticatedUser, extractClubId("club"), authorizeRoles("member", "cadmin"), getClub)
    .put(isAuthenticatedUser, extractClubId("club"), authorizeRoles("cadmin"), setRole)
    .delete(isAuthenticatedUser, extractClubId("club"), authorizeRoles("cadmin"), deleteClub);

module.exports = router;