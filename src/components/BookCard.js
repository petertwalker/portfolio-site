import React from "react";

const BookCard = (props) => {
  return (
    <div>
      <a href={props.link} target="_blank">
        <img className="p-book-image" src={props.image} alt=""></img>
      </a>
      <div className="p-book-desc">
        <h6>{props.title}</h6>
        <h5>Author: {props.author}</h5>
        <p>Published Date: {props.published}</p>
        <p>Height: {props.height}</p>
      </div>
    </div>
  );
};

export default BookCard;
