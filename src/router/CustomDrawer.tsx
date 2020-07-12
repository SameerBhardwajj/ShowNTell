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
import { useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings, ScreenName } from "../utils";
import DrawerFlatlist from "./DrawerFlatlist";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { loginData, loginEmail, chatEnable } = useSelector(
    (state: { Login: any; Home: any }) => ({
      loginData: state.Login.loginData,
      loginEmail: state.Login.loginEmail,
      chatEnable: state.Home.chatEnable,
    })
  );

  const chat = {
    icon: Images.Chat_Icon,
    size: { height: vh(23), width: vh(25) },
    label: Strings.Chat,
    path: ScreenName.CHAT,
  };

  const finalData = [chat].concat(DATA);

  React.useEffect(() => {
    console.warn("updated chat ", chatEnable);
  }, [chatEnable]);

  const rendetItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <DrawerFlatlist
        item={item}
        onPress={(path: string) => {
          props.navigation.closeDrawer();
          path === ScreenName.NEED_HELP
            ? props.navigation.navigate(path, {
                path: ScreenName.TAB_NAVIGATOR,
              })
            : props.navigation.navigate(path);
        }}
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
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate(ScreenName.PROFILE);
          }}
        >
          <View style={Styles.imgView}>
            <Image
              source={
                loginData.s3_photo_path === null
                  ? Images.Profile_Placeholder
                  : { uri: loginData.s3_photo_path }
              }
              resizeMode="center"
              resizeMethod="resize"
              style={Styles.img}
            />
          </View>
          <View style={{ paddingLeft: vw(12), paddingTop: vh(8) }}>
            <Text style={Styles.name}>
              {`${loginData.first_name} ${
                loginData.middle_name === null
                  ? ""
                  : `${loginData.middle_name}${" "}`
              }${loginData.last_name}`}
            </Text>
            <Text style={Styles.email}>{loginEmail}</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={chatEnable ? finalData : DATA}
          ItemSeparatorComponent={() => {
            return <View style={Styles.separator} />;
          }}
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
  imgView: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: vh(32),
    backgroundColor: "white",
    height: vh(64),
    width: vh(64),
  },
  img: {
    borderRadius: vh(32),
    height: vh(64),
    width: vh(64),
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
  separator: {
    height: vw(1),
    width: "90%",
    backgroundColor: Colors.veryLightGrey,
    alignSelf: "center",
  },
});

const DATA = [
  {
    icon: Images.QA_Icon,
    size: { height: vh(27), width: vh(25) },
    label: Strings.QOD_label,
    path: ScreenName.QOD,
  },
  {
    icon: Images.Announcement_Icons,
    size: { height: vh(19), width: vh(25) },
    label: Strings.Announcement,
    path: ScreenName.ANNOUNCEMENT,
  },
  {
    icon: Images.Event_Icon,
    size: { height: vh(25), width: vh(25) },
    label: Strings.Events,
    path: ScreenName.EVENTS,
  },
  {
    icon: Images.Classroom_schedule_Icon,
    size: { height: vh(25), width: vh(25) },
    label: Strings.Classroom_Schedule,
    path: ScreenName.CLASSROOM_SCHEDULE,
  },
  {
    icon: Images.statement_Icon,
    size: { height: vh(22), width: vh(25) },
    label: Strings.Statements,
    path: ScreenName.STATEMENTS,
  },
  {
    icon: Images.referral_Icon,
    size: { height: vh(27), width: vh(25) },
    label: Strings.Referral,
    path: ScreenName.REFERRAL,
  },
  {
    icon: Images.testimonial_Icon,
    size: { height: vh(23), width: vh(25) },
    label: Strings.Testimonials,
    path: ScreenName.TESTIMONIALS,
  },
  {
    icon: Images.need_help_Icon,
    size: { height: vh(25), width: vh(25) },
    label: Strings.need_help,
    path: ScreenName.NEED_HELP,
  },
  {
    icon: Images.setting_Icon,
    size: { height: vh(23), width: vh(25) },
    label: Strings.Settings,
    path: ScreenName.SETTINGS,
  },
  {
    icon: Images.Log_out_Icon,
    size: { height: vh(25), width: vh(25) },
    label: Strings.Logout,
    path: ScreenName.LOGOUT_MODAL,
  },
];
