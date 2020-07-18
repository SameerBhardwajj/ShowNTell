import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";

export const hitAnnouncementAPI = (
  child_id: number,
  page: number,
  successCallback: Function,
  failureCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    console.warn("page ", page);

    API.getApiCall(
      EndPoints.drawer.announcement(child_id, page),
      {},
      (success: any) => {
        let res = success.data.response;
        console.log("mysuccess ", res);
        console.warn('page ann',page);
        
        const { data } = getState().Announcement;
        let finalArray = [];
        page === 0
          ? (finalArray = res.rows)
          : (finalArray = data.concat(res.rows));
        dispatch({
          type: Action.ANNOUNCEMENT,
          payload: {
            data: finalArray,
            page: page + 1
          },
        });
        successCallback(res.rows);
      },
      (error: any) => {
        console.log("error ", error);
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
