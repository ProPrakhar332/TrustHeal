import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  Alert,
  useWindowDimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from "react-native";
import CustomButton from "../Components/CustomButton";
import Header from "../Components/Header";
import { StyleSheet } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FAIcon from "react-native-vector-icons/FontAwesome5";

function Support({ navigation }) {
  const [HelpModal, setHelpModal] = useState(true);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      // style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#2B8ADA",
          width: "100%",
        }}
      >
        <StatusBar animated={true} backgroundColor="#2B8ADA"/>
        <Header title={"Help & Support"} showMenu={false} />
        <View style={{ backgroundColor: "#e8f0fe"}}>

            <View style={{justifyContent: "center", alignItems: "center", padding: 10}}>
              <View style={styles.searchBar}>
                <TextInput placeholder="Search Question" />
                <FAIcon
                  name="search"
                  size={15}
                  color="gray"
                  style={styles.searchIcon}
                />
              </View>
              <ScrollView
                style={{
                  // height: 300,
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <View>
                  <TouchableOpacity
                    style={[styles.WhiteLabel, styles.BlueLabel]}
                  >
                    <Text
                      style={[
                        {
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        },
                      ]}
                    >
                      1. I Am Infected With Viral Fever. What To Do?
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.BlueLabelUnderText}>
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 5,
                        textAlign: "justify",
                      }}
                    >
                      Lorem Ipsum Is Simply Dummy Text Of The Printing And
                      Typesetting Industry. Lorem Ipsum Has Been The
                      Industry's Standard Dummy Text Ever Since The 1500S,
                      When An Unknown Printer Took A Galley Of Type And
                      Scrambled It To Make A Type Specimen Book. It Has
                      Survived.
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={[styles.WhiteLabel, styles.BlueLabel]}
                  >
                    <Text
                      style={[
                        {
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        },
                      ]}
                    >
                      1. I Am Infected With Viral Fever. What To Do?
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.BlueLabelUnderText}>
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 5,
                        textAlign: "justify",
                      }}
                    >
                      Lorem Ipsum Is Simply Dummy Text Of The Printing And
                      Typesetting Industry. Lorem Ipsum Has Been The
                      Industry's Standard Dummy Text Ever Since The 1500S,
                      When An Unknown Printer Took A Galley Of Type And
                      Scrambled It To Make A Type Specimen Book. It Has
                      Survived.
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={[styles.WhiteLabel, styles.BlueLabel]}
                  >
                    <Text
                      style={[
                        {
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        },
                      ]}
                    >
                      1. I Am Infected With Viral Fever. What To Do?
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.BlueLabelUnderText}>
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 5,
                        textAlign: "justify",
                      }}
                    >
                      Lorem Ipsum Is Simply Dummy Text Of The Printing And
                      Typesetting Industry. Lorem Ipsum Has Been The
                      Industry's Standard Dummy Text Ever Since The 1500S,
                      When An Unknown Printer Took A Galley Of Type And
                      Scrambled It To Make A Type Specimen Book. It Has
                      Survived.
                    </Text>
                  </View>
                </View>
                <View>
                  <TouchableOpacity
                    style={[styles.WhiteLabel, styles.BlueLabel]}
                  >
                    <Text
                      style={[
                        {
                          fontWeight: "bold",
                          fontSize: 14,
                          color: "white",
                        },
                      ]}
                    >
                      1. I Am Infected With Viral Fever. What To Do?
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.BlueLabelUnderText}>
                    <Text
                      style={{
                        fontSize: 12,
                        padding: 5,
                        textAlign: "justify",
                      }}
                    >
                      Lorem Ipsum Is Simply Dummy Text Of The Printing And
                      Typesetting Industry. Lorem Ipsum Has Been The
                      Industry's Standard Dummy Text Ever Since The 1500S,
                      When An Unknown Printer Took A Galley Of Type And
                      Scrambled It To Make A Type Specimen Book. It Has
                      Survived.
                    </Text>
                  </View>
                </View>
              </ScrollView>
            </View>
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
  BlueLabel: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
    backgroundColor: "#2B8ADA",
  },
  BlueLabelUnderText: {
    marginTop: -6,
    padding: 5,
    borderWidth: 1,
    borderTopWidth: 0,
    width: "95%",
    alignSelf: "center",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
  },
  searchBar: {
    //flex: 1,
    height: 50,
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
    top: 0,
    margin: 15,
  },
  ModalBackground: {
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.8)",
    flexDirection: "row",
    justifyContent: "center",
  },
  modalView: {
    borderRadius: 10,
    flex: 1,
    position: "absolute",
    width: "100%",
    backgroundColor: "white",
    borderTopRadius: 50,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default Support;
