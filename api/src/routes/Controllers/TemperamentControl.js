const axios = require("axios");
const { Temperament } = require("../../db");
const { API_KEY_MJ } = process.env;

const getTemperaments = async () => {
  const dbTemp = await Temperament.findAll();

  if (dbTemp.length > 0) {
    const tempname = await dbTemp?.map((e) => e.name);
    return tempname;
  } else {
    const apiInfo = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY_MJ}`
    );
    const apiData = await apiInfo.data;

    const temp = await apiData.map((e) => e.temperament);
    // Divido strings en array
    for (i = 0; i < temp.length; i++) {
      temp[i] = temp[i]?.split(",");
    }
    const tempflat = temp.flat(1);

    //Elimino espacios del string
    for (i = 0; i < tempflat.length; i++) {
      tempflat[i] = tempflat[i]?.trim();
    }

    // Dejo valores unicos sin duplicados
    const unitemp = [...new Set(tempflat)];

    const filteredtemp = unitemp.filter((e) => e != null);

    const orderedTemp = filteredtemp.sort(function (a, b) {
      if (a > b) {
        return 1;
      }
      if (a < b) {
        return -1;
      }
      return 0;
    });

    orderedTemp?.forEach(async (e) => {
      await Temperament.findOrCreate({
        where: {
          name: e,
        },
      });
    });

    return orderedTemp;
  }
};

module.exports = { getTemperaments };
