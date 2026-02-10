import { useState } from "react";
import { importShare } from "../services/shareApi";
import MergeReplaceModal from "./mergeReplacemodal";

export default function ImportBox({ replaceAllNotes, mergeNotes }) {
  const [code, setCode] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [importedNotes, setImportedNotes] = useState([]);

  async function handleImportClick() {
    if (!code) return;

    try {
      const notes = await importShare(code);

      setImportedNotes(notes);
      setShowModal(true); // show popup
    } catch (err) {
      console.error(err);
      alert("Invalid or expired code");
    }
  }

  async function handleMerge() {
    await mergeNotes(importedNotes);
    setShowModal(false);
    alert("Notes merged successfully");
  }

  async function handleReplace() {
    await replaceAllNotes(importedNotes);
    setShowModal(false);
    alert("Notes replaced successfully");
  }

  function handleCancel() {
    setShowModal(false);
  }

  return (
    <div>
    

      <MergeReplaceModal
        visible={showModal}
        onMerge={handleMerge}
        onReplace={handleReplace}
        onCancel={handleCancel}
      />
    </div>
  );
}
