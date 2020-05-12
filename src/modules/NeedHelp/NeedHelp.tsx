import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getDeviceName } from "react-native-device-info";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
  CustomInputText,
} from "../../Components";
import {
  Strings,
  vw,
  vh,
  Images,
  Colors,
  validate,
  ScreenName,
  ConstantName,
} from "../../utils";

const SELECT_SCHOOL = "Select School";
const APPLICATION = "Application\nV 1.0.0";
export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const [school, setSchool] = useState(SELECT_SCHOOL);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [cLength, setCLength] = useState(0);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkName, setCheckName] = useState(true);
  const [device, setDevice] = useState("");

  const disable = () => {
    return school !== SELECT_SCHOOL && email.length !== 0 && name.length !== 0;
  };

  React.useEffect(() => {
    getDeviceName()
      .then((deviceName) => {
        setDevice(deviceName);
      })
      .catch((err) => console.log(err));
  }, []);

  const check = () => {
    validate(ConstantName.NAME, name)
      ? validate(ConstantName.EMAIL, email)
        ? props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            path: props.route.params.path,
            msg: Strings.ticket_submitted,
          })
        : setCheckEmail(false)
      : setCheckName(false);
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      <View style={Styles.mainView}>
        <CustomHeader
          title={Strings.Need_Help}
          onPressBack={() =>
            props.route.params.path === ScreenName.TAB_NAVIGATOR
              ? props.navigation.navigate(ScreenName.TAB_NAVIGATOR)
              : props.navigation.pop()
          }
        />
        <View style={Styles.innerView}>
          <View style={Styles.deviceMainView}>
            {/* Device -------------------- */}
            <View
              style={[
                Styles.deviceView,
                { backgroundColor: Colors.lightGreen },
              ]}
            >
              <Image source={Images.Phone_Icon} />
              <Text style={[Styles.text, { color: Colors.green }]}>
                {Strings.Device}
                {"\n"}
                {device}
              </Text>
            </View>
            {/* Version -------------------- */}
            <View
              style={[Styles.deviceView, { backgroundColor: Colors.lightPink }]}
            >
              <Image
                source={Images.Phone_Icon}
                style={{ tintColor: Colors.pink }}
              />
              <Text style={[Styles.text, { color: Colors.pink }]}>
                {Platform.OS.toUpperCase()}
                {"\nV "}
                {Platform.Version.toString()}
              </Text>
            </View>
            {/* Application -------------------- */}
            <View
              style={[
                Styles.deviceView,
                { backgroundColor: Colors.lightWaterBlue },
              ]}
            >
              <Image
                source={Images.Phone_Icon}
                style={{ tintColor: Colors.waterBlue }}
              />
              <Text style={[Styles.text, { color: Colors.waterBlue }]}>
                {APPLICATION}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%" }}>
            <CustomMenuList
              titleText={Strings.School_Name}
              onChangeText={(text: string) => setSchool(text)}
              currentText={school}
              viewStyle={Styles.menuView}
              data={DATA}
            />
            <CustomInputText
              ref={input1}
              value={name}
              onChangeText={(text: string) => {
                checkName ? null : setCheckName(true), setName(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.NAME, name)
                  ? input2.current.focus()
                  : setCheckName(false);
              }}
              titleText={Strings.Parent_Name}
              check={checkName}
              incorrectText={Strings.Name_error}
            />
            <CustomInputText
              ref={input2}
              mainViewStyle={Styles.menuView}
              value={email}
              onChangeText={(text: string) => {
                checkEmail ? null : setCheckEmail(true), setEmail(text);
              }}
              onSubmitEditing={() => {
                validate(ConstantName.EMAIL, email)
                  ? input3.current.focus()
                  : setCheckEmail(false);
              }}
              titleText={Strings.Parent_email}
              check={checkEmail}
              incorrectText={Strings.Email_error}
            />
            <View style={Styles.helpView}>
              <Text style={Styles.titleTxt}>{Strings.How_can_we_help_you}</Text>
              <View style={Styles.innerHelpView}>
                <TextInput
                  ref={input3}
                  maxLength={500}
                  value={help}
                  onChangeText={(text: string) => {
                    cLength <= 500 ? setHelp(text) : null,
                      setCLength(text.length);
                  }}
                  style={Styles.textInputView}
                  multiline={true}
                  onSubmitEditing={() => (disable() ? check() : null)}
                />
                <Text style={Styles.character}>{cLength}/500 Characters</Text>
              </View>
            </View>
            <CustomButton
              Text={Strings.Submit}
              onPress={() => (disable() ? check() : null)}
              activeOpacity={disable() ? 0.8 : 1}
              ButtonStyle={{
                width: "100%",
                marginTop: vh(30),
                backgroundColor: disable()
                  ? Colors.violet
                  : Colors.disableViolet,
              }}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
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
  deviceMainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  deviceView: {
    alignItems: "center",
    justifyContent: "center",
    padding: vh(10),
    width: "30%",
    borderRadius: vh(8),
    height: vh(106),
  },
  text: {
    paddingTop: vh(14),
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    textAlign: "center",
  },
  menuView: {
    marginVertical: vh(28),
  },
  helpView: {
    alignItems: "center",
    width: "100%",
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.titleColor,
  },
  innerHelpView: {
    width: vw(380),
    alignItems: "center",
    backgroundColor: Colors.veryLightGrey,
    borderRadius: vh(8),
    padding: vh(10),
    marginVertical: vh(10),
  },
  textInputView: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.veryLightGrey,
    width: "100%",
    borderTopLeftRadius: vh(8),
    borderTopRightRadius: vh(8),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingHorizontal: vw(6),
    paddingVertical: vh(4),
  },
  character: {
    color: Colors.characterGrey,
    fontSize: vh(14),
    fontFamily: "Nunito-Regular",
    alignSelf: "flex-end",
  },
});

const DATA = [
  { value: "School 1" },
  { value: "School 2" },
  { value: "School 3" },
];
