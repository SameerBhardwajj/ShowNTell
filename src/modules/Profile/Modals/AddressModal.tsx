import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../../utils";
import { CustomInputText, CustomButton } from "../../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface AppProps {
  navigation?: any;
  address: string;
  setAddress: Function;
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  const [address, setAddress] = useState(props.address);
  const inputRef1: any = React.createRef();

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
          <Text style={Styles.headingText}>{Strings.Address_Details}</Text>
          <View style={Styles.separatorView} />
          <View style={Styles.msgView}>
            <CustomInputText
              ref={inputRef1}
              titleText={""}
              value={address}
              onChangeText={(text: string) => setAddress(text)}
              onSubmitEditing={() => {
                props.setAddress(address);
                props.setModalOpen();
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={'default'}
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
              onPress={() => {
                props.setAddress(address);
                props.setModalOpen();
              }}
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
    backgroundColor: Colors.modalBg,
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
