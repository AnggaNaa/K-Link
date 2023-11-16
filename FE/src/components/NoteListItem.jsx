import React from "react";
import DeleteButton from "./DeleteButton";
import NoteListItemBody from "./NoteListItemBody";
import ArsipkanButton from "./ArsipkanButton";
import { showFormattedDate } from "../utils/index";

function NoteListItem({
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
      {/* <noteListItemImage imageUrl={imageUrl} /> */}
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
        <ArsipkanButton id={id} onArsip={onArsip} isInNoteListList={true} />
      </div>
    </div>
  );
}

export default NoteListItem;
