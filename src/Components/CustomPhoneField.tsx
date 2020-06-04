import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
// import CountryPicker from "react-native-country-picker-modal";
import { Strings, Colors, vw, vh } from "../utils";

export interface AppProps {
  onSelect: Function;
  value: string;
  onChangeText: Function;
  check: boolean;
  onSubmitEditing: Function;
  mainViewStyle?: any;
  title?: string;
}

const CustomPhoneField = React.forwardRef((props: AppProps, ref: any) => {
  // const [countryCode, setCountryCode] = useState("US");
  // const [country, setCountry] = useState(null);
  // const withFilter = true;
  // const withCallingCode = true;
  // const withCallingCodeButton = true;
  // const withFlagButton = false;
  // const onSelect = (country: any) => {
  //   setCountryCode(country.cca2);
  //   props.onSelect(country.cca2);
  //   setCountry(country);
  // };
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
          <Text style={Styles.incorrectText}>{Strings.Phone_error}</Text>
        )}
      </View>
      <View
        style={[
          Styles.inputTxtView,
          { borderColor: props.check ? Colors.borderGrey : Colors.pink },
        ]}
      >
        {/* <CountryPicker
          {...{
            countryCode,
            withFilter,
            withCallingCode,
            withCallingCodeButton,
            withFlagButton,
            onSelect,
          }}
          visible={false}
        /> */}
        <Text style={Styles.codeText}>+1</Text>
        <TextInput
          ref={ref}
          style={[
            Styles.inputTxt,
            { borderColor: props.check ? Colors.borderGrey : Colors.pink },
          ]}
          maxLength={15}
          keyboardType={"number-pad"}
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
  },
  incorrectText: {
    fontFamily: "Nunito-Medium",
    fontSize: vh(12),
    color: Colors.pink,
  },
  eyeIcon: {
    paddingHorizontal: vw(5),
  },
  imgEye: {
    height: vh(17),
    width: vh(25),
  },
});
