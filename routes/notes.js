const express = require("express");
const router = express.Router();

// POST /notes
router.post("/", (req, res) => {
  // Extract the title, content, and isPrivate from the request body
  const { title, content, isPrivate } = req.body;

  // Perform note creation logic
  // For example, save the note to the database
  const newNote = {
    title,
    content,
    isPrivate,
  };
  // Save the newNote to the database using your preferred method (Mongoose, MongoDB native driver, etc.)

  // Return the appropriate response
  res.status(201).json({ message: "Note created successfully", note: newNote });
});

// GET /notes/:id
router.get("/:id", (req, res) => {
  // Extract the note ID from the request parameters
  const { id } = req.params;

  // Perform note retrieval logic
  // For example, retrieve the note from the database based on the ID
  const note = {
    id,
    title: "Sample Note",
    content: "This is a sample note",
    isPrivate: false,
  };
  // Retrieve the note from the database using your preferred method (Mongoose, MongoDB native driver, etc.)

  // Return the appropriate response
  res.status(200).json({ note });
});

// DELETE /notes/:id
router.delete("/:id", (req, res) => {
  // Extract the note ID from the request parameters
  const { id } = req.params;

  // Perform note deletion logic
  // For example, delete the note from the database based on the ID

  // Return the appropriate response
  res.status(200).json({ message: `Note with ID ${id} deleted successfully` });
});

module.exports = router;
