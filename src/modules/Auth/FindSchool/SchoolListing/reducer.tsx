import { Action } from "../../../../utils";
const initialState = {
  schoolList: [],
  isLoading: false,
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.FETCH_SCHOOL_LIST:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
