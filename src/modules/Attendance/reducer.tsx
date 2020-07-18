import { Action } from "../../utils";
const initialState = {
  data: [],
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.VIEW_ATTENDANCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
