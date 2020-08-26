import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

export const hitAPI = (
  id: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.testimonials(id),
      {},
      (success: any) => {
        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.TESTIMONIAL,
            payload: {
              list: res,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          dispatch({
            type: Action.TESTIMONIAL,
            payload: {
              list: [],
            },
          });
          failCallback();
        }
      },
      (error: any) => {
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};
