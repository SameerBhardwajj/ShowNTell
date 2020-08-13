import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Dimensions,
} from "react-native";
import {
  vh,
  Colors,
  Images,
  vw,
  Strings,
  ScreenName,
  CommonFunctions,
} from "../../utils";
// @ts-ignore
import ReactNativeZoomableView from "@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView";
// @ts-ignore
import AnimateLoadingButton from "react-native-animate-loading-button";
import { useDispatch } from "react-redux";
import { weDidItAPI } from "./action";

const ACTIVITY = "ACTIVITY";
const ANNOUNCEMENT = "ANNOUNCEMENT";
const QOTD = "QOTD";

const iPhoneX = Dimensions.get("window").height >= 812;

export interface AppProps {
  navigation?: any;
  item: any;
  openShareModal: Function;
}

export default function App(props: AppProps) {
  const { item } = props;
  const [picModalOpen, setPicModalOpen] = useState(false);
  const [check, setCheck] = useState(true);
  const input: any = React.createRef();
  const dispatch = useDispatch();

  const pressBtn = () => {
    input.current.showLoading(true);
    dispatch(
      weDidItAPI(
        item.id,
        () => {
          setCheck(false);
          input.current.showLoading(false);
        },
        () => {
          input.current.showLoading(false);
        }
      )
    );
  };

  return (
    <View style={Styles.innerView}>
      {/* Activity View ------------------ */}
      {item.type === ACTIVITY ? (
        <View style={[Styles.mainInnerView, Styles.mainShadow]}>
          {item.activity_status_id === "3" ||
          item.child_activity_image === null ? null : (
            <TouchableOpacity
              style={Styles.imgView}
              activeOpacity={1}
              onPress={() => setPicModalOpen(true)}
            >
              <Image
                source={{ uri: item.child_activity_image }}
                style={Styles.imgActivity}
              />
            </TouchableOpacity>
          )}
          <View style={Styles.lunchView}>
            <View style={Styles.nameView}>
              <View style={Styles.childAvatar}>
                <Image
                  source={
                    CommonFunctions.isNullUndefined(item.Child.child_image)
                      ? Images.Profile_Placeholder
                      : { uri: item.Child.s3_photo_path }
                  }
                  style={{ width: vh(35), height: vh(38) }}
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
                  <Text style={Styles.content}>{item.sub_activity_name}</Text>
                </TouchableOpacity>
                <Text style={Styles.time}>
                  {CommonFunctions.DateFormatter(item.create_dt)}
                  {Strings.at}
                  {CommonFunctions.timeFormatter(item.create_dt)}
                </Text>
              </View>
              {item.activity_status_id === "3" ||
              item.child_activity_image === null ? null : (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={Styles.ElipsisImg}
                  onPress={() =>
                    props.openShareModal({
                      img: item.child_activity_image,
                      status: item.activity_status_id,
                      categoryName: item.category_name,
                      activityName: item.activity_name,
                      childName: `${item.Child.first_name} ${item.Child.last_name}`,
                      id: item.id,
                    })
                  }
                >
                  <Image source={Images.Elipsis} style={{ padding: vh(1) }} />
                </TouchableOpacity>
              )}
            </View>
            {CommonFunctions.isNullUndefined(
              item.activity_description
            ) ? null : (
              <Text style={Styles.description}>
                {item.activity_description.split("<br/>").join("\n")}
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
                  CommonFunctions.isNullUndefined(item.Child.child_image)
                    ? Images.Profile_Placeholder
                    : { uri: item.Child.s3_photo_path }
                }
                style={{ width: vh(35), height: vh(38) }}
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
          <Text style={Styles.annTitle}>{item.title}</Text>
          <Text style={Styles.annDescription}>
            {item.description.split("<br/>").join("\n")}
          </Text>
          <Image style={Styles.imgAnn} source={Images.Announcement_Icon} />
        </View>
      ) : null}
      {/* Question of the Day --------------------- */}
      {item.type === QOTD ? (
        <View style={[Styles.mainInnerView, Styles.viewQOD]}>
          <View
            style={{ flexDirection: "row", margin: vh(16), marginBottom: 0 }}
          >
            <View style={Styles.childAvatar}>
              <Image
                source={
                  CommonFunctions.isNullUndefined(item.Child.child_image)
                    ? Images.Profile_Placeholder
                    : { uri: item.Child.s3_photo_path }
                }
                style={{ width: vh(35), height: vh(38) }}
              />
            </View>
            <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
              <Text style={Styles.name}>
                {item.Child.first_name} {item.Child.last_name}
              </Text>
              <Text style={Styles.classText}>{item.classroom_name}</Text>
            </View>
          </View>
          <Text style={[Styles.time, { paddingLeft: vh(16) }]}>
            {CommonFunctions.DateFormatter(new Date(item.create_dt))}
            {Strings.at}
            {CommonFunctions.timeFormatter(new Date(item.create_dt))}
          </Text>
          {CommonFunctions.isNullUndefined(item.QuestionOfTheDay) ? null : (
            <Text style={[Styles.timeBlack, { paddingLeft: vh(16) }]}>
              {item.QuestionOfTheDay.question}
            </Text>
          )}
          <Image style={Styles.imgAnn} source={Images.Announcement_light} />
          {CommonFunctions.isNullUndefined(item.acknowledged_at) && check ? (
            <View style={Styles.animBtn}>
              <AnimateLoadingButton
                ref={input}
                width={vw(300)}
                height={vh(48)}
                title={Strings.We_did_it}
                titleFontSize={vh(16)}
                titleFontFamily={"Nunito-Bold"}
                titleColor="white"
                backgroundColor={Colors.waterBlue}
                borderRadius={vh(25)}
                onPress={() => pressBtn()}
              />
            </View>
          ) : (
            <View style={Styles.btnView}>
              <Text style={Styles.btnTxt}>{Strings.Done}</Text>
            </View>
          )}
        </View>
      ) : null}
      {/* Picture modal with zoom n pinch ------------------- */}
      <Modal animationType="slide" transparent={true} visible={picModalOpen}>
        <View style={Styles.picModalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setPicModalOpen(false)}
            style={Styles.modalBack}
          >
            <Image source={Images.back_icon} />
          </TouchableOpacity>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={1}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
            captureEvent={true}
          >
            <Image
              source={{ uri: item.child_activity_image }}
              style={Styles.img}
            />
          </ReactNativeZoomableView>
        </View>
      </Modal>
    </View>
  );
}
const Styles = StyleSheet.create({
  innerView: {
    paddingVertical: vh(5),
    paddingHorizontal: vh(16),
    alignItems: "center",
    width: "100%",
  },
  mainInnerView: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: vh(15),
    borderRadius: vh(10),
    borderWidth: vw(1),
    borderColor: Colors.chatBorderGrey,
  },
  mainShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.65,
    elevation: 7,
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
    fontSize: vh(20),
    marginVertical: vh(10),
  },
  lunchView: {
    padding: vh(16),
  },
  nameView: {
    flexDirection: "row",
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
    borderColor: Colors.green,
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
    paddingBottom: vh(5),
  },
  imgAnn: {
    position: "absolute",
    right: -10,
    top: -10,
  },
  viewQOD: {
    borderColor: Colors.waterBlue,
    backgroundColor: Colors.lightWaterBlue,
    alignItems: "flex-start",
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  picModalView: {
    flex: 1,
    backgroundColor: "black",
  },
  img: {
    width: "100%",
    height: vh(250),
    backgroundColor: "white",
  },
  modalBack: {
    position: "absolute",
    top: iPhoneX ? vh(30) : 0,
    left: 0,
    padding: vh(20),
    zIndex: 99,
  },
  animBtn: {
    width: "100%",
    marginVertical: vh(16),
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: vh(16),
    backgroundColor: Colors.lightWaterBlue,
  },
  btnTxt: {
    padding: vh(8),
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    color: Colors.waterBlue,
  },
});
