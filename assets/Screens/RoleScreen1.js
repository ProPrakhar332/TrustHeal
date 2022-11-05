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

import CustomButton from "../Components/CustomButton";
import { useWindowDimensions } from "react-native";

const RoleScreen = ({ navigation }) => {
  const [check, setChecked] = useState(false);
  const [activeP, setactiveP] = useState(false);
  const [activeD, setactiveD] = useState(true);

  const onPatient = () => {
    setactiveP(true);
    setactiveD(false);
  };

  const onDoctor = () => {
    setactiveD(true);
    setactiveP(false);
  };
  const window = useWindowDimensions();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: "100%",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Image source={require("../Resources/Logo.jpg")} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              color: "#2b8ada",
              marginVertical: 10,
            }}
          >
            Type of User
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              backgroundColor: "white",
              borderWidth: 2,
              borderColor: "#2b8ada",
              borderRadius: 32.5,
            }}
          >
            <View style={activeD ? styles.tinyLogoBtnD : styles.tinyLogoBtn}>
              <TouchableOpacity
                onPress={() => {
                  onDoctor();
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../Resources/doctor.png")}
                  //   resizeMode="contain"
                ></Image>
                <Text style={activeD ? styles.txtD : styles.txt}>Doctor</Text>
                <CustomButton
                  text="Select"
                  textstyle={
                    activeD
                      ? { color: "#2b8ada", fontWeight: "bold" }
                      : { color: "white", fontWeight: "bold" }
                  }
                  style={
                    activeD
                      ? { backgroundColor: "white", padding: 3 }
                      : { backgroundColor: "#2b8ada", padding: 3 }
                  }
                  onPress={() => navigation.push("RegisterDoctor")}
                />
              </TouchableOpacity>
            </View>
            <View style={activeP ? styles.tinyLogoBtnP : styles.tinyLogoBtnPA}>
              <TouchableOpacity
                onPress={() => {
                  onPatient();
                }}
              >
                <Image
                  style={styles.img}
                  source={require("../Resources/patient.png")}
                  //   resizeMode="contain"
                ></Image>

                <Text style={activeP ? styles.txtP : styles.txtPA}>
                  Pateint
                </Text>
                <CustomButton
                  text="Select"
                  textstyle={
                    activeP
                      ? { color: "#2b8ada", fontWeight: "bold" }
                      : { color: "white", fontWeight: "bold" }
                  }
                  style={
                    activeP
                      ? { backgroundColor: "white", padding: 3 }
                      : { backgroundColor: "#2b8ada", padding: 3 }
                  }
                  onPress={() => navigation.push("RegisterPatient")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe",
  },
  tinyLogo: {
    margin: 20,
    marginTop: 30,
    width: 300,
    height: 300,
    borderRadius: 200,
    height: "30%",
    alignSelf: "center",
  },
  tinyLogoBtn: {
    width: 160,
    marginVertical: 0.25,
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
    backgroundColor: "white",
  },
  txt: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#2b8ada",
    margin: 5,
  },
  tinyLogoBtnD: {
    width: 160,
    marginVertical: 0.25,
    backgroundColor: "#2b8ada",
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
    width: 160,
    marginVertical: 0.25,
    backgroundColor: "#2b8ada",
    borderRadius: 30,
    padding: 15,
    alignSelf: "center",
  },
  tinyLogoBtnPA: {
    width: 160,
    marginVertical: 0.25,
    backgroundColor: "white",

    borderRadius: 30,
    padding: 15,

    alignSelf: "center",
  },
  txtP: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    margin: 5,
  },
  txtPA: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    textAlign: "center",
    color: "#2b8ada",
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
