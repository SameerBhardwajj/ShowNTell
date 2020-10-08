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
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  CommonFunctions,
} from "../utils";
import DrawerFlatlist from "./DrawerFlatlist";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { chatEnable, guardianData, loginData } = useSelector(
    (state: { Home: any; Login: any }) => ({
      chatEnable: state.Home.chatEnable,
      guardianData: state.Home.guardianData,
      loginData: state.Login.loginData,
    })
  );

  const chat = {
    icon: Images.Chat_Icon,
    size: { height: vh(23), width: vh(25) },
    label: Strings.Chat,
    path: ScreenName.CHAT,
  };

  const finalData = [chat].concat(DATA);

  React.useEffect(() => {}, [chatEnable]);

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
            {CommonFunctions.isNullUndefined(guardianData) ? (
              <Image
                source={Images.Profile_Placeholder}
                resizeMode="center"
                resizeMethod="resize"
                style={Styles.img}
              />
            ) : CommonFunctions.isNullUndefined(guardianData.s3_photo_path) ? (
              <Image
                source={Images.Profile_Placeholder}
                resizeMode="center"
                resizeMethod="resize"
                style={Styles.img}
              />
            ) : (
              <Image
                source={{ uri: guardianData.s3_photo_path }}
                style={Styles.img}
              />
            )}
          </View>
          <View style={{ paddingLeft: vw(12), paddingTop: vh(8) }}>
            <Text style={Styles.name}>
              {`${loginData.first_name} ${loginData.last_name}`}
            </Text>
            {CommonFunctions.isNullUndefined(guardianData) ? null : (
              <Text style={Styles.email}>{guardianData.email}</Text>
            )}
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
    label: Strings.Announcements,
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
