import axios from "axios";

export const GET_DOGS = "GET_DOGS";
export const GET_ALL_TEMPERAMENTS = "GET_ALL_TEMPERAMENTS";
export const POST_DOG = "POST_DOG";
export const GET_DOG_DETAIL = "GET_DOG_DETAIL";
export const GET_SEARCH_BY_NAME = "GET_SEARCH_BY_NAME";
export const FILTER_BY_TEMP = "FILTER_BY_TEMP";
export const FILTER_BY_BREED = "FILTER_BY_BREED";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const ORDER_BY_WEIGHT = "ORDER_BY_WEIGHT";
export const CLEAR_PAGE = "CLEAR_PAGE";

export function clearPage() {
  return {
    type: CLEAR_PAGE,
  };
}

export function getDogs() {
  return async function (dispatch) {
    const res = await axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: GET_DOGS,
      payload: res.data,
    });
  };
}

export function getAllTemperaments() {
  return async (dispatch) => {
    try {
      const res = await axios.get("http://localhost:3001/temperaments");
      return dispatch({ type: GET_ALL_TEMPERAMENTS, payload: res.data });
    } catch (e) {
      return console.log(e);
    }
  };
}

export function postDog(payload) {
  return async function (dispatch) {
    console.log(payload, "payload del post");
    try {
      const resp = await axios.post("http://localhost:3001/dogs", payload);
      console.log(resp, "POST ACTIONS");
      return dispatch({
        type: POST_DOG,
        payload: resp,
      });
    } catch (e) {
      console.log(e, "Error catch del post");
    }
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    try {
      const detail = await axios.get(`http://localhost:3001/dogs/${id}`);
      console.log(detail.data, "detalle perro");
      return dispatch({
        type: GET_DOG_DETAIL,
        payload: detail.data,
      });
    } catch (e) {
      console.log(e);
    }
  };
}

export function getSearchByName(name) {
  return async function (dispatch) {
    try {
      const apiInfo = await axios.get(
        "http://localhost:3001/dogs?name=" + name
      );
      return dispatch({
        type: GET_SEARCH_BY_NAME,
        payload: apiInfo.data,
      });
    } catch (e) {
      alert(e.response.data);
      console.log(e.response.data);
    }
  };
}

export function filterDogsByTemperament(payload) {
  return {
    type: FILTER_BY_TEMP,
    payload,
  };
}

export function filterByBreed(payload) {
  return {
    type: FILTER_BY_BREED,
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: ORDER_BY_NAME,
    payload,
  };
}

export function orderByWeight(payload) {
  return {
    type: ORDER_BY_WEIGHT,
    payload,
  };
}
