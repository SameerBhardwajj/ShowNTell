import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hitQOTDApi = (
  successCallback: Function,
  failCallback: Function,
  current_date_time: string,
  child_id?: number,
  type?: string
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.qotd(current_date_time, child_id, type),
      {},
      (success: any) => {
        console.warn("success ", success.data.response);

        const res = success.data.response;
        dispatch({
          type: Action.QOTD,
          payload: {
            data: res.rows,
          },
        });
        successCallback(success.data.response);
      },
      (error: any) => {
        dispatch({
          type: Action.QOTD,
          payload: {
            data: [],
          },
        });
        CommonFunctions.handleError(error);
        failCallback();
      }
    );
  };
};
