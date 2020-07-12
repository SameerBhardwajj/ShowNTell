import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";

class FirebaseService {
  constructor() {
    this.initializeFireBase();
  }

  initializeFireBase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyD8vZG_8Z_o3J4JY6k1GUJa6mhNW8j0Rsg",
        appId: "1:1082193980667:android:ecccf926e213892674545e",
        databaseURL: "https://showntell-parent.firebaseio.com",
        messagingSenderId: "1082193980667",
        projectId: "showntell-parent",
        storageBucket: "showntell-parent.appspot.com",
      });
    }
  };

  // checking permissions for FCM
  async checkPermission(callback: Function) {
    const enabled = await messaging().hasPermission();
    console.warn(enabled);
    const mtOPermission = await messaging().registerForRemoteNotifications();
    console.warn(
      "isRegister   ",
      mtOPermission,
      messaging().isRegisteredForRemoteNotifications
    );

    if (enabled) {
      this.getToken((token: string) => callback(token));
    } else {
      this.requestPermission((token: string) => callback(token));
    }
  }

  // getting token for FCM
  async getToken(callback: Function) {
    // let fcmToken = await AsyncStorage.getItem("fcmToken");
    // if (!fcmToken) {
    let fcmToken = await messaging().getToken();
    // if (fcmToken) {
    // user has a device token
    // await AsyncStorage.setItem("fcmToken", fcmToken);
    callback(fcmToken);
    // }
    // } else {
    //   callback(fcmToken);
    // }
  }

  // requesting permissions
  async requestPermission(callback: Function) {
    try {
      await messaging().requestPermission();
      // User has authorised
      this.getToken((token: string) => callback(token));
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected");
    }
  }

  requestNotification = (callback: Function) => {
    messaging()
      .requestPermission()
      .then(() => {
        messaging()
          .registerForRemoteNotifications()
          .then(() => {
            messaging()
              .getToken()
              .then((token) => {
                callback(token);
              });
          });
      })
      .catch((error) => {
        // User has rejected permissions
        console.log(error);
      });
  };

  // foreground notification message
  async readForegroundNotification() {
    messaging().onMessage(async (message: any) => {
      //process data message
      console.warn(message);
    });
  }

  // background notification message
  async readBackgroundNotification() {
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.warn("Message handled in the background!", remoteMessage);
    });
  }
}
export default new FirebaseService();
