import React from "react";
import ListInput from "./NoteListInput";
import Navbar from "./Navbar";
import ArsipList from "./ArsipList";
import NoteList from "./NoteList";

class ListApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            noteList: getInitialData(),
            searchQuery: "",
        };

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onAddListHandler = this.onAddListHandler.bind(this);
        this.onArsipHandler = this.onArsipHandler.bind(this);
    }
    onSearchChangeHandler = (searchQuery) => {
        this.setState({ searchQuery });
    };

    onAddListHandler({ title, body, createdAt, archived }) {
        this.setState((prevState) => {
            return {
                noteList: [
                    ...prevState.noteList,
                    {
                        id: +new Date(),
                        title,
                        body,
                        createdAt,
                        archived,
                    },
                ],
            };
        });
    }

    onDeleteHandler(id) {
        const noteList = this.state.noteList.filter(
            (noteList) => noteList.id !== id
        );
        this.setState({ noteList });
    }

    onArsipHandler(id) {
        this.setState((prevState) => {
            const updatedNoteList = prevState.noteList.map((noteList) => {
                if (noteList.id === id) {
                    return {
                        ...noteList,
                        archived: !noteList.archived,
                    };
                }
                return noteList;
            });

            const archivedNoteList = updatedNoteList.filter(
                (noteList) => noteList.archived
            );
            const activeNoteList = updatedNoteList.filter(
                (noteList) => !noteList.archived
            );

            return {
                noteList: updatedNoteList,
                archivedNoteList,
                activeNoteList,
            };
        });
    }

    render() {
        return (
            <>
                <Navbar onSearchChange={this.onSearchChangeHandler} />
                <div className="noteList-app">
                    <h2>Buat Catatan</h2>
                    <ListInput addNoteList={this.onAddListHandler} />
                </div>
                <div className="noteList-list">
                    <div style={{ margin: "auto" }}>
                        <h1>Catatan Aktif</h1>
                    </div>
                    <div className="noteList-list__container">
                        <NoteList
                            noteList={this.state.noteList
                                .filter((noteList) => !noteList.archived)
                                .filter((noteList) =>
                                    noteList.title
                                        .toLowerCase()
                                        .includes(this.state.searchQuery.toLowerCase())
                                )}
                            onArsip={this.onArsipHandler}
                            onDelete={this.onDeleteHandler}
                        />
                    </div>
                    <div style={{ margin: "auto" }}>
                        <h1>Arsip</h1>
                    </div>
                    <div className="noteList-list__container">
                        <ArsipList
                            arsips={this.state.noteList
                                .filter((noteList) => noteList.archived)
                                .filter((noteList) =>
                                    noteList.title
                                        .toLowerCase()
                                        .includes(this.state.searchQuery.toLowerCase())
                                )}
                            onDelete={this.onDeleteHandler}
                            onArsip={this.onArsipHandler}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default ListApp;
