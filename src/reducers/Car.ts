import * as Action from "../actions";

const init: any = {
  list: [],
  brands: [],
  models: [],
  generations: [],
  isLoading: false,
  error: null,
};

export default function Car(state = init, action: any) {
  switch (action.type) {
    case Action.Store.Car.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.data,
      };
    case Action.Store.Car.SET_LIST:
      return {
        ...state,
        list: action.data,
      };
    case Action.Store.Car.ADD_TO_LIST:
      return {
        ...state,
        list: [...state.list, action.data],
      };
    case Action.Store.Car.SET_BRANDS:
      return {
        ...state,
        brands: action.data,
      };
    case Action.Store.Car.SET_MODELS:
      return {
        ...state,
        models: action.data,
      };
    case Action.Store.Car.SET_GENERATIONS:
      return {
        ...state,
        generations: action.data,
      };
    case Action.Store.Car.SET_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case Action.Store.Car.CLEAR:
      return init;
    default:
      return state;
  }
}
