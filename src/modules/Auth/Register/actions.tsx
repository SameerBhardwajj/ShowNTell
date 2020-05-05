import { Action } from "../../../utils";
export const updateAccess = () => {
  return (dispatch: any) => {
    dispatch({ type: Action.UPDATE_ACCESS_CODE, payload: { data: false } });
  };
};

export const delayAccess = () => {
  return (dispatch: any) => {
    setTimeout(() => {
      dispatch({ type: Action.DELAY_ACCESS_CODE, payload: { data: true } });
    }, 30000);
  };
};
