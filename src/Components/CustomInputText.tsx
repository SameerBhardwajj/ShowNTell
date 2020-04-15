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
  keyboardType: any;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: Function;
  onSubmitEditing: Function;
  check: boolean;
  incorrectText: string;
  returnKeyType?: any;
  typePassword?: boolean;
  onPressEye?: Function;
}

const CustomInputText = React.forwardRef((props: AppProps, ref: any) => {
  return (
    <View>
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
          <Text style={Styles.incorrectText}>
            {props.incorrectText}
            {Strings.is_incorrect}
          </Text>
        )}
      </View>
      <TextInput
        ref={ref}
        style={[
          Styles.inputTxt,
          { borderColor: props.check ? Colors.borderGrey : Colors.pink },
        ]}
        keyboardType={props.keyboardType}
        secureTextEntry={
          props.secureTextEntry === undefined ? false : props.secureTextEntry
        }
        value={props.value}
        onChangeText={(val: string) => props.onChangeText(val)}
        blurOnSubmit={false}
        returnKeyType={
          props.returnKeyType === undefined ? "next" : props.returnKeyType
        }
        onSubmitEditing={() => props.onSubmitEditing()}
      />
      {props.typePassword === undefined ||
      props.typePassword === false ? null : (
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.eyeIcon}
          onPress={() =>
            props.onPressEye === undefined ? null : props.onPressEye()
          }
        >
          <Image source={Images.Eye_icon} />
        </TouchableOpacity>
      )}
    </View>
  );
});
export default CustomInputText;

const Styles = StyleSheet.create({
  textView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  inputTxt: {
    height: vh(48),
    width: "100%",
    backgroundColor: Colors.veryLightGrey,
    borderColor: Colors.borderGrey,
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    marginVertical: vh(10),
    borderWidth: vh(1),
  },
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
  },
  eyeIcon: {
    position: "absolute",
    bottom: vh(27),
    right: vw(27),
  },
});
