import { CustomToast } from "../../Components";
import { Action, API, EndPoints, CommonFunctions } from "../../utils";

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

        dispatch({
          type: Action.CHAT,
          payload: {
            cannedMsg: [],
          },
        });
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
  page: number,
  successCallback: Function,
  failCallback: Function
) => {
  return (dispatch: Function, getState: Function) => {
    API.getApiCall(
      EndPoints.drawer.chat.getMsg(page),
      {},
      (success: any) => {
        console.warn("success ", success);

        const res = success.data.response;
        if (success.data.code === 200) {
          const { chatData } = getState().Chat;
          let finalArray = [];
          page === 0 ? (finalArray = res) : (finalArray = chatData.concat(res));

          dispatch({
            type: Action.CHAT,
            payload: {
              chatData: finalArray,
            },
          });
          successCallback(finalArray);
        } else {
          page === 0 ? CustomToast(success.data.message) : null;
          failCallback();
        }
      },
      (error: any) => {
        console.log("err ", error);

        dispatch({
          type: Action.CHAT,
          payload: {
            chatData: [],
          },
        });
        CommonFunctions.handleError(error);
        failCallback(error);
      }
    );
  };
};
