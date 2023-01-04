import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Alert,
  Text,
  Button,
  SafeAreaView,
  Image,
  Modal,
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
import Slider from "@react-native-community/slider";
//Icons
import cheifComplaints from "../Icons/search.png";
import bodyScan from "../Icons/body-scan.png";
import diagnosis from "../Icons/diagnosis.png";
import medicine from "../Icons/medicine.png";
import investigation from "../Icons/searching.png";
import advice from "../Icons/doctor.png";
import followUp from "../Icons/calendar.png";
import thermometer from "../Icons/thermometer.png";
import bloodpressure from "../Icons/blood-pressure.png";
import AsyncStorage from "@react-native-async-storage/async-storage";

function BodyScan({ navigation }) {
  const [AddVitals, setAddVitals] = useState(false);
  const [examinNotes, setexaminNotes] = useState("");
  const [TemperatureTab, setTemperatureTab] = useState(false);
  const [temp, setTemp] = useState("");
  const [BP, setBP] = useState("");
  const [tempTemp, settempTemp] = useState(98.6);
  const [TempModalVisible, setTempModalVisible] = useState(false);
  const [BPModalVisible, setBPModalVisible] = useState(false);
  const [tempBPSys, settempBPSys] = useState(120);
  const [tempBPDia, settempBPDia] = useState(80);
  const [BPTab, setBPTab] = useState(false);
  const window = useWindowDimensions();

  const pressedProceed = async () => {
    await AsyncStorage.setItem("Temperature", tempTemp + "");
    await AsyncStorage.setItem("BPDia", tempBPDia + "");
    await AsyncStorage.setItem("BPSys", tempBPSys + "");
    await AsyncStorage.setItem("BP", BP);

    await AsyncStorage.setItem("ExaminationNotes", examinNotes);
    console.log(await AsyncStorage.getItem("Temperature"));
    console.log(await AsyncStorage.getItem("BPDia"));
    console.log(await AsyncStorage.getItem("BPSys"));
    console.log(await AsyncStorage.getItem("BP"));
    console.log(await AsyncStorage.getItem("ExaminationNotes"));
    navigation.push("Medication");
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
                  style={[{ tintColor: "#5d5e61" }]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={bodyScan} style={[{ tintColor: "#2B8ADA" }]} />
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
                <Text style={styles.viewHeadingText}>Examination</Text>
              </TouchableOpacity>
              {/* Add Vitals */}
              <TouchableOpacity
                style={styles.WhiteLabel}
                onPress={() => setAddVitals(!AddVitals)}
              >
                <Text
                  style={[
                    styles.label,
                    { width: "80%", fontWeight: "bold" },
                    AddVitals ? { color: "#2B8ADA" } : { color: "black" },
                  ]}
                >
                  Add Vitals
                </Text>
                <FAIcon
                  name={AddVitals ? "chevron-down" : "chevron-right"}
                  size={20}
                  style={[
                    AddVitals ? { color: "#2B8ADA" } : { color: "black" },
                  ]}
                />
              </TouchableOpacity>
              {AddVitals ? (
                <View>
                  <TouchableOpacity
                    style={[
                      styles.WhiteLabel,
                      { alignItems: "center", padding: 10 },
                    ]}
                    onPress={() => {
                      setTemperatureTab(true);
                      setTempModalVisible(true);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#E8F0FE",
                        borderRadius: 5,

                        padding: 5,
                      }}
                    >
                      <Image source={thermometer} />
                    </View>
                    <View style={{ width: "50%", flexDirection: "column" }}>
                      <Text
                        style={[
                          styles.label,
                          { fontWeight: "bold", fontSize: 15 },
                        ]}
                      >
                        Temperature
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={[
                            styles.label,
                            { fontSize: 11, color: "#2B8ADA" },
                          ]}
                        >
                          {temp !== "" ? temp : null}
                        </Text>
                        <Text
                          style={[
                            styles.label,
                            { fontSize: 11, color: "#2B8ADA" },
                          ]}
                        >
                          F
                        </Text>
                      </View>
                    </View>
                    <FAIcon
                      name={"chevron-right"}
                      size={20}
                      style={[{ color: "black" }]}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.WhiteLabel,
                      { alignItems: "center", padding: 10 },
                    ]}
                    onPress={() => {
                      setBPTab(true);
                      setBPModalVisible(true);
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: "#E8F0FE",
                        borderRadius: 5,

                        padding: 5,
                      }}
                    >
                      <Image source={bloodpressure} />
                    </View>
                    <View style={{ width: "50%", flexDirection: "column" }}>
                      <Text
                        style={[
                          styles.label,
                          { fontWeight: "bold", fontSize: 15 },
                        ]}
                      >
                        Blood Pressure
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={[
                            styles.label,
                            { fontSize: 11, color: "#2B8ADA" },
                          ]}
                        >
                          {BP !== "" ? BP : "mmHg"}
                        </Text>
                      </View>
                    </View>
                    <FAIcon
                      name={"chevron-right"}
                      size={20}
                      style={[{ color: "black" }]}
                    />
                  </TouchableOpacity>
                </View>
              ) : null}

              {TemperatureTab ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={TempModalVisible}
                  onRequestClose={() => {
                    setTempModalVisible(!TempModalVisible);
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.8)",
                    }}
                  >
                    <View
                      style={[
                        styles.modalView,
                        {
                          flexDirection: "column",
                          bottom: 0,
                          borderTopRightRadius: 50,
                          borderTopLeftRadius: 50,
                          width: "100%",
                        },
                      ]}
                    >
                      <View
                        style={{
                          borderBottomColor: "#2b8ada",
                          borderBottomWidth: 1,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#2b8ada",
                            fontWeight: "bold",
                            alignSelf: "center",
                            marginBottom: 10,
                          }}
                        >
                          Select Temperature (in F)
                        </Text>
                        <FAIcon
                          name="window-close"
                          color="black"
                          size={26}
                          style={{ position: "absolute", top: 0, right: 0 }}
                          onPress={() => setTempModalVisible(false)}
                        />
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{ marginVertical: 14, fontWeight: "bold" }}
                        >
                          Scroll to Select Temperature
                        </Text>
                        <View
                          style={{
                            color: "#2B8ADA",
                            padding: 10,
                            backgroundColor: "#E8F0FE",
                            borderRadius: 10,
                            width: 100,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                              color: "#2B8ADA",
                              fontWeight: "bold",
                            }}
                          >
                            {tempTemp}
                          </Text>
                        </View>
                        <Slider
                          style={{ width: 200, height: 40 }}
                          minimumValue={88}
                          maximumValue={108}
                          thumbTintColor="#E8F0FE"
                          minimumTrackTintColor="#2B8ADA"
                          maximumTrackTintColor="#2B8ADA"
                          value={tempTemp}
                          step={0.1}
                          onValueChange={(value) => settempTemp(value)}
                        />
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <CustomButton
                          text="Save"
                          style={{
                            backgroundColor: "#2b8ada",
                            flex: 0.45,
                            marginRight: "5%",
                          }}
                          textstyle={{ color: "white" }}
                          onPress={() => {
                            setTemp(tempTemp);
                            setTempModalVisible(false);
                          }}
                        ></CustomButton>
                        <CustomButton
                          text="Skip"
                          style={{
                            borderColor: "#2b8ada",
                            borderWidth: 1,
                            flex: 0.45,
                          }}
                          textstyle={{ color: "#2b8ada" }}
                          onPress={() => {
                            setTempModalVisible(false);
                          }}
                        ></CustomButton>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}

              {BPTab ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={BPModalVisible}
                  onRequestClose={() => {
                    setBPModalVisible(!BPModalVisible);
                  }}
                >
                  <View
                    style={{
                      height: "100%",
                      backgroundColor: "rgba(0,0,0,0.8)",
                    }}
                  >
                    <View
                      style={[
                        styles.modalView,
                        {
                          flexDirection: "column",
                          bottom: 0,
                          borderTopRightRadius: 50,
                          borderTopLeftRadius: 50,
                          width: "100%",
                        },
                      ]}
                    >
                      <View
                        style={{
                          borderBottomColor: "#2b8ada",
                          borderBottomWidth: 1,
                          width: "100%",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 18,
                            color: "#2b8ada",
                            fontWeight: "bold",
                            alignSelf: "center",
                            marginBottom: 10,
                          }}
                        >
                          Blood Pressure (in mmHg)
                        </Text>
                        <FAIcon
                          name="window-close"
                          color="black"
                          size={26}
                          style={{ position: "absolute", top: 0, right: 0 }}
                          onPress={() => setBPModalVisible(false)}
                        />
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{ marginVertical: 14, fontWeight: "bold" }}
                        >
                          Systolic
                        </Text>
                        <View
                          style={{
                            color: "#2B8ADA",
                            padding: 10,
                            backgroundColor: "#E8F0FE",
                            borderRadius: 10,
                            width: 100,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                              color: "#2B8ADA",
                              fontWeight: "bold",
                            }}
                          >
                            {tempBPSys} mmHg
                          </Text>
                        </View>
                        <Slider
                          style={{ width: 200, height: 40 }}
                          minimumValue={80}
                          maximumValue={200}
                          thumbTintColor="#E8F0FE"
                          minimumTrackTintColor="#2B8ADA"
                          maximumTrackTintColor="#2B8ADA"
                          value={tempBPSys}
                          step={1}
                          onValueChange={(value) => settempBPSys(value)}
                        />
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{ marginVertical: 14, fontWeight: "bold" }}
                        >
                          Diastolic
                        </Text>
                        <View
                          style={{
                            color: "#2B8ADA",
                            padding: 10,
                            backgroundColor: "#E8F0FE",
                            borderRadius: 10,
                            width: 100,
                            alignSelf: "center",
                          }}
                        >
                          <Text
                            style={{
                              alignSelf: "center",
                              color: "#2B8ADA",
                              fontWeight: "bold",
                            }}
                          >
                            {tempBPDia} mmHg
                          </Text>
                        </View>
                        <Slider
                          style={{ width: 200, height: 40 }}
                          minimumValue={50}
                          maximumValue={120}
                          thumbTintColor="#E8F0FE"
                          minimumTrackTintColor="#2B8ADA"
                          maximumTrackTintColor="#2B8ADA"
                          value={tempBPDia}
                          step={1}
                          onValueChange={(value) => settempBPDia(value)}
                        />
                      </View>

                      <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <CustomButton
                          text="Save"
                          style={{
                            backgroundColor: "#2b8ada",
                            flex: 0.45,
                            marginRight: "5%",
                          }}
                          textstyle={{ color: "white" }}
                          onPress={() => {
                            setBP(tempBPDia + "mmHg " + tempBPSys + "mmHg");

                            setBPModalVisible(false);
                          }}
                        ></CustomButton>
                        <CustomButton
                          text="Skip"
                          style={{
                            borderColor: "#2b8ada",
                            borderWidth: 1,
                            flex: 0.45,
                          }}
                          textstyle={{ color: "#2b8ada" }}
                          onPress={() => {
                            setBPModalVisible(false);
                          }}
                        ></CustomButton>
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}
              {/* Examination Note */}
              <View
                style={{
                  marginVertical: 10,
                  width: "95%",
                  alignSelf: "center",
                }}
              >
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "#2B8ADA",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                  }}
                >
                  <Text style={[styles.label, { color: "white" }]}>
                    On-Examination Notes
                  </Text>
                </View>
                <View
                  style={{
                    padding: 5,
                    backgroundColor: "white",
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                    height: 100,
                  }}
                >
                  <TextInput
                    placeholder="Enter examination notes here..."
                    placeholderTextColor={"black"}
                    onChangeText={(text) => setexaminNotes(text)}
                    value={examinNotes}
                    multiline={true}
                    style={{
                      textAlign: "left",
                    }}
                  />
                </View>
              </View>
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
  WhiteLabel: {
    flexDirection: "row",
    width: "95%",
    marginVertical: 5,
    alignSelf: "center",
    backgroundColor: "white",
    marginBottom: 5,
    padding: 10,
    justifyContent: "space-between",
    borderRadius: 10,
  },
  modalView: {
    position: "absolute",
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
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

export default BodyScan;
