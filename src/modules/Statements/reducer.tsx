import { Action } from "../../utils";
const initialState = {
  data: [],
  page: 0,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.STATEMENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
