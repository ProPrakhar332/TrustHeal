import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
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
import { StyleSheet } from "react-native";

function ModalDesign({ navigation }) {
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
        >
          {/* Modal design*/}
          <Modal
            animationType="slide"
            transparent={true}
            visible={questionare}
            onRequestClose={() => {
              setQuestionare(!questionare);
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: "rgba(0,0,0,0.8)",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <View
                style={[
                  styles.modalView,
                  {
                    top: window.height / 8,
                    borderRadius: 10,
                  },
                ]}
              ></View>
            </View>
          </Modal>
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
});

export default ModalDesign;
