import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../../utils";
import { CustomInputText, CustomButton } from "../../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface AppProps {
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const inputRef4: any = React.createRef();
  const inputRef5: any = React.createRef();
  const [address1, setAddress1] = useState("555 Main Street");
  const [address2, setAddress2] = useState("Willington");
  const [city, setCity] = useState("Los Angeles");
  const [state, setState] = useState("California");
  const [zipcode, setZipcode] = useState("1234567");

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
              titleText={Strings.Address1}
              value={address1}
              onChangeText={(text: string) => setAddress1(text)}
              onSubmitEditing={() => {
                setAddress1(address1.trim());
                inputRef2.current.focus()
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef2}
              titleText={Strings.Address2}
              value={address2}
              onChangeText={(text: string) => setAddress2(text)}
              onSubmitEditing={() => {
                setAddress2(address2.trim());
                inputRef3.current.focus()
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef3}
              titleText={Strings.City}
              value={city}
              onChangeText={(text: string) => setCity(text)}
              onSubmitEditing={() => {
                setCity(city.trim());
                inputRef4.current.focus()
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef4}
              titleText={Strings.State}
              value={state}
              onChangeText={(text: string) => setState(text)}
              onSubmitEditing={() => {
                setState(state);
                inputRef5.current.focus()
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"default"}
              mainViewStyle={Styles.textInputView}
            />
            <CustomInputText
              ref={inputRef5}
              titleText={Strings.Zip_Code}
              value={zipcode}
              onChangeText={(text: string) => setZipcode(text)}
              onSubmitEditing={() => {
                setZipcode(zipcode);
                
              }}
              check={true}
              incorrectText={Strings.Address_Details}
              keyboardType={"phone-pad"}
              mainViewStyle={Styles.textInputView}
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
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg2,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderTopRightRadius: vh(15),
    borderTopLeftRadius: vh(15),
    paddingVertical: vh(21),
    paddingHorizontal: vw(16),
  },
  textInputView: {
    marginBottom: vh(6),
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
    marginVertical: vh(20),
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
