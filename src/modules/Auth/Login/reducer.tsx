import { Action } from "../../../utils";

/**
 *
 * Permission Status :
 * 0 -> Not Asked
 * 1 -> Denied
 * 2 -> Blocked
 * 3 -> Access Granted
 */

const initialState = {
  loginData: {},
  loginToken: "",
  deviceToken: "",
  schoolList: [],
  loginEmail: "",
  profilePic: "",
  permission: { gallery: 0, camera: 0, storage: 0 },
  logout: false,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_LOGIN:
      return { ...state, ...action.payload };
    case "USER_LOGGED_OUT":
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
