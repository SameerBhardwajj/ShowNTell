/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from "react";

import Router from "./src/router";
import { Provider } from "react-redux";
import { store, persistor } from "./src/store/Store";
import { PersistGate } from "redux-persist/es/integration/react";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "@aws-amplify/pushnotification";
import { Platform } from "react-native";

PushNotification.requestIOSPermissions({
  alert: true,
  badge: true,
  sound: false,
});

PushNotification.onNotification((notification: any) => {
  if (notification.foreground) {
    console.warn("onNotification foreground", notification);
  } else {
    console.warn("onNotification background or closed", notification);
  }
  // extract the data passed in the push notification
  const data = JSON.parse(notification.data["pinpoint.jsonBody"]);
  console.warn("onNotification data", data);
  // iOS only
  Platform.OS === "ios"
    ? notification.finish(PushNotificationIOS.FetchResult.NoData)
    : null;
});
PushNotification.onNotificationOpened((notification: any) => {
  console.warn("onNotificationOpened", notification);
  // extract the data passed in the push notification
  const data = JSON.parse(notification["pinpoint.jsonBody"]);
  console.warn("onNotificationOpened data", data);
});

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
