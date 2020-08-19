import * as React from "react";
import { View, StyleSheet, Text, Platform } from "react-native";
import PushNotification from "react-native-push-notification";
import Config from "react-native-config";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { connect } from "react-redux";
import { ScreenName } from "../utils";
import { updateChatCount, hitChatCount } from "../modules/Home/action";

const CHAT = "chat";

export interface AppProps {
  navigation: any;
}

class NotificationServices extends React.Component<AppProps> {
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
        // console.warn("NOTIFICATION:", notification);
        // console.warn("props  ", props);
        this.gotoScreen(notification);

        // actionNotification(notification.action)
        // func()
        // process the notification
      },

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: Config.SERVER_KEY,

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
      default:
        return ScreenName.HOME;
    }
  };

  gotoScreen = (payload: any) => {
    payload.foreground
      ? updateChatCount(true)
      : this.props.navigation.navigate(this.getScreen(payload.type));
  };

  render() {
    return <View />;
  }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
  updateChatCount: (value: boolean) => updateChatCount(value),
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationServices);
