// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Router } = require("express");
const axios = require("axios");
const dog = require("./Controllers/DogsControl");
const tempera = require("./Controllers/TemperamentControl");
const { Dog, Temperament, dog_temperament } = require("../db");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const router = Router();

router.get("/", async (req, res) => {
  res.status(200).send("BIENVENIDOS! SOMOS LOS AMIGOS DE KENAI");
});

router.get("/dogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const dogByID = await dog.getDogByID(id);

    dogByID.length
      ? res.status(200).send(dogByID)
      : res.status(404).send("No se encontro la raza solicitada");
  } catch (e) {
    console.log(e, "Error en el get:id");
  }
});

router.get("/dogs", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      const allDogs = await dog.getAllDogs();

      allDogs.length
        ? res.status(200).send(allDogs)
        : res.status(404).send("No hay resultados para esta busqueda");
    } else {
      const byName = await dog.getDogsByName(name);

      byName.length
        ? res.status(200).send(byName)
        : res.status(404).send(`No se encontro raza con el nombre ${name}`);
    }
  } catch (e) {
    console.log(e, "Error Catch en el get a all Dogs");
  }
});

router.get("/temperaments", async (req, res) => {
  try {
    const tem = await tempera.getTemperaments();

    tem
      ? res.status(200).send(tem)
      : res.status(404).send("No se encontraron temperamentos");
  } catch (e) {
    console.log(e, "Error en temperamentos");
  }
});

router.post("/dogs", async (req, res) => {
  const {
    name,
    image,
    maxHeight,
    minHeight,
    maxWeight,
    minWeight,
    life_span,
    temperament,
  } = req.body;

  try {
   const newDog = await dog.newBreed(
      name,
      image,
      maxHeight,
      minHeight,
      maxWeight,
      minWeight,
      life_span,
      temperament
    );

    newDog
      ? res.status(200).send("Raza creada con exito")
      : res.send(404).send("No se ha creado la raza");
  } catch (e) {
    console.log(e, "Error en el catch del post");
  }
});

module.exports = router;
