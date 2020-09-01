import * as React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  Modal,
} from "react-native";
import PushNotification from "react-native-push-notification";
import Config from "react-native-config";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { connect } from "react-redux";
import { ScreenName } from "../utils";
import {
  updateChatCount,
  updateNotificationCount,
} from "../modules/Home/action";
import { CustomToast } from "../Components";

const CHAT = "chat";

export interface AppProps {
  navigation: any;
  updateChatCount: Function;
  updateNotificationCount: Function;
}

export interface AppState {
  shareOpen: boolean;
  data: string;
}

class NotificationServices extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      shareOpen: false,
      data: "",
    };

    Platform.OS === "ios"
      ? PushNotificationIOS.requestPermissions({
          alert: true,
          badge: true,
          sound: true,
        })
      : null;
    PushNotification.configure({
      // (required) Called when a remote or local notification is opened or received
      onNotification: (notification: any) => {
        console.warn("NOTIFICATION:", notification);
        // this.setState({
        //   data: JSON.stringify(notification),
        //   shareOpen: true,
        // });
        // console.warn("props  ", props);
        this.gotoScreen(notification);

        // actionNotification(notification.action)
        // func()
        // process the notification
        // (required) Called when a remote is received or opened, or local notification is opened
        Platform.OS === "ios"
          ? notification.finish(PushNotificationIOS.FetchResult.NoData)
          : null;
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: '875888891093',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  getScreen = (value: string) => {
    console.warn("value", value);

    switch (value) {
      case "chat":
        return ScreenName.CHAT;
      case "supplyrequest":
        return ScreenName.NOTIFICATION;
      default:
        return ScreenName.HOME;
    }
  };

  gotoScreen = (payload: any) => {
    Platform.OS === "android"
      ? payload.foreground && !payload.userInteraction
        ? this.getScreen(payload.data.type) === ScreenName.CHAT
          ? this.props.updateChatCount(true)
          : null
        : this.props.navigation.navigate(
            this.getScreen(
              payload.foreground ? payload.data.type : payload.type
            )
          )
      : payload.foreground && !payload.userInteraction
      ? this.getScreen(payload.data.data.type) === ScreenName.CHAT
        ? this.props.updateChatCount(true)
        : null
      : this.props.navigation.navigate(this.getScreen(payload.data.data.type));
  };

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.shareOpen}
        >
          <View style={{ flex: 1, backgroundColor: "white", marginTop: 50 }}>
            <TouchableOpacity
              onPress={() => this.setState({ shareOpen: false })}
            >
              <Text>CLOSE</Text>
            </TouchableOpacity>
            <Text>{this.state.data}</Text>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Function) => ({
  updateChatCount: (value: boolean) => dispatch(updateChatCount(value)),
  updateNotificationCount: () => dispatch(updateNotificationCount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationServices);
