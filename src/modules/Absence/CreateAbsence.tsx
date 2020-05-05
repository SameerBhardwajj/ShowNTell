import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
} from "react-native";

// custom imports
import { CustomHeader } from "../../Components";
import { Strings, vw, vh, Images, Colors } from "../../utils";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={Styles.mainView}
    >
      {/* Custom Header -------------- */}
      <CustomHeader
        title={Strings.Create_Absence_Notification}
        onPressBack={() => props.navigation.pop()}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(46), width: '75%' }}
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>
    </ScrollView>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  childHeader: {
    flexDirection: "row",
    position: "absolute",
    right: vw(16),
    top: vh(43),
    paddingVertical: vw(3),
    paddingHorizontal: vw(10),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
  },
  dropdown: {
    height: vh(6),
    width: vh(11),
    marginLeft: vw(5),
    marginTop: vh(2),
    tintColor: Colors.violet,
  },
});
