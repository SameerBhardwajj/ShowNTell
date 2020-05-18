import { Action } from "../../../utils";
const initialState = {
  scrollRef: null,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_SCROLLREF:
      return { ...state, scrollRef: action.payload.data };
    default:
      return state;
  }
};

export default Reducer;
