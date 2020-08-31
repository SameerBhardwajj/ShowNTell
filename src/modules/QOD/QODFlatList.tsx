import React, { useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Colors, Images, Strings, CommonFunctions, vh, vw } from "../../utils";
// @ts-ignore
import AnimateLoadingButton from "react-native-animate-loading-button";
import { useDispatch } from "react-redux";
import { weDidItAPI } from "../Home/action";

export interface AppProps {
  item: any;
  index: string;
}

export default function App(props: AppProps) {
  const { item } = props;
  const [check, setCheck] = useState(true);
  const input: any = React.createRef();
  const dispatch = useDispatch();
  const index = parseInt(props.index);
  const Color =
    (index + 1) % 3 === 1
      ? Colors.orange
      : (index + 1) % 3 === 2
      ? Colors.waterBlue
      : Colors.green;
  const lightColor =
    (index + 1) % 3 === 1
      ? Colors.lightOrange
      : (index + 1) % 3 === 2
      ? Colors.lightWaterBlue
      : Colors.lightGreen;

  const pressBtn = () => {
    input.current.showLoading(true);
    dispatch(
      weDidItAPI(
        item.id,
        () => {
          setCheck(false);
          input.current.showLoading(false);
        },
        () => {
          input.current.showLoading(false);
        }
      )
    );
  };

  return (
    <View style={[Styles.cardView, { backgroundColor: lightColor }]}>
      <View style={{ flexDirection: "row", margin: vh(16), marginBottom: 0 }}>
        <View style={Styles.childAvatar}>
          <Image
            source={
              CommonFunctions.isNullUndefined(item.Child.s3_photo_path)
                ? Images.Profile_Placeholder
                : { uri: item.Child.s3_photo_path }
            }
            style={
              CommonFunctions.isNullUndefined(item.Child.s3_photo_path)
                ? { width: vh(35), height: vh(38) }
                : { width: "100%", height: "100%", borderRadius: vh(30) }
            }
          />
        </View>
        <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
          <Text style={Styles.name}>
            {item.Child.first_name} {item.Child.last_name}
          </Text>
          <Text style={Styles.classText}>{item.Child.Classroom.name}</Text>
        </View>
      </View>
      <Text style={Styles.questionText}>
        {item.QuestionOfTheDayActivity.QuestionOfTheDay.question}
      </Text>
      <Text style={Styles.time}>
        {CommonFunctions.DateFormatter(new Date(item.create_dt))}
        {Strings.at}
        {CommonFunctions.timeFormatter(new Date(item.create_dt))}
      </Text>
      {CommonFunctions.isNullUndefined(item.acknowledged_at) && check ? (
        <View style={Styles.animBtn}>
          <AnimateLoadingButton
            ref={input}
            width={vw(300)}
            height={vh(48)}
            title={Strings.We_did_it}
            titleFontSize={vh(16)}
            titleFontFamily={"Nunito-Bold"}
            titleColor="white"
            backgroundColor={Color}
            borderRadius={vh(25)}
            onPress={() => pressBtn()}
          />
        </View>
      ) : (
        <View style={[Styles.btnView, { backgroundColor: lightColor }]}>
          <Text style={[Styles.btnTxt, { color: Color }]}>{Strings.Done}</Text>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  cardView: {
    marginVertical: vh(8),
    borderRadius: vh(10),
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    borderRadius: vh(32),
    marginBottom: vh(10),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: vw(1),
    borderColor: Colors.borderGrey,
    backgroundColor: "white",
  },
  centerNameView: {
    alignItems: "flex-start",
    width: "75%",
    paddingHorizontal: vw(15),
  },
  name: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
  time: {
    fontFamily: "Nunito-Regular",
    fontSize: vh(14),
    color: Colors.lightGrey,
    paddingVertical: vh(5),
    paddingLeft: vh(16),
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    paddingVertical: vh(5),
  },
  questionText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingVertical: vh(10),
    paddingLeft: vh(16),
  },
  animBtn: {
    margin: vh(16),
    marginVertical: vh(16),
    alignItems: "center",
    justifyContent: "center",
  },
  btnView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: vh(16),
  },
  btnTxt: {
    padding: vh(8),
    fontFamily: "Nunito-Bold",
    fontSize: vh(16),
  },
});
