import React from "react";

const SearchArea = (props) => {
  return (
    <div className="search-area">
      <form onSubmit={props.searchBook} action="">
        <input
          placeholder="First Last"
          onChange={props.handleSearch}
          type="text"
        />
        <input placeholder="inches" onChange={props.handleHeight} type="text" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};
/*

*/

export default SearchArea;
