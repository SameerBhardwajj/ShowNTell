import { Action, API, EndPoints } from "../../utils";
import { CustomToast } from "../../Components";
export const updateTab = (value: boolean, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_TAB,
      payload: {
        tab: value,
        forceRerendering: !getState().Home.forceRerendering,
      },
    });
    callback();
  };
};

export const HomeAPI = (
  child_id: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.auth.HomeData(child_id),
      {},
      (success: any) => {
        if (success.data.code === 200) {
          console.warn("mysuccess ", success.data.response);
          dispatch({
            type: Action.HOME_DATA,
            payload: {
              data: success.data.response,
            },
          });

          successCallback();
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.HOME_DATA,
          payload: {
            // isLoading: false,
          },
        });
        CustomToast(error.data.message);
        failureCallback();
      }
    );
  };
};
