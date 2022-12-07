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
import FAIcons from "react-native-vector-icons/FontAwesome5";

const datapayment = [
  {
    date: "12-09-2022",
    patientname: "Rohan Kumar",
    patientUHID: "P-23434",
    paymenttime: "12:00 PM",
    type: "E-Consultation",
    paymentmode: "Online",
    amount: "500",
  },
  {
    date: "12-09-2022",
    patientname: "Sohan Kumar",
    patientUHID: "P-23435",
    paymenttime: "12:00 PM",
    type: "E-Consultation",
    paymentmode: "Online",
    amount: "500",
  },
  {
    date: "12-09-2022",
    patientname: "Mohan Kumar",
    patientUHID: "P-23436",
    paymenttime: "12:00 PM",
    type: "E-Consultation",
    paymentmode: "Online",
    amount: "500",
  },
  {
    date: "12-09-2022",
    patientname: "Raunak Kumar",
    patientUHID: "P-23437",
    paymenttime: "12:00 PM",
    type: "E-Consultation",
    paymentmode: "Online",
    amount: "500",
  },
  {
    date: "12-09-2022",
    patientname: "Raj Kumar",
    patientUHID: "P-23438",
    paymenttime: "12:00 PM",
    type: "E-Consultation",
    paymentmode: "Online",
    amount: "500",
  },
];

function CheckEarnings({ navigation }) {
  const [search, setsearch] = useState("");
  const [searchData, setsearchData] = useState([]);

  const renderPayments = ({ item }) => {
    return (
      <View
        style={{
          width: "95%",
          alignSelf: "center",
          marginVertical: 10,
        }}
      >
        {/* Date */}
        <View
          style={[
            styles.detailsRow,
            {
              backgroundColor: "#2B8ADA",
              borderTopStartRadius: 15,
              borderTopEndRadius: 15,
              paddingVertical: 10,
            },
          ]}
        >
          <View style={styles.detailsCol}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                paddingHorizontal: 10,
              }}
            >
              Consultation Date
            </Text>
          </View>
          <View style={{ flexDirection: "column" }}>
            <Text
              style={{
                color: "white",
                fontSize: 14,
                paddingHorizontal: 10,
              }}
            >
              {item.date}
            </Text>
          </View>
        </View>
        {/* Details */}
        <View
          style={{
            paddingVertical: 10,
            backgroundColor: "white",
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Patient UHID</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.patientUHID}</Text>
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Patient Name</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.patientname}</Text>
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Consultation Type</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.type}</Text>
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Payment Mode</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.paymentmode}</Text>
            </View>
          </View>

          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Pay Amount</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.amount}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const display = () => {
    setsearchData([]);
    datapayment.forEach((item) => {
      item.patientname.indexOf(search) > 0 ? searchData.push(item) : null;
    });
    console.log(searchData);
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
          nestedScrollEnabled={true}
        >
          <Header showMenu={false} title="Payment Details" />
          <View style={{ width: "95%", alignSelf: "center", marginTop: 10 }}>
            {/* Search Bar */}
            <View style={styles.searchBar}>
              <TextInput
                placeholder="Search"
                style={styles.searchBarText}
                onChangeText={(text) => setsearch(text)}
                value={search}
              />
              <TouchableOpacity style={styles.searchIcon} onPress={display}>
                <FAIcons name="search" size={15} color="gray" />
              </TouchableOpacity>
            </View>

            {/* List of Payments */}

            {search === "" ? (
              <FlatList
                data={datapayment}
                keyExtractor={(item) => item.patientUHID}
                renderItem={renderPayments}
              />
            ) : null}
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
  searchBar: {
    flex: 1,
    width: "95%",
    flexDirection: "row",
    padding: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#2B8ADA",
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 10,
  },
  searchBarText: {
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 0,
    padding: 10,
  },
  detailsCol: {
    flexDirection: "column",
    alignSelf: "center",
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "white",
    padding: 10,
    paddingVertical: 5,
  },
  detailsText: {
    fontSize: 12,
    alignSelf: "center",
    paddingHorizontal: 10,
  },
});

export default CheckEarnings;
