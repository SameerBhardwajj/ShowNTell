import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";
import axios from "axios";

export const hitAPI = (
  id: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    axios
      .get(EndPoints.drawer.events(id))
      .then((success: any) => {
        if (success.data.status === "success") {
          dispatch({
            type: Action.EVENTS,
            payload: {
              data: success.data.data,
            },
          });
          successCallback(success.data.data);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      })
      .catch((e) => {
        CustomToast(e);
        failCallback();
      });
  };
};
