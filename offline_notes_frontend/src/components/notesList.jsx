export default function NotesList({
  notes,
  updateNote,
  removeNote,
}) {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <textarea
            value={note.content}
            onChange={(e) =>
              updateNote({
                ...note,
                title: e.target.value.slice(0, 20), 
                content: e.target.value,
                updatedAt:new Date().toISOString(),
              })
            }
          />
          <button onClick={() => removeNote(note.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
