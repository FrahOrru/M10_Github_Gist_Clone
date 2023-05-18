import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import express, { Request, Response } from "express";
import path from "path";
import Note from "../models/notes";
import bodyParser from "body-parser";
import markdownIt from "markdown-it";

const app: express.Express = express();
const md = new markdownIt();

passport.use(
  new GoogleStrategy(
    {
      clientID: "YOUR_CLIENT_ID",
      clientSecret: "YOUR_CLIENT_SECRET",
      callbackURL: "/auth/google/callback",
    },
    (accessToken, refreshToken, profile: any, done) => {
      const user = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails && profile.emails.length > 0 ? profile.emails[0].value : undefined,
      };

      done(null, user);
    }
  )
);

const notesRouter = require("./notes");

app.use("/api/notes", notesRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(bodyParser.urlencoded({ extended: false }));

app.post("/notes", (req: Request, res: Response) => {
  const { content } = req.body;

  const newNote = new Note({
    content,
  });

  newNote
    .save()
    .then(() => {
      res.redirect("/success");
    })
    .catch(() => {
      res.status(500).json({ error: "Failed to save note" });
    });
});

const notes = [
  { content: "# Note 1\nThis is the content of note 1" },
  { content: "# Note 2\nThis is the content of note 2" },
];

app.get("/notes", (req: Request, res: Response) => {
  const renderedNotes = notes.map((note) => ({
    ...note,
    content: md.render(note.content),
  }));

  res.render("notes", { notes: renderedNotes });
});