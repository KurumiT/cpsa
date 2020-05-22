import * as Action from "../actions";

const init: any = {
  data: {},
  isLoading: false,
  error: null,
};

export default function Client(state = init, action: any) {
  switch (action.type) {
    case Action.Store.Client.SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.data,
      };
    case Action.Store.Client.SET_DATA:
      return {
        ...state,
        data: action.data,
      };
    case Action.Store.Client.SET_ERROR:
      return {
        ...state,
        error: action.data,
      };
    case Action.Store.Client.CLEAR:
      return init;
    default:
      return state;
  }
}
