import { Action } from "../../../utils";
const initialState = {
  access: true,
};

const Reducer = (state = initialState, action: any) => {
  console.log("access ", action);

  switch (action.type) {
    case Action.UPDATE_ACCESS_CODE || Action.DELAY_ACCESS_CODE:
      return { ...state, access: action.payload.data };
    default:
      return state;
  }
};

export default Reducer;
