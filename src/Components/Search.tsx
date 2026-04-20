import React from "react";
import type { SearchInterface } from "../Ineterfaces/SearchInterface";

const Search = ({ query, setQuery }: SearchInterface) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="Search icon" />
        <input
          type="text"
          placeholder="search through thousands of movies"
          value={query}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );
};

export default Search;
