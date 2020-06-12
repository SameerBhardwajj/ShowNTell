import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  CommonFunctions,
} from "../../utils";
import { CustomButton, CustomToast } from "../../Components";

const LUNCH = "Lunch";
const ANNOUNCEMENT = "Announcement";
const QOA = "QOA";
const child =
  "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
export interface AppProps {
  navigation?: any;
  item: any;
}

export default function App(props: AppProps) {
  const { navigation, item } = props;
  return (
    <View style={Styles.innerView}>
      {/* Lunch View */}
      {/* {item.activityType === LUNCH ? ( */}
      <View style={Styles.mainInnerView}>
        <View style={Styles.imgView}>
          <Image
            source={
              item.s3_photo_path === null
                ? Images.Image_Placeholder
                : { uri: item.s3_photo_path }
            }
            style={item.s3_photo_path === null ? {} : {}}
          />
        </View>
        <View style={Styles.lunchView}>
          <View style={Styles.nameView}>
            <View style={Styles.childAvatar}>
              <Image
                source={
                  item.Child.s3_photo_path === null
                    ? Images.Profile_Placeholder
                    : { uri: item.Child.s3_photo_path }
                }
              />
            </View>
            <View style={Styles.centerNameView}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  props.navigation.navigate(ScreenName.ACTIVITY_MODAL, {
                    name: Strings.lunch_name,
                    msg: Strings.lunch_msg,
                  })
                }
              >
                <Text style={Styles.name}>
                  {item.Child.first_name} {item.Child.last_name}
                  {" . "}
                  <Text style={{ color: Colors.orange }}>
                    {item.ActivityCategory.name}
                  </Text>
                </Text>
              </TouchableOpacity>
              <Text style={Styles.category}>{item.ActivityValue.name === null ? '' : item.ActivityValue.name}</Text>
              <Text style={Styles.content}>{item.ActivitySubValue.name}</Text>
              <Text style={Styles.time}>
                {CommonFunctions.DateFormatter(new Date(item.activity_dt))}
                {Strings.at}
                {CommonFunctions.timeFormatter(new Date(item.activity_dt))}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={Styles.ElipsisImg}
              onPress={() => navigation.navigate(ScreenName.SHARE_MODAL)}
            >
              <Image source={Images.Elipsis} style={{ padding: vh(1) }} />
            </TouchableOpacity>
          </View>
          {item.ActivityValue.description === null ? null : (
            <Text style={Styles.description}>
              {item.ActivityValue.description}
            </Text>
          )}
        </View>
      </View>
      {/* ) : null} */}
      {/* Announcements */}
      {/* {item.activityType === ANNOUNCEMENT ? (
        <View style={[Styles.mainInnerView, Styles.announcementView]}>
          <Text style={Styles.title}>{Strings.Announcement}</Text>
          <Text style={Styles.timeBlack}>
            {item.date} . {item.time}
          </Text>
          <Text style={[Styles.timeBlack, { paddingTop: vh(30) }]}>
            {item.description}
          </Text>
          <Image style={Styles.imgAnn} source={Images.Announcement_Icon} />
        </View>
      ) : null} */}
      {/* Question of the Day */}
      {/* {item.activityType === QOA ? (
        <View style={[Styles.mainInnerView, Styles.viewQOD]}>
          <View style={{ flexDirection: "row" }}>
            <Image source={{uri: child}} style={Styles.childAvatar} />
            <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
              <Text style={Styles.name}>{item.name}</Text>
              <Text style={Styles.classText}>{item.class}</Text>
            </View>
          </View>
          <Text style={[Styles.title, { color: Colors.waterBlue }]}>
            {Strings.Question_of_the_Day}
          </Text>
          <Text style={Styles.timeBlack}>{Strings.QOD_category}</Text>
          <Text style={Styles.time}>
            {item.date}
            {Strings.at}
            {item.time}
          </Text>
          <Text style={Styles.timeBlack}>{item.description}</Text>
          <Image style={Styles.imgAnn} source={Images.Announcement_light} />
          <CustomButton
            ButtonStyle={Styles.btnQOD}
            Text={Strings.We_did_it}
            onPress={() => {}}
          />
        </View>
      ) : null} */}
    </View>
  );
}
const Styles = StyleSheet.create({
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
    shadowOpacity: 0.15,
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
    borderBottomWidth: vw(1),
    borderColor: Colors.borderGrey,
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
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vw(1),
    borderColor: Colors.borderGrey,
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
    height: vh(40),
    alignItems: "center",
    padding: vh(10),
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
