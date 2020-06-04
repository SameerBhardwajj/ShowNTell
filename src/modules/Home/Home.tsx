import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  StatusBar,
  BackHandler,
  ToastAndroid,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "./action";
import { vh, Colors, Images, vw, Strings, Constants } from "../../utils";
import { CustomSearchBar, CustomToast } from "../../Components";
import HomeFlatlist from "./HomeFlatlist";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [exitCounter, setExitCounter] = useState(false);

  const { tab, data, currentChild, loginToken, loginData } = useSelector(
    (state: { Home: any; Login: any }) => ({
      tab: state.Home.tab,
      data: state.Home.data,
      currentChild: state.Home.currentChild,
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
    })
  );

  React.useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(loginToken.length === 0 ? false : true);
    BackHandler.addEventListener("hardwareBackPress", () => {
      exitCounter
        ? (ToastAndroid.show(" Exiting the app...", ToastAndroid.SHORT),
          BackHandler.exitApp())
        : (ToastAndroid.show("Press again to Exit", ToastAndroid.SHORT),
          setExitCounter(true),
          setTimeout(() => {
            setExitCounter(false);
          }, 2000));
      return true;
    });
    const unsubscribe =
      (props.navigation.addListener(DRAWER_OPEN, (e: any) => {
        dispatch(
          updateTab(true, () => {
            console.log("drawer open", tab);
          })
        );
      }),
      props.navigation.addListener(DRAWER_CLOSE, (e: any) => {
        dispatch(
          updateTab(false, () => {
            console.log("drawer close", tab);
          })
        );
      }));

    return unsubscribe;
  }, [exitCounter]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <HomeFlatlist item={item} navigation={props.navigation} />;
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
    >
      <StatusBar backgroundColor={Colors.violet} barStyle="light-content" />
      <View style={Styles.mainView}>
        <View style={Styles.extraHeader} />
        <View style={Styles.header}>
          <View style={Styles.upperHeader}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => props.navigation.toggleDrawer()}
            >
              <Image source={Images.Hamburger} style={Styles.hamburgerImg} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={Styles.childHeader}>
              <Text style={Styles.childHeaderText}>Alex </Text>
              <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8}>
              <Image
                source={Images.Notification_Icon}
                style={Styles.imgHeader}
              />
            </TouchableOpacity>
          </View>
          <View style={[Styles.upperHeader, { marginTop: vh(10) }]}>
            <CustomSearchBar
              value={query}
              placeholder={Strings.Search}
              onChangeText={(text: string) => setQuery(text)}
              onPressCancel={() => setQuery("")}
              mainViewStyle={{ backgroundColor: "white", width: "87%" }}
              inputTextStyle={{ width: "64%" }}
              onSubmitEditing={() => {}}
            />
            <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
              <Image source={Images.Filter_Icon} style={Styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          bounces={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
        />
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
  extraHeader: {
    width: "100%",
    height: iPhoneX ? vh(30) : vh(10),
    backgroundColor: Colors.violet,
  },
  header: {
    alignItems: "center",
    width: "100%",
    backgroundColor: Colors.violet,
    borderBottomLeftRadius: vh(8),
    borderBottomRightRadius: vh(8),
  },
  upperHeader: {
    marginVertical: vh(15),
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: vw(16),
  },
  childHeader: {
    paddingVertical: vw(5),
    paddingHorizontal: vw(15),
    backgroundColor: "white",
    borderRadius: vh(20),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  childHeaderText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  dropdown: {
    height: vh(8),
    width: vh(14),
    marginHorizontal: vw(5),
  },
  hamburgerImg: {
    height: vw(22),
    width: vw(32),
  },
  imgHeader: {
    height: vw(27),
    width: vw(25),
  },
  filterImg: {
    height: vw(28),
    width: vw(28),
  },
});

// Dummy data for Home API
const DATA = [
  {
    activityType: "Lunch",
    name: "Alex",
    category: "Healthy Food",
    content: "Green Veggies and Salads",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.lunch_description,
  },
  {
    activityType: "Announcement",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.anonsmtDescription,
  },
  {
    activityType: "QOA",
    name: "Alex",
    class: "Infant A",
    category: Strings.QOD_category,
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.QOD_description,
  },
  {
    activityType: "Announcement",
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.anonsmtDescription,
  },
  {
    activityType: "QOA",
    name: "Alex",
    class: "Infant A",
    category: Strings.QOD_category,
    date: "Feb 1, 2020",
    time: "12:00 PM",
    description: Strings.QOD_description,
  },
];
