import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDogs,
  filterDogsByTemperament,
  getAllTemperaments,
  filterByBreed,
  orderByName,
  orderByWeight,
} from "../../actions";
import { Link } from "react-router-dom";
import Card from "../Card";
import Paginado from "../Paginado";
import SearchBar from "../SearchBar";
import "./Home.css";

export default function Home() {
  const dispatch = useDispatch();
  // ESTO ES LO MISMO QUE EL MAP STATE TO PROPS
  const allDogs = useSelector((state) => state.dogs);
  const allTemp = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(8);
  const [order, setOrder] = useState("");
  const indexLastDog = currentPage * dogsPerPage;
  const indexFirstDog = indexLastDog - dogsPerPage;
  const allPagDogs = allDogs.slice(indexFirstDog, indexLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleFilterTemp(e) {
    e.preventDefault();
    console.log(e.target.value, "value del temp");
    dispatch(filterDogsByTemperament(e.target.value));
  }

  function handleFilterByBreed(e) {
    e.preventDefault();
    dispatch(filterByBreed(e.target.value));
  }

  function handleOrderByName(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleOrderByWeight(e) {
    e.preventDefault();
    dispatch(orderByWeight(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  return (
    <div className="background-home">
      <Link id="home-link-creationForm" to="/dog">
        Creation form - new breed
      </Link>
      <h1 id="home-Title">A DOG'S PAGE</h1>

      <button
        id="reloadBreeds-Home"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        RELOAD BREEDS
      </button>
      <p />

      <div>
        <select
          className="home-filters"
          onChange={(e) => {
            handleFilterTemp(e);
          }}
        >
          <option value="All">Temperament</option>
          {allTemp?.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>

        <select
          className="home-filters"
          onChange={(e) => {
            handleFilterByBreed(e);
          }}
        >
          <option value="All">Breeds</option>
          <option value="existente">Api</option>
          <option value="creada">Created</option>
        </select>

        <select
          className="home-filters"
          onChange={(e) => {
            handleOrderByName(e);
          }}
        >
          <option value="All">Alphabetic</option>
          <option value="desc">A-Z</option>
          <option value="asc">Z-A</option>
        </select>

        <select
          className="home-filters"
          onChange={(e) => {
            handleOrderByWeight(e);
          }}
        >
          <option value="all">Weight</option>
          <option value="ascweight">Min to Max</option>
          <option value="descweight">Max to min</option>
        </select>
        <br />
        <div className="home-filters">
          <SearchBar />
        </div>
        <br />

        <Paginado
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado={paginado}
        ></Paginado>
      </div>
      <div className="cards">
        {allPagDogs?.map((e) => {
          return (
            <Link to={"/detail/" + e.id}>
              <Card
                image={e.image}
                name={e.name}
                min_weight={e.min_weight}
                max_weight={e.max_weight}
                temperament={e.temperament}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
