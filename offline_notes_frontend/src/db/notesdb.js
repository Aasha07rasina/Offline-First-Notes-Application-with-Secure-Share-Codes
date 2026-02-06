import { openDB } from "idb";

const DB_NAME = "offline-notes-db";
const STORE_NAME = "notes";

// open database
const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: "id" });
    }
  },
});

// get all notes
export async function getAllNotes() {
  const db = await dbPromise;
  return db.getAll(STORE_NAME);
}

// add or update note
export async function saveNote(note) {
  const db = await dbPromise;
  return db.put(STORE_NAME, note);
}

// delete note
export async function deleteNote(id) {
  const db = await dbPromise;
  return db.delete(STORE_NAME, id);
}

// clear all notes
export async function clearNotes() {
  const db = await dbPromise;
  return db.clear(STORE_NAME);
}
