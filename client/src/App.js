import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editId, setEditId] = useState(null);

  const [selectedNote, setSelectedNote] = useState(null);

  // Fetch Notes
  const fetchNotes = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/notes");

      const data = await res.json();

      setNotes(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch notes");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Add or Update Note
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("All fields required");
      return;
    }

    try {
      if (editId) {
        // UPDATE
        await fetch(`http://localhost:5000/api/notes/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });
      } else {
        // ADD
        await fetch("http://localhost:5000/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            content,
          }),
        });
      }

      // Reset form
      setTitle("");
      setContent("");
      setEditId(null);

      fetchNotes();
    } catch (err) {
      console.log(err);
      setError(err.message || "Operation failed");
    }
  };

  // Delete Note
  const deleteNote = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/notes/${id}`, {
        method: "DELETE",
      });

      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(null);
      }

      fetchNotes();
    } catch (err) {
      setError("Delete failed");
    }
  };

  // Edit Note
  const editNote = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditId(note.id);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="container">
      <h1 className="heading">Notes App</h1>

      {/* Form */}
      <form className="note-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">{editId ? "Update Note" : "Add Note"}</button>
      </form>

      <div className="notes-grid">
        {notes.length === 0 ? (
          <h2>No Notes Found</h2>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => setSelectedNote(note)}
            >
              <h3>{note.title}</h3>

              <p>
                {note.content.length > 60
                  ? note.content.slice(0, 60) + "..."
                  : note.content}
              </p>

              <div className="actions">
                <button
                  className="view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNote(note);
                  }}
                >
                  View
                </button>

                <button
                  className="edit-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    editNote(note);
                  }}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedNote && (
        <div className="full-note">
          <h2 className="note">Full Note</h2>

          <h3>{selectedNote.title}</h3>

          <p>{selectedNote.content}</p>

          <button className="close-btn" onClick={() => setSelectedNote(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
