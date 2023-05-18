import express, { Request, Response } from "express";
import { Router } from "express";
import mongoose from "mongoose";
import { Session } from 'express-session';

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

  saveUser(newUser)
    .then(() => {
      res.status(200).json({ message: "User registered successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to register user" });
    });
});

router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  authenticateUser(username, password)
    .then((authenticated) => {
      if (authenticated) {
        res.status(200).json({ message: "User logged in successfully" });
      } else {
        res.status(401).json({ message: "Invalid username or password" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to authenticate user" });
    });
});

router.post("/logout", (req: Request, res: Response) => {
  clearUserSession(req as CustomRequest)
    .then(() => {
      res.status(200).json({ message: "User logged out successfully" });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to clear user session" });
    });
});

router.post("/notes", (req: Request, res: Response) => {
  const { title, content } = req.body;

  const newNote = {
    title,
    content,
  };

  saveNote(newNote)
    .then(() => {
      res.status(200).json(newNote);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to save note" });
    });
});

router.get("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  getNoteById(id)
    .then((note) => {
      if (note) {
        res.status(200).json(note);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve note" });
    });
});

router.put("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;

  updateNoteById(id, title, content)
    .then((updatedNote) => {
      if (updatedNote) {
        res.status(200).json(updatedNote);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to update note" });
    });
});

router.delete("/notes/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  deleteNoteById(id)
    .then((deletedNote) => {
      if (deletedNote) {
        res.sendStatus(204);
      } else {
        res.status(404).json({ message: "Note not found" });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to delete note" });
    });
});

router.get("/notes/search", (req: Request, res: Response) => {
  const query: string | undefined = req.query.query as string;

  searchNotes(query)
    .then((searchResults) => {
      res.status(200).json(searchResults);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Failed to search notes" });
    });
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

interface CustomRequest extends Request {
  session: any;
}

const clearUserSession = (req: CustomRequest) => {
  return new Promise<void>((resolve, reject) => {
    req.session.destroy((error: any) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
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