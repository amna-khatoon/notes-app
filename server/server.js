const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let notes = [
  {
    id: 1,
    title: "Test",
    content: "Hello",
    createdAt: "2026-06-02",
  },
];

// GET all notes
app.get("/api/notes", (req, res) => {
  res.status(200).json(notes);
});

// GET single note
app.get("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id == req.params.id);

  if (!note) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  res.status(200).json(note);
});

// POST create note
app.post("/api/notes", (req, res) => {
  const { title, content } = req.body || {};

  if (!title || !content) {
    return res.status(400).json({
      error: "Fields required",
    });
  }

  const newNote = {
    id: Date.now(),
    title,
    content,
    createdAt: new Date().toISOString().split("T")[0],
  };

  notes.push(newNote);

  res.status(201).json(newNote);
});

// PUT update note
app.put("/api/notes/:id", (req, res) => {
  const note = notes.find((n) => n.id === Number(req.params.id));
  if (!note) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  const { title, content } = req.body || {};

  if (title !== undefined) {
    note.title = title;
  }

  if (content !== undefined) {
    note.content = content;
  }

  res.status(200).json(note);
});

// DELETE note
app.delete("/api/notes/:id", (req, res) => {
  const index = notes.findIndex((n) => n.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({
      error: "Note not found",
    });
  }

  notes.splice(index, 1);

  res.status(200).json({
    message: "Deleted successfully",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
