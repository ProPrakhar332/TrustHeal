import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Alert,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import Header from "../Components/Header";
import { StyleSheet } from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
//Icons
import cheifComplaints from "../Icons/search.png";
import bodyScan from "../Icons/body-scan.png";
import diagnosis from "../Icons/diagnosis.png";
import medicine from "../Icons/medicine.png";
import investigation from "../Icons/searching.png";
import advice from "../Icons/doctor.png";
import followUp from "../Icons/calendar.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataComplaint = [
  { key: "Common Cold", value: "Common Cold" },
  { key: "Viral Fever", value: "Viral Fever" },
  { key: "Cold Sore", value: "Cold Sore" },
  { key: "Dengue Fever", value: "Dengue Fever" },
  { key: "Food Poisoning", value: "Food Poisoning" },
];
const Item = ({ value, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View
      style={{
        flex: 1,
        backgroundColor: "#E8F0FE",
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        margin: 5,
      }}
    >
      <Text style={{ color: "gray", padding: 10 }}>{value}</Text>
    </View>
  </TouchableOpacity>
);
function CheifComplaints({ navigation }) {
  const [Complaint, setComplaint] = useState([]);
  const [complaintText, setcomplaintText] = useState("");
  const renderSuggestions = ({ item }) => (
    <Item value={item.value} onPress={() => setcomplaintText(item.value)} />
  );

  const removeHandler = (e) => {
    setComplaint(Complaint.filter((obj) => obj.comp !== e));
    // console.log(questionareList);
  };

  const RenderComplaints = () => {
    return Complaint.map((complaint, index) => {
      return (
        <View
          style={{ flexDirection: "row", justifyContent: "space-between" }}
          key={index}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: "gray",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {index + 1 + "."}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "left",
              color: "gray",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {complaint.comp}
          </Text>
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              alignSelf: "center",
              color: "red",
              fontWeight: "bold",
            }}
            onPress={() => {
              // console.log(questionareList.ques);
              removeHandler(complaint.comp);
            }}
          >
            X
          </Text>
        </View>
      );
    });
  };

  const window = useWindowDimensions();

  const pressedProceed = async () => {
    let p = JSON.stringify(Complaint);
    await AsyncStorage.setItem("CheifComplaint", p);
    console.log(await AsyncStorage.getItem("CheifComplaint"));
    navigation.push("BodyScan");
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
            height: "100%",
            backgroundColor: "#E8F0FE",
            marginTop: 30,
          }}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Header title="Prescription" showMenu={false} />
          <View style={{ flexDirection: "row" }}>
            {/* Navigation Bar */}
            <View
              style={{
                flex: 0.15,
                flexDirection: "column",
                justifyContent: "space-around",
                borderRightWidth: 1,
                height: window.height - 80,
                padding: 1,
                alignItems: "center",
                borderRightColor: "gray",
              }}
            >
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={cheifComplaints}
                  style={[{ tintColor: "#2B8ADA" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={bodyScan} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={diagnosis} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={medicine} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={investigation}
                  style={[{ tintColor: "#5d5e61" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={advice} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={followUp} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
            </View>
            {/* Page View */}
            <View style={styles.pageView}>
              {/* Heading */}
              <TouchableOpacity
                style={styles.viewHeadingView}
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <FAIcon
                  name="chevron-left"
                  color={"#2B8ADA"}
                  size={15}
                  style={{ marginRight: 5 }}
                />
                <Text style={styles.viewHeadingText}>Cheif Complaints</Text>
              </TouchableOpacity>
              {/* Search Bar */}
              <View style={styles.searchBar}>
                <TextInput
                  placeholder="Search"
                  style={styles.searchBarText}
                  onChangeText={(text) => setcomplaintText(text)}
                  value={complaintText}
                />
                <FAIcon
                  name="search"
                  size={15}
                  color="gray"
                  style={styles.searchIcon}
                />
              </View>
              <CustomButton
                text="+ Add More"
                textstyle={{ color: "white" }}
                style={{
                  position: "relative",
                  backgroundColor: "#2B8ADA",
                  alignSelf: "flex-end",
                  marginVertical: 10,
                  padding: 5,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  let a = {
                    comp: complaintText,
                  };
                  Complaint.push(a);
                  setcomplaintText("");
                }}
              />
              {/* Suggestions */}
              {/* <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Suggestions
                </Text>

              </View>
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                }}
              >
                <FlatList
                  data={dataComplaint}
                  keyExtractor={(item) => item.key}
                  renderItem={renderSuggestions}
                  showsHorizontalScrollIndicator={false}
                  numColumns={2}
                />
              </View> */}
              {/* Selected */}
              <View>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>
                  Selected
                </Text>
              </View>

              <RenderComplaints />
              {/* Bottom Buttons */}
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  bottom: 0,
                  position: "absolute",
                  marginVertical: 10,
                  justifyContent: "space-evenly",
                }}
              >
                <CustomButton
                  text="Proceed"
                  textstyle={{ color: "white", fontSize: 12 }}
                  style={{
                    borderRadius: 10,
                    backgroundColor: "#2B8ADA",
                    flex: 0.45,
                  }}
                  onPress={pressedProceed}
                />
                <CustomButton
                  text="Save"
                  textstyle={{ color: "#2B8ADA", fontSize: 12 }}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "#2B8ADA",
                    flex: 0.45,
                  }}
                  onPress={() => {
                    Alert.alert(
                      "All the details on this page are saved successfully"
                    );
                  }}
                />
              </View>
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
  pageView: {
    flex: 0.8,
    flexDirection: "column",
    padding: 10,
  },
  viewHeadingView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  viewHeadingText: {
    color: "#2B8ADA",
    fontSize: 15,
    fontWeight: "bold",
  },
  searchBar: {
    width: "95%",
    flexDirection: "row",
    padding: 5,
    borderWidth: 1,
    borderColor: "#2B8ADA",
    backgroundColor: "white",
    borderRadius: 25,
    alignSelf: "center",
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBarText: {
    width: "100%",
  },
  searchIcon: {
    position: "absolute",
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  bubble: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
  },
  bubbleText: { fontSize: 14, fontWeight: "bold" },
});

export default CheifComplaints;
