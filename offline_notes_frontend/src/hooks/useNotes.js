import { useEffect, useState } from "react";
import {
  getAllNotes,
  saveNote,
  deleteNote,
  clearNotes,
} from "../db/notesdb";
import debounce from "../utils/debounce";

export default function useNotes() {
  const [notes, setNotes] = useState([]);

  // load notes on start
  useEffect(() => {
    loadNotes();
  }, []);

  async function loadNotes() {
    const data = await getAllNotes();
    setNotes(data);
  }

  // debounced save
  const debouncedSave = debounce(async (note) => {
    await saveNote(note);
  }, 500);

  function addNote(note) {
    setNotes((prev) => [...prev, note]);
    saveNote(note);
  }

  function updateNote(note) {
    setNotes((prev) =>
      prev.map((n) => (n.id === note.id ? note : n))
    );
    debouncedSave(note);
  }

  async function removeNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    await deleteNote(id);
  }

  async function replaceAllNotes(newNotes) {
    await clearNotes();
    for (let note of newNotes) {
      await saveNote(note);
    }
    loadNotes();
  }

  async function mergeNotes(importedNotes) {
  const existing = await getAllNotes();

  const existingIds = new Set(existing.map(n => n.id));

  const merged = [...existing];

  for (let note of importedNotes) {
    if (!existingIds.has(note.id)) {
      merged.push(note);
      await saveNote(note);
    } else {
      // duplicate ID → create new one
      const newNote = {
        ...note,
        id: crypto.randomUUID(),
      };
      merged.push(newNote);
      await saveNote(newNote);
    }
  }

  setNotes(merged);
}


  return {
    notes,
    addNote,
    updateNote,
    removeNote,
    replaceAllNotes,
    mergeNotes,
    loadNotes,
  };
}
