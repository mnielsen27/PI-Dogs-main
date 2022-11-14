import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <section className="background">
      <div className="texto_y_boton">
        <h1 className="texto">WELCOME!</h1>
        <Link to="/home">
          <button className="inicio_button">Enter</button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
