import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hitAnnouncementAPI = (
  child_id: number,
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.announcement(child_id, page),
      {},
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        const { data } = getState().Announcement;
        let finalArray = [];
        page === 0
          ? (finalArray = res.rows)
          : (finalArray = data.concat(res.rows));
        dispatch({
          type: Action.ANNOUNCEMENT,
          payload: {
            data: finalArray,
            page: page + 1,
          },
        });
        successCallback(res.rows);
      },
      (error: any) => {
        dispatch({
          type: Action.ANNOUNCEMENT,
          payload: {
            data: [],
          },
        });
        CommonFunctions.handleError(error);
        failureCallback();
      }
    );
  };
};
