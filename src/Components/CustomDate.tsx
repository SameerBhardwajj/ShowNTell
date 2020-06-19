import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
} from "react-native";
import { vh, Colors, vw, Images, Strings } from "../utils";
import DatePicker from "react-native-date-picker";
import { CommonFunctions } from "../utils";

export interface AppProps {
  heading: string;
  getDate: Function;
  minDate?: Date;
  maxDate?: Date;
  mainViewStyle?: object;
  date: Date;
}

export default function App(props: AppProps) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <View style={[Styles.mainView, props.mainViewStyle]}>
      <Text style={Styles.titleTxt}>{props.heading}</Text>
      <TouchableOpacity
        style={Styles.inputTxt}
        activeOpacity={0.8}
        onPress={() => setModalOpen(true)}
      >
        <Text style={Styles.dobText}>
          {CommonFunctions.DateFormatter(props.date)}
        </Text>
        <Image source={Images.Calendar_Icon} style={Styles.iconImage} />
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <TouchableOpacity
          style={Styles.topModalView}
          onPress={() => setModalOpen(false)}
        />
        <View style={Styles.modalView}>
          <DatePicker
            minimumDate={props.minDate}
            maximumDate={props.maxDate}
            date={props.date}
            mode="date"
            onDateChange={(text: Date) => {
              props.getDate(text);
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    alignItems: "center",
    width: "100%",
    marginTop: vh(24),
  },
  titleTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    alignSelf: "flex-start",
    color: Colors.lightBlack,
  },
  inputTxt: {
    flexDirection: "row",
    height: vh(48),
    borderRadius: vh(50),
    paddingHorizontal: vw(25),
    borderWidth: vh(1),
    width: "100%",
    marginTop: vh(10),
    borderColor: Colors.borderGrey,
    backgroundColor: Colors.veryLightGrey,
    alignItems: "center",
    justifyContent: "space-between",
  },
  dobText: {
    fontSize: vh(16),
    fontFamily: "Nunito-SemiBold",
    color: Colors.lightBlack,
  },
  iconImage: {
    height: vh(20),
    width: vh(20),
    tintColor: Colors.placeholderGrey,
  },
  topModalView: {
    width: "100%",
    flex: 1,
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    paddingVertical: vh(30),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
});
