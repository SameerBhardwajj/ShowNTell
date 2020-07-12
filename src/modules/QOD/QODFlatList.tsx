import React from "react";
import { View, Text, Image } from "react-native";
import { Colors, Images, Strings, CommonFunctions } from "../../utils";
import { CustomButton } from "../../Components";
import { Styles } from "./QOD";

export interface AppProps {
  item: any;
  index: string;
  weDidIt: Function;
}

export default function App(props: AppProps) {
  const { item } = props;
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
  return (
    <View style={[Styles.cardView, { backgroundColor: lightColor }]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          resizeMethod="resize"
          resizeMode="center"
          source={
            CommonFunctions.isNullUndefined(item.Child.s3_photo_path)
              ? Images.Profile_Placeholder
              : { uri: item.Child.s3_photo_path }
          }
          style={Styles.childAvatar}
        />
        <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
          <Text style={Styles.name}>
            {item.Child.first_name} {item.Child.last_name}
          </Text>
          {/* <Text style={Styles.classText}>{item.class}</Text> */}
        </View>
      </View>
      <Text style={Styles.questionText}>
        {item.QuestionOfTheDayActivity.QuestionOfTheDay.question}
      </Text>
      <Text style={Styles.timeBlack}>
        {item.QuestionOfTheDayActivity.ActivityValue.name}
      </Text>
      <Text style={Styles.time}>
        {CommonFunctions.DateFormatter(new Date(item.date))}
        {Strings.at}
        {CommonFunctions.timeFormatter(new Date(item.date))}
      </Text>
      <CustomButton
        Text={
          CommonFunctions.isNullUndefined(item.acknowledged_at)
            ? Strings.We_did_it
            : Strings.Done
        }
        btnColor={Color}
        activeOpacity={
          CommonFunctions.isNullUndefined(item.acknowledged_at) ? 0.8 : 1
        }
        ButtonStyle={[
          Styles.btnQOD,
          {
            backgroundColor: CommonFunctions.isNullUndefined(
              item.acknowledged_at
            )
              ? lightColor
              : Color,
          },
        ]}
        lightBtn={CommonFunctions.isNullUndefined(item.acknowledged_at)}
        onPress={() =>
          CommonFunctions.isNullUndefined(item.acknowledged_at)
            ? props.weDidIt(item.id)
            : null
        }
      />
    </View>
  );
}
