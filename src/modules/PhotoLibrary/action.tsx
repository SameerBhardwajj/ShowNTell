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
        const { libraryData } = getState().PhotoLibrary;
        const res = success.data.response;
        if (success.data.code === 200) {
          let finalData = [];
          page === 0
            ? (finalData = res)
            : (finalData = libraryData.concat(res));
          dispatch({
            type: Action.UPDATE_LIBRARY,
            payload: {
              libraryData: finalData,
              page: page + 1,
            },
          });
          successCallback(res);
        } else {
          page === 0 ? CustomToast(success.data.message) : null;
          page === 0
            ? dispatch({
                type: Action.UPDATE_LIBRARY,
                payload: {
                  libraryData: [],
                },
              })
            : null;
          failureCallback();
        }
      },
      (error: any) => {
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
