import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Colors, Images, Strings } from "../../utils";
import { CustomButton } from "../../Components";
import { Styles } from "./QOD";

const child =
  "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80";
export interface AppProps {
  item: any;
  index: string;
}

export default function App(props: AppProps) {
  const [did, setDid] = useState(false);
  const { item } = props;
  const index = parseInt(props.index);
  const Color =
    index % 3 === 0
      ? Colors.waterBlue
      : index % 2 === 0
      ? Colors.green
      : Colors.orange;
  const lightColor =
    index % 3 === 0
      ? Colors.lightWaterBlue
      : index % 2 === 0
      ? Colors.lightGreen
      : Colors.lightOrange;
  return (
    <View style={[Styles.cardView, { backgroundColor: lightColor }]}>
      <View style={{ flexDirection: "row" }}>
        <Image source={{uri: child}} style={Styles.childAvatar} />
        <View style={[Styles.centerNameView, { justifyContent: "center" }]}>
          <Text style={Styles.name}>{item.name}</Text>
          <Text style={Styles.classText}>{item.category}</Text>
        </View>
      </View>
      <Text style={Styles.questionText}>{item.question}</Text>
      <Text style={Styles.timeBlack}>{Strings.QOD_category}</Text>
      <Text style={Styles.time}>{item.dateTime}</Text>
      <CustomButton
        Text={did ? Strings.Done : Strings.We_did_it}
        btnColor={Color}
        activeOpacity={did ? 1 : 0.8}
        ButtonStyle={[
          Styles.btnQOD,
          { backgroundColor: did ? lightColor : Color },
        ]}
        lightBtn={did}
        onPress={() => (did ? null : setDid(true))}
      />
    </View>
  );
}
