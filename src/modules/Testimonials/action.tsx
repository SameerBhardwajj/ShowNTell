import { CustomToast } from "../../Components";
import { Action, EndPoints, Constants } from "../../utils";
import axios from "axios";

export const hitAPI = (
  id: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    axios
      .get(EndPoints.drawer.testimonials(id))
      .then((success: any) => {
        dispatch({
          type: Action.TESTIMONIAL,
          payload: {
            list: success.data.data,
          },
        });
        successCallback(success.data.data);
      })
      .catch((e) => {
        failCallback(e);
        CustomToast(e);
      });
  };
};

export const addTestimonialsAPI = (
  payload: object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    Constants.clientAxiosInstance
      .post(EndPoints.drawer.addTestimonials, payload)
      .then((response: any) => {
        debugger;
        console.warn("Success: ", response);
        if (response.data.statusCode === "201") {
          successCallback();
        } else {
          CustomToast("Something went wrong!");
          failCallback();
        }
      })
      .catch((error: any) => {
        debugger;
        failCallback();
      });
  };
};
