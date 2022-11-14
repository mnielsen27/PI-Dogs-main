import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getDogDetail, clearPage } from "../actions/index";
import { useSelector, useDispatch } from "react-redux";
import "./Detail.css";

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDogDetail(id));
    return () => dispatch(clearPage());
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.details);

  return (
    <div className="detail">
      {myDog ? (
        <div>
          <h1 id="detail-name">Name: {myDog.name}</h1>
          <img
            id="image-detail"
            src={myDog.image}
            alt=""
            width="500px"
            height="400px"
          />
          <h2>Temperaments: {myDog.temperament}</h2>
          <h2>Height: {myDog.height} cm</h2>
          <h3>Weight: {myDog.weight} kgs</h3>
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
