import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Strings, Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  titleText: string;
  onPress: Function;
  viewStyle?: Object;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {
  return (
    <View style={[Styles.mainView, props.viewStyle]}>
      <Text style={Styles.titleTxt}>{props.titleText}</Text>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.inputTxtView}
        onPress={() => props.onPress()}
      >
        <Text style={Styles.centreTxt}>{Strings.select_centre}</Text>
        <Image source={Images.Dropdown_icon} style={Styles.imgEye} />
      </TouchableOpacity>
    </View>
  );
});
export default CustomInputText;

const Styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    width: "100%",
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
  },
  inputTxtView: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: Colors.veryLightGrey,
    height: vh(48),
    marginVertical: vh(10),
    borderRadius: vh(50),
    borderWidth: vh(1),
    borderColor: Colors.borderGrey,
    paddingHorizontal: vw(25),
  },
  centreTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.placeholderGrey,
  },
  imgEye: {
    // height: vh(18),
    // width: vh(27),
  },
});
