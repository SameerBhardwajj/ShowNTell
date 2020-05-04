export const updateLibrary = (value: Array<any>) => {
  return (dispatch: Function, getState: Function) => {
    debugger;
    dispatch({
      type: "UPDATE_LIBRARY",
      payload: {
        libraryData: value,
        forceRerendering: !getState().PhotoLibrary.forceRerendering,
      },
    });
  };
};
