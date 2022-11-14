import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchByName } from "../actions";
import "./SearchBar.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(" ");
  const history = useHistory();

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getSearchByName(name));
    setName(" ");
    history.push("/home");
  }

  return (
    <div className="searchBar">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => handleInputChange(e)}
      />
      <button type="submit" onClick={(e) => handleSubmit(e)}>
        Search
      </button>
    </div>
  );
}
