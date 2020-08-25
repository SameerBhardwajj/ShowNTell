import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// Custom imports
import { CustomLoader } from "../../Components";
import { Strings, vh, vw, Colors, Images } from "../../utils";
import { hitNotificationSetting } from "./action";
import SettingList from "./SettingList";

export interface AppProps {
  setModalOpen: Function;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [modalLoading, setModalLoading] = useState(false);
  const [allNotifications, setAllNotifications] = useState(true);
  const [allActivities, setAllActivities] = useState(true);

  const { settingList } = useSelector((state: { Notification: any }) => ({
    settingList: state.Notification.settingList,
  }));

  useEffect(() => {
    settingList.length === 0 ? setModalLoading(true) : null;
    dispatch(
      hitNotificationSetting(
        () => {
          setModalLoading(false);
        },
        () => {
          setModalLoading(false);
        }
      )
    );
  }, []);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SettingList name={item.NotificationType.name} value={item.is_enabled} />
    );
  };

  const renderItems2 = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <SettingList
        name={item.name}
        value={item.GuardianNotificationSetting.is_enabled}
      />
    );
  };

  return (
    <View style={Styles.modalMainView}>
      <CustomLoader loading={modalLoading} />
      <View style={Styles.modalView}>
        <View style={Styles.modalView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.cancelBtn}
            onPress={() => props.setModalOpen()}
          >
            <Image source={Images.Cancel_Icon} />
          </TouchableOpacity>
          <Text style={Styles.headingText}>{Strings.All_Notifications}</Text>
          <View style={Styles.separatorView} />
          <View style={Styles.msgView}>
            <FlatList
              data={settingList.notificationSetting}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems}
            />
            <View style={[Styles.separatorView, { marginVertical: vh(10) }]} />
            <FlatList
              ListHeaderComponent={() => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={Styles.listView}
                  onPress={() => {}}
                >
                  <Text style={Styles.activityTxt}>{Strings.Activities}</Text>
                  <Image
                    source={allActivities ? Images.Toggle_on : Images.Toggle_on}
                  />
                </TouchableOpacity>
              )}
              data={settingList.activityCategory}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItems2}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  modalMainView: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg2,
  },
  modalView: {
    backgroundColor: "white",
    width: "100%",
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
