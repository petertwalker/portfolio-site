import React from "react";
import Hero from "../components/Hero";
import Books from "../components/Books";
import SearchArea from "../components/SearchArea";

class BookApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Hero title={this.props.title} />
        <Books />
      </div>
    );
  }
}

export default BookApp;
