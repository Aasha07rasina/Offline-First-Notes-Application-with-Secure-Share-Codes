import useNotes from "./hooks/useNotes";
import useNetwork from "./hooks/useNetwork";
import Editor from "./components/editor";
import NotesList from "./components/notesList";
import { createShare } from "./services/shareApi";

export default function App() {
  const {
    notes,
    addNote,
    updateNote,
    removeNote,
  } = useNotes();

  const online = useNetwork();

  async function handleShare() {
    console.log("Notes being sent:", notes); 
    if (!online) {
      alert("You are offline");
      return;
    }

    const res = await createShare(notes);
    alert("Share code: " + res.shareCode);
  }

  return (
    <div>
      <h1>Offline Notes</h1>

      {!online && <p>You are offline</p>}

      <Editor addNote={addNote} />

      <button onClick={handleShare}>
        Share Notes
      </button>

      <NotesList
        notes={notes}
        updateNote={updateNote}
        removeNote={removeNote}
      />
    </div>
  );
}
