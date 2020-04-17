export const updateAccess = () => {
  return (dispatch: any, getState: any) => {
    const { access } = getState().Register;
    dispatch({ type: "UPDATE_ACCESS_CODE", payload: { data: false } });
  };
};

export const delayAccess = () => {
  return (dispatch: any, getState: any) => {
    const { access } = getState().Register;
    setTimeout(() => {
      
      dispatch({ type: "DELAY_ACCESS_CODE", payload: { data: true } });
    }, 30000);
  };
};
