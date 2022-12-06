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

const dataClinic = [
  { key: "1", value: "ABCD" },
  { key: "2", value: "XYZ" },
  { key: "3", value: "QWERTY" },
];

const DATA = [
  {
    date: "19/09/2022",
    day: "Monday",
    slots: [
      "06:45 AM",
      "07:15 AM",
      "08:45 AM",
      "09:30 AM",
      "09:50 AM",
      "10:30 AM",
      "11:00 AM",
      "11:45 AM",
      "12:45 AM",
    ],
  },
  {
    date: "20/09/2022",
    day: "Tuesday",
    slots: [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
    ],
  },
  {
    date: "21/09/2022",
    day: "Wednesday",
    slots: [
      "06:45 PM",
      "07:15 PM",
      "08:45 PM",
      "09:30 PM",
      "09:50 PM",
      "10:30 PM",
      "11:00 PM",
      "11:45 PM",
    ],
  },
  {
    date: "22/09/2022",
    day: "Thursday",
    slots: ["08:00 AM", "08:30 AM"],
  },
  {
    date: "23/09/2022",
    day: "Friday",
    slots: [
      "12:00 PM",
      "12:30 PM",
      "01:00 PM",
      "01:30 PM",
      "02:00 PM",
      "02:30 PM",
    ],
  },
];

function SelectSlotsP({ navigation }) {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlotTime, setSelectedSlotTime] = useState(null);

  const renderItem = ({ item }) => {
    const backgroundColor = item.date === selectedDate ? "#2B8ADA" : "white";
    const color = item.date === selectedDate ? "white" : "black";

    return (
      <TouchableOpacity
        style={{
          backgroundColor: backgroundColor,
          padding: 10,
          margin: 3,
          borderRadius: 5,
          flexDirection: "column",
          alignItems: "center",
        }}
        onPress={() => {
          setSelectedDate(item.date);
          setslots(item.slots);
          setSelectedSlotTime("");
        }}
      >
        <Text style={{ fontSize: 9, color: color }}>{item.date}</Text>
        <Text style={{ fontSize: 9, color: color }}>{item.day}</Text>
      </TouchableOpacity>
    );
  };

  const [clinicName, setclinicName] = useState("");
  const [clinicAddress, setclinicAddress] = useState("");
  const [slots, setslots] = useState([]);

  const setAddress = () => {
    data.doctorClinicDetailsDTOs.forEach((item) => {
      if (clinicName === item.clinicName) {
        setclinicAddress(item.clinicAddress);
      }
    });
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

          <Text
            style={{
              marginTop: 10,
              width: "90%",
              alignSelf: "center",
              textAlign: "left",
              fontSize: 15,
            }}
          >
            Select Date :-
          </Text>

          <View
            style={{
              flex: 1,
              alignSelf: "center",
              width: "90%",
              flexDirection: "column",
              marginTop: 10,
            }}
          >
            <FlatList
              data={DATA}
              renderItem={renderItem}
              keyExtractor={(item) => item.date}
              extraData={selectedDate}
              horizontal={true}
            />
          </View>
          {slots ? (
            <Text
              style={{
                marginTop: 10,
                width: "90%",
                alignSelf: "center",
                textAlign: "left",
                fontSize: 15,
              }}
            >
              Select Time :-
            </Text>
          ) : null}
          <View
            style={{
              flexWrap: "wrap",
              height: Math.ceil(slots.length / 4) * 50,
              flexDirection: "row",
              width: "90%",
              alignSelf: "center",
            }}
          >
            {slots
              ? slots.map((index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      style={[
                        {
                          margin: 6,
                          borderRadius: 5,
                          padding: 10,
                          alignSelf: "center",
                        },
                        index === selectedDate
                          ? { backgroundColor: "#2B8ADA" }
                          : { backgroundColor: "white" },
                      ]}
                      onPress={() => setSelectedSlotTime(index)}
                    >
                      <Text
                        style={[
                          {
                            fontSize: 12,
                          },
                          index === selectedDate
                            ? { color: "white" }
                            : { color: "black" },
                        ]}
                      >
                        {index}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </View>
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
              console.log(clinicName);
              console.log(clinicAddress);
              console.log(selectedSlotTime);
              if (
                clinicName !== "" &&
                clinicAddress !== "" &&
                selectedSlotTime !== ""
              )
                navigation.navigate("ConfirmBooking");
              else Alert.alert("Pls select slots");
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

export default SelectSlotsP;
