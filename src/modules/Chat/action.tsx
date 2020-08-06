import { CustomToast } from "../../Components";
import {
  Action,
  API,
  EndPoints,
  CommonFunctions,
  Constants,
  Strings,
} from "../../utils";

export const getCannedMsgs = (
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.chat.cannedMsg,
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          dispatch({
            type: Action.CHAT,
            payload: {
              cannedMsg: res,
            },
          });
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};

export const sendMsg = (
  data: Object,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.postApiCall(
      EndPoints.drawer.chat.sendMsg,
      data,
      (success: any) => {
        if (success.data.code === 200) {
          successCallback(success.data.response);
        } else {
          CustomToast(success.data.message);
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

export const getMsgs = (
  type: string,
  timestamp: string,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    Constants.axiosInstance
      .get(EndPoints.drawer.chat.getMsg(type, timestamp), {})
      .then((success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          console.warn(success.data.response);

          const { chatData } = getState().Chat;
          let finalArray = [];
          type === "down"
            ? (finalArray = res.concat(chatData))
            : (finalArray = chatData.concat(res));

          dispatch({
            type: Action.CHAT,
            payload: {
              chatData: finalArray,
            },
          });
          successCallback(finalArray);
        } else {
          dispatch({
            type: Action.CHAT,
            payload: {
              loadMore: false,
            },
          });
          // page === 0 ? CustomToast(success.data.message) : null;
          failCallback();
        }
      })
      .catch((error: any) => {
        if (type === "up") {
          if (error.message === "Network Error") {
            CustomToast(Strings.No_Internet);
          }
          if (error.code === "ECONNABORTED") {
            CustomToast(Strings.Timeout_error);
          }
          dispatch({
            type: Action.CHAT,
            payload: {
              chatData: [],
              loadMore: false,
            },
          });
          CommonFunctions.handleError(error);
        }
        failCallback(error);
      });
  };
};
