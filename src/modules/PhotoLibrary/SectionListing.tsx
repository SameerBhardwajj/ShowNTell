import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import GalleryFlatlist from "./GalleryFlatlist";
import { vh, CommonFunctions } from "../../utils";

export interface AppProps {
  index: string;
  item: any;
  navigation?: any;
  select: boolean;
}

export default function App(props: AppProps) {
  //   const arrangeData = (data: any) => {
  //     let dataArray = new Array();
  //     let n = data.length;
  //     if (n === 0) return [];
  //     for (let i = 0; i < data.length; i++) {
  //       if (n % i === 3)
  //         dataArray.push([data[i], data[(i += 1)], data[(i += 1)]]);
  //       else if (n % i === 2) dataArray.push([data[i], data[(i += 1)]]);
  //       else if (n % i === 0) dataArray.push([data[i]]);
  //       else return;
  //     }
  //     console.log("arr ", dataArray);

  //     return dataArray;
  //   };

  const arrangeData = (data: any) => {
    let dataArray = new Array().slice(0);
    let i = -1;

    let n = data.length;
    if (n === 0) return [];
    for (let i = 0; i < data.length; i++) {
      //   if (n % i === 1) dataArray.push([data[i]]);
      //   else if (n % i === 2) dataArray.push([data[i], data[(i += 1)]]);
      //   else
      dataArray.push([data[i], data[(i += 1)], data[(i += 1)]]);
    }
    // data.map((item: any, index: number) => {
    //   if (item.length === 0) return;
    //   if ((index + 1) % 3 === 0) {
    //     i++;
    //     dataArray[i] = [];
    //   }
    //   if (!CommonFunctions.isNullUndefined(dataArray[i]))
    //     dataArray[i].push(item);
    // });

    dataArray.filter((item) => item !== undefined);
    console.log("arr ", dataArray);
    return dataArray;
  };

  const renderItems = (rowData: any) => {
    const { item, index } = rowData;
    return (
      <GalleryFlatlist
        item={item}
        index={index}
        navigation={props.navigation}
        select={props.select}
        data={props.item.length === 0 ? [] : arrangeData(props.item)}
        // onLongPress={() => setSelect(true)}
        // onPress={(data: any, dataIndex: number) =>
        //   select
        //     ? ((dataArray[index][dataIndex].selected = !dataArray[index][
        //         dataIndex
        //       ].selected),
        //       console.warn(dataArray[index][dataIndex].selected))
        //     : (dispatch(updateTab(false, () => {})),
        //       props.navigation.navigate(ScreenName.GALLERY_DETAILS, {
        //         item: data,
        //       }))
        // }
      />
    );
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={props.item.length === 0 ? [] : arrangeData(props.item)}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItems}
      />
    </View>
  );
}
