import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
} from "../../../Components";
import { Strings, vw, vh, Colors, validateEmail } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [access, setAccess] = useState(false);

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Reset_Password}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.welcome}>{Strings.hello}</Text>
        <Text style={Styles.name}>Mr. Bob Parish</Text>
        <Text style={Styles.please}>{Strings.enter_email_passowrd_link}</Text>
        <View style={Styles.codeView}>
          {/* email -------------- */}
          <CustomInputText
            titleText={Strings.Parent_email}
            value={email}
            onChangeText={(text: string) => {
              validateEmail(email) ? setAccess(true) : setAccess(false),
                setEmail(text);
            }}
            check={checkEmail}
            incorrectText={Strings.Email}
            autoFocus={true}
            onSubmitEditing={() => {
              access
                ? (setEmail(""),
                  setAccess(false),
                  props.navigation.navigate("PasswordResetCode", {
                    email: email,
                  }))
                : null;
            }}
          />
          <View style={{ alignItems: "center", width: "100%" }}>
            <CustomButton
              Text={Strings.Continue}
              activeOpacity={access ? 0.8 : 1}
              onPress={() => {
                access
                  ? (setEmail(""),
                    setAccess(false),
                    props.navigation.navigate("PasswordResetCode", {
                      email: email,
                    }))
                  : null;
              }}
              ButtonStyle={{
                width: "100%",
                backgroundColor:
                  access === true ? Colors.violet : Colors.disableViolet,
              }}
            />
          </View>
        </View>
      </View>
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
    alignItems: "center",
    marginVertical: vh(32),
  },
});
