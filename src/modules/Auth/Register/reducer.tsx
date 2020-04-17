const initialState = {
  access: true,
};

const Reducer = (state = initialState, action: any) => {
  console.log("access ", action);

  switch (action.type) {
    case "UPDATE_ACCESS_CODE" || "DELAY_ACCESS_CODE":
      return { ...state, access: action.payload.data };
    default:
      return state;
  }
};

export default Reducer;
