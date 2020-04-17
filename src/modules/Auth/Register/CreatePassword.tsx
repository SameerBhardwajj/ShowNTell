import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
} from "../../../Components";
import { Strings, vw, vh, Colors, validatePasssword } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkPassword1, setCheckPassword1] = useState(true);
  const [checkPassword2, setCheckPassword2] = useState(true);
  const [secureEntry, setsecureEntry] = useState(true);

  return (
    <View style={Styles.mainView}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomHeader
          title={Strings.Create_Password}
          onPressBack={() => props.navigation.pop()}
        />
        <View style={Styles.innerView}>
          <Text style={Styles.welcome}>{Strings.hello}</Text>
          <Text style={Styles.name}>Mr. Bob Parish</Text>
          <Text style={Styles.please}>{Strings.create_password_content}</Text>
          <View style={Styles.codeView}>
            <CustomInputText
              ref={inputRef1}
              titleText={Strings.Create_Password}
              value={password1}
              typePassword={true}
              onChangeText={(text: string) => {
                checkPassword1 ? null : setCheckPassword1(true),
                  setPassword1(text);
              }}
              check={checkPassword1}
              secureTextEntry={secureEntry}
              onPressEye={() => setsecureEntry(!secureEntry)}
              incorrectText={Strings.password}
              returnKeyType={"next"}
              onSubmitEditing={() =>
                validatePasssword(password1)
                  ? inputRef2.current.focus()
                  : setCheckPassword1(false)
              }
            />
            <CustomInputText
              ref={inputRef2}
              titleText={Strings.Confirm_Password}
              mainViewStyle={{ marginVertical: vh(24) }}
              value={password2}
              secureTextEntry={true}
              onChangeText={(text: string) => {
                checkPassword2 ? null : setCheckPassword2(true),
                  setPassword2(text);
              }}
              check={checkPassword2}
              incorrectText={Strings.password}
              returnKeyType={"done"}
              onSubmitEditing={() => {
                validatePasssword(password2)
                  ? validatePasssword(password1)
                    ? password1 === password2
                      ? (Keyboard.dismiss(),
                        props.navigation.navigate("CreatePasswordModal"))
                      : setCheckPassword2(false)
                    : setCheckPassword2(false)
                  : setCheckPassword1(false);
              }}
            />
            <View style={{ alignItems: "center" }}>
              <CustomButton
                Text={Strings.Continue}
                onPress={() => {
                  validatePasssword(password2)
                    ? validatePasssword(password1)
                      ? password1 === password2
                        ? (Keyboard.dismiss(),
                          props.navigation.navigate("CreatePasswordModal"))
                        : setCheckPassword2(false)
                      : setCheckPassword2(false)
                    : setCheckPassword1(false);
                }}
                ButtonStyle={{ width: "100%" }}
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    marginHorizontal: vw(16),
    marginVertical: vh(20),
  },
  welcome: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
  },
  name: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(20),
    marginVertical: vh(8),
  },
  please: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(16),
    color: Colors.lightGrey,
    marginVertical: vh(8),
  },
  codeView: {
    marginVertical: vh(32),
  },
});
