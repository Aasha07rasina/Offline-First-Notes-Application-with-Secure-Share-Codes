import useNotes from "./hooks/useNotes";
import useNetwork from "./hooks/useNetwork";
import Editor from "./components/editor";
import NotesList from "./components/notesList";
import { createShare } from "./services/shareApi";
import ImportBox from "./components/ImportBox";

export default function App() {
  const {
    notes,
    addNote,
    updateNote,
    removeNote,
    replaceAllNotes,
    mergeNotes,
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

      <ImportBox
        replaceAllNotes={replaceAllNotes}
        mergeNotes={mergeNotes}
      />

      <NotesList
        notes={notes}
        updateNote={updateNote}
        removeNote={removeNote}
      />
    </div>
  );
}
