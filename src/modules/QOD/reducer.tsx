import { Action } from "../../utils";
const initialState = {
  data: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.QOTD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
