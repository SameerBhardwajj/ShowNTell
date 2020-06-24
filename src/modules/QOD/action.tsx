import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hitQOTDApi = (
  successCallback: Function,
  failCallback: Function,
  child_id?: number,
  type?: string
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.qotd(child_id, type),
      {},
      (success: any) => {
        console.warn("success ", success.data.response);

        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.QOTD,
            payload: {
              data: res.rows,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
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
