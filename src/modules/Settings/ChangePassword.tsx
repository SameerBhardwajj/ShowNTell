import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import { useDispatch } from "react-redux";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

// custom imports
import {
  CustomHeader,
  CustomInputText,
  CustomButton,
  CustomLoader,
  CustomToast,
} from "../../Components";
import {
  Strings,
  vw,
  vh,
  Colors,
  validate,
  ConstantName,
  ScreenName,
} from "../../utils";
import { hitChangePasswordAPI } from "./action";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password3, setPassword3] = useState("");
  const [checkPassword1, setCheckPassword1] = useState(true);
  const [checkPassword2, setCheckPassword2] = useState(true);
  const [checkPassword3, setCheckPassword3] = useState(true);
  const [secureEntry1, setsecureEntry1] = useState(true);
  const [secureEntry2, setsecureEntry2] = useState(true);
  const [secureEntry3, setsecureEntry3] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordGreen, setPasswordGreen] = useState(false);

  const check = () => {
    Keyboard.dismiss();
    validate(ConstantName.PASSWORD, password3)
      ? validate(ConstantName.PASSWORD, password1)
        ? password1 === password2
          ? (setIsLoading(true),
            dispatch(
              hitChangePasswordAPI(
                {
                  old_password: password3,
                  new_password: password1,
                  confirm_password: password2,
                },
                () => {
                  setIsLoading(false);
                  props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
                    msg: Strings.Password_Updated,
                  });
                },
                () => setIsLoading(false)
              )
            ))
          : setCheckPassword2(false)
        : (setCheckPassword1(false), CustomToast(Strings.Password_Error))
      : (setCheckPassword3(false), CustomToast(Strings.Password_Error));
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Change_Password}
        onPressBack={() => props.navigation.pop()}
      />
      <CustomLoader loading={isLoading} />
      <KeyboardAwareScrollView
        style={Styles.codeView}
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <CustomInputText
          ref={inputRef3}
          maxLength={15}
          titleText={Strings.Old_Password}
          mainViewStyle={{ marginBottom: vh(24) }}
          secureTextEntry={secureEntry3}
          value={password3}
          typePassword={true}
          onChangeText={(text: string) => {
            checkPassword3 ? null : setCheckPassword3(true);
            setPassword3(text);
          }}
          check={checkPassword3}
          onPressEye={() => setsecureEntry3(!secureEntry3)}
          incorrectText={
            password3.length < 8
              ? Strings.Password_length
              : Strings.Password_Incorrect
          }
          returnKeyType="done"
          onSubmitEditing={() => {
            password3.length < 8
              ? setCheckPassword3(false)
              : validate(ConstantName.PASSWORD, password3)
              ? inputRef1.current.focus()
              : (Keyboard.dismiss(),
                CustomToast(Strings.Password_Error),
                setCheckPassword3(false));
          }}
        />
        <CustomInputText
          ref={inputRef1}
          maxLength={15}
          titleText={Strings.New_Password}
          mainViewStyle={{ marginBottom: vh(24) }}
          value={password1}
          typePassword={true}
          onChangeText={(text: string) => {
            checkPassword1 ? null : setCheckPassword1(true);
            setPassword1(text);
            validate(ConstantName.PASSWORD, text)
              ? setPasswordGreen(true)
              : setPasswordGreen(false);
          }}
          check={checkPassword1}
          secureTextEntry={secureEntry1}
          onPressEye={() => setsecureEntry1(!secureEntry1)}
          incorrectText={
            password1.length < 8
              ? Strings.Password_length
              : Strings.Password_Incorrect
          }
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
          maxLength={15}
          titleText={Strings.Confirm_Password}
          mainViewStyle={{ marginBottom: vh(24) }}
          secureTextEntry={secureEntry2}
          value={password2}
          typePassword={true}
          onChangeText={(text: string) => {
            checkPassword2 ? null : setCheckPassword2(true), setPassword2(text);
          }}
          check={checkPassword2}
          onPressEye={() => setsecureEntry2(!secureEntry2)}
          incorrectText={
            password2.length < 8
              ? Strings.Password_length
              : Strings.Password_mismatch
          }
          returnKeyType="done"
          onSubmitEditing={() =>
            password2.length < 8
              ? setCheckPassword2(false)
              : validate(ConstantName.PASSWORD, password2)
              ? check()
              : (Keyboard.dismiss(),
                CustomToast(Strings.Password_Error),
                setCheckPassword2(false))
          }
        />
        <View style={{ alignItems: "center" }}>
          <CustomButton
            Text={Strings.Continue}
            onPress={() => check()}
            ButtonStyle={{ width: "100%" }}
          />
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
    marginHorizontal: vw(16),
    paddingVertical: vh(24),
  },
});
