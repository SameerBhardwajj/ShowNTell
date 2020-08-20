import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

// custom Imports
import { vw, vh, Strings, Images, Colors, CommonFunctions } from "../../utils";
import ContactModal from "./Modals/ContactModal";
import AddressModal from "./Modals/AddressModal";
import EmailModal from "./Modals/EmailModal";
import { hiBasicDetails, updateProfile } from "./action";
import { CustomLoader } from "../../Components";

export interface AppProps {}

export default function App(props: AppProps) {
  const { data } = useSelector((state: { Profile: any }) => ({
    data: state.Profile.data,
  }));

  const [receiveEmail, setReceiveEmail] = useState(
    data.receive_daily_email ? true : false
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const hitGetProfile = () => {
    setLoading(true);
    dispatch(
      hiBasicDetails(
        () => {
          setLoading(false);
        },
        (err: any) => {
          setLoading(false);
        }
      )
    );
  };

  const formatPhone = (f: string) => {
    let f_val = f.replace(/\D+/g, "");
    f =
      "(" + f_val.slice(0, 3) + ") " + f_val.slice(3, 6) + "-" + f_val.slice(6);
    return f;
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      bounces={false}
      horizontal={false}
      showsVerticalScrollIndicator={false}
    >
      {isLoading ? (
        <CustomLoader loading={isLoading} />
      ) : (
        <View style={Styles.mainView}>
          {/* Contact numbers ----------------------- */}
          <View style={Styles.contactView}>
            <View style={Styles.commonView}>
              <Text style={Styles.headingText}>{Strings.Contact_Details}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.editView}
                onPress={() => {
                  setCurrentModal(1), setModalOpen(true);
                }}
              >
                <Image source={Images.Edit_Image} />
              </TouchableOpacity>
            </View>
            {CommonFunctions.isNullUndefined(data.primary_phone) ? null : (
              <View style={Styles.itemView}>
                <Image source={Images.Phone_Icon_blue} />
                <Text style={Styles.itemText}>
                  {formatPhone(data.primary_phone.replace(/-/g, ""))}
                </Text>
              </View>
            )}
            {CommonFunctions.isNullUndefined(data.work_phone) ? null : (
              <View style={Styles.itemView}>
                <Image source={Images.Mobile_Icon} />
                <Text style={Styles.itemText}>
                  {formatPhone(data.work_phone.replace(/-/g, ""))}
                </Text>
              </View>
            )}
            {CommonFunctions.isNullUndefined(data.secondary_phone) ? null : (
              <View style={Styles.itemView}>
                <Image source={Images.Home_Icom} />
                <Text style={Styles.itemText}>
                  {formatPhone(data.secondary_phone.replace(/-/g, ""))}
                </Text>
              </View>
            )}
          </View>
          {/* Address ----------------------- */}
          <View style={Styles.contactView}>
            <View style={Styles.commonView}>
              <Text style={Styles.headingText}>{Strings.Address_Details}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.editView}
                onPress={() => {
                  setCurrentModal(2), setModalOpen(true);
                }}
              >
                <Image source={Images.Edit_Image} />
              </TouchableOpacity>
            </View>
            <View style={[Styles.itemView, { alignItems: "flex-start" }]}>
              <Image source={Images.Location_Pin_Icon} />
              {CommonFunctions.isNullUndefined(data.address1) ? null : (
                <Text style={Styles.itemText}>{`${data.address1}, ${
                  CommonFunctions.isNullUndefined(data.address2)
                    ? ""
                    : `${data.address2},`
                } ${data.city}, ${
                  CommonFunctions.isNullUndefined(data.State)
                    ? ""
                    : `${data.State.state_name}`
                } - ${data.postal_code}`}</Text>
              )}
            </View>
          </View>
          {/* Email ----------------------- */}
          <View style={Styles.contactView}>
            <View style={Styles.commonView}>
              <Text style={Styles.headingText}>{Strings.Email}</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                style={Styles.editView}
                onPress={() => {
                  setCurrentModal(3), setModalOpen(true);
                }}
              >
                <Image source={Images.Edit_Image} />
              </TouchableOpacity>
            </View>
            <View style={Styles.itemView}>
              <Image source={Images.Mail_Icon} />
              {CommonFunctions.isNullUndefined(data.email) ? null : (
                <Text style={Styles.itemText}>{data.email}</Text>
              )}
            </View>
          </View>
          {/* Activity Preference ----------------------- */}
          <View style={Styles.contactView}>
            <View style={Styles.commonView}>
              <Text style={[Styles.headingText, { paddingVertical: vh(15) }]}>
                {Strings.Activity_Preferences}
              </Text>
            </View>
            <View style={Styles.toggleView}>
              <Text style={[Styles.itemText, { paddingLeft: 0 }]}>
                {Strings.Receive_Daily_Emails}
              </Text>
              <TouchableOpacity
                style={Styles.emailBtn}
                activeOpacity={0.8}
                onPress={() => {
                  dispatch(
                    updateProfile(
                      {
                        type: "activity_preference",
                        receive_daily_email: receiveEmail ? 0 : 1,
                      },
                      () => {},
                      () => {}
                    )
                  ),
                    setReceiveEmail(!receiveEmail);
                }}
              >
                {receiveEmail ? (
                  <Image source={Images.Toggle_on} />
                ) : (
                  <Image source={Images.Toggle_off} />
                )}
              </TouchableOpacity>
            </View>
          </View>
          {/* Modal for Updating values --------------- */}
          <Modal animationType="slide" transparent={true} visible={modalOpen}>
            <TouchableOpacity
              style={Styles.topModalView}
              onPress={() => setModalOpen(false)}
            />
            {currentModal === 1 ? (
              <ContactModal
                setModalOpen={() => setModalOpen(false)}
                updateModal={() => {
                  setModalOpen(false), hitGetProfile();
                }}
              />
            ) : currentModal == 2 ? (
              <AddressModal
                setModalOpen={() => setModalOpen(false)}
                updateModal={() => {
                  setModalOpen(false), hitGetProfile();
                }}
              />
            ) : (
              <EmailModal
                setModalOpen={() => setModalOpen(false)}
                updateModal={() => {
                  setModalOpen(false), hitGetProfile();
                }}
              />
            )}
          </Modal>
        </View>
      )}
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    padding: vh(16),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4.65,
    elevation: 7,
  },
  contactView: {
    backgroundColor: "white",
    padding: vh(16),
    paddingTop: vh(6),
    width: "100%",
    borderRadius: vh(8),
    marginBottom: vh(16),
  },
  commonView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  headingText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(16),
    color: Colors.mediumBlack,
  },
  editView: {
    padding: vh(10),
    paddingRight: 0,
  },
  itemView: {
    width: "85%",
    flexDirection: "row",
    paddingTop: vh(10),
    alignItems: "center",
  },
  itemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(17),
    paddingLeft: vw(10),
  },
  toggleView: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
  },
  emailBtn: {
    paddingLeft: vh(11),
  },
  topModalView: {
    width: "100%",
    backgroundColor: Colors.modalBg2,
  },
});
