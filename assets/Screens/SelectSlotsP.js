import React, { useState, useEffect } from "react";
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import HeaderPatient from "../Components/HeaderPatient";
import FAIcons from "react-native-vector-icons/FontAwesome5";

import doctor_m from "../Resources/doctor_m.png";
import { SelectList } from "react-native-dropdown-select-list";

const data = {
  name: "Dr. Imran Singh",
  spl: "Psychiatry",
  exp: "10 Years of experience",
  deg: "MBBS, MD, FID, CCLHA",
  city: "New Delhi",
  email: "Imran@gmail.com",
  pres: "",
  age: 36,
  dob: "03/02/1973",
  img: doctor_m,
  doctorConsultationFeesDTO: {
    eConsulationFees: 500,
    followUpFees: 0,
    physicalConsulationFees: 800,
  },
  doctorEducationsDTOs: [
    {
      degree: "MBBS",
      degreePath: "string",
      doctorEducationPkId: 0,
      passingYear: "1986",
      specialization: ["Psychiatry", "Diabetologist", "General Physician"],
      totalExperiencedInMonths: 0,
      university: "IGNOU",
    },
  ],
  doctorClinicDetailsDTOs: [
    {
      doctorclinicpkid: 1,
      clinicName: "ABCD",
      clinicAddress: "Ashok Road",
      specialInstruction: "wear mask",
    },
    {
      doctorclinicpkid: 2,
      clinicName: "XYZ",
      clinicAddress: "rohtak road",
      specialInstruction: "wear mask",
    },
    {
      doctorclinicpkid: 3,
      clinicName: "QWERTY",
      clinicAddress: "Rajpur Road",
      specialInstruction: "wear mask",
    },
  ],
};

const dataClinic = [
  { key: "1", value: "ABCD" },
  { key: "2", value: "XYZ" },
  { key: "3", value: "QWERTY" },
];

const DATA = [
  {
    date: "19/09/2022",
    day: "Monday",
  },
  {
    date: "20/09/2022",
    day: "Tuesday",
  },
  {
    date: "21/09/2022",
    day: "Wednesday",
  },
  {
    date: "22/09/2022",
    day: "Thursday",
  },
  {
    date: "23/09/2022",
    day: "Friday",
  },
];
const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    style={{
      backgroundColor: backgroundColor,
      padding: 10,
      margin: 3,
      borderRadius: 5,
      flexDirection: "column",
      alignItems: "center",
    }}
    onPress={onPress}
  >
    <Text style={{ fontSize: 9, color: textColor }}>{item.date}</Text>
    <Text style={{ fontSize: 9, color: textColor }}>{item.day}</Text>
  </TouchableOpacity>
);
function SelectSlotsP({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.date === selectedDate ? "#2B8ADA" : "white";
    const color = item.date === selectedDate ? "white" : "black";

    return (
      <Item
        item={item}
        onPress={() => setSelectedDate(item.date)}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };

  const [clinicName, setclinicName] = useState("");
  const [clinicAddress, setclinicAddress] = useState("");

  const setAddress = () => {
    data.doctorClinicDetailsDTOs.forEach((item) => {
      if (clinicName === item.clinicName) {
        setclinicAddress(item.clinicAddress);
      }
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#2B8ADA",
          width: "100%",
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
            marginTop: 30,
            backgroundColor: "#e8f0fe",
          }}
          showsVerticalScrollIndicator={false}
        >
          <HeaderPatient showMenu={false} title="Select Slots" />
          {/* Top */}
          <View style={{ marginVertical: 10, alignSelf: "center" }}>
            <Image
              source={data.img}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                alignSelf: "center",
              }}
            >
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: "gray",
                alignSelf: "center",
                marginVertical: 3,
              }}
            >
              {data.spl}
            </Text>
            <Text
              style={{
                backgroundColor: "#2B8ADA",
                color: "white",
                borderRadius: 10,
                alignSelf: "center",
                padding: 3,
                paddingHorizontal: 15,
              }}
            >
              {data.exp}
            </Text>
          </View>

          {/* Clinic Selection */}

          <View
            style={{
              flex: 1,
              borderBottomWidth: 1,
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <View style={{ flexDirection: "column", flex: 0.45 }}>
              <Text style={{ flex: 1, width: "100%" }}>Select Clinic</Text>
              <SelectList
                defaultOption={dataClinic[0].key}
                placeholder={" "}
                setSelected={(val) => setclinicName(val)}
                onSelect={setAddress}
                data={dataClinic}
                save={"value"}
                boxStyles={{
                  backgroundColor: "white",
                  borderWidth: 0,
                  flex: 1,
                  width: "100%",
                  borderRadius: 5,
                }}
                dropdownStyles={{ backgroundColor: "white" }}
                dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                badgeStyles={{ backgroundColor: "#2b8ada" }}
              />
            </View>
            <View style={{ flexDirection: "column", flex: 0.45 }}>
              <Text style={{ flex: 1, width: "100%" }}>Clinic Address</Text>
              <TextInput
                placeholder="Address"
                value={clinicAddress}
                editable={false}
                style={{
                  width: "100%",
                  padding: 5,
                  backgroundColor: "white",
                  borderRadius: 10,
                  fontSize: 16,
                  color: "black",
                }}
              />
            </View>
          </View>

          {/* Date and Slots */}
          <View style={{ flex: 1, alignSelf: "center" }}>
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.date}
              extraData={selectedDate}
              horizontal={true}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe",
  },
});

export default SelectSlotsP;
