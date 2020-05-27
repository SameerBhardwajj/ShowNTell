import * as React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Strings, Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  value: string;
  onChangeText: Function;
  placeholder: string;
  returnKeyType?: any;
  typePassword?: boolean;
  mainViewStyle?: any;
  autoFocus?: boolean;
  onPressCancel: Function;
  inputTextStyle?: Object;
  onSubmitEditing: Function;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {
  return (
    <View style={[Styles.inputTxtView, props.mainViewStyle]}>
      <View style={Styles.imgView}>
        <Image source={Images.Search_Icon} style={Styles.img} />
      </View>
      <TextInput
        ref={ref}
        style={[Styles.inputTxt, props.inputTextStyle]}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        value={props.value}
        onChangeText={(val: string) => props.onChangeText(val)}
        blurOnSubmit={false}
        returnKeyType={"go"}
        onSubmitEditing={() => props.onSubmitEditing()}
      />
      {props.value.length === 0 ? null : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => props.onPressCancel()}
          style={Styles.imgView}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
      )}
    </View>
  );
});
export default CustomInputText;

const Styles = StyleSheet.create({
  inputTxtView: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.veryLightGrey,
    borderRadius: vh(50),
    height: vh(48),
    width: "100%",
  },
  inputTxt: {
    height: vh(46),
    fontSize: vh(14),
    fontFamily: "Nunito-SemiBold",
    width: "67%",
  },
  imgView: {
    paddingHorizontal: vw(20),
  },
  img: {
    height: vh(20),
    width: vh(20),
  },
});
