import { Action } from "../../utils";
const initialState = {
  libraryData: [],
  downloadGallery: [],
  select: false,
  forceRerendering: false,
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Action.UPDATE_LIBRARY:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
