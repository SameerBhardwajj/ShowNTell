import * as React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

// custom imports
import { vw, vh, Strings, Images, Colors, CommonFunctions } from "../../utils";

export interface AppProps {
  item: any;
  index: string;
  currentChild: number;
}

export default function App(props: AppProps) {
  const { item } = props;

  return props.currentChild !== item.id ? (
    <View />
  ) : (
    <View style={{ flex: 1, backgroundColor: "white", width: "100%" }}>
      <Text style={Styles.nameText}>
        {item.first_name} {item.last_name}
      </Text>
      <View>
        <View style={Styles.itemView}>
          <Image source={Images.DOB_Icon} />
          <Text style={Styles.DOBText}>
            {CommonFunctions.DateFormatter(item.dob)}
          </Text>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Center_Icon} />
          <Text style={Styles.DOBText}>{item.Classroom.name}</Text>
        </View>
      </View>
      <View style={Styles.separatorView} />
      <Text style={Styles.DOBText2}>{Strings.Medical_Information}</Text>
      {item.ChildMedicals.length === 0 ? (
        <Text style={[Styles.DOBText, { paddingLeft: 0 }]}>NA</Text>
      ) : (
        item.ChildMedicals.map((data: any) => (
          <View style={Styles.itemView}>
            <Image source={Images.Virus_icon} />
            <Text style={Styles.DOBText}>{data.MedicalCondition.name}</Text>
          </View>
        ))
      )}
      <View style={Styles.separatorView} />
      <Text style={Styles.DOBText2}>{Strings.Teachers_Information}</Text>
      {CommonFunctions.isNullUndefined(item.Employee) ? (
        <Text style={Styles.classText}>NA</Text>
      ) : (
        <View style={Styles.avatarView}>
          <View style={[Styles.avatarBorder, Styles.childAvatar]}>
            <Image
              source={
                CommonFunctions.isNullUndefined(item.Employee.s3_photo_path)
                  ? Images.Profile_Placeholder
                  : { uri: item.Employee.s3_photo_path }
              }
            />
          </View>
          <View style={Styles.centerNameView}>
            <Text style={Styles.name}>
              {item.Employee.first_name} {item.Employee.last_name}
            </Text>
            <Text style={Styles.classText}>{item.Classroom.name}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  itemView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: vh(7),
  },
  nameText: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
    paddingBottom: vh(5),
  },
  DOBText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingLeft: vw(10),
  },
  DOBText2: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingBottom: vw(5),
  },
  separatorView: {
    height: vw(1),
    width: "100%",
    alignSelf: "center",
    backgroundColor: Colors.separator,
    margin: vh(10),
  },
  avatarView: {
    flexDirection: "row",
    paddingTop: vh(10),
    alignItems: "center",
    width: "100%",
  },
  childAvatar: {
    height: vh(64),
    width: vh(64),
    alignItems: "center",
    justifyContent: "center",
  },
  avatarBorder: {
    borderColor: Colors.borderGrey,
    borderWidth: vw(1),
    borderRadius: vh(32),
  },
  name: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
  },
  centerNameView: {
    alignItems: "flex-start",
    paddingHorizontal: vw(15),
    justifyContent: "center",
    width: "80%",
  },
  classText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
  },
});
