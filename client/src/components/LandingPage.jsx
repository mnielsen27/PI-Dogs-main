import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <h1>BIENVENIDOS A LA PAGINA DE KENAI</h1>
      <Link to="/home">
        <button>Entrar</button>
      </Link>
    </div>
  );
}

export default LandingPage;
