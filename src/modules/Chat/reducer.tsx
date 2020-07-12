import { Action } from "../../utils";
const initialState = {
  cannedMsg: [],
  chatData: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.CHAT:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
