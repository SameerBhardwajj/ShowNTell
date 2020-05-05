import { Action } from "../../utils";
const initialState = {
  tab: true,
  forceRerendering: false,
};
const Reducer = (state = initialState, action: any) => {
  console.log(action, state.tab);
  switch (action.type) {
    case Action.UPDATE_TAB:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
