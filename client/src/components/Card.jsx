import React from "react";

export default function Card({ name, image, weight, temperament }) {
  return (
    <div>
      <h3>Raza: {name}</h3>
      <img src={image} alt="not found" width="250px" height="200px"></img>
      <h5>Peso : {weight}</h5>
      <h5>Temperamentos: {temperament}</h5>
    </div>
  );
}
