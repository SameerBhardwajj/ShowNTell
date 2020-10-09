import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
// @ts-ignore
import AnimateLoadingButton from "react-native-animate-loading-button";
import { Strings, vw, vh, Colors, CommonFunctions } from "../../utils";
import { hitAcknowledgeSupply } from "./action";

export interface AppProps {
  item: any;
  index: string;
  allData: Array<any>;
  acknowledge: Function;
  navigate: Function;
}

export default function App(props: AppProps) {
  const { item } = props;
  const input: any = React.createRef();
  const dispatch = useDispatch();
  const index = parseInt(props.index);
  const [check, setCheck] = useState(true);

  const myDay = CommonFunctions.dayDateFormatter(props.item.create_dt);

  const msgDate =
    myDay === null
      ? CommonFunctions.DateFormatter(props.item.create_dt)
      : myDay;

  // Check for showing Day
  const allDay = () => {
    let myDay = CommonFunctions.dayDateFormatter(
      props.allData[index - 1].create_dt
    );
    return myDay === null
      ? CommonFunctions.DateFormatter(props.allData[index - 1].create_dt)
      : myDay;
  };

  const pressBtn = () => {
    input.current.showLoading(true);
    dispatch(
      hitAcknowledgeSupply(
        item.type_id,
        () => {
          setCheck(false);
          input.current.showLoading(false);
        },
        () => {
          setCheck(true);
          input.current.showLoading(false);
        }
      )
    );
  };

  let lightColor =
    item.notification_type_id === 2
      ? Colors.fadedPink
      : (index + 1) % 3 === 1
      ? Colors.lightWaterBlue
      : (index + 1) % 3 === 2
      ? Colors.lightPink
      : Colors.lightGreen;

  let Color =
    item.notification_type_id === 2
      ? Colors.violet
      : (index + 1) % 3 === 1
      ? Colors.waterBlue
      : (index + 1) % 3 === 2
      ? Colors.pink
      : Colors.green;

  return (
    <View style={Styles.innerView}>
      {index === 0 ? (
        <Text style={[Styles.heading, { paddingTop: vh(20) }]}>{msgDate}</Text>
      ) : msgDate !== allDay() ? (
        <Text style={[Styles.heading, { paddingTop: vh(20) }]}>{msgDate}</Text>
      ) : null}
      <TouchableOpacity
        activeOpacity={item.notification_type_id === 6 ? 0.7 : 1}
        onPress={() =>
          item.notification_type_id === 6 ? props.navigate() : null
        }
        style={[
          Styles.contentView,
          {
            backgroundColor: lightColor,
          },
        ]}
      >
        <Text
          style={[
            Styles.heading,
            {
              color: Color,
            },
          ]}
        >
          {item.name}
        </Text>
        {item.message.length === 0 ? null : (
          <Text style={Styles.content}>{item.message}</Text>
        )}
        <Text
          style={[
            Styles.time,
            { paddingTop: item.message.length === 0 ? 0 : vh(24) },
          ]}
        >
          {CommonFunctions.timeFormatter(new Date(item.create_dt))}
        </Text>
        {item.notification_type_id === 2 &&
        CommonFunctions.isNullUndefined(item.acknowledge_by) &&
        check ? (
          <View style={Styles.animBtn}>
            <AnimateLoadingButton
              ref={input}
              width={vw(300)}
              height={vh(48)}
              title={Strings.Acknowledge}
              titleFontSize={vh(16)}
              titleFontFamily={"Nunito-Bold"}
              titleColor="white"
              backgroundColor={Colors.violet}
              borderRadius={vh(25)}
              onPress={() => pressBtn()}
            />
          </View>
        ) : Color === Colors.violet &&
          (!CommonFunctions.isNullUndefined(item.acknowledge_by) || !check) ? (
          <View
            style={[Styles.btnView, { backgroundColor: Colors.disableViolet }]}
          >
            <Text style={[Styles.btnTxt, { color: "white" }]}>
              {Strings.Done}
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerView: {
    width: "100%",
    paddingHorizontal: vh(16),
  },
  contentView: {
    borderRadius: vh(10),
    marginTop: vh(12),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
    paddingLeft: vw(16),
    paddingTop: vw(20),
    paddingBottom: vh(14),
  },
  content: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingHorizontal: vw(16),
  },
  time: {
    fontFamily: "Frutiger",
    fontSize: vh(14),
    color: Colors.lightBlack,
    paddingLeft: vw(16),
    marginBottom: vh(16),
  },
  btnView: {
    width: "100%",
    alignSelf: "center",
    borderBottomStartRadius: vh(10),
    borderBottomEndRadius: vh(10),
  },
  animBtn: {
    marginBottom: vh(16),
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    padding: vh(8),
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "center",
  },
});
