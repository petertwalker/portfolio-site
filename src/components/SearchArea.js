import React from "react";

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.searchBook} action="">
        <input
          placeholder="enter author"
          onChange={props.handleSearch}
          type="text"
        />
        <input
          placeholder="enter height"
          onChange={props.handleHeight}
          type="text"
        />
        <button type="submit">Search</button>
      </form>
      <select defaultValue="Newest" onChange={props.handleSort}>
        <option disabled value="Sort">
          Sort
        </option>
        <option value="Newest">Newest</option>
        <option disabled value="Oldest">
          Oldest
        </option>
      </select>
    </div>
  );
};
/*

*/

export default SearchArea;
