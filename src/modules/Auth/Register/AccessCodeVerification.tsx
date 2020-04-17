import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// custom imports
import {
  CustomHeader,
  CustomCodeBox,
  CustomToast,
  CustomButton,
} from "../../../Components";
import { Strings, vw, vh, Colors } from "../../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const inputRef4: any = React.createRef();
  const [input1, setinput1] = useState();
  const [input2, setinput2] = useState();
  const [input3, setinput3] = useState();
  const [input4, setinput4] = useState();

  const verifyCode = () => {
    const code = "1234";

    if (
      input1 === null ||
      input2 === null ||
      input3 === null ||
      input4 === null
    ) {
      CustomToast(Strings.Please_Fill_All_Boxes);
    } else {
      let enteredCode =
        input1.toString() +
        input2.toString() +
        input3.toString() +
        input4.toString();

      if (code === enteredCode) {
        props.navigation.navigate("CreatePassword");
      } else {
        CustomToast(Strings.wrong_code);
      }
    }
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Access_Code_Verification}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.welcome}>{Strings.Welcome}</Text>
        <Text style={Styles.name}>Mr. Bob Parish</Text>
        <Text style={Styles.please}>{Strings.please_enter_code}</Text>
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
              e.nativeEvent.key === "Backspace"
                ? input2 === null
                  ? (inputRef1.current.focus(), setinput1(null))
                  : setinput2(null)
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
              e.nativeEvent.key === "Backspace"
                ? input3 === null
                  ? (inputRef2.current.focus(), setinput2(null))
                  : setinput3(null)
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
            returnKeyType="done"
            onKeyPress={(e: any) => {
              e.nativeEvent.key === "Backspace"
                ? input4.length === 0
                  ? (inputRef3.current.focus(), setinput3(null))
                  : setinput4(null)
                : null;
            }}
            onSubmitEditing={() => verifyCode()}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <CustomButton
            Text={Strings.verify}
            onPress={() => verifyCode()}
            ButtonStyle={{ width: "98%" }}
          />
          <View style={Styles.footer}>
            <Text style={Styles.didntReceive}>
              {Strings.didnt_receive_code}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ paddingHorizontal: vw(7) }}
              onPress={() => props.navigation.navigate("RequestNewCode")}
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
});
