import React from "react";
import ArsipItem from "./ArsipItem";

function ArsipList({ arsips, onArsip, onDelete }) {
  return (
    <div className="noteList-list__container">
      {arsips.length > 0 ? (
        arsips.map((arsip) => (
          <ArsipItem
            key={arsip.id}
            id={arsip.id}
            onArsip={onArsip}
            onDelete={onDelete}
            {...arsip}
          />
        ))
      ) : (
        <div style={{ margin: "5em auto", textAlign: "center" }}>
          <p>Tidak Ada Catatan Arsip</p>
        </div>
      )}
    </div>
  );
}

export default ArsipList;
