import React from "react";
import BookCard from "./BookCard";
import axios from "axios";

const BookList = (props) => {
  var count = 0;
  var sortedBooks = [];

  console.log(props.books);

  sortedBooks = props.books.sort((a, b) => {
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
  });

  return (
    <div className="list">
      {sortedBooks.map((book, i) => {
        var available = false;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;

        //this compares todays date to the books date
        if (
          book.volumeInfo.publishedDate.substring(0, 4) ===
          today.substring(0, 4)
        ) {
          if (book.volumeInfo.publishedDate.length === 4) {
            available = true;
          } else if (
            book.volumeInfo.publishedDate.substring(5, 7) ===
            today.substring(5, 7)
          ) {
            available =
              parseInt(today.substring(8, 10)) -
              parseInt(book.volumeInfo.publishedDate.substring(8, 10));
          } else {
            available =
              parseInt(today.substring(5, 7)) -
              parseInt(book.volumeInfo.publishedDate.substring(5, 7));
          }
        } else {
          available =
            parseInt(today.substring(0, 4)) -
            parseInt(book.volumeInfo.publishedDate.substring(0, 4));
        }

        if (count > 2 || available < 0) {
        } else {
          count++;
          var link = `https://www.amazon.com/s?k=${book.volumeInfo.authors}+${book.volumeInfo.title}`;
          return (
            <BookCard
              key={i}
              image={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title}
              published={book.volumeInfo.publishedDate}
              author={book.volumeInfo.authors}
              height={book.height}
              link={link}
            />
          );
        }
      })}
    </div>
  );
};

export default BookList;
