import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";
import PushNotificationIOS from "@react-native-community/push-notification-ios";

// Custom imports
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import {
  Strings,
  vh,
  vw,
  Colors,
  CommonFunctions,
  Images,
  ScreenName,
} from "../../utils";
import List from "./List";
import {
  hitNotificationAPI,
  hitAcknowledgeSupply,
  hitReadNotifications,
} from "./action";
import NotificationModal from "./NotificationModal";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const { data, page } = useSelector((state: { Notification: any }) => ({
    data: state.Notification.data,
    page: state.Notification.page,
  }));
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadFooter, setLoadFooter] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    CommonFunctions.clearAllPush();
    setLoading(true);
    focused
      ? (hitAPI(0),
        dispatch(
          hitReadNotifications(
            () => {},
            () => {}
          )
        ))
      : null;
    Platform.OS === "ios"
      ? PushNotificationIOS.setApplicationIconBadgeNumber(0)
      : null;
  }, [focused]);

  const hitAPI = (page: number) => {
    page > 0 ? setLoadFooter(true) : setLoadFooter(false);
    dispatch(
      hitNotificationAPI(
        page,
        () => {
          dispatch(
            hitReadNotifications(
              () => {},
              () => {}
            )
          );
          setLoading(false);
          setLoadFooter(false);
          setRefreshing(false);
          console.warn("ok");
        },
        () => {
          setLoading(false);
          setLoadFooter(false);
          setRefreshing(false);
        }
      )
    );
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <List
        item={item}
        index={index}
        allData={data}
        acknowledge={(id: number) => {
          dispatch(
            hitAcknowledgeSupply(
              id,
              () => {
                hitAPI(0);
              },
              () => {}
            )
          );
        }}
        navigate={() => props.navigation.navigate(ScreenName.ANNOUNCEMENT)}
      />
    );
  };
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Notifications}
        onPressBack={() => props.navigation.pop()}
      />
      <TouchableOpacity
        style={Styles.notificationIcon}
        activeOpacity={0.8}
        onPress={() => setModalOpen(true)}
      >
        <Image source={Images.setting_Icon} style={{ tintColor: "white" }} />
      </TouchableOpacity>

      {loading ? (
        <CustomLoader loading={true} />
      ) : CommonFunctions.isNullUndefined(data) ? (
        <CustomNoData />
      ) : (
        <FlatList
          data={data}
          keyboardShouldPersistTaps="handled"
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            hitAPI(0);
          }}
          showsVerticalScrollIndicator={false}
          onEndReached={() => hitAPI(page)}
          onEndReachedThreshold={0.5}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
          ListFooterComponent={() => {
            return (
              <ActivityIndicator
                color={Colors.violet}
                size="large"
                animating={loadFooter}
              />
            );
          }}
        />
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <NotificationModal setModalOpen={() => setModalOpen(!modalOpen)} />
      </Modal>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingBottom: vh(10),
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 4.65,
    elevation: 7,
  },
  notificationIcon: {
    position: "absolute",
    padding: vh(16),
    right: 0,
    top: CommonFunctions.iPhoneX ? vh(30) : vh(15),
  },
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
  msgView: {
    width: "100%",
  },
});
