import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DatePicker from "react-native-date-picker";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomInputText,
  CustomToast,
} from "../../../Components";
import { Strings, vw, vh, Colors, validate } from "../../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const input4: any = React.createRef();
  const input5: any = React.createRef();
  const input6: any = React.createRef();
  const [pname, setPname] = useState("");
  const [phone, setPhone] = useState("+");
  const [zipcode, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const [c1name, setC1name] = useState("");
  const [c1DOB, setc1DOB] = useState("");
  const [checkpname, setCheckPname] = useState(true);
  const [checkphone, setCheckphone] = useState(true);
  const [checkzipcode, setCheckzipcode] = useState(true);
  const [checkemail, setCheckemail] = useState(true);
  const [checkc1name, setCheckc1name] = useState(true);
  const [childArray, setChildArray] = useState([]);

  const disable = () => {
    return (
      pname.length !== 0 &&
      phone.length !== 1 &&
      zipcode.length !== 0 &&
      email.length !== 0 &&
      c1name.length !== 0
    );
  };

  const addTextInput = () => {
    return (
      <View>
        <CustomInputText
          ref={input5}
          titleText={Strings.First_Child_Name}
          value={c1name}
          onChangeText={(text: string) => {
            checkc1name ? null : setCheckc1name(true), setC1name(text);
          }}
          onSubmitEditing={() => {
            validate("name", c1name)
              ? Keyboard.dismiss()
              : setCheckc1name(false);
          }}
          check={checkc1name}
          incorrectText={Strings.Name}
          mainViewStyle={Styles.textInput}
        />
        <CustomInputText
          ref={input6}
          titleText={Strings.First_Child_DOB}
          value={c1DOB}
          onChangeText={(text: string) => setc1DOB(text)}
          onSubmitEditing={() => CustomToast()}
          check={true}
          incorrectText={Strings.DOB}
          mainViewStyle={Styles.textInput}
          editable={false}
        />
      </View>
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Schedule_a_Tour}
        onPressBack={() => props.navigation.pop()}
        notify={true}
        notifyNumber={3}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.innerView}>
          <CustomInputText
            ref={input1}
            titleText={Strings.Parent_Name}
            value={pname}
            onChangeText={(text: string) => {
              checkpname ? null : setCheckPname(true), setPname(text);
            }}
            onSubmitEditing={() => {
              validate("name", pname)
                ? input2.current.focus()
                : setCheckPname(false);
            }}
            check={checkpname}
            incorrectText={Strings.Parent_Name}
          />
          <CustomInputText
            ref={input2}
            titleText={Strings.parentPhone}
            value={phone}
            onChangeText={(text: string) => {
              checkphone ? null : setCheckphone(true), setPhone(text);
            }}
            onSubmitEditing={() => {
              validate("phone", phone)
                ? input3.current.focus()
                : setCheckphone(false);
            }}
            check={checkphone}
            incorrectText={Strings.parentPhone}
            keyboardType={"phone-pad"}
            mainViewStyle={Styles.textInput}
          />
          <CustomInputText
            ref={input3}
            titleText={Strings.Zip_Code}
            value={zipcode}
            onChangeText={(text: string) => {
              checkzipcode ? null : setCheckzipcode(true), setZipcode(text);
            }}
            onSubmitEditing={() => {
              validate("zipcode", zipcode)
                ? input4.current.focus()
                : setCheckzipcode(false);
            }}
            check={checkzipcode}
            incorrectText={Strings.Zip_Code}
            mainViewStyle={Styles.textInput}
            keyboardType={"phone-pad"}
          />
          <CustomInputText
            ref={input4}
            titleText={Strings.Parent_email}
            value={email}
            onChangeText={(text: string) => {
              checkemail ? null : setCheckemail(true), setEmail(text);
            }}
            onSubmitEditing={() => {
              validate("email", email)
                ? input5.current.focus()
                : setCheckemail(false);
            }}
            check={checkemail}
            incorrectText={Strings.Parent_email}
            mainViewStyle={Styles.textInput}
            keyboardType={"email-address"}
          />
          <CustomInputText
            ref={input5}
            titleText={Strings.First_Child_Name}
            value={c1name}
            onChangeText={(text: string) => {
              checkc1name ? null : setCheckc1name(true), setC1name(text);
            }}
            onSubmitEditing={() => {
              validate("name", c1name)
                ? Keyboard.dismiss()
                : setCheckc1name(false);
            }}
            check={checkc1name}
            incorrectText={Strings.Name}
            mainViewStyle={Styles.textInput}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              console.warn("ok");
            }}
            style={Styles.dobView}
          >
            <View style={Styles.dobView}>
              <Text style={Styles.titleTxt}>{Strings.First_Child_DOB}</Text>
              <View style={Styles.inputTxt}>
                <Text style={Styles.dobText}>{c1DOB}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <CustomButton
            Text={Strings.Add_Second_Child}
            onPress={() => CustomToast()}
            lightBtn={true}
            ButtonStyle={Styles.btn}
          />
          <CustomButton
            Text={Strings.Schedule_Tour}
            activeOpacity={disable() ? 0.8 : 1}
            onPress={() =>
              disable()
                ? props.navigation.navigate("ResendCodeModal", {
                    path: "SchoolListing",
                    msg: Strings.tour_success,
                  })
                : null
            }
            ButtonStyle={[
              Styles.btn,
              {
                backgroundColor: disable()
                  ? Colors.violet
                  : Colors.disableViolet,
              },
            ]}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  innerView: {
    alignItems: "center",
    paddingHorizontal: vw(16),
    paddingVertical: vh(20),
    width: "100%",
  },
  textInput: {
    marginTop: vh(10),
  },
  btn: {
    width: "100%",
    marginTop: vh(20),
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
  },
  inputTxt: {
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    marginBottom: vh(15),
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.veryLightGrey,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dobText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
  },
  dobView: {
    alignItems: "center",
    width: "100%",
    marginTop: vh(5),
  },
});
