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

const TYPE_ADD = "add";
const TYPE_UPDATE = "update";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <AbsenceFlatlist
        item={item}
        index={index}
        onPress={() =>
          props.navigation.navigate(ScreenName.CREATE_ABSENCE, {
            type: TYPE_UPDATE,
            item: item,
          })
        }
      />
    );
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
        child={true}
        navigation={props.navigation}
      />

      {/* Add Btn ----------- */}
      <TouchableOpacity
        style={Styles.addBtnView}
        activeOpacity={0.8}
        onPress={() =>
          props.navigation.navigate(ScreenName.CREATE_ABSENCE, {
            type: TYPE_ADD,
          })
        }
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
