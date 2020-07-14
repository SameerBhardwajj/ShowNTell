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
  Keyboard,
} from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useDispatch, useSelector } from "react-redux";

// custom imports
import { updateClassChild } from "../ClassroomSchedule/action";
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
import { HomeAPI, addFilter, weDidItAPI, updateQuery } from "./action";
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
    classroomChild,
    page,
    searchQuery,
  } = useSelector(
    (state: { Home: any; Login: any; ClassroomSchedule: any }) => ({
      tab: state.Home.tab,
      data: state.Home.data,
      currentChild: state.Home.currentChild,
      loginToken: state.Login.loginToken,
      loginData: state.Login.loginData,
      myFilter: state.Home.myFilter,
      filterNum: state.Home.filterNum,
      page: state.Home.page,
      classroomChild: state.ClassroomSchedule.classroomChild,
      searchQuery: state.Home.searchQuery,
    })
  );

  React.useEffect(() => {
    SplashScreen.hide();
    Constants.setAuthorizationToken(
      loginToken.length === 0 ? false : true,
      loginToken
    );
    setLoading(true);

    CommonFunctions.isEmpty(classroomChild)
      ? dispatch(
          updateClassChild(
            {
              id: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () => {}
          )
        )
      : null;
    loginData.Children.length > 1
      ? hitHomeAPI(currentChild.child)
      : loginData.Children[0].id !== currentChild.child
      ? dispatch(
          updateChild(
            {
              child: loginData.Children[0].id,
              name: loginData.Children[0].first_name,
              classroom: loginData.Children[0].classroom_id,
            },
            () => hitHomeAPI(loginData.Children[0].id)
          )
        )
      : hitHomeAPI(currentChild.child);
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
              () => hitHomeAPI(currentChild.child),
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

  const hitHomeAPI = (child_id: number) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          console.log("home data   ", data);

          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(data);
          setLoading(false);
          // dispatch(updatePage(1, () => {}));
        },
        () => {
          setLoading(false);
        },
        child_id,
        0,
        myFilter.activity,
        myFilter.fromDate,
        myFilter.toDate,
        myFilter.type
      )
    );
  };

  const NewhitHomeAPI = () => {
    console.log("sending my page  ", page);
    // setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          console.log("home data   ", data);

          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(homeData.concat(data));
          // dispatch(updatePage(page + 1, () => {}));
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        page,
        myFilter.activity,
        myFilter.fromDate,
        myFilter.toDate,
        myFilter.type,
        searchQuery
      )
    );
  };

  const hitFilterAPI = (
    activity?: string,
    fromDate?: string,
    toDate?: string,
    type?: string
  ) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setHomeData(data);
          // dispatch(updatePage(1, () => {}));
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        0,
        activity,
        fromDate,
        toDate,
        type
      )
    );
  };

  const hitSearchAPI = (query: string) => {
    setLoading(true);
    dispatch(
      HomeAPI(
        (data: any) => {
          console.log("search ", data);
          dispatch(updateQuery(query, () => {}));
          data.length === 0 ? setLoadMore(false) : setLoadMore(true);
          setLoading(false);
          setHomeData(data);
          // dispatch(updatePage(1, () => {}));
          setLoading(false);
        },
        () => {
          setLoading(false);
        },
        currentChild.child,
        0,
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
              setQuery(text);
              hitSearchAPI(text);
            }}
            onPressCancel={() => {
              setQuery("");
              hitHomeAPI(currentChild.child);
            }}
            mainViewStyle={{ backgroundColor: "white", width: "87%" }}
            inputTextStyle={{ width: "64%" }}
            onSubmitEditing={() => Keyboard.dismiss()}
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
        <CustomLoader loading={loading} />
        {homeData.length === 0 && !loading ? (
          <CustomNoData />
        ) : (
          <FlatList
            data={homeData}
            keyExtractor={(item, index) => index.toString()}
            bounces={false}
            renderItem={renderItems}
            nestedScrollEnabled={true}
            onEndReached={() => (loadMore ? NewhitHomeAPI() : null)}
            onEndReachedThreshold={0.5}
            // ListFooterComponent={() => {
            //   if (loadMore && !loading) {
            //     return <CustomLoader loading={true} />;
            //   } else {
            //     return null;
            //   }
            // }}
          />
        )}
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <View style={Styles.modalView}>
          <View />
          <FilterModal
            setModalOpen={(value: boolean) => setModalOpen(value)}
            resetFilter={() => {
              setModalOpen(false);
              // hitHomeAPI(currentChild.child);
              hitFilterAPI();
            }}
            applyFilter={(value: any, Activitytype: Array<any>, dates: any) => {
              console.log("incoming  ", value, dates, Activitytype);

              let to = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.toDate, "ymd");
              let from = CommonFunctions.isEmpty(dates)
                ? ""
                : CommonFunctions.dateTypeFormat(dates.fromDate, "ymd");
              // dispatch(
              //   updatePage(0, () => {
              dispatch(
                addFilter(myFilter.activity, from, to, Activitytype, () => {
                  console.warn(" filter redux ...", myFilter);
                  hitFilterAPI(value, from, to, Activitytype.join(","));
                })
              );
              // })
              // );
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
