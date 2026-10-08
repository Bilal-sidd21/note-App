import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");

    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [editIndex, setEditIndex] = useState(null);

  function addNote() {
    if (title.trim() === "" || description.trim() === "") {
      alert("Please enter title and description");
      return;
    }

    if (editIndex !== null) {
      const updatedNotes = [...notes];

      updatedNotes[editIndex] = {
        id: notes[editIndex].id,
        title: title,
        description: description,
      };

      setNotes(updatedNotes);
      setEditIndex(null);
    } else {
      const newNote = {
        id: Date.now(),
        title: title,
        description: description,
      };

      setNotes([...notes, newNote]);
    }

    setTitle("");
    setDescription("");
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);

    setNotes(updatedNotes);
  }

  function editNote(index) {
    setTitle(notes[index].title);
    setDescription(notes[index].description);
    setEditIndex(index);
  }

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="app">
      
      <header className="header">
        <h1>📝 My Notes</h1>
        <p>Write your ideas and keep them safe.</p>
      </header>

      <div className="container">

        {/* Note Form */}
        <div className="note-form">

          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Write your note..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <button onClick={addNote}>
            {editIndex !== null ? "Update Note" : "Add Note"}
          </button>

        </div>

        {/* Notes */}
        <div className="notes-container">

          {notes.length === 0 ? (
            <p className="empty">
              No notes yet. Create your first note!
            </p>
          ) : (
            notes.map((note, index) => (
              <div className="note-card" key={note.id}>

                <h2>{note.title}</h2>

                <p>{note.description}</p>

                <div className="buttons">

                  <button
                    className="edit-btn"
                    onClick={() => editNote(index)}
                  >
                    ✍Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                  >
                    🗑️ Delete
                  </button>

                </div>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}

export default App;