import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getAllTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);

  const [input, setInput] = useState({
    name: "",
    image: "",
    max_Weight: "",
    min_Weight: "",
    max_Height: "",
    min_Height: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    console.log(input);
  }

 /* function handleSelectTemp(e) {
    console.log(e.target.value);
    console.log(input);
    setInput({
      ...input,
      temperaments: [...input.platforms, e.target.value],
    });
  }*/

  function handleSelect(e) {
    console.log(e.target.value);
    console.log(input);
    setInput({
      ...input,
      temperaments: [...input.temperaments, e.target.value],
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input, "INPUT HANDLE SUBMIT");
    dispatch(postDog(input));
    alert("Dog Breed creado con exito");
    setInput({
      name: "",
      image: "",
      max_weight: "",
      min_weight: "",
      max_height: "",
      min_height: "",
      life_span: "",
      temperaments: [],
    });
    history.push("/home");
  }

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <h1>Crea tu raza de perro!</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Imagen:</label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Maximo peso:</label>
          <input
            type="number"
            value={input.max_weight}
            name="max_weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Minimo peso:</label>
          <input
            type="number"
            value={input.min_weight}
            name="min_weight"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Maxima altura:</label>
          <input
            type="number"
            value={input.max_height}
            name="max_height"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Minima altura:</label>
          <input
            type="number"
            value={input.min_height}
            name="min_height"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Esperanza de vida:</label>
          <input
            type="text"
            value={input.life_span}
            name="life_span"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label>Temperamentos:</label>
          <select onChange={(e) => handleSelect(e)}>
            {temps.map((t) => (
              <option value={t}>{t}</option>
            ))}
          </select>
          <ul>
            <li>{input.temperaments.map((e) => e + ",")}</li>
          </ul>
        </div>

        <button type="submit">Crear Raza</button>
      </form>
    </div>
  );
}
