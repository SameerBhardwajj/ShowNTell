import * as React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Strings, Colors, vw, vh, Images } from "../utils";

export interface AppProps {
  titleText: string;
  keyboardType?: any;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: Function;
  onSubmitEditing: Function;
  check: boolean;
  incorrectText: string;
  returnKeyType?: any;
  typePassword?: boolean;
  onPressEye?: Function;
  mainViewStyle?: any;
  editable?: boolean;
  autoFocus?: boolean;
  onBlur?: Function;
  maxLength?: number;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {

  return (
    <View style={[{ width: "100%" }, props.mainViewStyle]}>
      <View style={Styles.textView}>
        <Text
          style={[
            Styles.titleTxt,
            { color: props.check ? Colors.titleColor : Colors.pink },
          ]}
        >
          {props.titleText}
        </Text>
        {props.check ? null : (
          <View style={{ width: "50%" }}>
            <Text style={Styles.incorrectText}>{props.incorrectText}</Text>
          </View>
        )}
      </View>
      <View
        style={[
          Styles.inputTxtView,
          { borderColor: props.check ? Colors.borderGrey : Colors.pink },
        ]}
      >
        <TextInput
          ref={ref}
          style={[
            Styles.inputTxt,
            props.typePassword
              ? Styles.textInputStyle2
              : Styles.textInputStyle1,
            { borderColor: props.check ? Colors.borderGrey : Colors.pink },
          ]}
          maxLength={props.maxLength}
          autoFocus={props.autoFocus}
          keyboardType={props.keyboardType}
          enablesReturnKeyAutomatically={true}
          secureTextEntry={props.secureTextEntry}
          editable={props.editable}
          value={props.value}
          onChangeText={(val: string) => props.onChangeText(val)}
          blurOnSubmit={false}
          returnKeyType={
            props.returnKeyType === undefined ? "next" : props.returnKeyType
          }
          contextMenuHidden={props.typePassword ? true : false}
          onSubmitEditing={() => props.onSubmitEditing()}
          onBlur={() => (props.onBlur === undefined ? null : props.onBlur())}
        />
        {props.typePassword ? (
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              paddingHorizontal: props.secureTextEntry ? vw(5) : vw(2),
              paddingTop: props.secureTextEntry ? vw(2) : vw(0),
            }}
            onPress={() =>
              props.onPressEye === undefined ? null : props.onPressEye()
            }
          >
            <Image
              source={
                props.secureTextEntry ? Images.Eye_icon : Images.Eye_close_icon
              }
              style={props.secureTextEntry ? Styles.imgEye : Styles.closeImgEye}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
});
export default CustomInputText;

const Styles = StyleSheet.create({
  textView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    // paddingHorizontal: vw(25)
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  inputTxtView: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.veryLightGrey,
    height: vh(48),
    marginVertical: vh(10),
    borderRadius: vh(50),
    borderWidth: vh(1),
    borderColor: Colors.borderGrey,
  },
  textInputStyle1: {
    width: "100%",
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  textInputStyle2: {
    width: "83%",
    borderRightWidth: 0,
    borderLeftWidth: 0,
    paddingRight: 0,
  },
  inputTxt: {
    height: vh(48),
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
  },
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
    // paddingLeft: vw(40),
    width: "100%",
    textAlign: "right",
  },
  imgEye: {
    height: vh(17),
    width: vh(26),
  },
  closeImgEye: {
    height: vh(32),
    width: vh(32),
  },
});
