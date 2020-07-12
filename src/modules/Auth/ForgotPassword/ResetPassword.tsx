import React, { useState } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
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
import { resetPassword } from "./action";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [checkPassword1, setCheckPassword1] = useState(true);
  const [checkPassword2, setCheckPassword2] = useState(true);
  const [secureEntry1, setsecureEntry1] = useState(true);
  const [secureEntry2, setsecureEntry2] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useSelector((state: { ForgotPassword: any }) => ({
    id: state.ForgotPassword.id,
  }));

  const check = () => {
    validate(ConstantName.PASSWORD, password1)
      ? validate(ConstantName.PASSWORD, password2)
        ? password1 === password2
          ? (Keyboard.dismiss(),
            setIsLoading(true),
            dispatch(
              resetPassword(
                id,
                password1,
                password2,
                props.route.params.token,
                () => {
                  setIsLoading(false);
                  props.navigation.navigate(ScreenName.CREATE_PASSWORD_MODAL);
                },
                () => setIsLoading(false)
              )
            ))
          : setCheckPassword2(false)
        : setCheckPassword2(false)
      : setCheckPassword1(false);
  };

  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Create_Password}
        onPressBack={() => props.navigation.pop(3)}
      />
      <CustomLoader loading={isLoading} />
      <View style={Styles.codeView}>
        <CustomInputText
          ref={inputRef1}
          titleText={Strings.Enter_New_Password}
          value={password1}
          typePassword={true}
          onChangeText={(text: string) => {
            checkPassword1 ? null : setCheckPassword1(true), setPassword1(text);
          }}
          check={checkPassword1}
          secureTextEntry={secureEntry1}
          onPressEye={() => setsecureEntry1(!secureEntry1)}
          incorrectText={""}
          returnKeyType="next"
          onSubmitEditing={() =>
            validate(ConstantName.PASSWORD, password1)
              ? inputRef2.current.focus()
              : (CustomToast(Strings.Password_length), setCheckPassword1(false))
          }
        />
        <CustomInputText
          ref={inputRef2}
          titleText={Strings.Confirm_New_Password}
          mainViewStyle={{ marginVertical: vh(24) }}
          secureTextEntry={secureEntry2}
          value={password2}
          typePassword={true}
          onChangeText={(text: string) => {
            checkPassword2 ? null : setCheckPassword2(true), setPassword2(text);
          }}
          check={checkPassword2}
          onPressEye={() => setsecureEntry2(!secureEntry2)}
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
    marginVertical: vh(24),
  },
});
