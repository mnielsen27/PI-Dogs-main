import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDogDetail, clearPage } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => dispatch(clearPage());
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.details);

  return (
    <div>
      {myDog ? (
        <div>
          <h1>Nombre: {myDog.name}</h1>
          <img src={myDog.image} alt="" width="500px" height="400px" />
          <h2>Temperamentos: {myDog.temperament}</h2>
          <h2>Altura: {myDog.height} cm</h2>
          <h5>Peso: {myDog.weight} kgs</h5>
          <h3>Años de vida: {myDog.life_span}</h3>
        </div>
      ) : (
        <p>"No se encontro la raza"</p>
      )}

      <Link to="/home">
        <button>Volver</button>
      </Link>
    </div>
  );
}
