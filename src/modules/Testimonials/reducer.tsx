import { Action } from "../../utils";
const initialState = {
  list: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.TESTIMONIAL:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
