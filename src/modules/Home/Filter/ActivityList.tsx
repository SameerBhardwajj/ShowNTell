import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { vh, Images, CommonFunctions } from "../../../utils";
import { addFilter } from "../action";

export interface AppProps {
  index: string;
  item: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const { myFilter } = useSelector((state: { Home: any }) => ({
    myFilter: state.Home.myFilter,
  }));

  React.useEffect(() => {
    console.warn(' check  ', check);
    console.warn('len  ',myFilter.activity.length, myFilter.activity);
    
    let temp: any = myFilter.activity;
    myFilter.activity.length === 0
      ? null
      : temp.includes(props.item.id.toString())
      ? (setCheck(true), console.warn('here')
      )
      : null;
  }, [myFilter]);

  return (
    <View style={Styles.activityHeadView}>
      <View>
        <Text style={Styles.subActivityText}>{props.item.name}</Text>
      </View>
      <TouchableOpacity
        style={Styles.iconView}
        activeOpacity={0.8}
        onPress={() => {
          let temp: Array<any> = myFilter.activity;
          if (!check) {
            temp = temp.concat(`${props.item.id}`);
            temp.sort();
            dispatch(
              addFilter(
                temp,
                myFilter.fromDate,
                myFilter.toDate,
                myFilter.type,
                () => setCheck(!check)
              )
            );
          } else {
            temp = temp.filter(
              (item: any) => !item.includes(parseInt(props.item.id.toString()))
            );
            dispatch(
              addFilter(
                temp,
                myFilter.date,
                myFilter.toDate,
                myFilter.type,
                () => setCheck(!check)
              )
            );
          }
        }}
      >
        <Image
          source={check ? Images.Check_Box_Active : Images.Check_Box_inactive}
          style={{ alignSelf: "center" }}
          resizeMode="center"
          resizeMethod="resize"
        />
      </TouchableOpacity>
    </View>
  );
}
const Styles = StyleSheet.create({
  activityHeadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  subActivityText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
  iconView: {
    paddingHorizontal: vh(14),
    paddingVertical: vh(8),
    alignItems: "center",
    justifyContent: "center",
  },
});