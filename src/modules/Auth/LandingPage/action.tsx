import { Action } from "../../../utils";
export const updateScrollRef = (value: any) => {
  return (dispatch: any) => {
    dispatch({ type: Action.UPDATE_SCROLLREF, payload: { data: value } });
  };
};
