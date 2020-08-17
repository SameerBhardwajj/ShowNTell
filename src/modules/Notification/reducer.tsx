import { Action } from "../../utils";
const initialState = {
  data: [],
  page: 0,
  settingList: [],
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.NOTIFICATION:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
