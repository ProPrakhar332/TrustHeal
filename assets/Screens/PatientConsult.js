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

function PatientProfile({ navigation }) {
  const [det, setDet] = useState(false);
  const [fam, setFam] = useState(false);
  const [med, setMed] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "#edece8" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>Consult Screen</Text>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default PatientProfile;
