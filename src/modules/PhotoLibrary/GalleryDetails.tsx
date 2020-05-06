import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  Dimensions,
} from "react-native";
import RNFetchBlob from "rn-fetch-blob";
import CameraRoll from "@react-native-community/cameraroll";

// custom imports
import { updateTab } from "../Home/action";
import { CustomHeader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { item } = props.route.params;

  const saveToCameraRoll = async (image: string) => {
    let permission;
    if (Platform.OS === "android") {
      permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (!permission) {
        Linking.openSettings();
      }
      if (permission === PermissionsAndroid.RESULTS.GRANTED) {
        RNFetchBlob.config({
          fileCache: true,
          appendExt: "jpg",
        })
          .fetch("GET", image)
          .then((res) => {
            CameraRoll.saveToCameraRoll(res.path())
              .then(() => CustomToast(Strings.image_saved))
              .catch((err) => CustomToast(err));
          });
      }
    } else {
      CameraRoll.saveToCameraRoll(image)
        .then(() => CustomToast(Strings.image_saved))
        .catch((error) => CustomToast(error));
    }
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader title="" onPressBack={() => props.navigation.pop()} />
      <View style={Styles.mainBtnView}>
        <TouchableOpacity
          style={Styles.btnView}
          activeOpacity={0.8}
          onPress={() => saveToCameraRoll(item.img)}
        >
          <Image source={Images.download_Icon} style={Styles.btn} />
        </TouchableOpacity>
        <TouchableOpacity style={Styles.btnView}>
          <Image
            source={Images.Delete_Icon}
            style={[Styles.btn, { width: vh(21) }]}
          />
        </TouchableOpacity>
      </View>
      <Text style={Styles.heading}>{item.heading}</Text>
      <Text style={Styles.category}>{item.category}</Text>
      <Image source={{ uri: item.img }} style={Styles.img} />
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    // alignItems: "center",
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
    height: "40%",
    width: "100%",
    marginTop: vh(80),
  },
});
