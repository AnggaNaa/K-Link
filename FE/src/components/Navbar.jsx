import React from "react"; // Import React library

class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar">
        <h1>Notes</h1>
        <input
          className="search"
          placeholder="Cari Catatan ..."
          type="text"
          value={this.props.searchQuery}
          onChange={(e) => this.props.onSearchChange(e.target.value)}
        />
      </div>
    );
  }
}

export default Navbar;
