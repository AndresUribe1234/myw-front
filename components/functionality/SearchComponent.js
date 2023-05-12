import React, { useState, useEffect } from "react";
import styles from "../../styles/SearchComponent.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";

const SearchComponent = (props) => {
  const [searchText, setSearchText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const eventsNameArray = props.data.map((ele) => ele.title);
    setData(eventsNameArray);
  }, [props]);

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

  const selectHandler = (item, id) => {
    console.log(`${item} event with ${id} was selected!`);
    setSearchText("");
    setShowResults(false);
    router.push(`/events/${item}?id=${id}`);
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
          <SearchIcon sx={{ color: props.color || "white" }} />
        </div>
      </div>
      {suggestions.length > 0 && showResults && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((suggestion, index) => {
            const element = props.data.filter(
              (ele) => ele.title === suggestion
            );

            const id = element[0].id;
            return (
              <li
                key={index}
                className={styles.suggestionItem}
                onClick={selectHandler.bind(this, suggestion, id)}
              >
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchComponent;
