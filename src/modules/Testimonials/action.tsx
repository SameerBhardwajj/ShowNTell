import { CustomToast } from "../../Components";
import { Action, EndPoints, API, Strings } from "../../utils";
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
        console.warn("check ", e == "Network Error");
        console.log(e);
        

        // if (e === "Network Error") {
        //   CustomToast(Strings.No_Internet);
        // } else {
        //   CustomToast(e);
        // }
        failCallback(e);
      });
  };
};

export const addTestimonialsAPI = (
  payload: object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postClientApiCall(
      EndPoints.drawer.addTestimonials,
      payload,
      (response: any) => {
        console.log("Success: ", response);
        if (response.data.statusCode === "201") {
          successCallback();
        } else {
          failCallback();
        }
      },
      (error: any) => {
        failCallback();
      }
    );
  };
};
