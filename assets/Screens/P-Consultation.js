import React, { useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import { StyleSheet } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";

const days = [
  {
    id: "1",
    name: "M",
  },
  {
    id: "2",
    name: "T",
  },
  {
    id: "3",
    name: "W",
  },
  {
    id: "4",
    name: "T",
  },
  {
    id: "5",
    name: "F",
  },
];
const slots = [
  {
    heading: "8:00 AM",
    val: "08:00",
  },
  {
    heading: "8:30 AM",
    val: "08:30",
  },
  {
    heading: "9:00 AM",
    val: "09:00",
  },
  {
    heading: "9:30 AM",
    val: "09:30",
  },
  {
    heading: "10:00 AM",
    val: "10:00",
  },
  {
    heading: "10:30 AM",
    val: "10:30",
  },
  {
    heading: "11:00 AM",
    val: "11:00",
  },
  {
    heading: "11:30 AM",
    val: "11:30",
  },
  {
    heading: "12:00 PM",
    val: "12:00",
  },
  {
    heading: "12:30 PM",
    val: "12:30",
  },
  {
    heading: "1:00 PM",
    val: "13:00",
  },
  {
    heading: "1:30 PM",
    val: "13:30",
  },
  {
    heading: "2:00 PM",
    val: "14:00",
  },
  {
    heading: "2:30 PM",
    val: "14:30",
  },
  {
    heading: "3:00 PM",
    val: "15:00",
  },
  {
    heading: "3:30 PM",
    val: "15:30",
  },
];
const Item = ({ name }) => (
  <TouchableOpacity>
    <View style={styles.bubble}>
      <Text style={styles.bubbleHeading}>{name}</Text>
      <Text style={styles.bubbleSubText}>10</Text>
    </View>
  </TouchableOpacity>
);
const ItemSlots = ({ name }) => (
  <TouchableOpacity>
    <View style={[styles.bubble, { flex: 1 }]}>
      <Text style={styles.bubbleHeading}>{name}</Text>
    </View>
  </TouchableOpacity>
);
function PConsultation({ navigation, route }) {
  const { ClinicName, ClinicAddress } = route.params;
  const renderItem = ({ item }) => <Item name={item.name} />;
  const renderSlots = ({ item }) => <ItemSlots name={item.heading} />;
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#e8f0fe",
          width: "90%",
          marginVertical: 30,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          <View style={{ marginBottom: 10 }}>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                alignSelf: "center",
                fontSize: 20,
              }}
            >
              {ClinicName}
            </Text>
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                fontSize: 15,
              }}
            >
              {ClinicAddress}
            </Text>
          </View>
          {/*SearchBar*/}
          <View style={styles.searchBarView}>
            <TextInput placeholder="Search" />
            <FAIcon
              name="search"
              color={"#d9d9d9"}
              size={20}
              style={{ position: "absolute", top: 5, right: 5 }}
            />
          </View>
          {/*Select Schedule Card*/}
          <View style={styles.card}>
            <View
              style={{
                padding: 5,
                width: "90%",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "#2B8ADA" }}>Select Schedule</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              <FlatList
                data={days}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          </View>
          <CustomButton
            text="+ Add More"
            textstyle={{ color: "white" }}
            style={{ backgroundColor: "#2B8ADA" }}
          />
          <View style={styles.card}>
            <View
              style={{
                padding: 5,
                width: "90%",
                borderBottomColor: "gray",
                borderBottomWidth: 1,
                alignSelf: "center",
              }}
            >
              <Text style={{ color: "#2B8ADA" }}>Select Slots</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginLeft: 10,
              }}
            >
              <FlatList
                data={slots}
                renderItem={renderSlots}
                keyExtractor={(item) => item.heading}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={3}
              />
            </View>
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
  searchBarView: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#2B8ADA",
    backgroundColor: "white",
    padding: 5,
    flexDirection: "row",
  },
  card: {
    marginVertical: 20,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "column",
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "center",
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#E8F0FE",
    borderRadius: 15,
    margin: 10,
  },
  bubbleActive: { backgroundColor: "#2B8ADA" },
  bubbleHeading: { color: "black", padding: 5, alignSelf: "center" },
  bubbleSubText: { color: "black", padding: 5, fontWeight: "bold" },
  bubbleHeadingActive: { color: "white" },
  bubbleSubTextActive: { color: "white" },
});

export default PConsultation;
