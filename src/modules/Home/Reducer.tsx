const initialState = {
  tab: true,
};
const Reducer = (state = initialState, action: any) => {
  console.warn(action.type, action.payload.data);
  
  switch (action.type) {
    case 'UPDATE_TAB':
      return {...state, tab: action.payload.data};
    default:
      return state;
  }
};

export default Reducer;
