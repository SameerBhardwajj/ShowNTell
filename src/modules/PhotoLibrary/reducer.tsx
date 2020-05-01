const initialState = {
  libraryData: [],
  forceRerendering: false,
};
const Reducer = (state = initialState, action: any) => {
  console.log(action, state.libraryData);
  switch (action.type) {
    case "UPDATE_LIBRARY":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default Reducer;
