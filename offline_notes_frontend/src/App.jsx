import { useState } from "react"; // Added for the input box state
import useNotes from "./hooks/useNotes";
import useNetwork from "./hooks/useNetwork";
import Editor from "./components/editor";
import NotesList from "./components/notesList";
import { createShare, importShare } from "./services/shareApi"; // Added importShare
import ImportBox from "./components/ImportBox";

export default function App() {
  const {
    notes,
    addNote,
    updateNote,
    removeNote,
    replaceAllNotes,
    mergeNotes,
    setNotes, // Ensure your useNotes hook provides a way to update the full list
  } = useNotes();

  const [importCode, setImportCode] = useState(""); // State for the text box
  const online = useNetwork();

  async function handleShare() {
    console.log("Notes being sent:", notes); 
    if (!online) {
      alert("You are offline");
      return;
    }

    try {
      const res = await createShare(notes);
      alert("Share code: " + res.shareCode);
    } catch (err) {
      alert("Share failed: " + err.message);
    }
  }

  // --- NEW: IMPORT LOGIC ---
  async function handleImport() {
    if (!online) {
      alert("You are offline");
      return;
    }

    if (importCode.length !== 6) {
      alert("Please enter a valid 6-character code");
      return;
    }

    try {
      const sharedNotes = await importShare(importCode);
      
      // Asking the user if they want to overwrite or add to existing notes
      const confirmReplace = window.confirm("Replace current notes? (Cancel to Merge)");

      if (confirmReplace) {
        if (setNotes) setNotes(sharedNotes);
      } else {
        // Simple merge: add each shared note to the current list
        sharedNotes.forEach(note => addNote(note));
      }

      alert("Notes imported successfully!");
      setImportCode(""); // Clear the box
    } catch (err) {
      alert("Import Error: " + err.message);
    }
  }

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Offline Notes</h1>

      {!online && <p style={{ color: "red" }}>You are offline</p>}

      <Editor addNote={addNote} />

      {/* --- UPDATED BUTTONS AREA --- */}
      <div style={{ margin: "20px 0", display: "flex", gap: "10px", alignItems: "center" }}>
        <button onClick={handleShare} style={{ padding: "10px" }}>
          Share Notes
        </button>

        <div style={{ borderLeft: "2px solid #444", paddingLeft: "10px", display: "flex", gap: "5px" }}>
          <input
            type="text"
            placeholder="Enter Code"
            value={importCode}
            onChange={(e) => setImportCode(e.target.value.toUpperCase())}
            maxLength={6}
            style={{
              padding: "10px",
              background: "#1a1a1a",
              color: "white",
              border: "1px solid #333",
              borderRadius: "4px",
              width: "120px"
            }}
          />
          <button onClick={handleImport} style={{ padding: "10px" }}>
            Import
          </button>
        </div>
      </div>

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