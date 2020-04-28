import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { vh, Colors, Images, vw, Strings } from "../utils";
import DrawerFlatlist from "./DrawerFlatlist";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const rendetItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <DrawerFlatlist
        item={item}
        onPress={(path: string) => props.navigation.navigate(path)}
      />
    );
  };

  return (
    <View style={Styles.mainView}>
      <DrawerContentScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", backgroundColor: Colors.violet }}
      >
        <TouchableOpacity
          style={Styles.profileView}
          activeOpacity={0.8}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <Image source={Images.any} style={Styles.img} />
          <View style={{ paddingLeft: vw(12), paddingTop: vh(8) }}>
            <Text style={Styles.name}>Bob Parish</Text>
            <Text style={Styles.email}>Bob_Parish@gmail.com</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{
            paddingBottom: vh(50),
            backgroundColor: "white",
          }}
          renderItem={rendetItems}
        />
      </DrawerContentScrollView>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  profileView: {
    height: vh(100),
    width: "100%",
    backgroundColor: Colors.violet,
    flexDirection: "row",
    paddingHorizontal: vw(16),
    alignItems: "center",
  },
  img: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    color: "white",
  },
  email: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    color: "white",
  },
});

const DATA = [
  {
    icon: Images.Chat_Icon,
    size: { height: vw(30), width: vw(32) },
    label: Strings.Chat,
    path: "Chat",
  },
  {
    icon: Images.QA_Icon,
    size: { height: vw(32), width: vw(30) },
    label: Strings.QOD_label,
    path: "QOD",
  },
  {
    icon: Images.Announcement_Icons,
    size: { height: vw(25), width: vw(32) },
    label: Strings.Announcement,
    path: "Announcement",
  },
  {
    icon: Images.Event_Icon,
    size: { height: vw(32), width: vw(32) },
    label: Strings.Events,
    path: "Events",
  },
  {
    icon: Images.Classroom_schedule_Icon,
    size: { height: vw(32), width: vw(32) },
    label: Strings.Classroom_Schedule,
    path: "ClassroomSchedule",
  },
  {
    icon: Images.statement_Icon,
    size: { height: vw(29), width: vw(32) },
    label: Strings.Statements,
    path: "Statements",
  },
  {
    icon: Images.referral_Icon,
    size: { height: vw(32), width: vw(28) },
    label: Strings.Referral,
    path: "Referral",
  },
  {
    icon: Images.testimonial_Icon,
    size: { height: vw(30), width: vw(32) },
    label: Strings.Testimonials,
    path: "Testimonials",
  },
  {
    icon: Images.need_help_Icon,
    size: { height: vw(32), width: vw(32) },
    label: Strings.need_help,
    path: "NeedHelp",
  },
  {
    icon: Images.setting_Icon,
    size: { height: vw(31), width: vw(32) },
    label: Strings.Settings,
    path: "Settings",
  },
  {
    icon: Images.Log_out_Icon,
    size: { height: vw(32), width: vw(32) },
    label: Strings.Logout,
    path: "Logout",
  },
];
