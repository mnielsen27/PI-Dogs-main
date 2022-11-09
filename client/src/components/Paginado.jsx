import React from "react";
import "./Paginado.css";

function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="paginado-contenedor">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li key={number}>
              <button onClick={() => paginado(number)} className="button-pag">
                {" "}
                {number}
              </button>
            </li>
          ))}
      </ul>
    </nav>
  );
}

export default Paginado;
