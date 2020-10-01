import * as React from "react";
import { View, Text, StyleSheet, TextInput, Keyboard } from "react-native";
import { KeyboardAwareScrollView } from "@codler/react-native-keyboard-aware-scroll-view";

// custom imports
import { CustomHeader, CustomButton, CustomLoader } from "../../Components";
import { Strings, vh, vw, Colors, ScreenName } from "../../utils";
import { addTestimonialsAPI } from "./action";
import { useDispatch, useSelector } from "react-redux";

export interface AppProps {
  navigation: any;
}

export default function App(props: AppProps) {
  const dispatch = useDispatch();
  const { loginData, loginEmail } = useSelector((state: { Login: any }) => ({
    loginData: state.Login.loginData,
    loginEmail: state.Login.loginEmail,
  }));
  const [data, setData] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [cLength, setCLength] = React.useState(0);
  const hitAddTestimonials = () => {
    setIsLoading(true);
    Keyboard.dismiss();
    dispatch(
      addTestimonialsAPI(
        {
          name: `${loginData.first_name} ${loginData.last_name}`,
          location_id: loginData.location_id,
          email: loginEmail,
          text: data,
        },
        () => {
          setIsLoading(false);
          props.navigation.navigate(ScreenName.RESEND_CODE_MODAL, {
            msg: Strings.Testimonial_Success,
          });
        },
        () => {
          setIsLoading(false);
        }
      )
    );
  };
  return (
    <View style={Styles.mainView}>
      <CustomHeader
        title={Strings.Add_Testimonials}
        onPressBack={() => props.navigation.pop()}
      />
      <CustomLoader loading={isLoading} color="white" />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.innerView}>
          <Text style={Styles.headingTxt}>{Strings.Your_opinion_matters}</Text>
          <Text style={Styles.descriptionTxt}>{Strings.Thanks_Opinion}</Text>
          <Text style={Styles.descTxt}>{Strings.Description_optional}</Text>
          <View style={Styles.innerHelpView}>
            <TextInput
              maxLength={500}
              value={data}
              onChangeText={(text: string) => {
                cLength <= 500 ? setData(text) : null,
                  setCLength(text.trim().length);
              }}
              style={Styles.textInputView}
              multiline={true}
            />
            <Text style={Styles.character}>{cLength}/500 Characters</Text>
          </View>
          <CustomButton
            Text={Strings.Submit}
            activeOpacity={cLength >= 1 ? 0.8 : 1}
            onPress={() => (cLength >= 1 ? hitAddTestimonials() : null)}
            ButtonStyle={{
              width: "100%",
              alignSelf: "center",
              backgroundColor:
                cLength >= 1 ? Colors.violet : Colors.disableViolet,
            }}
          />
        </View>
      </KeyboardAwareScrollView>
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
    maxHeight: vh(150),
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
