const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // Handle authentication and user creation
      // Call `done()` with the user object

      // Example implementation:
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      };

      // Save the user object to the session or database as needed

      done(null, user);
    }
  )
);

const express = require("express");
const app = express();

// Import the notes router
const notesRouter = require("./notes");

// Use the notes router as a middleware
app.use("/api/notes", notesRouter);

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
