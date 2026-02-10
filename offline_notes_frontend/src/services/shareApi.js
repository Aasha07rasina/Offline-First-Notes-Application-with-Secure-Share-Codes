export async function createShare(snapshot) {
   console.log("Sending to backend:", snapshot);
  const res = await fetch("http://localhost:3000/api/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  notes: snapshot,

     }),
  });

  return res.json();
}

export async function importShare(code) {
  const res = await fetch(
    `http://localhost:3000/api/share/${code}`
  );
  return res.json();
}

