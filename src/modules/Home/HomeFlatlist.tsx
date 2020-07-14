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

const ACTIVITY = "ACTIVITY";
const ANNOUNCEMENT = "ANNOUNCEMENT";
const QOTD = "QOTD";
export interface AppProps {
  navigation?: any;
  item: any;
  weDidIt: Function;
}

export default function App(props: AppProps) {
  const { navigation, item } = props;

  return (
    <View style={Styles.innerView}>
      {/* Activity View ------------------ */}
      {item.type === ACTIVITY ? (
        <View style={Styles.mainInnerView}>
          {item.activity_status_id === "3" ||
          item.child_activity_image === null ? null : (
            <View style={Styles.imgView}>
              <Image
                source={{ uri: item.child_activity_image }}
                style={Styles.imgActivity}
              />
            </View>
          )}
          <View style={Styles.lunchView}>
            <View style={Styles.nameView}>
              <View style={Styles.childAvatar}>
                <Image
                  source={
                    item.Child.child_image === null
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
                      icon: CommonFunctions.isNullUndefined(
                        props.item.category_icon_url
                      )
                        ? null
                        : props.item.category_icon_url,
                      msg: props.item.category_description,
                    })
                  }
                >
                  <Text style={Styles.name}>
                    {item.Child.first_name} {item.Child.last_name}
                    <Text style={Styles.dotTxt}>{" . "}</Text>
                    <Text style={{ color: Colors.orange }}>
                      {item.category_name}{" "}
                      <Text style={Styles.category}>
                        {item.activity_name === null ? "" : item.activity_name}
                      </Text>
                    </Text>
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.content}>{item.sub_activity_name}</Text>
                <Text style={Styles.time}>
                  {CommonFunctions.DateFormatter(item.create_dt)}
                  {Strings.at}
                  {CommonFunctions.timeFormatter(item.create_dt)}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.ElipsisImg}
                onPress={() =>
                  navigation.navigate(ScreenName.SHARE_MODAL, {
                    img: item.child_activity_image,
                    categoryName: item.category_name,
                    activityName: item.activity_name,
                    childName: `${item.Child.first_name} ${item.Child.last_name}`,
                  })
                }
              >
                <Image source={Images.Elipsis} style={{ padding: vh(1) }} />
              </TouchableOpacity>
            </View>
            {CommonFunctions.isNullUndefined(
              item.activity_description
            ) ? null : (
              <Text style={Styles.description}>
                {item.activity_description}
              </Text>
            )}
          </View>
        </View>
      ) : null}
      {/* Announcements ---------------------- */}
      {item.type === ANNOUNCEMENT ? (
        <View style={[Styles.mainInnerView, Styles.announcementView]}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.childAvatar}>
              <Image
                source={
                  item.Child.child_image === null
                    ? Images.Profile_Placeholder
                    : { uri: item.Child.s3_photo_path }
                }
              />
            </View>
            <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
              <Text style={Styles.name}>
                {item.Child.first_name} {item.Child.last_name}
              </Text>
              <Text style={Styles.classText}>{item.Child.Classroom.name}</Text>
            </View>
          </View>
          <Text style={Styles.title}>{Strings.Announcement}</Text>
          <Text style={Styles.timeBlack}>
            {CommonFunctions.DateFormatter(new Date(item.create_dt))}{" "}
            <Text style={Styles.dotTxt}>{" . "}</Text>
            {CommonFunctions.timeFormatter(new Date(item.create_dt))}
          </Text>
          <Text style={[Styles.annTitle, { paddingTop: vh(10) }]}>
            {item.title}
          </Text>
          <Text style={Styles.annDescription}>{item.description}</Text>
          <Image style={Styles.imgAnn} source={Images.Announcement_Icon} />
        </View>
      ) : null}
      {/* Question of the Day --------------------- */}
      {item.type === QOTD ? (
        <View style={[Styles.mainInnerView, Styles.viewQOD]}>
          <View style={{ flexDirection: "row" }}>
            <View style={Styles.childAvatar}>
              <Image
                source={
                  item.Child.child_image === null
                    ? Images.Profile_Placeholder
                    : { uri: item.Child.s3_photo_path }
                }
              />
            </View>
            <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
              <Text style={Styles.name}>
                {item.Child.first_name} {item.Child.last_name}
              </Text>
              <Text style={Styles.classText}>{item.classroom_name}</Text>
            </View>
          </View>
          <Text style={[Styles.title, { color: Colors.waterBlue }]}>
            {Strings.Question_of_the_Day}
          </Text>
          {CommonFunctions.isNullUndefined(item.category_name) ? null : (
            <Text style={Styles.timeBlack}>{item.category_name}</Text>
          )}
          <Text style={Styles.time}>
            {CommonFunctions.DateFormatter(new Date(item.create_dt))}
            {Strings.at}
            {CommonFunctions.timeFormatter(new Date(item.create_dt))}
          </Text>
          {CommonFunctions.isNullUndefined(item.QuestionOfTheDay) ? null : (
            <Text style={Styles.timeBlack}>
              {item.QuestionOfTheDay.question}
            </Text>
          )}
          <Image style={Styles.imgAnn} source={Images.Announcement_light} />
          <CustomButton
            activeOpacity={
              CommonFunctions.isNullUndefined(item.acknowledged_at) ? 0.8 : 1
            }
            ButtonStyle={Styles.btnQOD}
            Text={
              CommonFunctions.isNullUndefined(item.acknowledged_at)
                ? Strings.We_did_it
                : Strings.Done
            }
            onPress={() => {
              CommonFunctions.isNullUndefined(item.acknowledged_at)
                ? props.weDidIt(item.id)
                : null;
            }}
          />
        </View>
      ) : null}
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
    backgroundColor: "white",
    width: "100%",
    marginVertical: vh(15),
    borderRadius: vh(10),
    borderWidth: vw(1),
    borderColor: Colors.chatBorderGrey,
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
  imgActivity: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: vh(10),
    borderTopRightRadius: vh(10),
  },
  dotTxt: {
    fontWeight: "900",
    marginBottom: vw(10),
    fontSize: vh(30),
  },
  lunchView: {
    padding: vh(16),
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
    backgroundColor: "white",
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  centerNameView: {
    width: "72%",
    paddingHorizontal: vw(15),
  },
  category: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(14),
    paddingVertical: vh(2),
    color: "black",
  },
  content: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(12),
    color: Colors.lightGrey,
    paddingVertical: vh(2),
  },
  time: {
    fontFamily: "Frutiger",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(5),
  },
  ElipsisImg: {
    height: vh(40),
    alignItems: "center",
    padding: vh(10),
    paddingTop: vh(3),
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
  annTitle: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  annDescription: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  timeBlack: {
    fontFamily: "Nunito-SemiBold",
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
    shadowOffset: {
      width: 0,
      height: 0,
    },
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
