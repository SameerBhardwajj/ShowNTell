import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
  CustomLoader,
  CustomToast,
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
import { createPassword } from "./action";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkPassword1, setCheckPassword1] = useState(true);
  const [checkPassword2, setCheckPassword2] = useState(true);
  const [secureEntry, setsecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordGreen, setPasswordGreen] = useState(false);

  const { id, name, token } = useSelector((state: { Register: any }) => ({
    id: state.Register.id,
    name: state.Register.name,
    token: state.Register.token,
  }));

  const check = () => {
    Keyboard.dismiss();
    password1.length >= 8
      ? validate(ConstantName.PASSWORD, password1)
        ? password1 === password2
          ? (setIsLoading(true),
            dispatch(
              createPassword(
                id,
                password1,
                password2,
                token,
                () => {
                  setIsLoading(false);
                  props.navigation.navigate(ScreenName.CREATE_PASSWORD_MODAL);
                },
                () => setIsLoading(false)
              )
            ))
          : setCheckPassword2(false)
        : (Keyboard.dismiss(),
          CustomToast(Strings.Password_Error),
          setCheckPassword1(false))
      : setCheckPassword1(false);
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Create_Password}
        onPressBack={() => props.navigation.pop(3)}
      />
      <CustomLoader loading={isLoading} />
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={Styles.innerView}>
          <Text style={Styles.welcome}>{Strings.hello}</Text>
          <Text style={Styles.name}>{name}</Text>
          <Text style={Styles.please}>{Strings.create_password_content}</Text>
          <View style={Styles.conditionView}>
            <Text style={Styles.conditionTxt}>
              {Strings.Password_Conditions}
            </Text>
          </View>
          <CustomInputText
            ref={inputRef1}
            titleText={Strings.Create_Password}
            value={password1}
            maxLength={15}
            typePassword={true}
            onChangeText={(text: string) => {
              checkPassword1 ? null : setCheckPassword1(true);
              setPassword1(text);
              validate(ConstantName.PASSWORD, text)
                ? setPasswordGreen(true)
                : setPasswordGreen(false);
            }}
            check={checkPassword1}
            secureTextEntry={secureEntry}
            onPressEye={() => setsecureEntry(!secureEntry)}
            incorrectText={password1.length < 8 ? Strings.Password_length : ""}
            returnKeyType="next"
            onSubmitEditing={() => {
              password1.length < 8
                ? setCheckPassword1(false)
                : validate(ConstantName.PASSWORD, password1)
                ? inputRef2.current.focus()
                : (Keyboard.dismiss(),
                  CustomToast(Strings.Password_Error),
                  setCheckPassword1(false));
            }}
            passwordGreen={passwordGreen}
          />
          <CustomInputText
            ref={inputRef2}
            titleText={Strings.Confirm_Password}
            mainViewStyle={{ marginVertical: vh(16) }}
            value={password2}
            maxLength={15}
            secureTextEntry={true}
            onChangeText={(text: string) => {
              checkPassword2 ? null : setCheckPassword2(true),
                setPassword2(text);
            }}
            check={checkPassword2}
            incorrectText={Strings.Password_mismatch}
            returnKeyType="done"
            onSubmitEditing={() => check()}
          />
          <View style={{ alignItems: "center" }}>
            <CustomButton
              Text={Strings.Continue}
              onPress={() => check()}
              ButtonStyle={{ width: "100%" }}
            />
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
  conditionView: {
    padding: vh(10),
    backgroundColor: Colors.lightPink,
    borderRadius: vh(10),
    marginBottom: vh(16),
  },
  conditionTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    lineHeight: vh(26),
    color: Colors.lightGrey,
  },
});
