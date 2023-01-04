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
  StatusBar
} from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import FAIcons from "react-native-vector-icons/FontAwesome5";
import apiConfig from "../API/apiConfig";
import dateformatter from "../API/dateformatter";

function CheckEarnings({ navigation }) {
  // const fomatDate = (date) => {
  //   var dateArr = date.split("-");
  //   //console.log(dateArr);
  //   var out = "";
  //   for (var i = dateArr.length - 1; i >= 0; --i) out += dateArr[i] + "-";

  //   return out.substring(0, out.length - 1);
  // };

  useEffect(() => {
    const getData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem("UserDoctorProfile"));
      let doctorId = x.doctorId;
      //console.log("Completed");

      axios
        .get(
          apiConfig.baseUrl +
            "/doctor/complete/consultation?doctorId=" +
            doctorId +
            "&start=" +
            0 +
            "&max=" +
            5
        )
        .then(function (response) {
          setData(response.data);
          //console.log(response.data);
        });
    };
    getData();
  }, []);
  const [Data, setData] = useState([]);
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
              {dateformatter(item.slotDate)}
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
              <Text style={styles.detailsText}>{item.consultationId}</Text>
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Patient Name</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>
                {item.familyDetails == null
                  ? item.patientsDetails.patientName
                  : item.familyDetails.patientName}
              </Text>
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Consultation Type</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <FAIcons
                name={
                  item.consultationType == "VIDEO_CALL"
                    ? "video"
                    : item.consultationType == "PHONE_CALL"
                    ? "phone-alt"
                    : "hospital-user"
                }
                color={"#2B8ADA"}
                style={[styles.detailsText, { fontSize: 15 }]}
              />
            </View>
          </View>
          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Payment Mode</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>
                {item.consultationType != "PHYSICAL" ? "Online" : "Offline"}
              </Text>
            </View>
          </View>

          <View style={[styles.detailsRow]}>
            <View style={styles.detailsCol}>
              <Text style={styles.detailsText}>Pay Amount</Text>
            </View>
            <View style={{ flexDirection: "column" }}>
              <Text style={styles.detailsText}>{item.fees}</Text>
            </View>
          </View>
        </View>
      </View>
    );
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
      <StatusBar animated={true} backgroundColor="#2B8ADA"/>
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
            // marginTop: 30,
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
              <TouchableOpacity style={styles.searchIcon} onPress={() => {}}>
                <FAIcons name="search" size={15} color="gray" />
              </TouchableOpacity>
            </View>

            {/* List of Payments */}

            {search === "" ? (
              <FlatList
                data={Data}
                keyExtractor={(item) => item.consultationId}
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
    height: 50,
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
    top: 0,
    margin: 15
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
