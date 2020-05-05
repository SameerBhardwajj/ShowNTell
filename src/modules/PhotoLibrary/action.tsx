import { Action } from "../../utils";
export const updateLibrary = (value: Array<any>) => {
  return (dispatch: Function, getState: Function) => {
    debugger;
    dispatch({
      type: Action.UPDATE_LIBRARY,
      payload: {
        libraryData: value,
        forceRerendering: !getState().PhotoLibrary.forceRerendering,
      },
    });
  };
};
