import React from "react";
import { View, FlatList } from "react-native";
import GalleryFlatlist from "./GalleryFlatlist";
import { CommonFunctions } from "../../utils";

export interface AppProps {
  index: string;
  item: any;
  navigation?: any;
}

export default function App(props: AppProps) {
  const arrangeData = (data: any) => {
    let dataArray = new Array().slice(0);
    let n = data.length;
    if (n === 0) return [];
    for (let i = 0; i < data.length; i++) {
      dataArray.push([data[i], data[(i += 1)], data[(i += 1)]]);
    }
    return dataArray;
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <GalleryFlatlist
        item={item}
        index={index}
        navigation={props.navigation}
        data={
          CommonFunctions.isNullUndefined(props.item)
            ? []
            : arrangeData(props.item)
        }
      />
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={
          CommonFunctions.isNullUndefined(props.item)
            ? []
            : arrangeData(props.item)
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
      />
    </View>
  );
}
