import React from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";

function MedicalRecord({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ width: "90%", alignSelf: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={styles.label}>Blood Group</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Blood Pressure</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Diabetes</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Height</Text>
            <TextInput
              placeholder=""
              style={styles.textInput}
              keyboardType={"decimal-pad"}
            ></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Weight</Text>
            <TextInput
              placeholder=""
              style={styles.textInput}
              keyboardType={"decimal-pad"}
            ></TextInput>
          </View>

          <View style={{}}>
            <CustomButton
              text="Save"
              textstyle={{ color: "white" }}
              style={{
                backgroundColor: "gray",
                padding: 15,
                borderRadius: 30,
                marginVertical: 10,
              }}
              onPress={() => navigation.goBack()}
            ></CustomButton>
            <CustomButton
              text="Submit"
              textstyle={{ color: "white" }}
              style={{
                backgroundColor: "limegreen",
                padding: 15,
                borderRadius: 30,
              }}
              onPress={() => navigation.goBack()}
            ></CustomButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    padding: 5,
  },
  label: {
    fontWeight: "bold",
  },
  heading: {
    marginVertical: 10,
  },
});

export default MedicalRecord;
