import { Action } from "../../utils";
const initialState = {
  splash: true,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_SPLASH:
      return { ...state, splash: action.payload.data };
    default:
      return state;
  }
};

export default Reducer;
