import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom imports
import { CustomLoader } from "../../Components";
import { Strings, vh, vw, Colors, Images } from "../../utils";
import {
  hitNotificationSetting,
  hitNotificationActionSetting,
  hitAllNotifications,
} from "./action";
import SettingList from "./SettingList";

export interface AppProps {
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  const { settingList } = useSelector((state: { Notification: any }) => ({
    settingList: state.Notification.settingList,
  }));
  const dispatch = useDispatch();
  const [forceRender, setForeceRender] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [allNotifications, setAllNotifications] = useState(
    settingList.length === 0
      ? false
      : settingList.allNotification.isAllNotificationDisabled
  );
  const [allActivities, setAllActivities] = useState(
    settingList.length === 0
      ? false
      : settingList.allNotification.isAllNotificationActivityDisabled
  );

  useEffect(() => {
    settingList.length === 0 ? setModalLoading(true) : null;
    console.warn("useeffect");
    settingListAPI();
  }, [forceRender]);

  const settingListAPI = () => {
    dispatch(
      hitNotificationSetting(
        (data: any) => {
          setAllNotifications(data.allNotification.isAllNotificationDisabled);
          setAllActivities(
            data.allNotification.isAllNotificationActivityDisabled
          );
          setModalLoading(false);
        },
        () => {
          setModalLoading(false);
        }
      )
    );
  };

  const notificationAction = (data: object) => {
    dispatch(
      hitNotificationActionSetting(
        data,
        () => {
          console.warn("success");
          setForeceRender(!forceRender);
        },
        () => {
          console.warn("fail");
          setForeceRender(!forceRender);
        }
      )
    );
  };

  const allNotificationAction = (data: any) => {
    dispatch(
      hitAllNotifications(
        data,
        () => {
          console.warn("success");
          setForeceRender(!forceRender);
        },
        () => {
          console.warn("fail");
          setForeceRender(!forceRender);
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SettingList
        name={item.NotificationType.name}
        value={item.is_enabled}
        allCase={allNotifications}
        allNotification={allNotifications}
        onPress={(value: boolean) =>
          allNotifications
            ? null
            : notificationAction({
                is_activity: 0,
                type: value ? "enable" : "disable",
                id: item.notification_type_id,
              })
        }
      />
    );
  };

  const renderItems2 = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SettingList
        name={item.name}
        value={item.GuardianNotificationSetting.is_enabled}
        allCase={allActivities}
        allNotification={allNotifications}
        onPress={(value: boolean) =>
          allActivities
            ? null
            : notificationAction({
                is_activity: 1,
                type: value ? "enable" : "disable",
                id: item.id,
              })
        }
      />
    );
  };

  return (
    <View style={Styles.modalMainView}>
      <CustomLoader loading={modalLoading} />
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.cancelBtn}
          onPress={() => props.setModalOpen()}
        >
          <Image source={Images.Cancel_Icon} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            setAllNotifications(!allNotifications);
            allNotificationAction({
              type: "notification",
              status: allNotifications ? "enable" : "disable",
            });
          }}
          style={Styles.notificationHeader}
        >
          <Text style={Styles.headingText}>{Strings.All_Notifications}</Text>
          <Image
            source={allNotifications ? Images.Toggle_off : Images.Toggle_on}
            style={{ marginLeft: vw(10) }}
          />
        </TouchableOpacity>
        <View style={Styles.separatorView} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={Styles.msgView}
        >
          <FlatList
            data={settingList.notificationSetting}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItems}
            extraData={forceRender}
          />
          <View style={[Styles.separatorView, { marginVertical: vh(10) }]} />
          {modalLoading ? null : (
            <FlatList
              ListHeaderComponent={() => (
                <TouchableOpacity
                  activeOpacity={allNotifications ? 1 : 0.8}
                  style={Styles.listView}
                  onPress={() => {
                    allNotifications
                      ? null
                      : (setAllActivities(!allActivities),
                        allNotificationAction({
                          type: "notification-activity",
                          status: allActivities ? "enable" : "disable",
                        }));
                  }}
                >
                  <Text style={Styles.activityTxt}>{Strings.Activities}</Text>
                  <Image
                    source={
                      allActivities || allNotifications
                        ? Images.Toggle_off
                        : Images.Toggle_on
                    }
                  />
                </TouchableOpacity>
              )}
              data={settingList.activityCategory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems2}
              extraData={forceRender}
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
    height: "70%",
    alignItems: "center",
    borderTopRightRadius: vh(10),
    borderTopLeftRadius: vh(10),
    paddingVertical: vh(16),
    paddingHorizontal: vw(16),
  },
  cancelBtn: {
    position: "absolute",
    padding: vh(16),
    right: 0,
  },
  headingText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  notificationHeader: {
    flexDirection: "row",
    width: "80%",
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
    marginTop: vh(21),
  },
  listView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  activityTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    letterSpacing: -0.32,
    color: Colors.lightBlack,
    paddingVertical: vh(14),
  },
  msgView: {
    width: "100%",
  },
});
