import { Action } from "../../../utils";
const initialState = {
  loginData: {},
  loginToken: "",
  schoolList: [],
  loginEmail: "",
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_LOGIN:
      return { ...state, ...action.payload };
    case Action.USER_LOGIN:
      return { ...state, ...action.payload };
    case Action.FETCH_SCHOOL_LOGIN:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
