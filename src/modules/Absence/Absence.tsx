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
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";
import AbsenceFlatlist from "./AbsenceFlatlist";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <AbsenceFlatlist item={item} index={index} />;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={Styles.mainView}
    >
      {/* Custom Header -------------- */}
      <CustomHeader
        hideBackButton={true}
        title={Strings.Absence_Notification}
        onPressBack={() => {}}
        textStyle={{ alignSelf: "flex-start", paddingLeft: vw(16) }}
      />
      <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
        <Text style={Styles.childHeaderText}>Alex </Text>
        <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
      </TouchableOpacity>

      {/* Add Btn ----------- */}
      <TouchableOpacity
        style={Styles.addBtnView}
        activeOpacity={0.8}
        onPress={() => props.navigation.navigate(ScreenName.CREATE_ABSENCE)}
      >
        <Image source={Images.Add_leave} style={Styles.addBtn} />
      </TouchableOpacity>

      {/* Message starts here -------- */}
      <View style={Styles.innerView}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      </View>
    </ScrollView>
  );
}
export const Styles = StyleSheet.create({
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
    paddingHorizontal: vh(16),
    paddingTop: vh(20),
    paddingBottom: vh(80),
    width: "100%",
  },
  addBtnView: {
    position: "absolute",
    bottom: vh(24),
    right: vh(24),
    zIndex: 99,
  },
  addBtn: {
    height: vh(64),
    width: vh(64),
  },
});

const DATA = [
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
  {
    from: "Feb 26, 2020",
    to: "Feb 26, 2020",
    name: "Alex Parish",
    class: "Infant A",
    msg:
      "Hello Mam,\n\nThis is to inform you that my ward would be travelling outside station and would be unavailable for the mentioned dates.\nThanks,\nBob",
    createdOn: "Feb 25, 2020",
    time: "05:00 PM",
  },
];
