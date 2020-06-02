import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
} from "../../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  validate,
  ConstantName,
  ScreenName,
} from "../../../utils";
import { forgotPassword } from "./action";
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState(true);
  const [access, setAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const check = () => {
    access
      ? (Keyboard.dismiss(),
        setIsLoading(true),
        dispatch(
          forgotPassword(
            email,
            () => {
              setIsLoading(false);
              props.navigation.navigate(ScreenName.PASSWORD_RESET_CODE);
            },
            () => {
              setIsLoading(false);
            }
          )
        ))
      : null;
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Reset_Password}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
        <Text style={Styles.welcome}>{Strings.hello}</Text>
        {/* <Text style={Styles.name}>Mr. Bob Parish</Text> */}
        <Text style={Styles.please}>{Strings.enter_email_passowrd_link}</Text>
        <View style={Styles.codeView}>
          {/* email -------------- */}
          <CustomInputText
            titleText={Strings.Parent_email}
            value={email}
            onChangeText={(text: string) => {
              validate(ConstantName.EMAIL, text)
                ? setAccess(true)
                : setAccess(false),
                setEmail(text);
            }}
            check={checkEmail}
            incorrectText={Strings.Email_error}
            autoFocus={true}
            onSubmitEditing={() => check()}
          />
          <View style={{ alignItems: "center", width: "100%" }}>
            <CustomButton
              Text={Strings.Continue}
              activeOpacity={access ? 0.8 : 1}
              onPress={() => check()}
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
  indicator: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});
