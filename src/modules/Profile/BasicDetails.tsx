import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native";

// custom Imports
import { vw, vh, Strings, Images, Colors, ScreenName } from "../../utils";
import ContactModal from "./Modals/ContactModal";
import AddressModal from "./Modals/AddressModal";
import EmailModal from "./Modals/EmailModal";

export interface AppProps {
  navigation?: any;
}

export default function App(props: AppProps) {
  const [receiveEmail, setReceiveEmail] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(1);
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [phone3, setPhone3] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  return (
    <View style={Styles.mainView}>
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
        <View style={Styles.itemView}>
          <Image source={Images.Phone_Icon_blue} />
          <Text style={Styles.itemText}>{phone1}</Text>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Mobile_Icon} />
          <Text style={Styles.itemText}>{phone2}</Text>
        </View>
        <View style={Styles.itemView}>
          <Image source={Images.Home_Icom} />
          <Text style={Styles.itemText}>{phone3}</Text>
        </View>
      </View>
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
          <Text style={Styles.itemText}>{address}</Text>
        </View>
      </View>
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
          <Text style={Styles.itemText}>{email}</Text>
        </View>
      </View>
      <View style={Styles.contactView}>
        <View style={Styles.commonView}>
          <Text style={Styles.headingText}>{Strings.Activity_Preferences}</Text>
          <TouchableOpacity activeOpacity={0.8} style={Styles.editView}>
            <Image source={Images.Edit_Image} />
          </TouchableOpacity>
        </View>
        <View style={Styles.toggleView}>
          <Text style={[Styles.itemText, { paddingLeft: 0 }]}>
            {Strings.Receive_Daily_Emails}
          </Text>
          <TouchableOpacity
            style={Styles.emailBtn}
            activeOpacity={0.8}
            onPress={() => setReceiveEmail(!receiveEmail)}
          >
            {receiveEmail ? (
              <Image source={Images.Toggle_on} />
            ) : (
              <Image source={Images.Toggle_off} />
            )}
          </TouchableOpacity>
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={modalOpen}>
        <TouchableOpacity
          style={Styles.topModalView}
          onPress={() => setModalOpen(false)}
        />
        {currentModal === 1 ? (
          <ContactModal
            phone1={phone1}
            phone2={phone2}
            phone3={phone3}
            setPhone={(text1: string, text2: string, text3: string) => {
              setPhone1(text1), setPhone2(text2), setPhone3(text3);
            }}
            setModalOpen={() => setModalOpen(false)}
          />
        ) : currentModal == 2 ? (
          <AddressModal
            address={address}
            setAddress={(text: string) => setAddress(text)}
            setModalOpen={() => setModalOpen(false)}
          />
        ) : (
          <EmailModal
            email={email}
            setEmail={(text: string) => setEmail(text)}
            setModalOpen={() => setModalOpen(false)}
          />
        )}
      </Modal>
    </View>
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
    alignItems: "center",
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
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: vh(10),
  },
  itemText: {
    fontFamily: "Nunito-SemiBold",
    fontSize: vh(18),
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
