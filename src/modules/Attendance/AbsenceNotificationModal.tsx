import * as React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

// custom imports
import { Images, vw, Strings, vh, Colors, CommonFunctions } from "../../utils";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { item } = props.route.params;

  const currDateTime =
    item.absence_update_date === "0000-00-00 00:00:00"
      ? item.absence_create_date
      : item.absence_update_date;

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.navigation.pop()}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
        <Text style={Styles.headingText}>{Strings.Absence_Notification}</Text>
        <View style={Styles.separatorView} />
        <View style={Styles.msgView}>
          <View style={Styles.msgUpperView}>
            <View>
              <Text style={Styles.fromText}>{Strings.Date}</Text>
              <Text style={Styles.dateText}>
                {CommonFunctions.DateFormatter(item.currDateTime)}
              </Text>
            </View>
          </View>
          <Text style={Styles.msgText}>{item.absence_description}</Text>
          <Text style={Styles.footerText}>
            {CommonFunctions.DateFormatter(item.currDateTime)}
            {" . "}
            {CommonFunctions.timeFormatter(item.currDateTime)}
          </Text>
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
    paddingBottom: vh(40),
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
    backgroundColor: Colors.fadedPink,
    width: "100%",
    borderRadius: vh(10),
  },
  msgUpperView: {
    backgroundColor: Colors.lightPink,
    padding: vh(16),
    borderTopRightRadius: vh(10),
    borderTopLeftRadius: vh(10),
    flexDirection: "row",
  },
  fromText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingBottom: vh(8),
  },
  dateText: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(16),
  },
  separatorDateView: {
    width: vw(2),
    height: "120%",
    backgroundColor: Colors.separator,
    marginHorizontal: vh(20),
    alignSelf: "center",
  },
  msgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    padding: vh(16),
  },
  footerText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: Colors.lightBlack,
    padding: vh(16),
    paddingTop: vh(8),
  },
});
