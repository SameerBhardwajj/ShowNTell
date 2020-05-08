import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../utils";
import { CustomDate, CustomButton } from "../../Components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export interface AppProps {
  navigation?: any;
  setModalOpen: Function;
  state: Function;
  fromDate: Date;
  toDate: Date;
  getDate: Function;
}

export default function App(props: AppProps) {
  const [fromDate, setFromDate] = useState(props.fromDate);
  const [toDate, setToDate] = useState(props.toDate);
  const [days, setDays] = useState("0");

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.setModalOpen()}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
        <Text style={Styles.headingText}>{Strings.Date_Range}</Text>
        <View style={Styles.separatorView} />
        <View style={Styles.msgView}>
          <CustomDate
            heading={Strings.From}
            getDate={(date: Date) => {
              setFromDate(date);
              let difference: number = toDate.getDate() - date.getDate();
              difference > 0 ? setDays(difference.toString()) : 0;
            }}
          />
          <CustomDate
            heading={Strings.To}
            minDate={fromDate}
            getDate={(date: Date) => {
              setToDate(date);
              let difference: number = date.getDate() - fromDate.getDate();
              setDays(difference.toString());
            }}
          />
          <CustomButton
            Text={Strings.proceed}
            onPress={() => {
              props.getDate(fromDate, toDate);
              props.state();
              props.setModalOpen();
            }}
            ButtonStyle={{ width: "100%", marginTop: vh(32) }}
          />
        </View>
      </View>
    </View>
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
    alignItems: "center",
  },
});
