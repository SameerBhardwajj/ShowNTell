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
const TYPE_URL = "url";
const TYPE_TEXT = "text";

export interface AppProps {
  navigation?: any;
  route?: any;
}

export default function App(props: AppProps) {
  const { params } = props.route;

  const openShare = () => {
    const url = params.img;
    const title = params.categoryName;
    const message = params.activityName;
    const options = Platform.select({
      ios: {
        activityItemSources: [
          {
            placeholderItem: { type: TYPE_URL, content: url },
            item: {
              default: { type: TYPE_URL, content: url },
            },
            type: {
              print: { type: TYPE_URL, content: url },
            },
            subject: {
              default: title,
            },
            linkMetadata: { originalUrl: url, url, title },
          },
          {
            placeholderItem: { type: TYPE_TEXT, content: message },
            item: {
              default: { type: TYPE_TEXT, content: message },
              message: message, // Specify no text to share via Messages app.
            },
          },
        ],
      },
      default: {
        title,
        subject: title,
        message: `${message} ${url} ${params.childName}`,
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
          onPress={() => openShare()}
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
    width: "95%",
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
    width: "95%",
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
