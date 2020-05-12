import { Action } from "../../../utils";
const initialState = {
  login: true,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_LOGIN:
      return { ...state, login: action.payload.data };
    default:
      return state;
  }
};

export default Reducer;
