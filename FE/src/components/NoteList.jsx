import React from "react";
import NoteListtItem from "./NoteListItem";

function NoteList({ noteList = [], onDelete, onArsip }) {
  return (
    <div className="noteList-list__container">
      {noteList.length > 0 ? (
        noteList.map((noteList) => (
          <NoteListtItem
            key={noteList.id}
            id={noteList.id}
            onDelete={onDelete}
            onArsip={onArsip}
            {...noteList}
          />
        ))
      ) : (
        <div style={{ margin: "5em auto", textAlign: "center" }}>
          <p>Tidak Ada Catatan Aktif</p>
        </div>
      )}
    </div>
  );
}

export default NoteList;
