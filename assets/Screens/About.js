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
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import CustomButton from "../Components/CustomButton";
import Header from "../Components/Header";
import { StyleSheet } from "react-native";

function About({ navigation }) {
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
            marginTop: 30,
            backgroundColor: "#e8f0fe",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Header title="About Arogya" showMenu={false} />
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: "95%",
              alignSelf: "center",
            }}
          >
            <View style={{ flex: 1, alignSelf: "center" }}>
              <Text
                style={{
                  textAlign: "justify",
                  color: "#2B8ADA",
                  fontSize: 20,
                  fontWeight: "bold",
                  borderBottomWidth: 2,
                  borderBottomColor: "#2B8ADA",
                  marginVertical: 20,
                }}
              >
                About Arogya
              </Text>
            </View>
            <View style={{ alignSelf: "center", width: "90%" }}>
              <View style={{ flex: 1, alignSelf: "center" }}>
                <Text style={styles.parStyles}>
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And
                  Typesetting Industry. Lorem Ipsum Has Been The Industry's
                  Standard Dummy Text Ever Since The 1500S, When An Unknown
                  Printer Took A Galley Of Type And Scrambled It To Make A Type
                  Specimen Book. It Has Survived Not Only Five Centuries, But
                  Also The Leap Into Electronic Typesetting, Remaining
                  Essentially Unchanged. It Was Popularised In The 1960S With
                  The Release Of Letraset Sheets Containing Lorem Ipsum
                  Passages, And More Recently With Desktop Publishing Software
                  Like Aldus Pagemaker Including Versions Of Lorem Ipsum.
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "center" }}>
                <Text style={styles.parStyles}>
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And
                  Typesetting Industry. Lorem Ipsum Has Been The Industry's
                  Standard Dummy Text Ever Since The 1500S, When An Unknown
                  Printer Took A Galley Of Type And Scrambled It To Make A Type
                  Specimen Book. It Has Survived Not Only Five Centuries, But
                  Also The Leap Into Electronic Typesetting, Remaining
                  Essentially Unchanged. It Was Popularised In The 1960S With
                  The Release Of Letraset Sheets Containing Lorem Ipsum
                  Passages, And More Recently With Desktop Publishing Software
                  Like Aldus Pagemaker Including Versions Of Lorem Ipsum.
                </Text>
              </View>
              <View style={{ flex: 1, alignSelf: "center" }}>
                <Text style={styles.parStyles}>
                  Lorem Ipsum Is Simply Dummy Text Of The Printing And
                  Typesetting Industry. Lorem Ipsum Has Been The Industry's
                  Standard Dummy Text Ever Since The 1500S, When An Unknown
                  Printer Took A Galley Of Type And Scrambled It To Make A Type
                  Specimen Book. It Has Survived Not Only Five Centuries, But
                  Also The Leap Into Electronic Typesetting, Remaining
                  Essentially Unchanged. It Was Popularised In The 1960S With
                  The Release Of Letraset Sheets Containing Lorem Ipsum
                  Passages, And More Recently With Desktop Publishing Software
                  Like Aldus Pagemaker Including Versions Of Lorem Ipsum.
                </Text>
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
  parStyles: {
    textAlign: "left",
    fontSize: 12,
    marginVertical: 5,
    lineHeight: 15,
  },
});

export default About;
