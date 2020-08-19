import { Action } from "../../utils";
const initialState = {
  data: {},
  stateList: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.PROFILE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
