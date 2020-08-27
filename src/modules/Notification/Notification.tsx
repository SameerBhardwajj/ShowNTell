import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useIsFocused } from "@react-navigation/native";

// Custom imports
import { CustomHeader, CustomLoader, CustomNoData } from "../../Components";
import { Strings, vh, vw, Colors, CommonFunctions, Images } from "../../utils";
import List from "./List";
import {
  hitNotificationAPI,
  hitAcknowledgeSupply,
  hitReadNotifications,
} from "./action";
import NotificationModal from "./NotificationModal";

const iPhoneX = Dimensions.get("window").height >= 812;

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
    data.length === 0 ? setLoading(true) : null;
    focused
      ? (hitAPI(0),
        hitReadNotifications(
          () => {},
          () => {}
        ))
      : null;
  }, [focused]);

  const hitAPI = (page: number) => {
    page > 0 ? setLoadFooter(true) : setLoadFooter(false);
    dispatch(
      hitNotificationAPI(
        page,
        () => {
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
      />
    );
  };
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Notification}
        onPressBack={() => props.navigation.pop()}
      />
      <TouchableOpacity
        style={Styles.notificationIcon}
        activeOpacity={0.8}
        onPress={() => setModalOpen(true)}
      >
        <Image source={Images.setting_Icon} style={{ tintColor: "white" }} />
      </TouchableOpacity>
      <CustomLoader loading={loading} />
      {loading ? null : CommonFunctions.isNullUndefined(data) ? (
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
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <NotificationModal setModalOpen={() => setModalOpen(!modalOpen)} />
      </Modal>
    </View>
  );
}
const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    paddingBottom: vh(30),
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
    top: iPhoneX ? vh(30) : vh(15),
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
