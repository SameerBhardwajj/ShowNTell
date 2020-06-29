import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const updateDownload = (value: Array<any>, callback: Function) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_LIBRARY,
      payload: {
        downloadGallery: value,
      },
    });
    callback();
  };
};

export const updateSelect = (value: boolean) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: Action.UPDATE_LIBRARY,
      payload: {
        select: value,
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
          page === 0 ? CustomToast(success.data.message) : null;
          failureCallback();
        }
      },
      (error: any) => {
        console.warn("error ", error);
        dispatch({
          type: Action.UPDATE_LIBRARY,
          payload: {
            libraryData: [],
          },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};
