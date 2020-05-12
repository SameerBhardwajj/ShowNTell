import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-material-dropdown";
import { Strings, Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  titleText: string;
  viewStyle?: Object;
  data: Array<any>;
  onChangeText: Function;
  currentText: string;
  dropDownView?: Object;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {
  return (
    <View style={[Styles.mainView, props.viewStyle]}>
      <Text style={Styles.titleTxt}>{props.titleText}</Text>
      <Dropdown
        rippleOpacity={0}
        rippleDuration={0}
        renderBase={() => {
          return (
            <View style={Styles.inputTxtView}>
              <Text style={Styles.centreTxt}>{props.currentText}</Text>
              <Image source={Images.Dropdown_icon} />
            </View>
          );
        }}
        pickerStyle={[
          { width: "85%", marginHorizontal: vw(22) },
          props.dropDownView,
        ]}
        containerStyle={{ width: "100%" }}
        fontSize={vh(16)}
        data={props.data}
        onChangeText={(value) => props.onChangeText(value)}
      />
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
    color: Colors.titleColor,
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
});
