import messaging from "@react-native-firebase/messaging";
import firebase from "@react-native-firebase/app";
import { Platform } from "react-native";

class FirebaseService {
  constructor() {
    this.initializeFireBase();
  }

  initializeFireBase = () => {
    // if (!firebase.apps.length && Platform.OS === "android") {
      if (Platform.OS === "android") {
      // firebase.initializeApp({
      //   apiKey: "AIzaSyD8vZG_8Z_o3J4JY6k1GUJa6mhNW8j0Rsg",
      //   appId: "1:1082193980667:android:ecccf926e213892674545e",
      //   databaseURL: "https://showntell-parent.firebaseio.com",
      //   messagingSenderId: "1082193980667",
      //   projectId: "showntell-parent",
      //   storageBucket: "showntell-parent.appspot.com",
      // });
      firebase.initializeApp({
        apiKey: "AIzaSyAgbRf4eepdCoILs6he38OvrUQRBEk_y2g",
        appId: "1:875888891093:android:8f6f3b99dcef44f645be5c",
        databaseURL: "https://tleparentappv3.firebaseio.com",
        messagingSenderId: "875888891093",
        projectId: "tleparentappv3",
        storageBucket: "tleparentappv3.appspot.com",
      });
    }
  };

  // checking permissions for FCM
  async checkPermission(callback: Function) {
    const enabled = await messaging().hasPermission();

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
    console.warn(fcmToken);

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
