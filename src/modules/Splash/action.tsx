import { Action } from "../../utils";
export const updateSplash = () => {
  return (dispatch: any, getState: any) => {
    const { splash } = getState().Splash;
    dispatch({ type: Action.UPDATE_SPLASH, payload: { data: !splash } });
  };
};
