import React from "react";
import { View, Text, StyleSheet, TextInput, Platform } from "react-native";
import { Strings, Colors, vw, vh } from "../utils";

export interface AppProps {
  value: string;
  onChangeText: Function;
  check: boolean;
  onSubmitEditing: Function;
  mainViewStyle?: any;
  title?: string;
  incorrectMsg?: string;
}

const CustomPhoneField = React.forwardRef((props: AppProps, ref: any) => {
  return (
    <View style={props.mainViewStyle}>
      <View style={Styles.textView}>
        <Text
          style={[
            Styles.titleTxt,
            { color: props.check ? Colors.titleColor : Colors.pink },
          ]}
        >
          {props.title === undefined ? Strings.parentPhone : props.title}
        </Text>
        {props.check ? null : (
          <Text style={Styles.incorrectText}>
            {props.incorrectMsg === undefined
              ? Strings.Phone_error
              : props.incorrectMsg}
          </Text>
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
            { borderColor: props.check ? Colors.borderGrey : Colors.pink },
          ]}
          maxLength={15}
          keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
          value={props.value}
          onChangeText={(val: string) => props.onChangeText(val)}
          blurOnSubmit={false}
          returnKeyType={"next"}
          onSubmitEditing={() => props.onSubmitEditing()}
        />
      </View>
    </View>
  );
});
export default CustomPhoneField;

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
  inputTxtView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: Colors.veryLightGrey,
    height: vh(48),
    marginVertical: vh(10),
    borderRadius: vh(50),
    borderWidth: vh(1),
    borderColor: Colors.borderGrey,
    paddingHorizontal: vw(20),
  },
  codeText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
  },
  inputTxt: {
    height: vh(48),
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
    width: "93%",
    paddingLeft: vw(5),
    alignItems: "center",
  },
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
  },
});
