import { Action } from "../../utils";
const initialState = {
  tab: true,
  forceRerendering: false,
  data: {},
  currentChild: { child: 0, name: "All", classroom: 0 },
  otherCurrentChild: { child: 0, name: "All", classroom: 0 },
  filterData: {},
  myFilter: { activityt: [], date: "" },
  filterNum: 0,
};
const Reducer = (state = initialState, action: any) => {
  console.warn(action, action.payload);
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
