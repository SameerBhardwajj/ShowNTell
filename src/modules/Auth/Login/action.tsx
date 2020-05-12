import { Action } from "../../../utils";
export const updateLogin = () => {
  return (dispatch: any, getState: any) => {
    const { login } = getState().Login;
    dispatch({ type: Action.UPDATE_LOGIN, payload: { data: !login } });
  };
};
