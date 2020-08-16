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
      authors: [],
      height: 99,
    };
  }

  searchBook = (event) => {
    event.preventDefault();
    let req = `https://www.googleapis.com/books/v1/volumes?q= ${this.state.searchField} &key= ${this.state.apiKey} &orderBy=newest&maxResults=40`;
    axios.get(req).then((data) => {
      console.log(data.data.items);
      //fill in missing attributes
      const cleanData = this.cleanData(data.data.items);
      //filter books for specific author
      const filterAuthor = this.filterAuthor(cleanData);
      //only english
      const filterLanguage = this.filterLanguage(filterAuthor);

      console.log(filterLanguage);

      Promise.all(this.addHeight(filterLanguage)).then((data) => {
        const filterHeight = this.filterHeight(data);

        const removeDuplicates = this.removeDuplicates(filterHeight);

        console.log(`this is removeDuplicates: ${removeDuplicates}`);

        this.setState({ books: removeDuplicates });
      });
    });
  };

  removeDuplicates = (data) => {
    let removeDuplicates = [];
    let bookTitles = [];

    //for each book
    for (var bookIndexFirst in data) {
      let book = data[bookIndexFirst];
      //if bookTitles includes this title then we know the shortest book is already pushed to removeDuplicates
      if (!bookTitles.includes(book.volumeInfo.title)) {
        //push shortest book of same title
        for (var bookIndexSecond in data) {
          if (
            book.volumeInfo.title === data[bookIndexSecond].volumeInfo.title &&
            data[bookIndexSecond].height < book.height
          ) {
            book = data[bookIndexSecond];
          }
        }
        bookTitles.push(book.volumeInfo.title);
        removeDuplicates.push(book);
      }
    }

    return removeDuplicates;
  };

  addHeight = (data) => {
    const addHeight = data.map(async (book) => {
      return axios
        .get(
          "https://www.googleapis.com/books/v1/volumes/" +
            book.id +
            "?key=" +
            this.state.apiKey
        )
        .then((data) => {
          if (data.data.volumeInfo?.dimensions) {
            book["height"] = (
              data.data.volumeInfo.dimensions.height.split(" ")[0] / 2.54
            ).toFixed(2); //convert cm to in
          } else {
            book["height"] = "999";
          }
          return book;
        });
    });
    return addHeight;
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
          book.volumeInfo.authors[key].toLowerCase() ===
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

  filterLanguage = (data) => {
    const filterLanguage = data.filter((book) => {
      return book.volumeInfo.language === "en";
    });
    return filterLanguage;
  };

  //takes an array of books and filters out books with height greater than state.height
  filterHeight = (data) => {
    const filterHeight = data.filter((book) => {
      console.log(
        `${parseInt(book.height, 10)} < ${this.state.height}:  ${
          parseInt(book.height, 10) < this.state.height
        }`
      );

      return parseInt(book.height, 10) < this.state.height;
    });
    console.log(filterHeight);
    return filterHeight;
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  handleHeight = (event) => {
    this.setState({ height: event.target.value });
  };

  render() {
    return (
      <div>
        <SearchArea
          searchBook={this.searchBook}
          handleSearch={this.handleSearch}
          handleHeight={this.handleHeight}
        ></SearchArea>

        <BookList books={this.state.books} />
      </div>
    );
  }
}

export default Books;
