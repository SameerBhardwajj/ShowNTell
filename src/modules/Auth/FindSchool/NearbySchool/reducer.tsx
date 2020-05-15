import { Action } from "../../../../utils";
const initialState = {
  searchList: [],
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.SEARCH_CENTER:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
