export const updateAccess = () => {
  return (dispatch: any) => {
    dispatch({ type: "UPDATE_ACCESS_CODE", payload: { data: false } });
  };
};

export const delayAccess = () => {
  return (dispatch: any) => {
    setTimeout(() => {     
      dispatch({ type: "DELAY_ACCESS_CODE", payload: { data: true } });
    }, 30000);
  };
};
