import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Strings, vw, vh, Images, Colors, validate } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
  select: boolean;
}

export default function App(props: AppProps) {
  const [selected, setSelected] = useState(false);
  const index = parseInt(props.index);
  console.warn(props.select);

  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      {index % 2 === 0 ? (
        <View style={Styles.picsView}>
          <TouchableOpacity
            style={[
              Styles.bigView,
              { borderColor: props.item[0].selected ? Colors.orange : "white" },
            ]}
            onPress={() => props.onPress(props.item[0])}
          >
            <Image source={{ uri: props.item[0].img }} style={Styles.bigImg} />
          </TouchableOpacity>
          <View style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              style={[
                Styles.smallView,
                {
                  borderColor: props.item[0].selected ? Colors.orange : "white",
                },
              ]}
              onPress={() => props.onPress(props.item[1])}
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Styles.smallView,
                {
                  borderColor: props.item[0].selected ? Colors.orange : "white",
                },
              ]}
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
              style={[
                Styles.smallView,
                {
                  borderColor: props.item[0].selected ? Colors.orange : "white",
                },
              ]}
              onPress={() => props.onPress(props.item[0])}
            >
              <Image
                source={{ uri: props.item[0].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                Styles.smallView,
                {
                  borderColor: props.item[0].selected ? Colors.orange : "white",
                },
              ]}
              onPress={() => props.onPress(props.item[1])}
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[
              Styles.bigView,
              { borderColor: props.item[0].selected ? Colors.orange : "white" },
            ]}
            onPress={() => props.onPress(props.item[2])}
          >
            <Image source={{ uri: props.item[2].img }} style={Styles.bigImg} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  picsView: {
    flexDirection: "row",
    width: "95%",
    height: vh(198),
    justifyContent: "space-between",
    marginBottom: vh(16),
  },
  bigView: {
    height: "100%",
    width: vw(175),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
  },
  bigImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
  smallView: {
    height: "46%",
    width: vw(175),
    borderRadius: vh(12),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vh(3),
  },
  smallImg: {
    height: "100%",
    width: "100%",
    borderRadius: vh(10),
  },
});
