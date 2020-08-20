import { Action } from "../../../utils";
const initialState = {
  data: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.TESTIMONIALS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
