import React, { useState } from "react";
import { FlatList, ScrollView } from "react-native";
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
import family from "../Resources/family.png";
import personal from "../Resources/personal.png";
import report from "../Resources/report.png";
import { StyleSheet } from "react-native";
//ignoring error log
// import { LogBox } from "react-native";
// LogBox.ignoreLogs(["Warning: ..."]);
// console.reportErrorsAsExceptions = false;

const DATA = {
  famailyMembers: [
    {
      name: "Mr. Eren Quackerman",
      age: "21",
      mob: "9456885478",
      rel: "Son",
    },
    {
      name: "Mr. Grisha Quackerman",
      age: "71",
      mob: "9454885478",
      rel: "Father",
    },
    {
      name: "Mr. Petra Quackerman",
      age: "21",
      mob: "9484885478",
      rel: "Wife",
    },
  ],
  personalDetails: {
    name: "Mr. Levi Quackerman",
    age: "52",
    mob: "9411885478",
  },
  medicalRecord: {
    bgp: "A+",
    bp: "120/80",
    db: "NA",
    height: "165",
    weight: "65",
  },
};
const Items = ({ name, age, mob, rel }) => (
  <View style={styles.card}>
    <Text style={styles.text}>Name : {name}</Text>
    <Text style={styles.text}>Age : {age}</Text>
    <Text style={styles.text}>Mobile Number : {mob}</Text>
    <Text style={styles.text}>Relation : {rel}</Text>
  </View>
);

const renderItem = ({ item }) => (
  <Items name={item.name} age={item.age} mob={item.mob} rel={item.rel}></Items>
);

function PatientProfile({ navigation }) {
  const [det, setDet] = useState(false);
  const [fam, setFam] = useState(false);
  const [med, setMed] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#edece8" }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                flexDirection: "column",
                backgroundColor: "white",
                alignContent: "center",
                width: "100%",
                backgroundColor: "limegreen",
              }}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 150,
                  marginVertical: 10,
                  marginBottom: 5,
                  alignSelf: "center",
                }}
                source={require("../Resources/pfp1.jpg")}
              ></Image>
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "bold",
                    alignSelf: "center",
                    color: "white",
                    marginBottom: 10,
                  }}
                >
                  Mr. Levi Quackerman
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: "pink",
                borderRadius: 20,
                padding: 10,
                marginVertical: 20,
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
              <Text style={{ fontWeight: "bold", width: "10%" }}>65%</Text>
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
                      setDet(!det);
                      setFam(false);
                      setMed(false);
                    }}
                  >
                    <Image source={personal} style={styles.icon} />
                    <Text style={styles.label}>Personal Details</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("PersonalDetailsPatient")}
                  ></CustomButton>
                </View>
              </View>
              {det == true ? (
                <View style={styles.card}>
                  <Text style={styles.text}>
                    Name: {DATA.personalDetails.name}
                  </Text>
                  <Text style={styles.text}>
                    Age : {DATA.personalDetails.age}
                  </Text>
                  <Text style={styles.text}>
                    Mobile Number : {DATA.personalDetails.mob}
                  </Text>
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
                      setDet(false);
                      setFam(!fam);
                      setMed(false);
                    }}
                  >
                    <Image source={family} style={styles.icon} />
                    <Text style={styles.label}>Family Members</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("FamilyMembers")}
                  ></CustomButton>
                </View>
              </View>
              {fam == true ? (
                <FlatList
                  data={DATA.famailyMembers}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.name}
                  showsHorizontalScrollIndicator={false}
                ></FlatList>
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
                      setDet(false);
                      setFam(false);
                      setMed(!med);
                    }}
                  >
                    <Image source={report} style={styles.icon} />
                    <Text style={styles.label}>Medical Record</Text>
                  </TouchableOpacity>
                  <CustomButton
                    text="+Add/Edit"
                    textstyle={{ color: "black" }}
                    style={{ backgroundColor: "white" }}
                    onPress={() => navigation.push("MedicalRecord")}
                  ></CustomButton>
                </View>
              </View>
              {med == true ? (
                <View style={styles.card}>
                  <Text style={styles.text}>
                    Blood Group: {DATA.medicalRecord.bgp}
                  </Text>
                  <Text style={styles.text}>
                    Blood Pressure : {DATA.medicalRecord.bp}
                  </Text>
                  <Text style={styles.text}>
                    Diabetes :{DATA.medicalRecord.db}
                  </Text>
                  <Text style={styles.text}>
                    Height : {DATA.medicalRecord.height} cm
                  </Text>
                  <Text style={styles.text}>
                    Weight : {DATA.medicalRecord.weight} kg
                  </Text>
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
  icon: { width: 30, height: 30, marginRight: 5 },
  label: { width: "70%", fontSize: 15, fontWeight: "bold", padding: 10 },
  labelHeading: {
    width: "95%",
    alignSelf: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  card: {
    marginVertical: 5,
    backgroundColor: "#e6e3e3",
    alignSelf: "center",
    width: "100%",
    padding: 20,
    paddingHorizontal: 40,
  },
  text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
  },
});

export default PatientProfile;
