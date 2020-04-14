import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

// custom imports
import { Images, vh, vw, Colors, Strings } from "../../../utils";
import {
  CustomButton,
  CustomToast,
  Customcartoon,
  CustomInputText,
} from "../../../Components";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const input1: any = React.createRef();
  const input2: any = React.createRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkEmail, setCheckcheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);
  return (
    <ImageBackground source={Images.Background} style={Styles.mainImg}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.backBtn}
        onPress={() => props.navigation.pop()}
      >
        <Image source={Images.back_icon} />
      </TouchableOpacity>
      <View style={Styles.cartoonMainView}>
        <Customcartoon />
      </View>
      <View style={Styles.loginView}>
        <View style={Styles.loginMainView}>
          <Text style={Styles.loginText}>{Strings.login}</Text>
          <Text style={Styles.loginFooter}>
            {Strings.please_enter_email_and_password}
          </Text>
          <View style={Styles.inputView}>
            <CustomInputText
              check={checkEmail}
              ref={input1}
              titleText={Strings.Parent_email}
              keyboardType={"email-address"}
              value={email}
              onChangeText={(text: string) => setEmail(text)}
              onSubmitEditing={() => input2.current.focus()}
              incorrectText={Strings.Email}
            />
            <CustomInputText
              check={checkPassword}
              ref={input2}
              titleText={Strings.password}
              keyboardType={"default"}
              value={password}
              onChangeText={(text: string) => setPassword(text)}
              onSubmitEditing={() => {
                console.warn("ok");
              }}
              incorrectText={Strings.password}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.forgotView}
            onPress={() => CustomToast()}
          >
            <Text style={Styles.forgotTxt}>{Strings.forgot_password}</Text>
          </TouchableOpacity>
        </View>
        <CustomButton
          Text={Strings.proceed}
          ButtonStyle={Styles.btn}
          onPress={() => CustomToast()}
        />
        <CustomButton
          Text={Strings.register}
          ButtonStyle={Styles.btn}
          onPress={() => CustomToast()}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
          <Text style={Styles.btnText}>{Strings.need_help}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const Styles = StyleSheet.create({
  mainImg: {
    flex: 1,
    alignItems: "center",
  },
  backBtn: {
    padding: vh(16),
    alignSelf: "flex-start",
    position: "absolute",
    top: vh(14),
    marginTop: vh(20),
  },
  cartoonMainView: {
    position: "absolute",
    top: vh(58),
  },
  loginMainView: {
    width: "100%",
    padding: vh(15),
  },
  loginText: {
    fontSize: vh(32),
    fontFamily: "Nunito-Bold",
  },
  loginFooter: {
    fontSize: vh(14),
    fontFamily: "Nunito-Regular",
    color: Colors.lightGrey,
  },
  loginView: {
    backgroundColor: "white",
    width: "90%",
    borderRadius: vw(10),
    alignItems: "center",
    top: vh(193),
  },
  inputView: {
    marginTop: vh(19),
  },
  forgotView: {
    paddingHorizontal: vw(15),
    alignSelf: "flex-end",
  },
  forgotTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(12),
    color: Colors.violet,
  },
  btn: {
    width: "90%",
    margin: vh(8),
  },
  btnText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    padding: vw(28),
    paddingTop: vh(10),
  },
});
