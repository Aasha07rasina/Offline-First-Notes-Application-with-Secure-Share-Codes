export default function NotesList({
  notes,
  updateNote,
  removeNote,
  onShareNote 
}) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id} style={{ border: "1px solid #444", margin: 10, padding: 10 }}>
          
          <textarea
            value={note.content}
            onChange={(e) =>
              updateNote({
                ...note,
                title: e.target.value.slice(0, 20),
                content: e.target.value,
                updatedAt: new Date().toISOString(),
              })
            }
          />

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={() => removeNote(note.id)}>Delete</button>

            {/* SHARE SINGLE NOTE */}
            <button onClick={() => onShareNote(note)}>
              Share this note
            </button>
          </div>

        </div>
      ))}
    </div>
  );
}
