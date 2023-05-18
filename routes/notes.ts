const express = require("express");
const router = express.Router();

router.post("/", (req: any, res: any) => {
  const { title, content, isPrivate } = req.body;

  const newNote = {
    title,
    content,
    isPrivate,
  };

  res.status(201).json({ message: "Note created successfully", note: newNote });
});

router.get("/:id", (req: any, res: any) => {
  const { id } = req.params;

  const note = {
    id,
    title: "Sample Note",
    content: "This is a sample note",
    isPrivate: false,
  };

  res.status(200).json({ note });
});

router.delete("/:id", (req: any, res: any) => {
  const { id } = req.params;

  res.status(200).json({ message: `Note with ID ${id} deleted successfully` });
});

module.exports = router;
