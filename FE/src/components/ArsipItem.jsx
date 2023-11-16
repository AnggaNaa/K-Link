import React from "react";
import DeleteButton from "./DeleteButton";
import ArsipkanButton from "./ArsipkanButton";
import { showFormattedDate } from "../utils";
import NoteListItemBody from "./NoteListItemBody";

function ArsipItem({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArsip,
}) {
  return (
    <div className="noteList-item">
      <NoteListItemBody
        title={title}
        body={body}
        createdAt={showFormattedDate(createdAt)}
        archived={archived}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: "5px 0",
        }}
      >
        <DeleteButton id={id} onDelete={onDelete} />
        <ArsipkanButton id={id} onArsip={onArsip} />
      </div>
    </div>
  );
}

export default ArsipItem;
