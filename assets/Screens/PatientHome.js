import React, { useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import {
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  StatusBar,
  KeyboardAvoidingView,
} from "react-native";
import { StyleSheet } from "react-native";
import { LogBox } from "react-native";
import CustomButton from "../Components/CustomButton";
LogBox.ignoreLogs(["Warning: ..."]);
//images
import pfp1 from "../Resources/pfp1.jpg";
import pfp2 from "../Resources/pfp2.jpg";
import pfp3 from "../Resources/pfp3.jpg";
//icons
import cardio from "../Resources/cardio.png";
import derma from "../Resources/derma.png";
import gastro from "../Resources/gastro.png";
import medicine from "../Resources/Medicine.png";
import ortho from "../Resources/ortho.png";
import pediatrics from "../Resources/pediatrics.png";
import uro from "../Resources/uro.png";
import psychiatry from "../Resources/psychiatry.png";
//symptoms icons
import covid from "../Resources/covid.png";
import fever from "../Resources/fever.png";
import cough from "../Resources/cough.png";
import headache from "../Resources/headache.png";
import stomach from "../Resources/stomachache.png";
import vomit from "../Resources/vomit.png";
import hairfall from "../Resources/hairfall.png";

const DATA = {
  lastVisitedDoctors: [
    {
      id: "1",
      img: pfp1,
      name: "Dr. Imran Ahmed",
      spl: "MD, DM - Cardiology",
      exp: "20 Years Exp.",
      qual: "MBBS, MD, FID, CCLHA",
    },
    {
      id: "2",
      img: pfp2,
      name: "Dr. Ashok Kumar",
      spl: "MD, DM - Dermatologist",
      exp: "10 Years Exp.",
      qual: "MBBS, MD, FID, CCLHA",
    },
    {
      id: "3",
      img: pfp3,
      name: "Dr. Jay Sharma",
      spl: "MD, DM - Physician",
      exp: "10 Years Exp.",
      qual: "MBBS, MD, FID, CCLHA",
    },
  ],
};

const Speciality = [
  {
    id: "1000",
    name: "General Medicine",
    img: medicine,
  },
  {
    id: "1001",
    name: "Psychiatry",
    img: psychiatry,
  },
  {
    id: "1002",
    name: "Pediatrics",
    img: pediatrics,
  },
  {
    id: "1003",
    name: "Orthopedics",
    img: ortho,
  },
  {
    id: "1004",
    name: "Dermatology",
    img: derma,
  },
  {
    id: "1005",
    name: "Cardiology",
    img: cardio,
  },
  {
    id: "1006",
    name: "Urology",
    img: uro,
  },
  {
    id: "1007",
    name: "Gastroenterology",
    img: gastro,
  },
];

const Symptoms = [
  {
    id: "2000",
    name: "covid",
    img: covid,
  },
  {
    id: "2001",
    name: "fever",
    img: fever,
  },
  {
    id: "2002",
    name: "cough",
    img: cough,
  },
  {
    id: "2003",
    name: "headache",
    img: headache,
  },
  {
    id: "2004",
    name: "stomach",
    img: stomach,
  },
  {
    id: "2005",
    name: "vomit",
    img: vomit,
  },
  {
    id: "2006",
    name: "hairfall",
    img: hairfall,
  },
];

const Item = ({ title, spl, exp, qual, img }) => (
  <View style={styles.card}>
    <Image source={img} style={{ width: 100, height: 100 }}></Image>
    <Text style={styles.title}>{title}</Text>
    <Text style={styles.text}>{exp}</Text>
    <Text style={styles.text}>{qual}</Text>
    <Text style={styles.text}>{spl}</Text>
    <CustomButton
      text="Consult Now"
      textstyle={{ color: "white", fontWeight: "bold" }}
      style={{ backgroundColor: "orange", padding: 5, marginTop: 5 }}
      onPress={() => {
        console.log(title);
      }}
    ></CustomButton>
  </View>
);

const Items = ({ name, img }) => (
  <TouchableOpacity onPress={() => console.log(name)}>
    <View style={styles.cardSpl}>
      <Image
        source={img}
        style={{ width: 50, height: 50, alignSelf: "center" }}
      ></Image>
      <Text style={styles.cardSplText}>{name}</Text>
    </View>
  </TouchableOpacity>
);

const slideshow = [
  "https://wallpaperaccess.com/full/3988527.jpg",
  "https://wallpaperaccess.com/full/619974.jpg",
  "https://wallpapercave.com/wp/wp2789220.jpg",
  "https://s3.amazonaws.com/freestock-prod/450/freestock_45335776.jpg",
];
const { width } = Dimensions.get("window");
const height = width * 0.6;

function PatientProfile({ navigation }) {
  const renderSpl = ({ item }) => <Items name={item.name} img={item.img} />;
  const renderItem = ({ item }) => (
    <Item
      title={item.name}
      spl={item.spl}
      exp={item.exp}
      qual={item.qual}
      img={item.img}
    />
  );

  const [states, setStates] = useState(0);

  const change = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    if (slide !== states) {
      setStates(slide);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={{ marginVertical: 10, width, height }}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={change}
              showsHorizontalScrollIndicator={false}
              style={{ width, height }}
            >
              {slideshow.map((slideshow, index) => (
                <Image
                  key={index}
                  source={{ uri: slideshow }}
                  style={{ width, height, resizeMode: "cover" }}
                ></Image>
              ))}
            </ScrollView>
            <View
              style={{
                flexDirection: "row",
                position: "absolute",
                bottom: 0,
                alignSelf: "center",
              }}
            >
              {slideshow.map((i, k) => (
                <Text
                  key={k}
                  style={
                    k == states
                      ? { color: "white", margin: 3 }
                      : { color: "gray", margin: 3 }
                  }
                >
                  ⬤
                </Text>
              ))}
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "limegreen",
            }}
          >
            <Text style={[styles.label, { width: "80%" }]}>
              Recently Visited Doctor
            </Text>
            <CustomButton
              text="View All"
              style={{
                alignSelf: "flex-end",
                width: "20%",
                backgroundColor: "limegreen",
                padding: 5,
              }}
              textstyle={{ color: "white" }}
            ></CustomButton>
          </View>
          <FlatList
            data={DATA.lastVisitedDoctors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "limegreen",
            }}
          >
            <Text style={[styles.label, { width: "80%" }]}>
              Select a Speciality
            </Text>
            <CustomButton
              text="View All"
              style={{
                alignSelf: "flex-end",
                width: "20%",
                backgroundColor: "limegreen",
                padding: 5,
              }}
              textstyle={{ color: "white" }}
            ></CustomButton>
          </View>
          <FlatList
            data={Speciality}
            renderItem={renderSpl}
            keyExtractor={(item) => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "limegreen",
            }}
          >
            <Text style={[styles.label, { width: "80%" }]}>
              Consult Doctor in 1 click
            </Text>
            <CustomButton
              text="View All"
              style={{
                alignSelf: "flex-end",
                width: "20%",
                backgroundColor: "limegreen",
                padding: 5,
              }}
              textstyle={{ color: "white" }}
            ></CustomButton>
          </View>
          <FlatList
            data={Symptoms}
            renderItem={renderSpl}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: "limegreen",
            }}
          >
            <Text style={[styles.label, { width: "80%" }]}>
              Frequently Visited Doctor
            </Text>
            <CustomButton
              text="View All"
              style={{
                alignSelf: "flex-end",
                width: "20%",
                backgroundColor: "limegreen",
                padding: 5,
              }}
              textstyle={{ color: "white" }}
            ></CustomButton>
          </View>
          <FlatList
            data={DATA.lastVisitedDoctors}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  card: {
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  cardSpl: {
    alignSelf: "center",
    width: 170,
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 5,
  },
  cardSplText: {
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
  },
  label: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default PatientProfile;
