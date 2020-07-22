import { Action } from "../../utils";
const initialState = {
  data: [],
  page: 0,
  date: { fromDate: "", toDate: "" },
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
