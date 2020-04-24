const initialState = {
  tab: true,
};
const Reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_TAB":
      return { ...state, tab: action.payload };
    default:
      return state;
  }
};

export default Reducer;
