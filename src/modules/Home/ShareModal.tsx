import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Share from "react-native-share";

// custom imports
import { vw, Strings, vh, Colors } from "../../utils";

const img =
  "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const openShare = (titles: string, urls: string) => {
    const url = urls;
    const title = titles;
    const message = "Please check this out.";
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: "url", content: url },
            item: {
              default: { type: "url", content: url },
            },
            type: {
              print: { type: "url", content: url },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: url, url, title },
          },
          {
            placeholderItem: { type: "text", content: message },
            item: {
              default: { type: "text", content: message },
              message: null, // Specify no text to share via Messages app.
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message} ${url}`,
      },
    });
    // @ts-ignore
    Share.open(options)
      .then((res: any) => {
        console.log(res);
      })
      .catch((err: any) => {
        err && console.log(err);
      });
  };

  return (
    <View style={Styles.mainView}>
      <View style={Styles.modalView}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.shareView}
          onPress={() => openShare("Alex doing Lunch", img)}
        >
          <Text style={Styles.bubbleMsgText}>{Strings.Share}</Text>
        </TouchableOpacity>
        <View style={Styles.separatorView} />
        <TouchableOpacity
          activeOpacity={0.8}
          style={Styles.shareView}
          onPress={() => props.navigation.pop()}
        >
          <Text style={Styles.bubbleMsgText}>
            {Strings.Save_to_Photo_Library}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={Styles.cancelView}
        onPress={() => props.navigation.pop()}
      >
        <Text style={Styles.cancelText}>{Strings.Cancel}</Text>
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.modalBg,
  },
  modalView: {
    backgroundColor: "white",
    width: "90%",
    alignItems: "center",
    borderRadius: vw(20),
    paddingHorizontal: vw(18),
  },
  shareView: {
    width: "100%",
    paddingVertical: vh(25),
  },
  bubbleMsgText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
    textAlign: "center",
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    backgroundColor: Colors.separator,
  },
  cancelView: {
    width: "90%",
    paddingVertical: vh(13),
    backgroundColor: "white",
    marginTop: vh(10),
    borderRadius: vh(30),
    marginBottom: vh(30),
  },
  cancelText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    textAlign: "center",
    color: Colors.lightBlack,
  },
});
