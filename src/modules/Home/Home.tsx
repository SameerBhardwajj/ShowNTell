import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  StatusBar,
  BackHandler,
  ToastAndroid,
  Modal,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateTab, updateChild } from "./action";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  Constants,
  CommonFunctions,
} from "../../utils";
import {
  CustomSearchBar,
  CustomToast,
  CustomLoader,
  CustomButton,
} from "../../Components";
import HomeFlatlist from "./HomeFlatlist";
import { HomeAPI, HomeFilter, updateOtherChild } from "./action";
import FilterModal from "./Filter/FilterModal";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

const DRAWER_OPEN = "drawerOpen";
const DRAWER_CLOSE = "drawerClose";

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setRefreshing] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [exitCounter, setExitCounter] = useState(false);

  const {
    tab,
    data,
    currentChild,
    loginToken,
    loginData,
    otherCurrentChild,
  } = useSelector((state: { Home: any; Login: any }) => ({
    tab: state.Home.tab,
    data: state.Home.data,
    currentChild: state.Home.currentChild,
    loginToken: state.Login.loginToken,
    loginData: state.Login.loginData,
    otherCurrentChild: state.Home.otherCurrentChild,
  }));

  React.useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    setLoading(true);
    console.warn("child ", currentChild);

    loginData.Children.length > 1
      ? hitHomeAPI(currentChild.child, 0)
      : dispatch(
          updateChild(
            {
              child: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () =>
              dispatch(
                updateOtherChild(
                  {
                    child: loginData.Children[0].id,
                    name: loginData.Children[0].first_name,
                    classroom: loginData.Children[0].classroom_id,
                  },
                  () => hitHomeAPI(loginData.Children[0].id, 0)
                )
              )
          )
        );
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
    console.warn(child_id, page);
    dispatch(
      HomeAPI(
        child_id,
        page,
        (data: any) => {
          setLoading(false);
          setRefreshing(false);
          data.length === 0 ? null : setHomeData(data.activity.rows);
          console.warn("len ", data.activity.rows);
          // CommonFunctions.isEmpty(otherCurrentChild)
          //   ? dispatch(
          //       updateOtherChild({
          //         child: loginData.Children[0].id,
          //         name: loginData.Children[0].first_name,
          //         classroom: loginData.Children[0].classroom_id,
          //       }, () => {})
          //     )
          //   : null;
        },
        () => {
          setLoading(false), setRefreshing(false);
        }
      )
    );
  };

  const hitHomeFilter = () => {
    setLoading(true);
    dispatch(
      HomeFilter(
        currentChild.classroom,
        () => setLoading(false),
        () => setLoading(false)
      )
    );
  };

  return (
    <View style={Styles.mainView}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.violet}
        animated={loading}
      />
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
            activeOpacity={loginData.Children.length > 1 ? 0.8 : 1}
            style={Styles.childHeader}
            onPress={() =>
              loginData.Children.length > 1
                ? props.navigation.navigate(ScreenName.HOME_CHILD_MODAL, {
                    child: loginData.Children,
                  })
                : null
            }
          >
            <Text style={Styles.childHeaderText}>{currentChild.name}</Text>
            {loginData.Children.length > 1 ? (
              <Image source={Images.Drop_Down_icon} style={Styles.dropdown} />
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={Images.Notification_Icon} style={Styles.imgHeader} />
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
              // console.warn(currentChild),
              currentChild.classroom === 0
                ? CustomToast("Please change Child")
                : (setModalOpen(true), hitHomeFilter());
            }}
          >
            <Image source={Images.Filter_Icon} style={Styles.filterImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.innerView}>
        <CustomLoader loading={loading} />
        <FlatList
          data={homeData}
          keyExtractor={(item, index) => index.toString()}
          refreshing={isRefreshing}
          onRefresh={() => {
            setRefreshing(true), hitHomeAPI(currentChild.child, 0);
          }}
          bounces={true}
          showsVerticalScrollIndicator={false}
          renderItem={renderItems}
          nestedScrollEnabled={true}
        />
      </View>
      {/* </View> */}
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <FilterModal setModalOpen={(value: boolean) => setModalOpen(value)} />
        </View>
      </Modal>
    </View>
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
    // marginBottom: vh(170),
    flex: 1,
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
});
