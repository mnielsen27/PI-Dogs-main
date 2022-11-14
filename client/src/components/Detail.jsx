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
          <h1>Name: {myDog.name}</h1>
          <img src={myDog.image} alt="" width="500px" height="400px" />
          <h2>Temperaments: {myDog.temperament}</h2>
          <h2>Height: {myDog.height} cm</h2>
          <h5>Weight: {myDog.weight} kgs</h5>
          <h3>Life span: {myDog.life_span} years</h3>
        </div>
      ) : (
        <p>"Breed not found"</p>
      )}

      <Link to="/home">
        <button>Home</button>
      </Link>
    </div>
  );
}
