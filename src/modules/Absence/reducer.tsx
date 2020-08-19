import { Action } from "../../utils";
const initialState = {
  reasonList: [],
  absenceList: [],
  page: 0,
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.ABSENCE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
