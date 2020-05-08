import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import {
  Images,
  vw,
  Strings,
  vh,
  Colors,
  validate,
  ConstantName,
} from "../../../utils";
import { CustomInputText, CustomButton } from "../../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface AppProps {
  navigation?: any;
  email: string;
  setEmail: Function;
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  const [email, setEmail] = useState(props.email);
  const [checkEmail, setCheckEmail] = useState(true);
  const inputRef1: any = React.createRef();

  const validateAll = () => {
    validate(ConstantName.EMAIL, email)
      ? (props.setEmail(email), props.setModalOpen())
      : (setCheckEmail(false), inputRef1.current.focus());
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={Styles.mainView}
    >
      <View style={Styles.mainView}>
        <View style={Styles.modalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cancelBtn}
            onPress={() => props.setModalOpen()}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          <Text style={Styles.headingText}>{Strings.Email}</Text>
          <View style={Styles.separatorView} />
          <View style={Styles.msgView}>
            <CustomInputText
              ref={inputRef1}
              titleText={""}
              value={email}
              onChangeText={(text: string) => {
                checkEmail ? null : setCheckEmail(true), setEmail(text);
              }}
              onSubmitEditing={() => validateAll()}
              check={checkEmail}
              incorrectText={Strings.Email}
              keyboardType={"email-address"}
            />
          </View>
          <View style={Styles.btnView}>
            <CustomButton
              lightBtn={true}
              Text={Strings.Cancel}
              onPress={() => props.setModalOpen()}
              ButtonStyle={{ width: "45%" }}
            />
            <CustomButton
              Text={Strings.Update}
              onPress={() => validateAll()}
              ButtonStyle={{ width: "45%" }}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg2,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: vh(10),
    borderTopLeftRadius: vh(10),
    paddingVertical: vh(21),
    paddingHorizontal: vw(16),
  },
  cancelBtn: {
    position: "absolute",
    padding: vh(24),
    right: 0,
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
    marginTop: vh(20),
  },
  msgView: {
    width: "100%",
  },
  btnView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
});
