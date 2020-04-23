import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import {
  CustomHeader,
  CustomButton,
  CustomMenuList,
  CustomInputText,
} from "../../Components";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const input3: any = React.createRef();
  const [school, setSchool] = useState("Select School");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [help, setHelp] = useState("");
  const [cLength, setCLength] = useState(0);
  const [checkEmail, setCheckEmail] = useState(true);
  const [checkName, setCheckName] = useState(true);

  const disable = () => {
    return (
      school !== "Select School" && email.length !== 0 && name.length !== 0
    );
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Need_Help}
        onPressBack={() => props.navigation.pop()}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={"handled"}
        bounces={false}
        horizontal={false}
        showsVerticalScrollIndicator={false}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={Styles.innerView}
        >
          <View style={Styles.deviceMainView}>
            <View
              style={[
                Styles.deviceView,
                { backgroundColor: Colors.lightGreen },
              ]}
            >
              <Image source={Images.Phone_Icon} />
              <Text style={[Styles.text, { color: Colors.green }]}>
                {"Device\nIphone 7+"}
              </Text>
            </View>
            <View
              style={[Styles.deviceView, { backgroundColor: Colors.lightPink }]}
            >
              <Image
                source={Images.Phone_Icon}
                style={{ tintColor: Colors.pink }}
              />
              <Text style={[Styles.text, { color: Colors.pink }]}>
                {"IOS\nV 13.3.1"}
              </Text>
            </View>
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
                {"Application\nV 2.0.8"}
              </Text>
            </View>
          </View>
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
              validate("name", name)
                ? input2.current.focus()
                : setCheckName(false);
            }}
            titleText={Strings.Parent_Name}
            check={checkName}
            incorrectText={Strings.Parent_Name}
          />
          <CustomInputText
            ref={input2}
            mainViewStyle={Styles.menuView}
            value={email}
            onChangeText={(text: string) => {
              checkEmail ? null : setCheckEmail(true), setEmail(text);
            }}
            onSubmitEditing={() => {
              validate("email", email)
                ? input3.current.focus()
                : setCheckEmail(false);
            }}
            titleText={Strings.Parent_email}
            check={checkEmail}
            incorrectText={Strings.Parent_email}
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
                onSubmitEditing={() =>
                  disable()
                    ? props.navigation.navigate("ResendCodeModal", {
                        path: props.route.params.path,
                        msg: Strings.ticket_submitted,
                      })
                    : null
                }
              />
              <Text style={Styles.character}>{cLength}/500 Characters</Text>
            </View>
          </View>
          <CustomButton
            Text={Strings.Submit}
            onPress={() =>
              disable()
                ? props.navigation.navigate("ResendCodeModal", {
                    path: props.route.params.path,
                    msg: Strings.ticket_submitted,
                  })
                : null
            }
            activeOpacity={disable() ? 0.8 : 1}
            ButtonStyle={{
              width: "100%",
              marginTop: vh(30),
              backgroundColor: disable() ? Colors.violet : Colors.disableViolet,
            }}
          />
        </ScrollView>
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
  deviceMainView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    width: "100%",
  },
  deviceView: {
    alignItems: "center",
    justifyContent: "center",
    padding: vh(10),
    width: "30%",
    borderRadius: vh(8),
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
  {
    value: "Banana",
  },
  {
    value: "Mango",
  },
  {
    value: "Pear",
  },
];
