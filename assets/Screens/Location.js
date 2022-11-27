import React, { useState, useRef } from "react";
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Location = ({ navigation }) => {
  const [whileUsing, setwhileUsing] = useState(false);
  const [onlyUsing, setonlyUsing] = useState(false);
  const [donAllow, setdonAllow] = useState(false);
  const usingApp = async () => {
    setwhileUsing(true);
    setonlyUsing(false);
    setdonAllow(false);
    navigation.push("Role");
    await AsyncStorage.setItem("locationPermission", "While using the app");
  };
  const onlyUsingApp = async () => {
    setwhileUsing(false);
    setonlyUsing(true);
    setdonAllow(false);
    navigation.push("Role");
    await AsyncStorage.setItem("locationPermission", "Only using the app");
  };
  const dontAllow = async () => {
    setwhileUsing(false);
    setonlyUsing(false);
    setdonAllow(true);
    navigation.push("Role");
    await AsyncStorage.setItem("locationPermission", "Don't Allow");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "#2B8ADA" }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          // style={[
          //   styles.container,
          //   { marginVertical: 20, height: layout.height - 50 },
          // ]}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              backgroundColor: "white",
              flexDirection: "column",
              width: "90%",
              alignSelf: "center",
              alignItems: "center",
              padding: 20,
              borderRadius: 15,
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}
            >
              Location Permission is Off
            </Text>
            <Text style={{ textAlign: "center", fontsize: 10 }}>
              Allow Arogya to automatically detect your location to connect you
              to best hospital doctors nearby
            </Text>
            <Image
              source={require("../Resources/map.png")}
              style={{ marginVertical: 20 }}
            />
            <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
              Allow Arogya to access this device location?
            </Text>
            <CustomButton
              text="While using the app"
              textstyle={{ fontsize: 10 }}
              style={{
                backgroundColor: "#E8F0FE",
                width: "95%",
                padding: 5,
                marginBottom: 5,
              }}
              onPress={usingApp}
            />
            <CustomButton
              text="Only using the app"
              textstyle={{ fontsize: 10 }}
              style={{
                backgroundColor: "#E8F0FE",
                width: "95%",
                padding: 5,
                marginBottom: 5,
              }}
              onPress={onlyUsingApp}
            />
            <CustomButton
              text="Don't Allow"
              textstyle={{ fontsize: 10 }}
              style={{
                backgroundColor: "#E8F0FE",
                width: "95%",
                padding: 5,
                marginBottom: 5,
              }}
              onPress={dontAllow}
            />
          </View>
        </ScrollView>
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
    marginTop: 30,
  },
});

export default Location;
