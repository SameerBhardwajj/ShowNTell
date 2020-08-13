import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
  PermissionsAndroid,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Share from "react-native-share";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";

// custom imports
import { vw, Strings, vh, Colors, CommonFunctions } from "../../utils";
import { CustomToast } from "../../Components";
import { updatePermission } from "../Auth/Login/action";

const TYPE_URL = "url";
const TYPE_TEXT = "text";
export interface AppProps {
  data: any;
  closeModal: Function;
}

export default function App(props: AppProps) {
  const params = props.data;
  const dispatch = useDispatch();
  const { permission } = useSelector((state: { Login: any }) => ({
    permission: state.Login.permission,
  }));

  // Permission alert ------------------
  const permissionAccess = () => {
    Alert.alert(
      Platform.OS === "ios"
        ? "Please allow to access your Photo Gallery !"
        : "Please allow to access your Storage",
      "",
      [
        {
          text: "Open Settings",
          onPress: () => Linking.openSettings(),
        },
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  /**
   *
   * Permission Status :
   * 0 -> Not Asked
   * 1 -> Denied
   * 2 -> Blocked
   * 3 -> Access Granted
   */

  // Save images to Gallery ---------------------
  const saveToCameraRolls = async (
    image: string,
    successCallback: Function,
    failureCallback: Function
  ) => {
    let myPermission;
    if (Platform.OS === "android") {
      myPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (myPermission === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: "jpg",
        })
          .fetch("GET", image)
          .then((res) => {
            CameraRoll.saveToCameraRoll(res.path())
              .then(() => successCallback())
              .catch((err) => failureCallback(err));
          });
      } else {
        myPermission === "never_ask_again" ? permissionAccess() : null;
        failureCallback("Blocked");
      }
    } else {
      CameraRoll.saveToCameraRoll(image)
        .then(() => successCallback())
        .catch((error) => {
          check(PERMISSIONS.IOS.PHOTO_LIBRARY)
            .then((result) => {
              switch (result) {
                case RESULTS.UNAVAILABLE:
                  console.warn("unavailable");
                  break;
                case RESULTS.DENIED:
                  permission.storage === 1
                    ? permissionAccess()
                    : dispatch(updatePermission({ storage: 1 }, () => {}));
                  break;
                case RESULTS.GRANTED:
                  permission.storage === 3
                    ? null
                    : dispatch(updatePermission({ storage: 3 }, () => {}));
                  break;
                case RESULTS.BLOCKED:
                  permission.storage === 2
                    ? permissionAccess()
                    : dispatch(updatePermission({ storage: 2 }, () => {}));
                  break;
              }
            })
            .catch((error) => {
              CustomToast(error);
            });
        });
    }
  };

  const openShare = () => {
    console.warn(params);

    const url = CommonFunctions.isNullUndefined(params.img)
      ? ""
      : // : `http://showtelldevapi.appskeeper.com:4025/image/${params.id}/`;
        `http://snt-parent-api-test.mytle.com/image/${params.id}/`;
    // const title = CommonFunctions.isNullUndefined(params.categoryName)
    //   ? ""
    //   : params.categoryName;
    // const message = CommonFunctions.isNullUndefined(params.activityName)
    //   ? ""
    //   : params.activityName;
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: TYPE_URL, content: url },
            item: {
              default: { type: TYPE_URL, content: url },
            },
            type: {
              print: { type: TYPE_URL, content: url },
            },
            // subject: {
            //   default: title,
            // },
            linkMetadata: { originalUrl: url, url },
          },
          {
            // placeholderItem: { type: TYPE_TEXT, content: message },
            // item: {
            //   default: { type: TYPE_TEXT, content: message },
            //   message: message, // Specify no text to share via Messages app.
            // },
          },
        ],
      },
      default: {
        // title,
        // subject: title,
        // message: `${message} ${url} ${params.childName}`,
        message: `${url}`,
      },
    });
    // @ts-ignore
    Share.open(options)
      .then((res: any) => {
        console.log(res);
        props.closeModal();
      })
      .catch((err: any) => {
        console.warn(err);
        props.closeModal();
      });
  };

  const saveToCameraRoll = (image: string) => {
    saveToCameraRolls(
      image,
      () => {
        CustomToast(Strings.image_saved);
        setTimeout(() => {
          props.closeModal();
        }, 1000);
      },
      (error: any) => {
        setTimeout(() => {
          props.closeModal();
        }, 1000);
      }
    );
  };

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.shareView}
          onPress={() => openShare()}
        >
          <Text style={Styles.bubbleMsgText}>{Strings.Share}</Text>
        </TouchableOpacity>
        <View style={Styles.separatorView} />
        {CommonFunctions.isNullUndefined(params.img) ||
        params.status === "3" ? null : (
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.shareView}
            onPress={() => saveToCameraRoll(params.img)}
          >
            <Text style={Styles.bubbleMsgText}>
              {Strings.Save_to_Photo_Library}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.cancelView}
        onPress={() => props.closeModal()}
      >
        <Text style={Styles.cancelText}>{Strings.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "95%",
    alignItems: "center",
    borderRadius: vw(20),
    paddingHorizontal: vw(18),
  },
  shareView: {
    width: "100%",
    paddingVertical: vh(25),
  },
  bubbleMsgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
  },
  cancelView: {
    width: "95%",
    paddingVertical: vh(13),
    backgroundColor: "white",
    marginTop: vh(10),
    borderRadius: vh(30),
    marginBottom: vh(30),
  },
  cancelText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    textAlign: "center",
    color: Colors.lightBlack,
  },
});
