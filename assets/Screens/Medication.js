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
import { Tab } from "react-native-elements";
import {
  MultipleSelectList,
  SelectList,
} from "react-native-dropdown-select-list";
import AsyncStorage from "@react-native-async-storage/async-storage";

const dataFreq = [
  { key: "0-0-1", value: "0-0-1" },
  { key: "0-1-0", value: "0-1-0" },
  { key: "0-1-1", value: "0-1-1" },
  { key: "1-0-0", value: "1-0-0" },
  { key: "1-0-1", value: "1-0-1" },
  { key: "1-1-0", value: "1-1-0" },
  { key: "1-1-1", value: "1-1-1" },
  { key: "0-0-1/2", value: "0-0-1/2" },
  { key: "0-1/2-0", value: "0-1/2-0" },
  { key: "0-1/2-1/2", value: "0-1/2-1/2" },
  { key: "1/2-0-0", value: "1/2-0-0" },
  { key: "1/2-0-1/2", value: "1/2-0-1/2" },
  { key: "1/2-1/2-0", value: "1/2-1/2-0" },
  { key: "1/2-1/2-1/2", value: "1/2-1/2-1/2" },
];

const dataType = [
  { key: "Drop", value: "Drop" },
  { key: "Ointment", value: "Ointment" },
  { key: "Syrup", value: "Syrup" },
  { key: "Tablet", value: "Tablet" },
];

function Medication({ navigation }) {
  const [Medicine, setMedicine] = useState(false);

  const [Medication, setMedication] = useState([]);
  const [medicineName, setmedicineName] = useState("");
  const [medicineType, setmedicineType] = useState("");
  const [medicineInstruction, setmedicineInstruction] = useState("");
  const [medicineDays, setmedicineDays] = useState("");
  const [Freq, setFreq] = useState("");

  const window = useWindowDimensions();

  const clearAll = () => {
    setmedicineName("");
    setmedicineType("");
    setFreq("");

    setmedicineInstruction("");
    setmedicineDays("");
  };
  const proceedPressed = async () => {
    let p = JSON.stringify(Medication);
    await AsyncStorage.setItem("Prescription", p);
    console.log(await AsyncStorage.getItem("Prescription"));
    navigation.push("Investigation");
  };

  const removeHandler = (e) => {
    setMedication(Medication.filter((obj) => obj.medicineName !== e));
    // console.log(questionareList);
  };

  const RenderMedicine = () => {
    return Medication.map((Medication, index) => {
      return (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#2B8ADA",
          }}
          key={index}
        >
          <View
            style={{
              flex: 0.2,
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 8, color: "#2B8ADA", textAlign: "center" }}
            >
              {Medication.medicineName}
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 8, color: "#2B8ADA", textAlign: "center" }}
            >
              {Medication.medicineType}
            </Text>
          </View>
          <View
            style={{
              flex: 0.25,
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 8, color: "#2B8ADA", textAlign: "center" }}
            >
              {Medication.instruction}
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 8, color: "#2B8ADA", textAlign: "center" }}
            >
              {Medication.days}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignSelf: "center",
            }}
          >
            <Text
              style={{ fontSize: 8, color: "#2B8ADA", textAlign: "center" }}
            >
              {Medication.freq}
            </Text>
          </View>
          <View style={{ flex: 0.15, alignSelf: "center" }}>
            <FAIcon
              name="trash"
              color={"red"}
              size={9}
              style={{ alignSelf: "center" }}
              onPress={() => {
                // console.log(questionareList.ques);
                removeHandler(Medication.medicineName);
              }}
            />
          </View>
        </View>
      );
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
                  style={[{ tintColor: "#5d5e61" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={bodyScan} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={diagnosis} style={[{ tintColor: "#5d5e61" }]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={medicine} style={[{ tintColor: "#2B8ADA" }]} />
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
                <Text style={styles.viewHeadingText}>
                  Medication & Instruction
                </Text>
              </TouchableOpacity>
              {/* Form  */}
              <View
                style={{
                  alignSelf: "center",
                  width: "95%",
                  flexDirection: "column",
                }}
              >
                <TextInput
                  value={medicineName}
                  onChangeText={setmedicineName}
                  placeholder="Medicine"
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                />
                <SelectList
                  labelStyles={{ height: 0 }}
                  setSelected={(val) => setmedicineType(val)}
                  placeholder={"Medicine Type"}
                  data={dataType}
                  save="value"
                  boxStyles={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                    borderWidth: 0,
                  }}
                  dropdownStyles={{ backgroundColor: "white" }}
                  dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                  badgeStyles={{ backgroundColor: "#2b8ada" }}
                />
                <TextInput
                  value={medicineInstruction}
                  onChangeText={setmedicineInstruction}
                  placeholder="Instruction"
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                />
                <TextInput
                  value={medicineDays}
                  onChangeText={setmedicineDays}
                  keyboardType={"number-pad"}
                  placeholder="Number of days to take"
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                  }}
                />
                <SelectList
                  labelStyles={{ height: 0 }}
                  setSelected={(val) => setFreq(val)}
                  placeholder={"Frequency of Intake"}
                  data={dataFreq}
                  save="value"
                  boxStyles={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                    borderWidth: 0,
                  }}
                  dropdownStyles={{ backgroundColor: "white" }}
                  dropdownTextStyles={{ color: "#2b8ada", fontWeight: "bold" }}
                  badgeStyles={{ backgroundColor: "#2b8ada" }}
                />
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
                    if (
                      medicineDays !== "" &&
                      medicineName !== "" &&
                      medicineInstruction !== "" &&
                      medicineType !== "" &&
                      Freq !== "" &&
                      medicineType !== ""
                    ) {
                      let as = {
                        medicineName: medicineName,
                        medicineType: medicineType,
                        instruction: medicineInstruction,
                        days: medicineDays,
                        freq: Freq,
                      };
                      Medication.push(as);
                      console.log(Medication);
                      clearAll();
                    } else Alert.alert("Fill all fields!");
                  }}
                />
              </View>

              {/* {Medication.map((Medication, index) => {})} */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flex: 0.2,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Name
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Type
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.25,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Instruction
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.1,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Days
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.2,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Freq
                  </Text>
                </View>
                <View
                  style={{
                    flex: 0.15,
                    alignSelf: "center",
                    backgroundColor: "#2B8ADA",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",

                      textAlign: "center",
                    }}
                  >
                    Action
                  </Text>
                </View>
              </View>
              <RenderMedicine />
              {/*Bottom Buttons */}
              <View
                style={{
                  flex: 1,
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
                  onPress={proceedPressed}
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

export default Medication;
