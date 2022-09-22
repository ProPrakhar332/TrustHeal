import React, { useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import { CheckBox } from "react-native-elements";
function Achievement({ navigation }) {
  const [check, setChecked] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={{ width: "90%", alignSelf: "center" }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.heading}>
            <Text style={styles.label}>Institution Name</Text>
            <TextInput placeholder="" style={styles.textInput}></TextInput>
          </View>

          <View style={{ flex: 1, marginRight: 10 }}>
            <Text style={styles.label}>From Year</Text>
            <TextInput
              placeholder=""
              style={styles.textInput}
              keyboardType={"number-pad"}
              maxLength={4}
            ></TextInput>
          </View>

          <View style={styles.heading}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline={true}
              placeholder=""
              style={[
                styles.textInput,
                {
                  borderWidth: 2,
                  borderColor: "gray",
                  borderRadius: 10,
                  marginVertical: 10,
                },
              ]}
            ></TextInput>
          </View>

          <View>
            <CheckBox
              textStyle={{ textAlign: "center" }}
              checkedColor={"limegreen"}
              uncheckedColor={"black"}
              title="Current Member"
              checked={check}
              onIconPress={() => setChecked(!check)}
            ></CheckBox>
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

export default Achievement;
