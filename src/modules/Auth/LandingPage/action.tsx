import { CustomToast } from "../../../Components";
import { Action, API, EndPoints } from "../../../utils";

export const fetchTestimonials = (
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.auth.testimonials,
      {},
      (success: any) => {
        console.log("success ", success.data.response);
        if (success.data.code === 200) {
          dispatch({
            type: Action.TESTIMONIALS,
            payload: {
              fetchTest: false,
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
          type: Action.TESTIMONIALS,
          payload: {
            fetchTest: false,
          },
        });
        if (error.message === "Network Error") {
        } else {
          CustomToast(error.response.message);
        }
        failCallback([]);
      }
    );
  };
};
