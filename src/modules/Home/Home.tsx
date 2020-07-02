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
import { updateTab, updateChild, updatePage } from "./action";
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
  CustomLoader,
  CustomNoData,
  CustomToast,
} from "../../Components";
import HomeFlatlist from "./HomeFlatlist";
import { HomeAPI, addFilter, weDidItAPI } from "./action";
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
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [exitCounter, setExitCounter] = useState(false);
  const [filterPage, setFilterPage] = useState(0);
  const [SearchPage, setSearchPage] = useState(0);
  const [homeData, setHomeData] = useState([]);
  const [loadMore, setLoadMore] = useState(true);

  const {
    tab,
    data,
    currentChild,
    loginToken,
    loginData,
    myFilter,
    filterNum,
    page,
  } = useSelector((state: { Home: any; Login: any }) => ({
    tab: state.Home.tab,
    data: state.Home.data,
    currentChild: state.Home.currentChild,
    loginToken: state.Login.loginToken,
    loginData: state.Login.loginData,
    myFilter: state.Home.myFilter,
    filterNum: state.Home.filterNum,
    page: state.Home.page,
  }));

  React.useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    // setLoading(true);
    // console.warn(
    //   "child ",
    //   currentChild,
    //   loginData.Children.length > 1,
    //   loginData.Children.length
    // );
    dispatch(updatePage(0, () => {}));
    loginData.Children.length > 1
      ? hitHomeAPI(currentChild.child, 0)
      : loginData.Children[0].id !== currentChild.child
      ? dispatch(
          updateChild(
            {
              child: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () => hitHomeAPI(loginData.Children[0].id, 0)
          )
        )
      : hitHomeAPI(currentChild.child, 0);
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
    return (
      <HomeFlatlist
        weDidIt={(id: string) => {
          setLoading(true);
          dispatch(
            weDidItAPI(
              id,
              () => hitSearchAPI(),
              () => {
                setLoading(false);
              }
            )
          );
        }}
        item={item}
        navigation={props.navigation}
      />
    );
  };

  const hitHomeAPI = (child_id: number, pageNum: number) => {
    console.warn("my page  ", page);

    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          console.log("home data   ", data);

          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          // setRefreshing(false);
          pageNum === 0
            ? setHomeData(data)
            : setHomeData(homeData.concat(data));
          dispatch(updatePage(pageNum + 1, () => {}));
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        child_id,
        pageNum
      )
    );
  };

  const hitFilterAPI = (
    activity?: string,
    fromDate?: string,
    toDate?: string,
    type?: string
  ) => {
    console.warn("my page filter ", filterPage);
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          filterPage === 0
            ? setHomeData(data)
            : setHomeData(homeData.concat(data));
          // dispatch(updatePage(page + 1, () => {}));
          setFilterPage(filterPage + 1);
          // setRefreshing(false);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        filterPage,
        activity,
        fromDate,
        toDate,
        type
      )
    );
  };

  const hitSearchAPI = (query?: string) => {
    console.warn("my page search ", SearchPage);
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setLoading(false);
          SearchPage === 0
            ? setHomeData(data)
            : setHomeData(homeData.concat(data));
          // dispatch(updatePage(page + 1, () => {}));
          setSearchPage(SearchPage + 1);
          // setRefreshing(false);
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        SearchPage,
        myFilter.activity,
        myFilter.fromDate,
        myFilter.toDate,
        myFilter.type,
        query
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
      <CustomLoader loading={loading} />
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
                ? props.navigation.navigate(ScreenName.CHILD_MODAL, {
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
          <TouchableOpacity activeOpacity={0.8} onPress={() => CustomToast()}>
            <Image source={Images.Notification_Icon} style={Styles.imgHeader} />
          </TouchableOpacity>
        </View>
        <View style={[Styles.upperHeader, { marginTop: vh(10) }]}>
          <CustomSearchBar
            value={query}
            placeholder={Strings.Search}
            onChangeText={(text: string) => {
              setQuery(text),
                hitSearchAPI(text),
                dispatch(updatePage(0, () => {}));
            }}
            onPressCancel={() => {
              setQuery(""), hitSearchAPI(), dispatch(updatePage(0, () => {}));
            }}
            mainViewStyle={{ backgroundColor: "white", width: "87%" }}
            inputTextStyle={{ width: "64%" }}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setModalOpen(true)}
          >
            <Image source={Images.Filter_Icon} style={Styles.filterImg} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.innerView}>
        {homeData.length === 0 ? (
          <CustomNoData />
        ) : (
          <FlatList
            data={homeData}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            renderItem={renderItems}
            nestedScrollEnabled={true}
            onEndReached={() =>
              loadMore ? hitHomeAPI(currentChild.child, page + 1) : null
            }
            onEndReachedThreshold={0.5}
          />
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <FilterModal
            setModalOpen={(value: boolean) => setModalOpen(value)}
            resetFilter={() => {
              setModalOpen(false),
                dispatch(updatePage(0, () => {})),
                hitHomeAPI(currentChild.child, 0);
            }}
            applyFilter={(value: any, Activitytype: Array<any>, dates: any) => {
              console.warn("incoming  ", value, dates, Activitytype);

              let to = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.toDate, "ymd");
              let from = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.fromDate, "ymd");
              setFilterPage(0);
              dispatch(
                updatePage(0, () => {
                  dispatch(
                    addFilter(myFilter.activity, from, to, Activitytype, () => {
                      console.warn(" filter redux ...", myFilter);
                      hitFilterAPI(value, from, to, Activitytype.join(","));
                    })
                  );
                })
              );
            }}
          />
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
    flex: 1,
  },
  emptyData: {
    width: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
