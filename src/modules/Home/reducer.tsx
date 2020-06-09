import { Action } from "../../utils";
const initialState = {
  tab: true,
  forceRerendering: false,
  data: {},
  currentChild: { child: 0, name: "All" },
  filterData: {},
};
const Reducer = (state = initialState, action: any) => {
  console.warn(action, action.payload);
  debugger;
  switch (action.type) {
    case Action.UPDATE_TAB:
      return { ...state, ...action.payload };
    case Action.HOME_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
