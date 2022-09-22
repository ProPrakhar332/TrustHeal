import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { CheckBox } from "react-native-elements";
import CustomButton from "../Components/CustomButton";
import { useWindowDimensions } from "react-native";

const RoleScreen = ({ navigation }) => {
  const [check, setChecked] = useState(false);
  const [activeP, setactiveP] = useState(false);
  const [activeD, setactiveD] = useState(false);
  const [screen, setScreen] = useState("");

  const onPatient = () => {
    setactiveP(!activeP);
    setactiveD(false);
    setScreen("RegisterPatient");
  };

  const onDoctor = () => {
    setactiveD(!activeD);
    setactiveP(false);
    setScreen("RegisterDoctor");
  };
  const window = useWindowDimensions();

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, height: window.height }}>
          <Image
            style={styles.tinyLogo}
            source={require("../Resources/Logo.jpg")}
            resizeMode="contain"
          ></Image>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 30,
              alignSelf: "center",
              textAlign: "center",
              color: "black",
              marginBottom: 10,
            }}
          >
            CHOOSE YOUR ROLE
          </Text>

          <View style={{ flexDirection: "row", alignSelf: "center" }}>
            <View style={activeP ? styles.tinyLogoBtnP : styles.tinyLogoBtnPA}>
              <TouchableOpacity onPress={() => onPatient()}>
                <Image
                  style={styles.img}
                  source={require("../Resources/patient.png")}
                  resizeMode="contain"
                ></Image>

                <Text style={activeP ? styles.txtP : styles.txtPA}>
                  PATIENT
                </Text>
              </TouchableOpacity>
            </View>
            <View style={activeD ? styles.tinyLogoBtn : styles.tinyLogoBtnD}>
              <TouchableOpacity onPress={() => onDoctor()}>
                <Image
                  style={styles.img}
                  source={require("../Resources/doctor.png")}
                  resizeMode="contain"
                ></Image>
                <Text style={activeD ? styles.txt : styles.txtD}>DOCTOR</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <CheckBox
              textStyle={{ textAlign: "center" }}
              checkedColor={"limegreen"}
              uncheckedColor={"black"}
              title="Allow us to send WhatsApp for notification"
              checked={check}
              onIconPress={() => setChecked(!check)}
            ></CheckBox>
            <CustomButton
              text="SIGN UP"
              textstyle={{ color: "white", fontSize: 20, fontWeight: "bold" }}
              style={{
                backgroundColor: "limegreen",
                width: "80%",
                alignSelf: "center",
                marginVertical: 10,
              }}
              onPress={() => {
                if (activeD || activeP == true) navigation.push(screen);
                else {
                  Alert.alert("Select a Role!");
                }
              }}
            ></CustomButton>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tinyLogo: {
    margin: 20,
    marginTop: 30,
    width: 200,
    height: 200,
    borderRadius: 200,
    height: "30%",
    alignSelf: "center",
  },
  tinyLogoBtn: {
    margin: 10,
    borderColor: "orange",
    borderWidth: 5,
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "orange",
    margin: 5,
  },
  tinyLogoBtnD: {
    margin: 10,
    borderColor: "orange",
    backgroundColor: "orange",
    borderWidth: 5,
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
  },
  txtD: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    margin: 5,
  },
  tinyLogoBtnP: {
    margin: 10,
    borderColor: "limegreen",
    borderWidth: 5,
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
  },
  tinyLogoBtnPA: {
    margin: 10,
    backgroundColor: "limegreen",
    borderColor: "limegreen",
    borderWidth: 5,
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
  },
  txtP: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "limegreen",
    margin: 5,
  },
  txtPA: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    margin: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: "black",
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
});

export default RoleScreen;
