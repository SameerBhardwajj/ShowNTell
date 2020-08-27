import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
// @ts-ignore
import AnimateLoadingButton from "react-native-animate-loading-button";
import { Strings, vw, vh, Colors, CommonFunctions } from "../../utils";
import { CustomButton } from "../../Components";
import { hitAcknowledgeSupply } from "./action";

export interface AppProps {
  item: any;
  index: string;
  allData: Array<any>;
  acknowledge: Function;
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

  return (
    <View style={Styles.innerView}>
      {index === 0 ? (
        <Text style={[Styles.heading, { paddingTop: vh(20) }]}>{msgDate}</Text>
      ) : msgDate !== allDay() ? (
        <Text style={[Styles.heading, { paddingTop: vh(20) }]}>{msgDate}</Text>
      ) : null}
      <View
        style={[
          Styles.contentView,
          {
            backgroundColor:
              item.notification_type_id === 2
                ? Colors.fadedPink
                : (index + 1) % 3 === 1
                ? Colors.lightWaterBlue
                : (index + 1) % 3 === 2
                ? Colors.lightPink
                : Colors.lightGreen,
          },
        ]}
      >
        <Text
          style={[
            Styles.heading,
            {
              color:
                item.notification_type_id === 2
                  ? Colors.violet
                  : (index + 1) % 3 === 1
                  ? Colors.waterBlue
                  : (index + 1) % 3 === 2
                  ? Colors.pink
                  : Colors.green,
            },
          ]}
        >
          {item.name}
        </Text>
        {item.message.length === 0 ? null : (
          <Text style={Styles.content}>{item.message}</Text>
        )}
        <Text style={Styles.time}>
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
              title={Strings.We_did_it}
              titleFontSize={vh(16)}
              titleFontFamily={"Nunito-Bold"}
              titleColor="white"
              backgroundColor={Colors.violet}
              borderRadius={vh(25)}
              onPress={() => pressBtn()}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  innerView: {
    width: "100%",
    paddingHorizontal: vh(16),
  },
  contentView: {
    padding: vw(20),
    borderRadius: vh(10),
    marginTop: vh(12),
  },
  heading: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
    alignSelf: "flex-start",
  },
  content: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
  },
  time: {
    fontFamily: "Frutiger",
    fontSize: vh(14),
    paddingTop: vh(10),
    color: Colors.lightBlack,
  },
  btnView: {
    marginBottom: 0,
    marginTop: vh(32),
    width: "100%",
    alignSelf: "center",
  },
  animBtn: {
    marginTop: vh(32),
    alignItems: "center",
    justifyContent: "center",
  },
});
