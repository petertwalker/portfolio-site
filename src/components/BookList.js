import React from "react";
import BookCard from "./BookCard";

const BookList = (props) => {
  var count = 0;
  return (
    <div className="list">
      {props.books.map((book, i) => {
        var available = false;
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, "0");
        var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + "-" + mm + "-" + dd;
        //console.log(today);

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
        //console.log(available);
        if (count > 2 || available < 0) {
        } else {
          count++;
          return (
            <BookCard
              key={i}
              image={book.volumeInfo.imageLinks.thumbnail}
              title={book.volumeInfo.title}
              published={book.volumeInfo.publishedDate}
              author={book.volumeInfo.authors}
            />
          );
        }
      })}
    </div>
  );
};

export default BookList;
/*


      */
