import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { vh, Colors, Images, vw, Strings } from "../../utils";
import { CustomButton } from "../../Components";

export interface AppProps {
  navigation?: any;
  item: any;
}

export default function App(props: AppProps) {
  const { navigation, item } = props;
  return (
    <View style={Styles.innerView}>
      {/* Lunch View */}
      {item.activityType === "Lunch" ? (
        <View style={Styles.mainInnerView}>
          <Image source={Images.any} style={Styles.imgView} />
          <View style={Styles.lunchView}>
            <View style={Styles.nameView}>
              <Image source={Images.any} style={Styles.childAvatar} />
              <View style={Styles.centerNameView}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() =>
                    props.navigation.navigate("ActivityModal", {
                      name: Strings.lunch_name,
                      msg: Strings.lunch_msg,
                    })
                  }
                >
                  <Text style={Styles.name}>
                    {item.name}{' . '} 
                    <Text style={{ color: Colors.orange }}>
                       {Strings.lunch_time}
                    </Text>
                  </Text>
                </TouchableOpacity>
                <Text style={Styles.category}>{item.category}</Text>
                <Text style={Styles.content}>{item.content}</Text>
                <Text style={Styles.time}>
                  {item.date}
                  {Strings.at}
                  {item.time}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.ElipsisImg}
                onPress={() => props.navigation.navigate("ShareModal")}
              >
                <Image source={Images.Elipsis} style={{ padding: vh(2) }} />
              </TouchableOpacity>
            </View>
            <Text style={Styles.description}>{item.description}</Text>
          </View>
        </View>
      ) : null}
      {/* Announcements */}
      {item.activityType === "Announcement" ? (
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
      ) : null}
      {/* Question of the Day */}
      {item.activityType === "QOA" ? (
        <View style={[Styles.mainInnerView, Styles.viewQOD]}>
          <View style={{ flexDirection: "row" }}>
            <Image source={Images.any} style={Styles.childAvatar} />
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
      ) : null}
    </View>
  );
}
const Styles = StyleSheet.create({
  innerView: {
    paddingVertical: vh(5),
    paddingHorizontal: vh(16),
    alignItems: "center",
    width: "97%",
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
