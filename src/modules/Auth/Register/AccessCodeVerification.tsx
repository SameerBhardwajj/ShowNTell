import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { CustomHeader, CustomCodeBox, CustomButton } from "../../../Components";
import { Strings, vw, vh, Colors, ScreenName } from "../../../utils";
import { verifyCode } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const inputRef4: any = React.createRef();
  const [input1, setinput1] = useState("");
  const [input2, setinput2] = useState("");
  const [input3, setinput3] = useState("");
  const [input4, setinput4] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const KEY_BACKSPACE = "Backspace";

  const { email, name, id } = useSelector((state: { Register: any }) => ({
    email: state.Register.email,
    name: state.Register.name,
    id: state.Register.id,
  }));

  const verifyMyCode = () => {
    let enteredCode =
      input1.toString() +
      input2.toString() +
      input3.toString() +
      input4.toString();

    setIsLoading(true);
    dispatch(
      verifyCode(
        enteredCode,
        id,
        () => {
          setIsLoading(false);
          props.navigation.navigate(ScreenName.CREATE_PASSWORD);
        },
        () => setIsLoading(false)
      )
    );
  };

  let EmptyBox =
    input1.length === 0 ||
    input2.length === 0 ||
    input3.length === 0 ||
    input4.length === 0;

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Access_Code_Verification}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.welcome}>{Strings.Welcome}</Text>
        {name === "" ? null : <Text style={Styles.name}>{name}</Text>}
        <Text style={Styles.please}>
          {Strings.please_enter_code}
          {email}
        </Text>
        {isLoading ? (
          <ActivityIndicator
            color={Colors.violet}
            animating={isLoading}
            size="large"
            style={Styles.indicator}
          />
        ) : null}
        {/* Access code box ------------------ */}
        <View style={Styles.codeView}>
          <CustomCodeBox
            ref={inputRef1}
            value={input1}
            onChangeText={(text: string) => {
              setinput1(text),
                text.length !== 0 ? inputRef2.current.focus() : null;
            }}
            onKeyPress={() => {}}
            autoFocus={true}
            onSubmitEditing={() => inputRef2.current.focus()}
          />
          <CustomCodeBox
            ref={inputRef2}
            value={input2}
            onChangeText={(text: string) => {
              setinput2(text),
                text.length !== 0 ? inputRef3.current.focus() : null;
            }}
            onKeyPress={(e: any) => {
              e.nativeEvent.key === KEY_BACKSPACE
                ? input2.length === 0
                  ? (inputRef1.current.focus(), setinput1(""))
                  : setinput2("")
                : null;
            }}
            onSubmitEditing={() => inputRef3.current.focus()}
          />
          <CustomCodeBox
            ref={inputRef3}
            value={input3}
            onChangeText={(text: string) => {
              setinput3(text),
                text.length !== 0 ? inputRef4.current.focus() : null;
            }}
            onKeyPress={(e: any) => {
              e.nativeEvent.key === KEY_BACKSPACE
                ? input3.length === 0
                  ? (inputRef2.current.focus(), setinput2(""))
                  : setinput3("")
                : null;
            }}
            onSubmitEditing={() => inputRef4.current.focus()}
          />
          <CustomCodeBox
            ref={inputRef4}
            value={input4}
            onChangeText={(text: string) => {
              setinput4(text);
            }}
            onKeyPress={(e: any) => {
              e.nativeEvent.key === KEY_BACKSPACE
                ? input4.length === 0
                  ? (inputRef3.current.focus(), setinput3(""))
                  : setinput4("")
                : null;
            }}
            onSubmitEditing={() => {
              Keyboard.dismiss(), verifyMyCode();
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          {/* Verify Button ----------------- */}
          <CustomButton
            activeOpacity={EmptyBox ? 1 : 0.8}
            Text={Strings.verify}
            onPress={() =>
              EmptyBox ? null : (Keyboard.dismiss(), verifyMyCode())
            }
            ButtonStyle={{
              width: "98%",
              backgroundColor: EmptyBox ? Colors.disableViolet : Colors.violet,
            }}
          />
          <View style={Styles.footer}>
            <Text style={Styles.didntReceive}>
              {Strings.didnt_receive_code}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ paddingHorizontal: vw(7) }}
              onPress={() =>
                props.navigation.navigate(ScreenName.REQUEST_NEW_CODE, {
                  email: email,
                  path: ScreenName.ACCESS_CODE_VERIFICATION,
                })
              }
            >
              <Text style={Styles.requestNew}>{Strings.Request_New}</Text>
            </TouchableOpacity>
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: vh(32),
  },
  footer: {
    flexDirection: "row",
    marginTop: vw(30),
  },
  didntReceive: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
  },
  requestNew: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    color: Colors.violet,
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
