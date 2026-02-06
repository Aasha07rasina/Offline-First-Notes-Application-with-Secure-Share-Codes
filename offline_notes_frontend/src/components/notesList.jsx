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
                content: e.target.value,
                updatedAt: Date.now(),
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
