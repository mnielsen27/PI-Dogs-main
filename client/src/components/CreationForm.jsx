import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getAllTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./CreationForm.css";
import { useParams } from "react-router-dom";

export function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Name is required";
  } else if (!/^[A-Za-z0-9_-\s]*$/.test(input.name)) {
    errors.name = "Please enter a valid name (letters or numbers required)";
  }

  if (
    !/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(
      input.image
    )
  ) {
    errors.image = "Invalid image: URL format required ";
  }

  if (!input.max_weight) {
    errors.max_weight = "Max weight is required";
  }
  if (!/^[0-9_-\s]*$/.test(input.max_weight)) {
    errors.max_weight = "Max weight must be a number";
  }
  if (input.max_weight < 0) {
    errors.max_weight = "Max weight cannot be negative";
  }
  if (input.max_weight > 70) {
    errors.max_weight = "Max weight cannot be bigger than 70";
  }

  if (!input.min_weight) {
    errors.min_weight = "Min weight is required";
  }
  if (!/^[0-9_-\s]*$/.test(input.min_weight)) {
    errors.min_weight = "Min weight must be a number";
  }
  if (input.min_weight < 0) {
    errors.min_weight = "Min weight cannot be negative";
  }
  if (input.min_weight > 30) {
    errors.min_weight = "Min weight cannot be bigger than 30";
  }

  if (!input.max_height) {
    errors.max_height = "Max height is required";
  }
  if (!/^[0-9_-\s]*$/.test(input.max_height)) {
    errors.max_height = "Max height must be a number";
  }
  if (input.max_height < 0) {
    errors.max_height = "Max height cannot be negative";
  }
  if (input.max_height > 130) {
    errors.max_height = "Max height cannot be bigger than 130";
  }

  if (!input.min_height) {
    errors.min_height = "Min height is required";
  }
  if (!/^[0-9_-\s]*$/.test(input.min_height)) {
    errors.min_height = "Min height must be a number";
  }
  if (input.min_height < 0) {
    errors.min_height = "Min height cannot be negative";
  }
  if (input.min_height > 50) {
    errors.min_height = "Min height cannot be bigger than 50";
  }

  return errors;
}

export default function DogCreation() {
  const dispatch = useDispatch();
  const history = useHistory();
  const temps = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    image: "",
    max_weight: "",
    min_weight: "",
    max_height: "",
    min_height: "",
    life_span: "",
    temperament: [],
  });

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      [e.target.image]: e.target.value,
      [e.target.max_weight]: e.target.value,
      [e.target.min_weight]: e.target.value,
      [e.target.max_height]: e.target.value,
      [e.target.min_height]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
        [e.target.image]: e.target.value,
        [e.target.max_weight]: e.target.value,
        [e.target.min_weight]: e.target.value,
        [e.target.max_height]: e.target.value,
        [e.target.min_height]: e.target.value,
      })
    );
    console.log(input);
    console.log(errors, "errorrrrrrres");
  }

  function handleSelect(e) {
    console.log(e.target.value);
    console.log(input);
    const tempRepeat = input.temperament?.includes(e.target.value);
    if (!tempRepeat) {
      setInput({
        ...input,
        temperament: [...input.temperament, e.target.value],
      });
      setErrors(
        validate({
          ...input,
          temperament: [...input.temperament, e.target.value],
        })
      );
    } else {
      setInput({
        ...input,
        temperament: input.temperament.filter((t) => t !== e.target.value),
      });
      setErrors(
        validate({
          ...input,
          temperament: [...input.temperament, e.target.value],
        })
      );
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(input, "INPUT HANDLE SUBMIT");
    console.log(errors);
    if (Object.keys(errors).length === 0) {
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
        temperament: [],
      });
      history.push("/home");
    } else {
      alert("The breed cannot be created.");
    }
  }

  useEffect(() => {
    dispatch(getAllTemperaments());
  }, [dispatch]);

  return (
    <div className="background-creation">
      <Link to="/home">
        <button id="back-button">Home</button>
      </Link>
      <h1>Create your dog's breed!</h1>
      <form id="form" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={input.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>
          <p />
          <div>
            <label>Image: </label>
            <input
              type="text"
              value={input.image}
              name="image"
              onChange={(e) => handleChange(e)}
            />
            {errors.image && <p className="error">{errors.image}</p>}
          </div>
          <p />
          <div>
            <label>Max Weight: </label>
            <input
              type="number"
              value={input.max_weight}
              name="max_weight"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_weight && <p className="error">{errors.max_weight}</p>}
          </div>
          <p />
          <div>
            <label>Min Weight: </label>
            <input
              type="number"
              value={input.min_weight}
              name="min_weight"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_weight && <p className="error">{errors.min_weight}</p>}
          </div>
          <p />
          <div>
            <label>Max Height: </label>
            <input
              type="number"
              value={input.max_height}
              name="max_height"
              onChange={(e) => handleChange(e)}
            />
            {errors.max_height && <p className="error">{errors.max_height}</p>}
          </div>

          <p />
          <div>
            <label>Min Height: </label>
            <input
              type="number"
              value={input.min_height}
              name="min_height"
              onChange={(e) => handleChange(e)}
            />
            {errors.min_height && <p className="error">{errors.min_height}</p>}
          </div>
          <p />
          <div>
            <label>Life Span: </label>
            <input
              type="text"
              value={input.life_span}
              name="life_span"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <p />
          <div>
            <label>Temperaments: </label>
            <select onChange={(e) => handleSelect(e)}>
              {temps.map((t) => (
                <option value={t}>{t}</option>
              ))}
            </select>
            <ul>
              <li>{input.temperament.map((e) => e + " - ")}</li>
            </ul>
          </div>
          <p />
          <p />

          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
}
