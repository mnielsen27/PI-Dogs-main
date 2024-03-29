import {
  GET_DOGS,
  GET_ALL_TEMPERAMENTS,
  GET_DOG_DETAIL,
  GET_SEARCH_BY_NAME,
  POST_DOG,
  FILTER_BY_TEMP,
  FILTER_BY_BREED,
  ORDER_BY_NAME,
  ORDER_BY_WEIGHT,
  CLEAR_PAGE,
  FILTER_18,
} from "../actions";

const initialState = {
  dogs: [],
  allDogs: [],
  temperaments: [],
  details: {},
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_PAGE:
      return {
        ...state,
        details: {},
      };

    case GET_DOGS:
      return {
        ...state,
        dogs: action.payload,
        allDogs: action.payload,
      };

    case GET_ALL_TEMPERAMENTS: {
      return {
        ...state,
        temperaments: action.payload,
      };
    }

    case GET_DOG_DETAIL: {
      console.log(action.payload, "detail REDUCER");
      return {
        ...state,
        details: action.payload,
      };
    }

    case GET_SEARCH_BY_NAME:
      return {
        ...state,
        dogs: action.payload,
      };

    case POST_DOG:
      return {
        ...state,
      };

    case FILTER_18: {
      const filtered18 = state.allDogs.filter((e) => e.min_weight === 18);

      return {
        ...state,
        dogs: filtered18,
      };
    }

    case FILTER_BY_TEMP: {
      const allDogs2 = state.allDogs;

      const filteredDogs =
        action.payload === "All"
          ? allDogs2
          : allDogs2.filter((e) => e.temperament?.includes(action.payload));

      return {
        ...state,
        dogs: filteredDogs,
      };
    }

    case FILTER_BY_BREED: {
      const allDogs4 = state.allDogs;
      let statusFiltered4 =
        action.payload === "creada"
          ? allDogs4?.filter((e) => e.id.length > 10)
          : allDogs4?.filter((e) => !(e.id.length > 10));

      return {
        ...state,
        dogs: action.payload === "All" ? allDogs4 : statusFiltered4,
      };
    }

    case ORDER_BY_NAME: {
      const allDogs3 = state.allDogs;
      let orderedDogs =
        action.payload === "desc"
          ? state.allDogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort(function (a, b) {
              if (a.name < b.name) {
                return 1;
              }
              if (a.name > b.name) {
                return -1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: action.payload === "All" ? allDogs3 : orderedDogs,
      };
    }

    case ORDER_BY_WEIGHT: {
      const allDogs4 = state.allDogs;

      let orderedDogsW =
        action.payload === "ascweight"
          ? state.allDogs.sort(function (a, b) {
              if (a.min_weight > b.min_weight) {
                return 1;
              }
              if (a.min_weight < b.min_weight) {
                return -1;
              }
              return 0;
            })
          : state.allDogs.sort(function (a, b) {
              if (a.max_weight < b.max_weight) {
                return 1;
              }
              if (a.max_weight > b.max_weight) {
                return -1;
              }
              return 0;
            });

      const filteredDogs2 = orderedDogsW.filter((e) => e.min_weight != null);

      return {
        ...state,
        dogs: action.payload === "All" ? allDogs4 : filteredDogs2,
      };
    }

    default:
      return state;
  }
}

export default rootReducer;
