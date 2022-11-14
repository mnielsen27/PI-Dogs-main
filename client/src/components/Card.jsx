import React from "react";
import "./Card.css";

export default function Card({
  name,
  image,
  min_weight,
  max_weight,
  temperament,
}) {
  return (
    <div className="card">
      <h3 className="card-title">Name: {name}</h3>
      <img
        className="card-image"
        src={image}
        alt="not found"
        width="250px"
        height="200px"
      ></img>
      <h5 className="card-data">
        Min weight : {min_weight} kgs - Max weight: {max_weight} kgs
      </h5>
      <h5 className="card-data">Temperaments: {temperament}</h5>
    </div>
  );
}
