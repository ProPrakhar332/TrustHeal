import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../Components/CustomButton";

function FamilyMember({ navigation }) {
  const [det, setDet] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ width: "90%", alignSelf: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={styles.label}>Name</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Relation</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Date Of Birth</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Gender</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>
          <View style={styles.heading}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              placeholder=""
              style={styles.textInput}
              maxLength={10}
              keyboardType={"number-pad"}
            ></TextInput>
          </View>
          <View
            style={{
              width: "100%",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                backgroundColor: "orange",
                marginVertical: 20,
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: "row", width: "80%" }}
                onPress={() => {
                  setDet(!det);
                }}
              >
                <Text
                  style={{
                    width: "70%",
                    fontSize: 15,
                    fontWeight: "bold",
                    padding: 10,
                    color: "white",
                  }}
                >
                  Other Details
                </Text>
              </TouchableOpacity>
              <CustomButton
                text="+"
                textstyle={{ color: "white", fontWeight: "bold" }}
                style={{
                  backgroundColor: "white",
                  width: "20%",
                  backgroundColor: "orange",
                }}
                onPress={() => navigation.push("AddDocument")}
              ></CustomButton>
            </View>
          </View>
          {det == true ? (
            <View style={{ flexDirection: "row" }}>
              <View style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}>
                <Text style={{ fontSize: 10 }}>Blood Group</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="A+"
                ></TextInput>
              </View>

              <View style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}>
                <Text style={{ fontSize: 10 }}>Occupation</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="Service"
                ></TextInput>
              </View>

              <View style={{ marginVertical: 10, flex: 0.25, marginRight: 10 }}>
                <Text style={{ fontSize: 10 }}>Height</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="in cm"
                  keyboardType={"decimal-pad"}
                ></TextInput>
              </View>
              <View style={{ marginVertical: 10, flex: 0.25 }}>
                <Text style={{ fontSize: 10 }}>Weight</Text>
                <TextInput
                  style={styles.textInput}
                  placeholder="in kg"
                  keyboardType={"decimal-pad"}
                ></TextInput>
              </View>
            </View>
          ) : null}
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
  textInput: {
    width: "100%",
    padding: 5,
    borderBottomColor: "gray",
    borderBottomWidth: 2,
  },
});

export default FamilyMember;
