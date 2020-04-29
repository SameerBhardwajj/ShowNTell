import React, { useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";

// custom imports
import { updateTab } from "./Action";
import { useDispatch, useSelector } from "react-redux";
import { vh, Colors, Images, vw, Strings } from "../../utils";
import { CustomSearchBar, CustomButton } from "../../Components";

const iPhoneX = Dimensions.get("window").height >= 812;
export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { tab } = useSelector((state: { Home: any }) => ({
    tab: state.Home.tab,
  }));

  React.useEffect(() => {
    const unsubscribe =
      (props.navigation.addListener("drawerOpen", (e: any) => {
        dispatch(
          updateTab(true, () => {
            console.log("drawer open", tab);
          })
        );

        debugger;
      }),
      props.navigation.addListener("drawerClose", (e: any) => {
        dispatch(
          updateTab(false, () => {
            console.log("drawer close", tab);
          })
        );

        debugger;
      }));

    return unsubscribe;
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      keyboardShouldPersistTaps={"handled"}
    >
      {console.log("rendered", tab)}
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
            />
            <TouchableOpacity activeOpacity={0.8}>
              <Image source={Images.Filter_Icon} style={Styles.filterImg} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.innerView}>
          {/* Lunch View */}
          <View style={Styles.mainInnerView}>
            <Image source={Images.any} style={Styles.imgView} />
            <View style={Styles.lunchView}>
              <View style={Styles.nameView}>
                <Image source={Images.any} style={Styles.childAvatar} />
                <View style={Styles.centerNameView}>
                  <Text style={Styles.name}>
                    Alex .{" "}
                    <Text style={{ color: Colors.orange }}>
                      {Strings.lunch_time}
                    </Text>
                  </Text>
                  <Text style={Styles.category}>Healthy Food</Text>
                  <Text style={Styles.content}>Green Veggies and Salads</Text>
                  <Text style={Styles.time}>Feb 1, 2020 at 12:00 PM</Text>
                </View>
                <TouchableOpacity activeOpacity={0.8}>
                  <Image source={Images.Elipsis} style={Styles.ElipsisImg} />
                </TouchableOpacity>
              </View>
              <Text style={Styles.description}>
                {Strings.lunch_description}
              </Text>
            </View>
          </View>
          {/* Announcements */}
          <View style={[Styles.mainInnerView, Styles.announcementView]}>
            <Text style={Styles.title}>{Strings.Announcement}</Text>
            <Text style={Styles.timeBlack}>Feb 1, 2020 . 10:00 AM</Text>
            <Text style={[Styles.timeBlack, { paddingTop: vh(30) }]}>
              {Strings.anonsmtDescription}
            </Text>
            <Image style={Styles.imgAnn} source={Images.Announcement_Icon} />
          </View>
          {/* Question of the Day */}
          <View style={[Styles.mainInnerView, Styles.viewQOD]}>
            <View style={{ flexDirection: "row" }}>
              <Image source={Images.any} style={Styles.childAvatar} />
              <View
                style={[Styles.centerNameView, { justifyContent: "center" }]}
              >
                <Text style={Styles.name}>Alex Parish</Text>
                <Text style={Styles.classText}>Infant A</Text>
              </View>
            </View>
            <Text style={[Styles.title, { color: Colors.waterBlue }]}>
              {Strings.Question_of_the_Day}
            </Text>
            <Text style={Styles.timeBlack}>{Strings.QOD_category}</Text>
            <Text style={Styles.time}>Feb 1, 2020 at 12:00 PM</Text>
            <Text style={Styles.timeBlack}>{Strings.QOD_description}</Text>
            <Image style={Styles.imgAnn} source={Images.Announcement_light} />
            <CustomButton
              ButtonStyle={Styles.btnQOD}
              Text={Strings.We_did_it}
              onPress={() => {}}
            />
          </View>
        </View>
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
    height: iPhoneX ? vh(20) : 0,
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
    width: vh(13),
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
    paddingVertical: vh(5),
    paddingHorizontal: vh(16),
    alignItems: "center",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  mainInnerView: {
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    marginVertical: vh(15),
    borderRadius: vh(10),
  },
  imgView: {
    width: "100%",
    height: vh(192),
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
  },
  lunchView: {
    padding: vh(16),
    alignItems: "center",
    width: "100%",
  },
  nameView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
    marginBottom: vh(10),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  centerNameView: {
    alignItems: "flex-start",
    width: "75%",
    paddingHorizontal: vw(15),
  },
  category: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    paddingVertical: vh(2),
  },
  content: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(12),
    color: Colors.lightGrey,
    paddingVertical: vh(2),
  },
  time: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(5),
  },
  ElipsisImg: {
    height: vw(25),
    width: vw(5),
  },
  description: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingTop: vh(10),
  },
  announcementView: {
    backgroundColor: Colors.lightGreen,
    padding: vh(16),
    alignItems: "flex-start",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    color: Colors.green,
  },
  timeBlack: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  imgAnn: {
    position: "absolute",
    right: -10,
    top: -10,
  },
  viewQOD: {
    backgroundColor: Colors.lightWaterBlue,
    padding: vh(16),
    alignItems: "flex-start",
  },
  btnQOD: {
    backgroundColor: Colors.waterBlue,
    width: "100%",
    alignSelf: "center",
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
});
