import React, { useState } from "react";
import Hero from "../components/Hero";
import axios from "axios";

function BookSearch(props) {
  const [book, setBook] = useState("");
  const [height, setHeight] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyDt5mXFwvWgydKIRaJuWccj2yKB8VtXCms"
  );
  var bookShelf = [];

  function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleHeight(event) {
    const height = event.target.value;
    setHeight(height);
  }

  async function filterBooks(book) {
    let h = 0;
    let boolDim = false;
    let boolIL = false;
    let boolTN = false;
    let bool;
    await axios
      .get(
        "https://www.googleapis.com/books/v1/volumes/" +
          book.id +
          "?key=" +
          apiKey
      )
      .then((data) => {
        if (data.data.volumeInfo.hasOwnProperty("dimensions")) {
          boolDim = true;
          h = data.data.volumeInfo.dimensions.height;
        }
        if (data.data.volumeInfo.hasOwnProperty("imageLinks")) {
          boolIL = true;
        }
        if (
          boolIL &&
          data.data.volumeInfo.imageLinks.hasOwnProperty("thumbnail")
        ) {
          boolTN = true;
        }
      })
      .catch(() => {
        console.log("error");
      });
    bool = boolDim && boolIL && boolTN && h <= height;
    console.log(
      book.volumeInfo.title +
        "\nhas dimensions " +
        boolDim +
        "\nhas a height of " +
        h +
        "\nhas a imageLinks " +
        boolIL +
        "\nhas a thumbnail " +
        boolTN +
        "\n=> " +
        bool
    );

    return bool;
  }

  function makeCover(book) {
    if (book === undefined) {
    } else {
      return <a> {book.title}</a>;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setResult([]);
    await axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&orderBy=newest&printType=books&key=" +
          apiKey
      )
      .then((data) => {
        //console.log(data.data.items);
        setResult(data.data.items);
      })
      .catch(() => {
        console.log("error");
      });
  }

  return (
    <div>
      <Hero title={props.title}></Hero>
      <div class="container">
        <form onSubmit={handleSubmit}>
          <div class="form-group">
            <input
              type="text"
              onChange={handleChange}
              className="form-control mt-10"
              placeholder="search for books"
              autoComplete="off"
            />
            <br className="p-5"></br>
            <input
              type="text"
              onChange={handleHeight}
              className="form-input"
              placeholder="enter max height in cm"
              autoComplete="off"
            />
            <button type="submit" className="btn btn-danger">
              search
            </button>
          </div>
        </form>
        {result.filter(filterBooks).map((book) =>
          book === undefined ? (
            <a>hi</a>
          ) : (
            <div>
              <a>{book.volumeInfo.title}</a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
/*
result.filter(filterBooks).map(async (book) =>
          (
            <a target="_blank" href={await book.volumeInfo.previewLink}>
              <img
                src={await book.volumeInfo.imageLinks.thumbnail}
                alt={await book.title}
              />
            </a>
          ).catch()
        )

        {bookShelf.map((book) => (
          <p>{book.volumeInfo.title}</p>
        ))}
*/

export default BookSearch;
