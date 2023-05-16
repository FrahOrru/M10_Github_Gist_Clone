const express = require("express");
const router = express.Router();
const passport = require("passport");

// GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// GET /auth/google/callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Redirect or respond as needed after successful authentication
    res.redirect("/dashboard");
  }
);

module.exports = router;
