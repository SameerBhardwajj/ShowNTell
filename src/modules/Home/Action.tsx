export const updateTab = (value: boolean) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: "UPDATE_TAB",
      payload: {
        tab: value,
        forceRerendering: !getState().Home.forceRerendering,
      },
    });
  };
};
