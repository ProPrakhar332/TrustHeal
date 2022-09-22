import React, { useState } from "react";
import { ScrollView, useWindowDimensions } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import * as OpenAnything from "react-native-openanything";
import { StyleSheet } from "react-native";

//icons
import file from "../Resources/file.png";

function PatientProfile({ navigation }) {
  const [det, setDet] = useState(false);
  const [fam, setFam] = useState(false);
  const [med, setMed] = useState(false);

  const DATA = [
    {
      id: "1",
      name: "Define User Experience",
      by: "Dr. Imran Ahmed",
      on: "21/09/2022",
      source: `https://www.tutorialspoint.com/html/html_tutorial.pdf`,
    },
    {
      id: "2",
      name: "User Experience Process.pdf",
      by: "Dr. Ashok Kumar",
      on: "21/08/2022",
      source: `https://www.tutorialspoint.com/html/html_tutorial.pdf`,
    },
    {
      id: "3",
      name: "Components of any User Experience Process.pdf",
      by: "Dr. Jay Sharma",
      on: "01/07/2022",
      source: `https://www.tutorialspoint.com/html/html_tutorial.pdf`,
    },
    {
      id: "4",
      name: "Practical activity.pdf",
      by: "Dr. Sachin Dev",
      on: "03/06/2022",
      source: `https://www.tutorialspoint.com/html/html_tutorial.pdf`,
    },
    {
      id: "5",
      name: "Quiz Answers",
      by: "Dr. Aman Verma",
      on: "01/03/2022",
      source: `https://www.tutorialspoint.com/html/html_tutorial.pdf`,
    },
  ];

  const renderItem = ({ item }) => (
    <Item title={item.name} spl={item.source} by={item.by} date={item.on} />
  );
  const Item = ({ title, spl, by, date }) => (
    <TouchableOpacity onPress={() => OpenAnything.Open(spl)}>
      <View style={styles.card}>
        <View style={styles.cardImg}>
          <Image source={file} style={{ width: 50, height: 50 }} />
        </View>
        <View style={styles.cardDetails}>
          <Text style={{ fontWeight: "bold", fontSize: 15 }}>{title}</Text>
          <Text>by {by}</Text>
          <Text style={{ color: "gray" }}>{date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const layout = useWindowDimensions();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[styles.container, {}]}
    >
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}></ScrollView>
        <View
          style={{
            width: "98%",
            alignSelf: "center",
            height: layout.height - 30,
          }}
        >
          <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={(item) => item.on}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    marginVertical: 5,
    backgroundColor: "white",
    flexDirection: "row",
    width: "95%",
    alignSelf: "center",
  },
  cardDetails: {
    marginHorizontal: 15,
  },
});

export default PatientProfile;
