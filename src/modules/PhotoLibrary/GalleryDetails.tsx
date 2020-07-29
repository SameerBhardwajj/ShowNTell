import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Alert,
  Platform,
  PermissionsAndroid,
  Linking,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";
import { check, PERMISSIONS, RESULTS } from "react-native-permissions";
import { updatePermission } from "../Auth/Login/action";

// custom imports
import { CustomHeader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors } from "../../utils";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { item } = props.route.params;
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
  const saveToCameraRoll = async (
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
                  console.warn("denied");

                  permission.storage === 1
                    ? permissionAccess()
                    : dispatch(updatePermission({ storage: 1 }, () => {}));
                  break;
                case RESULTS.GRANTED:
                  console.warn("granted");

                  permission.storage === 3
                    ? null
                    : dispatch(updatePermission({ storage: 3 }, () => {}));
                  break;
                case RESULTS.BLOCKED:
                  console.warn("blocked");
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

  return (
    <View style={Styles.mainView}>
      <CustomHeader title="" onPressBack={() => props.navigation.pop()} />
      <View style={Styles.mainBtnView}>
        <TouchableOpacity
          style={Styles.btnView}
          activeOpacity={0.8}
          onPress={() =>
            saveToCameraRoll(
              item.s3_photo_path,
              () => {
                CustomToast(Strings.image_saved);
              },
              (error: any) => {
                console.warn("error ", error);
              }
            )
          }
        >
          <Image source={Images.download_Icon} style={Styles.btn} />
        </TouchableOpacity>
      </View>
      <Text style={Styles.heading}>{item.ActivityCategory.name}</Text>
      <Text style={Styles.category}>{item.ActivityCategory.description}</Text>
      <Image source={{ uri: item.s3_photo_path }} style={Styles.img} />
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  mainBtnView: {
    position: "absolute",
    flexDirection: "row",
    top: iPhoneX ? vh(30) : vh(20),
    right: vw(12),
  },
  btnView: {
    padding: vh(12),
  },
  btn: {
    height: vh(22),
    width: vh(22),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: Colors.lightBlack,
    paddingLeft: vh(16),
    paddingTop: vh(16),
  },
  category: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(18),
    color: Colors.lightGrey,
    paddingTop: vh(10),
    paddingLeft: vh(16),
  },
  img: {
    width: "100%",
    height: vh(220),
    marginTop: vh(80),
  },
});
