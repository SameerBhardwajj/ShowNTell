export const updateTab = (value: boolean) => {
  return (dispatch: any) => {
    dispatch({ type: "UPDATE_TAB", payload: value });
  };
};
