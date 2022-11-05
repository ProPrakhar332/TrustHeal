import React from "react";
import {
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  StyleSheet,
} from "react-native";

const ScheduleHospitalAvailability = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      enabled={true}
    >
      <SafeAreaView
        style={{
          backgroundColor: "#e8f0fe",
          width: "90%",
          marginVertical: 30,
        }}
      >
        <ScrollView
          style={{
            width: "100%",
            alignSelf: "center",
          }}
          showsVerticalScrollIndicator={false}
        ></ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f0fe",
  },
});

export default ScheduleHospitalAvailability;
