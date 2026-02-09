export async function createShare(snapshot) {
  const res = await fetch("http://localhost:3000/api/share", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapshot }),
  });

  return res.json();
}

export async function importShare(code) {
  const res = await fetch(
    `http://localhost:3000/api/share${code}`
  );
  return res.json();
}


// // CREATE SHARE CODE
// export async function createShare(snapshot) {
//   const res = await fetch("http://localhost:3000/api/share", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       notes: snapshot,   // 👈 backend expects "notes"
//     }),
//   });

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Share error:", text);
//     throw new Error("Failed to create share code");
//   }

//   return res.json();
// }


// // IMPORT SHARE CODE
// export async function importShare(code) {
//   const res = await fetch(
//     `http://localhost:3000/api/share/${code}`   // 👈 missing slash fixed
//   );

//   if (!res.ok) {
//     const text = await res.text();
//     console.error("Import error:", text);
//     throw new Error("Invalid or expired code");
//   }

//   return res.json();
// }
