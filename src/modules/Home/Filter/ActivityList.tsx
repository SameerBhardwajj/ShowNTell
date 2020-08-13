import React, { useState } from "react";
import { Text, TouchableOpacity, Image, StyleSheet } from "react-native";
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
    let temp: any = myFilter.activity;
    CommonFunctions.isNullUndefined(temp)
      ? null
      : temp.includes(props.item.id.toString())
      ? setCheck(true)
      : null;
  }, []);

  return (
    <TouchableOpacity
      style={Styles.activityHeadView}
      activeOpacity={0.8}
      onPress={() => {
        let temp: Array<any> = myFilter.activity;
        if (!check) {
          setCheck(!check);
          temp = temp.concat(`${props.item.id}`);
          temp.sort();
          dispatch(
            addFilter(
              temp,
              myFilter.fromDate,
              myFilter.toDate,
              myFilter.type,
              () => {}
            )
          );
        } else {
          setCheck(!check);
          temp = temp.filter(
            (item: any) => !item.includes(parseInt(props.item.id.toString()))
          );
          dispatch(
            addFilter(
              temp,
              myFilter.date,
              myFilter.toDate,
              myFilter.type,
              () => {}
            )
          );
        }
      }}
    >
      <Text style={Styles.subActivityText}>{props.item.name}</Text>
      <Image
        source={check ? Images.Check_Box_Active : Images.Check_Box_inactive}
        style={{ alignSelf: "center" }}
        resizeMode="center"
        resizeMethod="resize"
      />
    </TouchableOpacity>
  );
}
const Styles = StyleSheet.create({
  activityHeadView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: vh(8),
  },
  subActivityText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    width: '85%'
  },
});
