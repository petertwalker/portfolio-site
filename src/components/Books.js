import React from "react";
import SearchArea from "./SearchArea";
import BookList from "./BookList";
import axios from "axios";
import noImg from "../assets/images/logo512.png";

class Books extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchField: "",
      apiKey: "AIzaSyDt5mXFwvWgydKIRaJuWccj2yKB8VtXCms",
      sort: "Newest",
      authors: [],
      height: -1,
    };
  }

  searchBook = (event) => {
    event.preventDefault();
    this.state.authors = [];
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          this.state.searchField +
          "&key=" +
          this.state.apiKey
      )
      .then((data) => {
        const cleanData = this.cleanData(data.data.items);
        const filterAuthor = this.filterAuthor(cleanData);
        if (this.state.height == -1) {
          this.setState({ books: filterAuthor });
        } else {
          const filterHeight = this.filterHeight(filterAuthor);

          console.log(this.state.books);
          this.setState({ books: filterHeight });
          console.log(this.state.books);
        }
      });
  };

  cleanData = (data) => {
    const cleanedData = data.map((book) => {
      if (book.volumeInfo.hasOwnProperty("publishedDate") === false) {
        book.volumeInfo["publishedDate"] = "0000";
      } else if (book.volumeInfo.hasOwnProperty("imageLinks") === false) {
        book.volumeInfo["imageLinks"] = { thumbnail: noImg };
      }
      return book;
    });
    return cleanedData;
  };

  filterAuthor = (data) => {
    const filterAuthor = data.filter((book) => {
      //if data.authors is an array
      for (var key in book.volumeInfo.authors) {
        if (
          book.volumeInfo.authors[key].toLowerCase() ==
          this.state.searchField.toLowerCase()
        ) {
          return true;
        }
        if (!this.state.authors.includes(book.volumeInfo.authors[key])) {
          this.state.authors.push(book.volumeInfo.authors[key]);
        }
      }

      return false;
    });
    return filterAuthor;
  };

  filterHeight = (data) => {
    const filterHeight = data.filter(this.filterHeightFunction);
    return filterHeight;
  };

  filterHeightFunction = async (book) => {
    await axios
      .get(
        "https://www.googleapis.com/books/v1/volumes/" +
          book.id +
          "?key=" +
          this.state.apiKey
      )
      .then((data) => {
        if (data.data.volumeInfo.hasOwnProperty("dimensions")) {
          console.log(
            book.volumeInfo.title +
              " has a height of " +
              data.data.volumeInfo.dimensions.height
          );
          console.log(
            data.data.volumeInfo.dimensions.height <= this.state.height
          );
          return data.data.volumeInfo.dimensions.height <= this.state.height;
        }
        console.log(book.volumeInfo.title + " doesnt have a height ");
        return false;
      });
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleSort = (event) => {
    this.setState({ sort: event.target.value });
  };

  handleHeight = (event) => {
    this.setState({ height: event.target.value });
  };

  render() {
    let sortedBooks = [];
    console.log(this.state.height);
    sortedBooks = this.state.books.sort((a, b) => {
      if (this.state.sort === "Newest") {
        //if same yr
        if (
          b.volumeInfo.publishedDate.substring(0, 4) ===
          a.volumeInfo.publishedDate.substring(0, 4)
        ) {
          if (a.volumeInfo.publishedDate.length === 4) {
            return 1;
          } else if (b.volumeInfo.publishedDate.length === 4) {
            return -1;
          } else if (
            b.volumeInfo.publishedDate.substring(5, 7) ===
            a.volumeInfo.publishedDate.substring(5, 7)
          ) {
            return (
              parseInt(b.volumeInfo.publishedDate.substring(8, 10)) -
              parseInt(a.volumeInfo.publishedDate.substring(8, 10))
            );
          }
          return (
            parseInt(b.volumeInfo.publishedDate.substring(5, 7)) -
            parseInt(a.volumeInfo.publishedDate.substring(5, 7))
          );
        }
        return (
          parseInt(b.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(a.volumeInfo.publishedDate.substring(0, 4))
        );
        ///end
      } else if (this.state.sort === "Oldest") {
        //first check if year is the same
        //then month
        if (
          a.volumeInfo.publishedDate.substring(0, 4) ===
          b.volumeInfo.publishedDate.substring(0, 4)
        ) {
          if (b.volumeInfo.publishedDate.length === 4) {
            return 1;
          } else if (a.volumeInfo.publishedDate.length === 4) {
            return -1;
          } else if (
            a.volumeInfo.publishedDate.substring(5, 7) ===
            b.volumeInfo.publishedDate.substring(5, 7)
          ) {
            return (
              parseInt(a.volumeInfo.publishedDate.substring(8, 10)) -
              parseInt(b.volumeInfo.publishedDate.substring(8, 10))
            );
          }
          return (
            parseInt(a.volumeInfo.publishedDate.substring(5, 7)) -
            parseInt(b.volumeInfo.publishedDate.substring(5, 7))
          );
        }
        return (
          parseInt(a.volumeInfo.publishedDate.substring(0, 4)) -
          parseInt(b.volumeInfo.publishedDate.substring(0, 4))
        );
      }
    });

    return (
      <div>
        <SearchArea
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
          handleHeight={this.handleHeight}
        ></SearchArea>
        {this.state.authors.map((author) => (
          <div>
            <a>{author}</a>
          </div>
        ))}
        <BookList books={sortedBooks} />
      </div>
    );
  }
}

export default Books;
