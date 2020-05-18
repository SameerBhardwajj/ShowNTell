import { Action } from "../../../utils";
const initialState = {
  email: "",
  name: "",
  id: 0,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.REGISTER:
      return { ...state, ...action.payload };
    case Action.RESEND_CODE:
      return { ...state, ...action.payload };
    case Action.VERIFY_CODE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
