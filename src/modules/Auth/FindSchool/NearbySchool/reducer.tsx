import { Action } from "../../../../utils";
const initialState = {
  searchList: [],
  recentList: [],
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.SEARCH_CENTER:
      return { ...state, ...action.payload };
    case Action.RECENT_SEARCH:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
