export default function MergeReplaceModal({
  visible,
  onMerge,
  onReplace,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h3>Import Notes</h3>
        <p>Do you want to merge or replace existing notes?</p>

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={onMerge}>Merge</button>
          <button onClick={onReplace}>Replace</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
};
