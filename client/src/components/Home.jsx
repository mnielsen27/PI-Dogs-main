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
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";

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
    <div>
      <Link to="/dog">Crear raza nueva</Link>
      <h1>LOS AMIGOS DE KENAI</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar todas las razas
      </button>
      <div>
        <select
          onChange={(e) => {
            handleFilterTemp(e);
          }}
        >
          <option value="All">Temperamento</option>
          {allTemp?.map((e) => {
            return (
              <option key={e} value={e}>
                {e}
              </option>
            );
          })}
        </select>

        <select
          onChange={(e) => {
            handleFilterByBreed(e);
          }}
        >
          <option value="All">Razas</option>
          <option value="existente">Existente</option>
          <option value="creada">Creada</option>
        </select>

        <select
          onChange={(e) => {
            handleOrderByName(e);
          }}
        >
          <option value="All">Orden alfabetico</option>
          <option value="desc">A-Z</option>
          <option value="asc">Z-A</option>
        </select>

        <select
          onChange={(e) => {
            handleOrderByWeight(e);
          }}
        >
          <option value="all">Peso</option>
          <option value="ascweight">Ascendente</option>
          <option value="descweight">Descendente</option>
        </select>

        <div>
          <SearchBar />
          <Paginado
            dogsPerPage={dogsPerPage}
            allDogs={allDogs.length}
            paginado={paginado}
          ></Paginado>
        </div>

        {allPagDogs?.map((e) => {
          return (
            <div>
              <Link to={"/detail/" + e.id}>
                <Card
                  image={e.image}
                  name={e.name}
                  weight={e.weight}
                  temperament={e.temperament}
                />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
