import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";

// custom imports
import { CustomHeader, CustomToast } from "../../Components";
import { Strings, vw, vh, Images, Colors, CommonFunctions } from "../../utils";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { item } = props.route.params;

  return (
    <View style={Styles.mainView}>
      <CustomHeader title="" onPressBack={() => props.navigation.pop()} />
      <View style={Styles.mainBtnView}>
        <TouchableOpacity
          style={Styles.btnView}
          activeOpacity={0.8}
          onPress={() =>
            CommonFunctions.saveToCameraRoll(
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
