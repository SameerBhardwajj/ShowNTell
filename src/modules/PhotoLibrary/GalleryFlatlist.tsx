import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Strings, vw, vh, Images, Colors, ScreenName } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  onPress: Function;
  select: boolean;
  navigation: any;
}

export default function App(props: AppProps) {
  const [selected1, setSelected1] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const index = parseInt(props.index);
  const { select, navigation, item } = props;

  useEffect(() => {
    select === true
      ? (setSelected1(false), setSelected2(false), setSelected3(false))
      : null;
  }, [select]);

  return (
    <View style={{ flex: 1, alignItems: "center", width: "100%" }}>
      {index % 2 === 0 ? (
        <View style={Styles.picsView}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.bigView,
              { borderColor: select && selected1 ? Colors.orange : "white" },
            ]}
            onPress={() =>
              select
                ? setSelected1(!selected1)
                : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                    item: item[0],
                  })
            }
          >
            <Image source={{ uri: props.item[0].img }} style={Styles.bigImg} />
          </TouchableOpacity>
          <View style={{ justifyContent: "space-between" }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.smallView,
                {
                  borderColor: select && selected2 ? Colors.orange : "white",
                },
              ]}
              onPress={() =>
                select
                  ? setSelected2(!selected2)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[1],
                    })
              }
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.smallView,
                {
                  borderColor: select && selected3 ? Colors.orange : "white",
                },
              ]}
              onPress={() =>
                select
                  ? setSelected3(!selected3)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[2],
                    })
              }
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
              activeOpacity={0.8}
              style={[
                Styles.smallView,
                {
                  borderColor: select && selected1 ? Colors.orange : "white",
                },
              ]}
              onPress={() =>
                select
                  ? setSelected1(!selected1)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[0],
                    })
              }
            >
              <Image
                source={{ uri: props.item[0].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                Styles.smallView,
                {
                  borderColor: select && selected2 ? Colors.orange : "white",
                },
              ]}
              onPress={() =>
                select
                  ? setSelected2(!selected2)
                  : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                      item: item[1],
                    })
              }
            >
              <Image
                source={{ uri: props.item[1].img }}
                style={Styles.smallImg}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              Styles.bigView,
              { borderColor: select && selected3 ? Colors.orange : "white" },
            ]}
            onPress={() =>
              select
                ? setSelected3(!selected3)
                : navigation.navigate(ScreenName.GALLERY_DETAILS, {
                    item: item[2],
                  })
            }
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
