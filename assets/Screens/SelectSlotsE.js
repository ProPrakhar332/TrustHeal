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
import { LogBox } from "react-native";
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import HeaderPatient from "../Components/HeaderPatient";
import FAIcons from "react-native-vector-icons/FontAwesome5";

import doctor_m from "../Resources/doctor_m.png";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../Components/CustomButton";

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

const DATA = [
  {
    date: "19/09/2022",
    day: "Monday",
    slots: [
      "06:45 AM to 07:00 AM",
      "07:15 AM to 08:30 AM",
      "08:45 AM to 09:15 AM",
      "09:30 AM to 09:35 AM",
      "09:50 AM to 10:15 AM",
      "10:30 AM to 10:45 AM",
      "11:00 AM to 11:30 AM",
      "11:45 AM to 12:30 PM",
      "12:45 PM to 01:30 PM",
    ],
  },
  {
    date: "20/09/2022",
    day: "Tuesday",
    slots: [
      "06:45 AM to 07:00 AM",
      "07:15 AM to 08:30 AM",
      "08:45 AM to 09:15 AM",
      "09:30 AM to 09:35 AM",
      "09:50 AM to 10:15 AM",
      "10:30 AM to 10:45 AM",
      "11:00 AM to 11:30 AM",
      "11:45 AM to 12:30 PM",
      "12:45 PM to 01:30 PM",
    ],
  },
  {
    date: "21/09/2022",
    day: "Wednesday",
    slots: [
      "06:45 AM to 07:00 AM",
      "07:15 AM to 08:30 AM",
      "08:45 AM to 09:15 AM",
      "09:30 AM to 09:35 AM",
      "09:50 AM to 10:15 AM",
      "10:30 AM to 10:45 AM",
      "11:00 AM to 11:30 AM",
      "11:45 AM to 12:30 PM",
      "12:45 PM to 01:30 PM",
    ],
  },
  {
    date: "22/09/2022",
    day: "Thursday",
    slots: ["08:00 AM to 08:30 AM", "08:45 AM to 09:30"],
  },
  {
    date: "23/09/2022",
    day: "Friday",
    slots: [
      "06:45 AM to 07:00 AM",
      "07:15 AM to 08:30 AM",
      "08:45 AM to 09:15 AM",
      "09:30 AM to 09:35 AM",
      "09:50 AM to 10:15 AM",
      "10:30 AM to 10:45 AM",
      "11:00 AM to 11:30 AM",
      "11:45 AM to 12:30 PM",
      "12:45 PM to 01:30 PM",
    ],
  },
];

function SelectSlotsE({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);

  const renderDate = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ width: "90%", alignSelf: "center" }}>
          <Text
            style={{
              color: "white",
              backgroundColor: "#2B8ADA",
              padding: 5,
              alignSelf: "flex-start",
              textAlign: "center",
              borderRadius: 5,
            }}
          >
            {item.date}
          </Text>
        </View>
        <View
          style={{
            width: "95%",
            alignSelf: "center",
            backgroundColor: "white",
            marginVertical: 10,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          {/* Heading */}
          <View
            style={{
              borderBottomWidth: 1,
              width: "90%",
              alignSelf: "center",
              padding: 10,
            }}
          >
            <Text style={{ color: "#2B8ADA" }}>Available Slots</Text>
          </View>
          <View
            style={{
              width: "90%",
              alignSelf: "center",
              backgroundColor: "white",
              marginVertical: 5,
            }}
          >
            <FlatList
              data={item.slots}
              renderItem={renderItem}
              key={item}
              extraData={selectedSlotTime}
              numColumns={Math.floor(layout.width / 100)}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item === selectedSlotTime ? "#2B8ADA" : "white";
    const color = item === selectedSlotTime ? "white" : "black";

    return (
      <TouchableOpacity
        style={{
          padding: 5,
          borderWidth: 1,
          borderRadius: 10,
          alignSelf: "center",
          backgroundColor: backgroundColor,
          margin: 5,
        }}
        onPress={() => {
          setSelectedSlotTime(item);
        }}
      >
        <Text style={{ color: color, fontSize: 9 }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const layout = useWindowDimensions();

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
          nestedScrollEnabled={true}
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

          <FlatList
            data={DATA}
            keyExtractor={(item) => item.date}
            renderItem={renderDate}
          />
        </ScrollView>
        <View
          style={{
            backgroundColor: "#2B8ADA",
            height: 45,
            flexDirection: "row",
          }}
        >
          <CustomButton
            text={"PROCEED"}
            textstyle={{ color: "#2B8ADA", fontSize: 12, fontWeight: "bold" }}
            style={{
              position: "absolute",
              right: 20,
              alignSelf: "center",
              backgroundColor: "white",
              width: 100,
              padding: 3,
            }}
            onPress={() => {
              navigation.navigate("ConfirmBooking");
            }}
          />
        </View>
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

export default SelectSlotsE;
