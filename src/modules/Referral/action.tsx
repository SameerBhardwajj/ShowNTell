import { CustomToast } from "../../Components";
import { Action, API, EndPoints, Constants } from "../../utils";

export const hitReferralAPI = (
  payload: object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    Constants.clientAxiosInstance
      .post(EndPoints.drawer.referral, payload)
      .then((response: any) => {
        debugger;
        console.warn("Success: ", response);
        if (response.data.result === "OK") {
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
