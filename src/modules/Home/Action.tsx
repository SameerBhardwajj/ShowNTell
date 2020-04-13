export const updateTab = () => {
  return (dispatch: any, getState: any) => {
    const {tab} = getState().Home;
    dispatch({type: 'UPDATE_TAB', payload: {data: !tab}});
  };
};
