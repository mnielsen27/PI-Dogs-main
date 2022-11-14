const axios = require("axios");
const { Dog, Temperament, dog_temperament } = require("../../db");
const { API_KEY_MJ } = process.env;
const { Op } = require("sequelize");

const getApiDogs = async () => {
  const apiInfo = await axios.get(
    `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY_MJ}`
  );
  const apiData = await apiInfo.data;

  const apiDogs = await apiData.map((e) => {
    return {
      id: e.id,
      image: e.image.url,
      name: e.name,
      temperament: e.temperament,
      min_weight: parseInt(e.weight.metric.split("-")[0]),
      max_weight: parseInt(e.weight.metric.split("-")[1]),
      height: e.height.metric,
      life_span: e.life_span,
    };
  });
  return apiDogs;
};

const getDbDogs = async () => {
  const dbDogs = await Dog.findAll({
    include: {
      model: Temperament,
      attribute: ["name"],
    },
    through: {
      attributes: [],
    },
  });

  const dbHome = await dbDogs?.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.name,
      temperament: e.temperaments?.map((e) => e.name).join(","),
      min_weight: e.min_weight,
      max_weight: e.max_weight,
      height: e.height,
      life_span: e.life_span,
    };
  });

  return dbHome;
};

const getAllDogs = async () => {
  const apiDogs = await getApiDogs();
  const dbDogs = await getDbDogs();
  const allDogs = dbDogs.concat(apiDogs);

  return allDogs;
};

/*const getDogsByName = async (n) => {
  const apiRes = await axios.get(
    `https://api.thedogapi.com/v1/breeds/search?q=${n}&&api_key=${API_KEY_MJ}`
  );
  const apiData = await apiRes.data;

  const apiDogsByName = await apiData?.map((e) => {
    return {
      id: e.id,
      name: e.name,
      temperament: e.temperament,
      weight: e.weight.metric,
    };
  });

  const dbDogs = await Dog.findAll({
    where: {
      name: {
        [Op.iLike]: "%" + n + "%",
      },
    },
    include: Temperament,
  });

  const dbDogsByName = await dbDogs?.map((e) => {
    return {
      image: e.image,
      name: e.name,
      temperament: e.temperament,
      weight: e.weight,
    };
  });

  const allByName = dbDogsByName.concat(apiDogsByName);
  return allByName;
};*/

const getDogByID = async (id) => {
  console.log(id);
  if (id.length > 10) {
    const dbDogs = await Dog.findOne({
      where: {
        id: id,
      },
      include: {
        model: Temperament,
        attribute: ["name"],
      },
    });

    const idDogs = {
      id: dbDogs.id,
      image: dbDogs.image,
      name: dbDogs.name,
      temperament: dbDogs.temperaments?.map((e) => e.name).join(","),
      weight: `${dbDogs.min_weight} - ${dbDogs.max_weight}`,
      height: dbDogs.height,
      life_span: dbDogs.life_span,
    };
    return idDogs;
  } else {
    const apiInfo = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY_MJ}`
    );
    apiData = apiInfo.data;
    apiDog = apiData.find((e) => e.id == id);

    const idDog = {
      id: apiDog.id,
      image: apiDog.image.url,
      name: apiDog.name,
      temperament: apiDog.temperament,
      weight: apiDog.weight.metric,
      height: apiDog.height.metric,
      life_span: apiDog.life_span,
    };

    return idDog;
  }
};

const newBreed = async (
  name,
  image,
  max_height,
  min_height,
  max_weight,
  min_weight,
  life_span,
  temperament
) => {
  if (!name || !max_height || !min_height || !max_weight || !min_weight) {
    return "Faltan datos";
  } else {
    const height = [min_height, max_height].join(" - ");

    const newDog = await Dog.create({
      name,
      image,
      height,
      max_weight,
      min_weight,
      life_span,
    });

    const dogTemperament = await Temperament.findAll({
      where: {
        name: temperament,
      },
    });

    newDog.addTemperament(dogTemperament);
    console.log(newDog);
    return newDog;
  }
};

module.exports = { getAllDogs, getDogByID, newBreed };
