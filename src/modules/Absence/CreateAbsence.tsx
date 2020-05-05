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
        textStyle={{
          alignSelf: "flex-start",
          paddingLeft: vw(46),
          width: "75%",
        }}
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>
      <View style={Styles.innerView}>
        <View style={Styles.headingView}>
          <Text style={Styles.heading1}>{Strings.hello}</Text>
          <Text style={Styles.heading2}>{Strings.Bob_Parish}</Text>
          <Text style={Styles.heading3}>{Strings.apply_leave_on_time}</Text>
        </View>
      </View>
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
  innerView: {
    alignItems: "center",
    width: "100%",
    padding: vh(16),
  },
  headingView: {
    backgroundColor: Colors.lightPink,
    width: "100%",
    borderRadius: vh(10),
    alignItems: "flex-start",
    padding: vh(15),
  },
  heading1: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(18),
    color: Colors.pink,
  },
  heading2: {
    fontFamily: "Nunito-ExtraBold",
    fontSize: vh(20),
    color: Colors.pink,
    paddingVertical: vh(5),
  },
  heading3: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(15),
    color: Colors.lightGrey,
  },
});
