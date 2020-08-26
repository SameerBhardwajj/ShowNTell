import * as React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { CustomHeader, CustomButton } from "../../Components";
import { Strings, vh, vw, Images, Colors } from "../../utils";
import { hitAPI } from "./action";
import { useDispatch, useSelector } from "react-redux";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { list, loginData } = useSelector(
    (state: { Testimonials: any; Login: any }) => ({
      list: state.Testimonials.list,
      loginData: state.Login.loginData,
    })
  );
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [cLength, setCLength] = React.useState(0);
  React.useEffect(() => {
    list.length === 0 ? setIsLoading(true) : null;
    // dispatch(
    //   hitAPI(
    //     loginData.center_id,
    //     (myData: Array<any>) => {
    //       // myData.map((a) => {
    //       //   setData(a.content);
    //       // });
    //       setIsLoading(false);
    //     },
    //     () => {
    //       setIsLoading(false);
    //     }
    //   )
    // );
  }, []);
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Add_Testimonials}
        onPressBack={() => props.navigation.pop()}
      />
      <View style={Styles.innerView}>
        <Text style={Styles.headingTxt}>{Strings.Your_opinion_matters}</Text>
        <Text style={Styles.descriptionTxt}>{Strings.Thanks_Opinion}</Text>
        <Text style={Styles.descTxt}>{Strings.Description_optional}</Text>
        <View style={Styles.innerHelpView}>
          <TextInput
            maxLength={500}
            value={data}
            onChangeText={(text: string) => {
              cLength <= 500 ? setData(text) : null, setCLength(text.length);
            }}
            style={Styles.textInputView}
            multiline={true}
            // onSubmitEditing={() => {
            //   Keyboard.dismiss();
            //   check();
            // }}
          />
          <Text style={Styles.character}>{cLength}/500 Characters</Text>
        </View>
        <CustomButton
          Text={Strings.Submit}
          onPress={() => {}}
          ButtonStyle={{ width: "100%", alignSelf: 'center' }}
        />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: "white",
  },
  innerView: {
    padding: vh(16),
  },
  headingTxt: {
    fontFamily: "Nunito-Bold",
    fontSize: vh(20),
  },
  descriptionTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingVertical: vh(10),
  },
  descTxt: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(14),
    lineHeight: vh(26),
    letterSpacing: -0.28,
    paddingTop: vh(12),
  },
  innerHelpView: {
    width: vw(380),
    alignItems: "center",
    backgroundColor: Colors.veryLightGrey,
    borderRadius: vh(8),
    padding: vh(10),
    marginVertical: vh(10),
  },
  textInputView: {
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: Colors.veryLightGrey,
    width: "100%",
    borderTopLeftRadius: vh(8),
    borderTopRightRadius: vh(8),
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    paddingHorizontal: vw(6),
    paddingVertical: vh(4),
  },
  character: {
    color: Colors.characterGrey,
    fontSize: vh(14),
    fontFamily: "Nunito-Regular",
    alignSelf: "flex-end",
  },
});
