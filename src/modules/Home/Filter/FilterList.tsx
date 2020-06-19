import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from "react-native";
import { vh, Images } from "../../../utils";
import ActivityList from "./ActivityList";

export interface AppProps {
  item: any;
  index: string;
}

export default function App(props: AppProps) {
  const [show, setShow] = useState(false);

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return <ActivityList item={item} index={index} />;
  };

  return (
    <View style={Styles.activityView}>
      <View style={Styles.activityHeadView}>
        <View>
          <Text style={Styles.activityHeadText}>{props.item.name}</Text>
        </View>
        <TouchableOpacity
          style={Styles.iconView}
          activeOpacity={0.8}
          onPress={() => setShow(!show)}
        >
          <Image
            source={Images.Drop_Down_icon}
            style={{ alignSelf: "center" }}
            resizeMode="center"
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
      {show && (
        <FlatList
          data={props.item.ActivityValuesOri}
          listKey={Math.random().toString()}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItems}
        />
      )}
    </View>
  );
}
const Styles = StyleSheet.create({
  activityView: {
    width: "100%",
    marginTop: vh(14),
  },
  activityHeadView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  activityHeadText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  iconView: {
    paddingHorizontal: vh(14),
    paddingVertical: vh(8),
    alignItems: "center",
    justifyContent: "center",
  },
});
