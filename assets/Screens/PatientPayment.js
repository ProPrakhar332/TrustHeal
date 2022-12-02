import React, { useState, useEffect } from "react";
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../Components/Header";
import HeaderPatient from "../Components/HeaderPatient";
import FAIcons from "react-native-vector-icons/FontAwesome5";
import RazorpayCheckout from "react-native-razorpay";
import CustomButton from "../Components/CustomButton";

import Logo from "../Resources/TH_logo.png";
import heart from "../Animations/heart_loading.json";

function PatientPayment({ navigation }) {
  const [Amount, setAmount] = useState(500);
  const [Response, setResponse] = useState([]);
  const [showPay, setshowPay] = useState(false);
  const [orderId, setorderId] = useState("");
  const [trusthealid, settrusthealid] = useState("");

  const getOrder = async () => {
    axios
      .post(`http://10.0.2.2:8080/createorder`, {
        email: "abc123@gmail.com",
        phonenumber: "+919898987548",
        amount: Amount * 100,
        currency: "INR",
      })
      .then((response) => {
        console.log(response.data);
        console.log(response.data.razopayid);
        setorderId(response.data.razopayid);
        settrusthealid(response.data.trusthealid);
        console.log(response.data.trusthealid);
        setshowPay(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 300,
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <Image
                source={heart}
                style={{ width: 100, height: 100, backgroundColor: "pink" }}
              />

              <TextInput
                placeholder="Enter Value"
                onChangeText={(text) => setAmount(text)}
                value={Amount}
              />
              <CustomButton
                text={"Get Order ID"}
                textstyle={{ color: "white", fontWeight: "bold" }}
                style={{ backgroundColor: "green" }}
                onPress={() => {
                  getOrder();
                }}
              />
              {showPay ? (
                <CustomButton
                  text={"Pay with Razorpay"}
                  textstyle={{ color: "white" }}
                  style={{
                    backgroundColor: "blue",
                  }}
                  onPress={() => {
                    var options = {
                      description: "Credits towards consultation",
                      image: Logo,
                      currency: "INR",
                      key: "rzp_test_8zGNSWSmWdSF6y",
                      amount: Amount * 100,
                      name: "Trust Heal",
                      order_id: orderId, //Replace this with an order_id created using Orders API.
                      prefill: {
                        email: "gaurav.kumar@example.com",
                        contact: "9191919191",
                        name: "Gaurav Kumar",
                      },
                      theme: { color: "#53a20e" },
                    };
                    RazorpayCheckout.open(options)
                      .then((data) => {
                        // handle success
                        console.log(data);
                      })
                      .catch((error) => {
                        // handle failure
                        console.log(error);
                      });
                  }}
                />
              ) : null}
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
});

export default PatientPayment;
