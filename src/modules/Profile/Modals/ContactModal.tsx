import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import {
  Images,
  vw,
  Strings,
  vh,
  Colors,
  validate,
  ConstantName,
  CommonFunctions,
} from "../../../utils";
import {
  CustomPhoneField,
  CustomButton,
  CustomLoader,
} from "../../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { updateProfile } from "../action";

export interface AppProps {
  navigation?: any;
  setModalOpen: Function;
  updateModal: Function;
}

export default function App(props: AppProps) {
  const { data } = useSelector((state: { Profile: any }) => ({
    data: state.Profile.data,
  }));
  const dispatch = useDispatch();
  const inputRef1: any = React.createRef();
  const inputRef2: any = React.createRef();
  const inputRef3: any = React.createRef();
  const [checkphone1, setCheckPhone1] = useState(true);
  const [checkphone2, setCheckPhone2] = useState(true);
  const [checkphone3, setCheckPhone3] = useState(true);
  const [phone1, setPhone1] = useState(data.primary_phone.replace(/-/g, ""));
  const [phone2, setPhone2] = useState(data.work_phone.replace(/-/g, ""));
  const [phone3, setPhone3] = useState(data.secondary_phone.replace(/-/g, ""));
  const [isLoading, setLoading] = useState(false);

  const formatPhone = (f: string) => {
    let f_val = f.replace(/\D[^\.]/g, "");
    f = f_val.slice(0, 3) + "-" + f_val.slice(3, 6) + "-" + f_val.slice(6);
    return f;
  };

  const validateAll = () => {
    Keyboard.dismiss();
    phone1.length === 0 || validate(ConstantName.PHONE, phone1)
      ? phone2.length !== 0 && validate(ConstantName.PHONE, phone2)
        ? phone3.length === 0 || validate(ConstantName.PHONE, phone3)
          ? (setLoading(true),
            dispatch(
              updateProfile(
                {
                  type: "contact_detail",
                  primary_phone: CommonFunctions.isNullUndefined(phone1)
                    ? ""
                    : formatPhone(phone1),
                  work_phone: CommonFunctions.isNullUndefined(phone2)
                    ? ""
                    : formatPhone(phone2),
                  secondary_phone: CommonFunctions.isNullUndefined(phone3)
                    ? ""
                    : formatPhone(phone3),
                },
                () => {
                  setLoading(false);
                  props.updateModal();
                },
                (err: any) => {
                  console.warn("err", err);
                  setLoading(false);
                }
              )
            ))
          : (setCheckPhone3(false), inputRef3.current.focus())
        : (setCheckPhone2(false), inputRef2.current.focus())
      : (setCheckPhone1(false), inputRef1.current.focus());
  };

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={Styles.mainView}
    >
      <CustomLoader loading={isLoading} />
      <View style={Styles.mainView}>
        <View style={Styles.modalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cancelBtn}
            onPress={() => props.setModalOpen()}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          <Text style={Styles.headingText}>{Strings.Contact_Details}</Text>
          <View style={Styles.separatorView} />
          <View style={Styles.msgView}>
            {/* phone number ---------------- */}
            <CustomPhoneField
              title={Strings.Phone_Number}
              value={phone1}
              ref={inputRef1}
              onChangeText={(text: string) => {
                checkphone1 ? null : setCheckPhone1(true), setPhone1(text);
              }}
              check={checkphone1}
              onSubmitEditing={() => {
                phone1.length === 0 || validate(ConstantName.PHONE, phone1)
                  ? inputRef2.current.focus()
                  : (setCheckPhone1(false), inputRef1.current.focus());
              }}
              mainViewStyle={{ width: "100%", marginVertical: vh(4) }}
            />
            {/* mobile number ---------------- */}
            <CustomPhoneField
              title={Strings.Mobile_Number}
              value={phone2}
              ref={inputRef2}
              onChangeText={(text: string) => {
                checkphone2 ? null : setCheckPhone2(true), setPhone2(text);
              }}
              check={checkphone2}
              onSubmitEditing={() => {
                phone2.length !== 0 && validate(ConstantName.PHONE, phone2)
                  ? inputRef3.current.focus()
                  : (setCheckPhone2(false), inputRef2.current.focus());
              }}
              incorrectMsg={
                phone2.length === 0 ? Strings.Phone_Empty : undefined
              }
              mainViewStyle={{ width: "100%", marginVertical: vh(4) }}
            />
            {/* other number ---------------- */}
            <CustomPhoneField
              title={Strings.Other_Number}
              value={phone3}
              ref={inputRef3}
              onChangeText={(text: string) => {
                checkphone3 ? null : setCheckPhone3(true), setPhone3(text);
              }}
              check={checkphone3}
              onSubmitEditing={() => {
                phone3.length === 0 || validate(ConstantName.PHONE, phone3)
                  ? validateAll()
                  : (setCheckPhone3(false), inputRef3.current.focus());
              }}
              mainViewStyle={{ width: "100%", marginVertical: vh(4) }}
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
    marginVertical: vh(20),
    alignSelf: "center",
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
