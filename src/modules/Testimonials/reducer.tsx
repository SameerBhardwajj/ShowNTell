import { Action } from "../../utils";
const initialState = {
  about: [],
  tnc: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.SETTINGS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
