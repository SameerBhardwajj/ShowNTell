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
  Modal,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab } from "./action";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  Constants,
} from "../../utils";
import {
  CustomSearchBar,
  CustomToast,
  CustomLoader,
  CustomButton,
} from "../../Components";
import HomeFlatlist from "./HomeFlatlist";
import { HomeAPI, HomeFilter } from "./action";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
    hitHomeAPI(currentChild.child, 0);
    // const unsubscribe =
    //   (props.navigation.addListener(DRAWER_OPEN, (e: any) => {
    //     dispatch(
    //       updateTab(true, () => {
    //         console.log("drawer open", tab);
    //       })
    //     );
    //   }),
    //   props.navigation.addListener(DRAWER_CLOSE, (e: any) => {
    //     dispatch(
    //       updateTab(false, () => {
    //         console.log("drawer close", tab);
    //       })
    //     );
    //   }));

    // return unsubscribe;
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
  }, [exitCounter, currentChild]);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <HomeFlatlist item={item} navigation={props.navigation} />;
  };

  const hitHomeAPI = (child_id: number, page: number) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        child_id,
        page,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  };

  const hitHomeFilter = (classroomd_id: number) => {
    setLoading(true);
    dispatch(
      HomeFilter(
        classroomd_id,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps="handled"
      style={{ backgroundColor: "white" }}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={loading}
      />
      <CustomLoader loading={loading} />
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
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.childHeader}
              onPress={() =>
                props.navigation.navigate(ScreenName.CHILD_MODAL, {
                  child: loginData.Children,
                })
              }
            >
              <Text style={Styles.childHeaderText}>{currentChild.name}</Text>
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
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                console.warn(currentChild), setModalOpen(true);
              }}
            >
              <Image source={Images.Filter_Icon} style={Styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.innerView}>
          <FlatList
            data={data.activity}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            showsVerticalScrollIndicator={false}
            renderItem={renderItems}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <View style={Styles.innerModalView}>
            <View style={Styles.headingView}>
              <Text style={Styles.childHeaderText}>
                {Strings.Home_Feed_Options}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setModalOpen(false)}
              >
                <Image source={Images.Cancel_Icon} />
              </TouchableOpacity>
            </View>
            <View style={Styles.filterView}>
              <View style={Styles.leftFilter}></View>
              <View style={Styles.rightFilter}></View>
            </View>
            <View style={Styles.bottomView}>
              <CustomButton
                lightBtn={true}
                onPress={() => {}}
                Text={Strings.Reset}
                ButtonStyle={Styles.applyBtn}
              />
              <CustomButton
                onPress={() => {}}
                Text={Strings.Apply}
                ButtonStyle={Styles.applyBtn}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  innerView: {
    width: "100%",
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  modalView: {
    flex: 1,
    backgroundColor: Colors.modalBg,
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerModalView: {
    backgroundColor: "white",
    borderTopLeftRadius: vh(20),
    borderTopRightRadius: vh(20),
    width: "100%",
  },
  headingView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: vh(20),
    borderBottomWidth: vw(1),
    borderColor: Colors.borderGrey,
  },
  filterView: {
    flexDirection: "row",
  },
  bottomView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: vh(20),
    borderTopWidth: vw(1),
    borderColor: Colors.borderGrey,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: -5,
    // },
    // shadowOpacity: 0.5,
    // shadowRadius: 4.65,
    // elevation: 7,
  },
  leftFilter: {
    height: 100,
    backgroundColor: Colors.lightPink,
    width: vw(120),
  },
  rightFilter: {
    height: 100,
  },
  applyBtn: {
    width: "40%",
    marginVertical: vh(20),
  },
});
