import { Action } from "../../utils";
const initialState = {
  classroomChild: {},
  data: [],
};

const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.CLASSROOM_SCHEDULE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
