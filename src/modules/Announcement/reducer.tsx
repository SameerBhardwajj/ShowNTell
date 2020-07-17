import { Action } from "../../utils";
const initialState = {
  data: [],
  page: 0,
};
const Reducer = (state = initialState, action: any) => {
  console.warn(action, action.payload);
  switch (action.type) {
    case Action.ANNOUNCEMENT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
