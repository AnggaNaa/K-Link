import React from "react";

function ArsipkanButton({ id, onArsip, isInNoteListList }) {
  const buttonText = isInNoteListList ? "Arsipkan" : "Pindahkan";
  return (
    <button className="noteList-item__arsipkan" onClick={() => onArsip(id)}>
      {buttonText}
    </button>
  );
}

export default ArsipkanButton;
