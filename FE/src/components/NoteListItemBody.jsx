import React from "react";

function NoteListItemBody({ title, body, createdAt }) {
  return (
    <div className="noteList-item__body">
      <h3 className="noteList-item__title">{title}</h3>
      <p className="noteList-item__date">{createdAt}</p>

      <p className="noteList-item__username">{body} </p>
    </div>
  );
}

export default NoteListItemBody;
