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

function Medication({ navigation }) {
  const [Medicine, setMedicine] = useState(false);
  const [MedicineTypeBar, setMedicineTypeBar] = useState(false);
  const [Syrup, setSyrup] = useState(false);
  const [Tablet, setTablet] = useState(false);
  const [Cream, setCream] = useState(false);
  const [Drop, setDrop] = useState(false);
  const [Medication, setMedication] = useState([]);
  const [medicineName, setmedicineName] = useState("");
  const [medicineType, setmedicineType] = useState("");
  const [medicineInstruction, setmedicineInstruction] = useState("");
  const [medicineDays, setmedicineDays] = useState("");

  const window = useWindowDimensions();

  const clearAll = () => {
    setmedicineName("");
    setmedicineType("");
    setMedicineTypeBar(false);
    setSyrup(false);
    setTablet(false);
    setCream(false);
    setDrop(false);
    setmedicineInstruction("");
    setmedicineDays("");
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
            <Text style={{ color: "#2B8ADA", textAlign: "center" }}>
              {Medication.medicineName}
            </Text>
          </View>
          <View
            style={{
              flex: 0.2,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#2B8ADA", textAlign: "center" }}>
              {Medication.medicineType}
            </Text>
          </View>
          <View
            style={{
              flex: 0.5,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#2B8ADA", textAlign: "center" }}>
              {Medication.instruction}
            </Text>
          </View>
          <View
            style={{
              flex: 0.1,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "#2B8ADA", textAlign: "center" }}>
              {Medication.days}
            </Text>
          </View>
          <View style={{ flex: 0.1, alignSelf: "center" }}>
            <FAIcon
              name="trash"
              color={"red"}
              size={20}
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
                <TouchableOpacity
                  style={{
                    padding: 10,
                    backgroundColor: "white",
                    borderRadius: 5,
                    marginVertical: 5,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => setMedicineTypeBar(!MedicineTypeBar)}
                >
                  <Text>Medicine Type</Text>
                  <FAIcon
                    name={!MedicineTypeBar ? "chevron-down" : "chevron-up"}
                    color={!MedicineTypeBar ? "black" : "#2B8ADA"}
                    size={15}
                    style={{ marginRight: 5 }}
                  />
                </TouchableOpacity>
                {MedicineTypeBar ? (
                  <View style={{ flexDirection: "column" }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CustomButton
                        text="Syrup"
                        textstyle={[
                          styles.bubbleText,
                          Syrup ? { color: "white" } : { color: "#2B8ADA" },
                        ]}
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 5,
                            flex: 0.45,
                            borderWidth: 1,
                          },
                          Syrup
                            ? {
                                backgroundColor: "#2B8ADA",
                                borderColor: "#2B8ADA",
                              }
                            : {
                                backgroundColor: "#E8F0FE",
                                borderColor: "#2B8ADA",
                              },
                        ]}
                        onPress={() => {
                          setSyrup(true);
                          setTablet(false);
                          setCream(false);
                          setDrop(false);
                          if (Syrup) setmedicineType("Syrup");
                        }}
                      />
                      <CustomButton
                        text="Tablet"
                        textstyle={[
                          styles.bubbleText,
                          Tablet ? { color: "white" } : { color: "#2B8ADA" },
                        ]}
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 5,
                            flex: 0.45,
                            borderWidth: 1,
                          },
                          Tablet
                            ? {
                                backgroundColor: "#2B8ADA",
                                borderColor: "#2B8ADA",
                              }
                            : {
                                backgroundColor: "#E8F0FE",
                                borderColor: "#2B8ADA",
                              },
                        ]}
                        onPress={() => {
                          setSyrup(false);
                          setTablet(true);
                          setCream(false);
                          setDrop(false);
                          if (Tablet) setmedicineType("Tablet");
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                      }}
                    >
                      <CustomButton
                        text="Cream"
                        textstyle={[
                          styles.bubbleText,
                          Cream ? { color: "white" } : { color: "#2B8ADA" },
                        ]}
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 5,
                            flex: 0.45,
                            borderWidth: 1,
                          },
                          Cream
                            ? {
                                backgroundColor: "#2B8ADA",
                                borderColor: "#2B8ADA",
                              }
                            : {
                                backgroundColor: "#E8F0FE",
                                borderColor: "#2B8ADA",
                              },
                        ]}
                        onPress={() => {
                          setSyrup(false);
                          setTablet(false);
                          setCream(true);
                          setDrop(false);
                          if (Cream) setmedicineType("Cream");
                        }}
                      />
                      <CustomButton
                        text="Drop"
                        textstyle={[
                          styles.bubbleText,
                          Drop ? { color: "white" } : { color: "#2B8ADA" },
                        ]}
                        style={[
                          {
                            flexDirection: "row",
                            justifyContent: "space-evenly",
                            marginVertical: 5,
                            padding: 10,
                            borderRadius: 5,
                            flex: 0.45,
                            borderWidth: 1,
                          },
                          Drop
                            ? {
                                backgroundColor: "#2B8ADA",
                                borderColor: "#2B8ADA",
                              }
                            : {
                                backgroundColor: "#E8F0FE",
                                borderColor: "#2B8ADA",
                              },
                        ]}
                        onPress={() => {
                          setSyrup(false);
                          setTablet(false);
                          setCream(false);
                          setDrop(true);
                          if (Drop) setmedicineType("Drop");
                        }}
                      />
                    </View>
                  </View>
                ) : null}
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
                      (Syrup || Cream || Tablet || Drop)
                    ) {
                      let as = {
                        medicineName: medicineName,
                        medicineType: medicineType,
                        instruction: medicineInstruction,
                        days: medicineDays,
                      };
                      Medication.push(as);
                      console.log(Medication);
                      clearAll();
                    } else Alert.alert("Fill all fields!");
                  }}
                />
              </View>

              {/* {Medication.map((Medication, index) => {})} */}

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
                  onPress={() => {
                    navigation.push("Investigation");
                  }}
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
