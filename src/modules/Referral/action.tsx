import { CustomToast } from "../../Components";
import { Action, API, EndPoints, Constants } from "../../utils";

export const hitReferralAPI = (
  payload: object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postClientApiCall(
      EndPoints.drawer.referral,
      payload,
      (response: any) => {
        console.log("Success: ", response);
        if (response.data.result === "OK") {
          successCallback();
        } else {
          failCallback();
        }
      },
      () => {
        failCallback();
      }
    );
  };
};
