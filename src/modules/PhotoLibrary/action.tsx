import { Action, API, EndPoints } from "../../utils";
import { CustomToast } from "../../Components";

export const updateLibrary = (value: Array<any>) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_LIBRARY,
      payload: {
        libraryData: value,
        forceRerendering: !getState().PhotoLibrary.forceRerendering,
      },
    });
  };
};

export const PhotoLibraryAPI = (
  child_id: number,
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.photoLibrary.gallery(child_id, page),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          console.warn("mysuccess ", res);
          dispatch({
            type: Action.UPDATE_LIBRARY,
            payload: {
              libraryData: res,
            },
          });
          successCallback(res);
        } else {
          CustomToast(success.data.message);
          failureCallback();
        }
      },
      (error: any) => {
        console.log("error ", error);
        dispatch({
          type: Action.UPDATE_LIBRARY,
          payload: {
            libraryData: [],
          },
        });
        CustomToast(error.data.message);
        failureCallback();
      }
    );
  };
};
