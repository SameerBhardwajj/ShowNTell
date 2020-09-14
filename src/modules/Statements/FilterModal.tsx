import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors } from "../../utils";
import { CustomDate, CustomButton } from "../../Components";

export interface AppProps {
  navigation?: any;
  setModalOpen: Function;
  fromDate: Date;
  toDate: Date;
  getDate: Function;
}

export default function App(props: AppProps) {
  const [fromDate, setFromDate] = useState(props.fromDate);
  const [toDate, setToDate] = useState(props.toDate);

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
            date={fromDate}
            maxDate={new Date()}
            heading={Strings.From}
            getDate={(date: Date) => {
              setFromDate(date);
            }}
          />
          <CustomDate
            date={toDate}
            heading={Strings.To}
            maxDate={new Date()}
            minDate={fromDate}
            getDate={(date: Date) => {
              setToDate(date);
            }}
          />
          <CustomButton
            Text={Strings.proceed}
            onPress={() => props.getDate(fromDate, toDate)}
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
