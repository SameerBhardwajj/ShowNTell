import * as React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";
import { Styles } from "./PhotoGallery";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
}

export default function App(props: AppProps) {
  const index = parseInt(props.index);

  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      {index % 2 === 0 ? (
        <View style={Styles.picsView}>
          <TouchableOpacity
            style={Styles.bigView}
            onPress={() => props.onPress(props.item[0])}
          >
            <Image source={{ uri: props.item[0].img }} style={Styles.bigImg} />
          </TouchableOpacity>
          <View style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              style={Styles.smallView}
              onPress={() => props.onPress(props.item[1])}
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.smallView}
              onPress={() => props.onPress(props.item[2])}
            >
              <Image
                source={{ uri: props.item[2].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={Styles.picsView}>
          <View style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              style={Styles.smallView}
              onPress={() => props.onPress(props.item[0])}
            >
              <Image
                source={{ uri: props.item[0].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={Styles.smallView}
              onPress={() => props.onPress(props.item[1])}
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={Styles.bigView}
            onPress={() => props.onPress(props.item[2])}
          >
            <Image source={{ uri: props.item[2].img }} style={Styles.bigImg} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
