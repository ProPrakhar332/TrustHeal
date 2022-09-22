import React, { useState } from "react";
import { ScrollView } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import family from "../Resources/family.png";
import personal from "../Resources/personal.png";
import report from "../Resources/report.png";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

function PatientProfile({ navigation }) {
  const [det, setDet] = useState(false);
  const [fam, setFam] = useState(false);
  const [med, setMed] = useState(false);
  function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Home!</Text>
      </View>
    );
  }

  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Settings!</Text>
      </View>
    );
  }

  const Tab = createBottomTabNavigator();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#edece8" }}>
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon: { width: 30, height: 30, marginRight: 5 },
  label: { width: "70%", fontSize: 15, fontWeight: "bold", padding: 10 },
  labelHeading: {
    width: "95%",
    alignSelf: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  card: {
    margin: 20,
    backgroundColor: "#e6e3e3",
    alignSelf: "center",
    width: "80%",
  },
  container: {
    flex: 1,
  },
});

export default PatientProfile;
