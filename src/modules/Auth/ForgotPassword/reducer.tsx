import { Action } from "../../../utils";
const initialState = {
  email: "",
  name: "",
  id: 0,
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.FORGOT_PASSWORD:
      return { ...state, ...action.payload };
    case Action.FP_RESEND_CODE:
      return { ...state, ...action.payload };
    case Action.FP_VERIFY_CODE:
      return { ...state, ...action.payload };
    case Action.RESET_PASSWORD:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
