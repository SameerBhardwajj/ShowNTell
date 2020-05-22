import { Action } from "../../../utils";
const initialState = {
  scrollRef: null,
  fetchTest: true,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_SCROLLREF:
      return { ...state, ...action.payload };
    case Action.TESTIMONIALS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
