export const updateTab = (value: boolean, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    debugger;
    dispatch({
      type: "UPDATE_TAB",
      payload: {
        tab: value,
        forceRerendering: !getState().Home.forceRerendering,
      },
    });
    callback();
  };
};
