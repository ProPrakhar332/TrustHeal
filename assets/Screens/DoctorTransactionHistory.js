import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import education from "../Resources/education.png";
import affiliation from "../Resources/affiliation.png";
import achievement from "../Resources/achievement.png";
import interests from "../Resources/interests.png";
import registration from "../Resources/registration.png";
import documment from "../Resources/documment.png";
import personal from "../Resources/personal.png";
import { StyleSheet } from "react-native";

function ProfileScreen({ navigation }) {
  const [edu, setEdu] = useState(false);
  const [aff, setAff] = useState(false);
  const [achi, setAch] = useState(false);
  const [int, setInt] = useState(false);
  const [reg, setReg] = useState(false);
  const [doc, setDoc] = useState(false);
  const [prnsl, setPrsnl] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#edece8" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "gray",
                borderBottomWidth: 2,
                backgroundColor: "white",
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 150,
                  margin: 10,
                }}
                source={require("../Resources/mypfp.jpg")}
              ></Image>
              <View
                style={{
                  margin: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginVertical: 5,
                  }}
                >
                  Dr Imran Ahmed
                </Text>
                <Text>Mobile : 9456335788</Text>
                <Text>Email : imranahmed@gmail.com</Text>
                <Text>Speciality : Cardiologist</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "pink",
                borderRadius: 20,
                padding: 10,
                marginVertical: 30,
                flexDirection: "row",
                width: "95%",
                alignSelf: "center",
              }}
            >
              <Text
                style={{
                  alignSelf: "flex-start",
                  fontWeight: "bold",
                  width: "90%",
                }}
              >
                Complete Your Profile
              </Text>
              <Text style={{ fontWeight: "bold", width: "10%" }}>45%</Text>
            </View>

            <View
              style={{
                backgroundColor: "white",
                padding: 15,
                borderRadius: 15,
              }}
            >
              <View style={styles.labelHeading}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setPrsnl(!prnsl);
                      setEdu(false);
                      setAff(false);
                      setAch(false);
                      setInt(false);
                      setReg(false);
                      setDoc(false);
                    }}
                  >
                    <Image source={personal} style={styles.icon} />
                    <Text style={styles.label}>Personal Details</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("PersonalDetailsDoctor")}
                  ></CustomButton>
                </View>
              </View>
              {prnsl == true ? (
                <View style={styles.card}>
                  <Text>Name: Dr. Imran Ahmed</Text>
                  <Text>Mobile : 9456335788</Text>
                  <Text>Email : imranahmed@gmail.com</Text>
                  <Text>Date Of Birth : 22/05/1971</Text>
                  <Text>Speciality : Cardiologist</Text>
                </View>
              ) : null}

              <View style={styles.labelHeading}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(!edu);
                      setPrsnl(false);
                      setAff(false);
                      setAch(false);
                      setInt(false);
                      setReg(false);
                      setDoc(false);
                    }}
                  >
                    <Image source={education} style={styles.icon} />
                    <Text style={styles.label}>Education</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("Education")}
                  ></CustomButton>
                </View>
              </View>
              {edu == true ? (
                <View style={styles.card}>
                  <Text>Institution Name: AIMS DELHI</Text>
                  <Text>From Year : 1999</Text>
                  <Text>To Year : 2004</Text>
                  <Text>Member : Yes</Text>
                </View>
              ) : null}
              <View style={styles.labelHeading}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(false);
                      setPrsnl(false);
                      setAff(!aff);
                      setAch(false);
                      setInt(false);
                      setReg(false);
                      setDoc(false);
                    }}
                  >
                    <Image source={affiliation} style={styles.icon} />
                    <Text style={styles.label}>Affiliation & Membership</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("Affiliation")}
                  ></CustomButton>
                </View>
              </View>
              {aff == true ? (
                <View style={styles.card}>
                  <Text>Institution Name: AIMS DELHI</Text>
                  <Text>From Year : 1999</Text>
                  <Text>To Year : 2004</Text>
                  <Text>Member : Yes</Text>
                </View>
              ) : null}
              <View style={styles.labelHeading}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(false);
                      setAff(false);
                      setAch(!achi);
                      setPrsnl(false);
                      setInt(false);
                      setReg(false);
                      setDoc(false);
                    }}
                  >
                    <Image source={achievement} style={styles.icon} />
                    <Text style={styles.label}>
                      Add Contibution/Achievement
                    </Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("Achievement")}
                  ></CustomButton>
                </View>
              </View>
              {achi == true ? (
                <View style={styles.card}>
                  <Text>Institution Name: AIMS DELHI</Text>
                  <Text>From Year : 1999</Text>
                  <Text>Description: Successfully transplanted heart</Text>
                  <Text>Member : Yes</Text>
                </View>
              ) : null}
              <View style={styles.labelHeading}>
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(false);
                      setAff(false);
                      setAch(false);
                      setPrsnl(false);
                      setInt(!int);
                      setReg(false);
                      setDoc(false);
                    }}
                  >
                    <Image source={interests} style={styles.icon} />
                    <Text style={styles.label}>Interests</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("Interests")}
                  ></CustomButton>
                </View>
              </View>
              {int == true ? (
                <View style={styles.card}>
                  <Text>Hobbies: Golf, Music, Football, Reading</Text>
                </View>
              ) : null}
            </View>

            <View
              style={{
                marginVertical: 30,
                backgroundColor: "white",
                padding: 15,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(false);
                      setAff(false);
                      setAch(false);
                      setPrsnl(false);
                      setInt(false);
                      setReg(!reg);
                      setDoc(false);
                    }}
                  >
                    <Image source={registration} style={styles.icon} />
                    <Text style={styles.label}>Registration</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("Registration")}
                  ></CustomButton>
                </View>
              </View>
              {reg == true ? (
                <View style={styles.card}>
                  <Text>Registration Number:458514</Text>
                  <Text>Medical Council Details : AIMS DELHI</Text>
                  <Text>Year : 2004</Text>
                </View>
              ) : null}
              <View
                style={{
                  width: "95%",
                  alignSelf: "center",
                  borderBottomColor: "gray",
                  borderBottomWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <TouchableOpacity
                    style={{ flexDirection: "row" }}
                    onPress={() => {
                      setEdu(false);
                      setAff(false);
                      setAch(false);
                      setPrsnl(false);
                      setInt(false);
                      setReg(false);
                      setDoc(!doc);
                    }}
                  >
                    <Image source={documment} style={styles.icon} />
                    <Text style={styles.label}>Add Document</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("AddDocument")}
                  ></CustomButton>
                </View>
              </View>
              {doc == true ? (
                <View style={styles.card}>
                  <Text>Medical Certificate</Text>
                  <Text>Aadhar</Text>
                  <Text>Passport</Text>
                </View>
              ) : null}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon: { width: 30, height: 30, marginRight: 5, marginTop: 5 },
  label: { width: "70%", fontSize: 15, fontWeight: "bold", padding: 10 },
  labelHeading: {
    width: "95%",
    alignSelf: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  card: {
    margin: 20,
    backgroundColor: "#e6e3e3",
    alignSelf: "center",
    width: "80%",
  },
  container: {
    flex: 1,
  },
});

export default ProfileScreen;
