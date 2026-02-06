import { useState } from "react";
import { v4 as uuid } from "uuid";

export default function Editor({ addNote }) {
  const [text, setText] = useState("");

  function handleAdd() {
    if (!text.trim()) return;

    const newNote = {
      id: uuid(),
      content: text,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addNote(newNote);
    setText("");
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write note..."
      />
      <button onClick={handleAdd}>Add Note</button>
    </div>
  );
}
