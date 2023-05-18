import express, { Request, Response } from "express";
import { Router } from "express";
import mongoose from "mongoose";

const router: Router = express.Router();

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model("Note", noteSchema);

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const newUser = {
    username,
    password,
  };

  saveUser(newUser);

  res.status(200).json({ message: "User registered successfully" });
});

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  const authenticated = authenticateUser(username, password);

  if (authenticated) {
    res.status(200).json({ message: "User logged in successfully" });
  } else {
    res.status(401).json({ message: "Invalid username or password" });
  }
});

router.post("/logout", (req: Request, res: Response) => {
  clearUserSession(req);

  res.status(200).json({ message: "User logged out successfully" });
});

router.post("/notes", (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newNote = {
    title,
    content,
  };

  saveNote(newNote);

  res.status(200).json(newNote);
});

router.get("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const note = getNoteById(id);

  if (note) {
    res.status(200).json(note);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

router.put("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  const updatedNote = updateNoteById(id, title, content);

  if (updatedNote) {
    res.status(200).json(updatedNote);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

router.delete("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedNote = deleteNoteById(id);

  if (deletedNote) {
    res.sendStatus(204);
  } else {
    res.status(404).json({ message: "Note not found" });
  }
});

router.get("/notes/search", (req: Request, res: Response) => {
  const { query } = req.query;

  const searchResults = searchNotes(query);

  res.status(200).json(searchResults);
});

export default router;

const saveUser = (user: any) => {
  const newUser = new User(user);
  return newUser.save();
};

const authenticateUser = (username: string, password: string) => {
  return User.findOne({ username, password })
    .then((user) => {
      return user !== null;
    })
    .catch((error) => {
      console.error(error);
      return false;
    });
};

const clearUserSession = (req: Request) => {
  req.logout();
  req.session.destroy();
};

const saveNote = (note: any) => {
  const newNote = new Note(note);
  return newNote.save();
};

const getNoteById = (id: string) => {
  return Note.findById(id);
};

const updateNoteById = (id: string, title: string, content: string) => {
  return Note.findByIdAndUpdate(id, { title, content }, { new: true });
};

const deleteNoteById = (id: string) => {
  return Note.findByIdAndDelete(id);
};

const searchNotes = (query: string) => {
  const regexQuery = { $regex: new RegExp(query, "i") }; // Case-insensitive search
  return Note.find({ $or: [{ title: regexQuery }, { content: regexQuery }] });
};