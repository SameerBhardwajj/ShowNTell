export const updateSplash = () => {
  return (dispatch: any, getState: any) => {
    const { splash } = getState().Splash;
    dispatch({ type: "UPDATE_SPLASH", payload: { data: !splash } });
  };
};
