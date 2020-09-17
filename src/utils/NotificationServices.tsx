import * as React from "react";
import { View, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { connect } from "react-redux";
import { ScreenName } from "../utils";
import {
  updateChatCount,
  updateNotificationCount,
} from "../modules/Home/action";

const FCM_KEY_DEV = "1082193980667";
const FCM_KEY_CLIENT = "875888891093";

const FCM_KEY = FCM_KEY_DEV;

export interface AppProps {
  navigation: any;
  updateChatCount: Function;
  updateNotificationCount: Function;
}

export interface AppState {}

class NotificationServices extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

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
        this.gotoScreen(notification);

        // (required) Called when a remote is received or opened, or local notification is opened
        Platform.OS === "ios"
          ? notification.finish(PushNotificationIOS.FetchResult.NoData)
          : null;
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: FCM_KEY,

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
    return <View />;
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
