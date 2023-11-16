import React from "react";

class NoteListInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
      archived: false,
      createdAt: "",
      maxCharacters: 50,
      remainingCharacters: 50,
    };

    this.onNameChangeEventHandler = this.onNameChangeEventHandler.bind(this);
    this.onAgeChangeEventHandler = this.onAgeChangeEventHandler.bind(this);
    this.onDateChangeHandler = this.onDateChangeHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onNameChangeEventHandler(event) {
    const inputText = event.target.value;
    const remainingCharacters = this.state.maxCharacters - inputText.length;

    this.setState({
      title: inputText,
      remainingCharacters: remainingCharacters,
    });
  }

  onAgeChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onDateChangeHandler(event) {
    this.setState(() => {
      return {
        createdAt: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    // const formattedDate = this.formatDate(this.state.createdAt);
    // this.props.addNoteList({ ...this.state, createdAt: formattedDate });
    this.props.addNoteList(this.state);
  }

  formatDate(inputDate) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("id-ID", options).format(
      new Date(inputDate)
    );
    return formattedDate;
  }

  render() {
    return (
      <form className="noteList-input" onSubmit={this.onSubmitEventHandler}>
        <p className="noteList-input-sisaKarakter">
          Sisa karakter : {this.state.remainingCharacters}
        </p>
        <input
          type="text"
          placeholder="Judul"
          value={this.state.title}
          onChange={this.onNameChangeEventHandler}
          required
        />
        <textarea
          type="textarea"
          placeholder="Tuliskan catatanmu disini ..."
          value={this.state.body}
          onChange={this.onAgeChangeEventHandler}
          required
        />

        <input
          type="date"
          value={this.state.createdAt}
          onChange={this.onDateChangeHandler}
          required
        />
        <button type="submit">Tambah</button>
      </form>
    );
  }
}

export default NoteListInput;
