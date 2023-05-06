import React, { useState, useEffect } from "react";
import styles from "../../styles/SearchComponent.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { INTERNALS } from "next/dist/server/web/spec-extension/request";

const SearchComponent = (props) => {
  const data = props.data;
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (searchText) {
      const searchRegex = new RegExp(searchText, "i");
      setSuggestions(data.filter((item) => item.match(searchRegex)));
    } else {
      setSuggestions([]);
    }
  }, [searchText, data]);

  const onSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const selectHandler = (item) => {
    console.log(`${item} event was selected!`);
    setSearchText("");
    setShowResults(false);
    props.onGetValue(item);
  };

  const focusInputHandler = () => {
    setShowResults(true);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputContainer}>
        <input
          className={styles.searchInput}
          type="text"
          placeholder={props.placeholder}
          value={searchText}
          onChange={onSearchChange}
          onFocus={focusInputHandler}
        />
        <div className={styles.iconContainer}>
          <SearchIcon sx={{ color: "white" }} />
        </div>
      </div>
      {suggestions.length > 0 && showResults && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className={styles.suggestionItem}
              onClick={selectHandler.bind(this, suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
