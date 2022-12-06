import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  Alert,
  useWindowDimensions,
  Dimensions,
  View,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
import { StyleSheet } from "react-native";
import HeaderPatient from "../Components/HeaderPatient";
import FAIcons from "react-native-vector-icons/FontAwesome5";
import IonIcons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButton from "../Components/CustomButton";

import doctor_m from "../Resources/doctor_m.png";
import doctor_f from "../Resources/doctor_f.jpg";

import generalmedicine from "../SpecialityIcons/generalmedicine.jpg";
import psychiatry from "../SpecialityIcons/psychiatry.jpg";
import neurology from "../SpecialityIcons/neurology.jpg";
import pediatrics from "../SpecialityIcons/pediatrics.jpg";
import dermatology from "../SpecialityIcons/dermatology.jpg";
import urology from "../SpecialityIcons/urology.jpg";
import orthopedics from "../SpecialityIcons/orthopedics.jpg";
import gastroentology from "../SpecialityIcons/gastroentology.jpg";

import anxiety from "../SymptomIcons/anxiety.jpg";
import cough from "../SymptomIcons/cough.jpg";
import covid from "../SymptomIcons/covid.jpg";
import fever from "../SymptomIcons/fever.jpg";
import hairfall from "../SymptomIcons/hairfall.jpg";
import headache from "../SymptomIcons/headache.jpg";
import loosemotion from "../SymptomIcons/loosemotion.jpg";
import stomachpain from "../SymptomIcons/stomachpain.jpg";

const slideshow = [
  "https://wallpaperaccess.com/full/3988527.jpg",
  "https://wallpaperaccess.com/full/619974.jpg",
  "https://wallpapercave.com/wp/wp2789220.jpg",
  "https://s3.amazonaws.com/freestock-prod/450/freestock_45335776.jpg",
];

const dataSpeciality = [
  { name: "General Medicine", img: generalmedicine },
  { name: "Psychiatry", img: psychiatry },
  { name: "Neurology", img: neurology },
  { name: "Pediatrics", img: pediatrics },
  { name: "Dermatology", img: dermatology },
  { name: "Urology", img: urology },
  { name: "Orthopedics", img: orthopedics },
  { name: "Gastroentology", img: gastroentology },
];

const dataSymptom = [
  { name: "Covid", img: covid },
  { name: "Fever", img: fever },
  { name: "Cough", img: cough },
  { name: "Headache", img: headache },
  { name: "Stomach Pain", img: stomachpain },
  { name: "Loose Motion", img: loosemotion },
  { name: "Hairfall", img: hairfall },
  { name: "Anxiety", img: anxiety },
];

const dataListOfDoctors = [
  {
    name: "Dr. Imarti Rawat",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    img: doctor_f,
  },
  {
    name: "Dr. Luv Kumar",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    img: doctor_m,
  },
  {
    name: "Dr. Shreya Day",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    img: doctor_f,
  },
  {
    name: "Dr. Jay Sharma",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    img: doctor_m,
  },
];
const dataRecentConsultation = [
  {
    name: "Dr. Imran Ahmed",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "E-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_m,
  },
  {
    name: "Dr. Imran Rawat",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "P-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_m,
  },
  {
    name: "Dr. Imran Singh",
    spl: "MD, DM - Cardiology Senior Consultant- Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "E-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_m,
  },
];
const dataUpcoming = [
  {
    name: "Dr. Ishita Singh",
    spl: "Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "P-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_f,
  },
  {
    name: "Dr. Imran Ahmed",
    spl: "Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "P-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_m,
  },
  {
    name: "Dr. Riya Negi",
    spl: "Cardiology",
    exp: "20 Years Exp.",
    deg: "MBBS, MD, FID, CCLHA",
    date: "03-11-2022",
    mode: "P-Consultation",
    time: "9:30 am",
    loc: "JSPL, Angul",
    pres: "",
    img: doctor_f,
  },
];

const { width } = Dimensions.get("window");
const height = width * 0.5;

const ItemSpeciality = ({ name, img }) => (
  <TouchableOpacity
    style={{
      flexDirection: "column",
      alignSelf: "center",
      height: 70,
      width: 80,
      backgroundColor: "white",
      justifyContent: "space-evenly",
      borderRadius: 15,
      margin: 5,
    }}
  >
    {/* <Image/> */}
    <Image
      source={img}
      style={{ height: 45, width: 45, alignSelf: "center" }}
    />
    <Text style={{ fontSize: 9, alignSelf: "center" }}>{name}</Text>
  </TouchableOpacity>
);
const ItemSymptoms = ({ name, img }) => (
  <TouchableOpacity
    style={{
      flexDirection: "column",
      alignSelf: "center",
      height: 70,
      width: 80,
      backgroundColor: "#2B8ADA",
      justifyContent: "space-evenly",
      borderRadius: 15,
      margin: 5,
    }}
  >
    {/* <Image/> */}
    <Image
      source={img}
      style={{ height: 45, width: 45, alignSelf: "center" }}
    />
    <Text style={{ fontSize: 9, alignSelf: "center", color: "white" }}>
      {name}
    </Text>
  </TouchableOpacity>
);
const ItemDoctors = ({ name, img, spl, exp, deg }) => (
  <View
    style={{
      alignSelf: "center",
      flex: 1,
      backgroundColor: "white",
      padding: 10,
      borderRadius: 15,
      width: 175,
      marginHorizontal: 5,
    }}
  >
    {/* Image */}
    <Image
      source={img}
      style={{
        width: 120,
        height: 120,
        alignSelf: "center",
        marginVertical: 5,
      }}
    />
    {/* Details */}
    <View>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 14,
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 10,
          color: "gray",
        }}
      >
        {spl}
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {exp}
      </Text>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "bold",
          fontSize: 12,
        }}
      >
        {deg}
      </Text>
    </View>
    {/* Consult Now Button */}
    <CustomButton
      text="CONSULT NOW"
      textstyle={{ color: "white", fontSize: 12 }}
      style={{
        backgroundColor: "#2B8ADA",
        paddingVertical: 3,
        marginVertical: 5,
      }}
      onPress={() => {
        console.log(name);
      }}
    />
  </View>
);
// const ItemRecent = ({
//   name,
//   img,
//   spl,
//   exp,
//   deg,
//   date,
//   mode,
//   time,
//   loc,
//   pres,
// }) => (
//   <View
//     style={{
//       backgroundColor: "#E8F0FE",
//       borderRadius: 10,
//       padding: 5,
//       margin: 5,
//       flexDirection: "column",
//       width: 350,
//       height: 210,
//     }}
//   >
//     {/* UpperHalf */}
//     <View
//       style={{
//         flexDirection: "row",
//         borderBottomColor: "gray",
//         borderBottomWidth: 1,
//       }}
//     >
//       {/* Image */}
//       <View
//         style={{
//           width: 80,
//           flexDirection: "column",
//           alignSelf: "center",
//           margin: 5,
//         }}
//         onPress={() => navigation.navigate("DoctorDetails")}
//       >
//         <Image
//           source={img}
//           style={{
//             width: 80,
//             height: 150,
//             borderRadius: 10,
//             alignSelf: "center",
//           }}
//         />
//       </View>
//       {/* Details */}
//       <View style={{ width: 250, justifyContent: "space-evenly" }}>
//         <Text style={{ fontSize: 18, fontWeight: "bold" }}>{name}</Text>
//         <Text style={{ fontSize: 12, color: "gray" }}>{spl}</Text>

//         <Text style={{ fontSize: 12, fontWeight: "bold" }}>{exp}</Text>
//         <Text style={{ fontSize: 12, fontWeight: "bold" }}>{deg}</Text>
//         <View
//           style={{
//             flexDirection: "row",
//             justifyContent: "space-evenly",
//           }}
//         >
//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               justifyContent: "space-between",
//             }}
//           >
//             <Text style={{ fontSize: 10, fontWeight: "bold" }}>Date</Text>
//             <View
//               style={{
//                 flexDirection: "row",
//               }}
//             >
//               <FAIcons name="calendar-alt" style={{ marginRight: 5 }} />
//               <Text style={{ fontSize: 10 }}> {date}</Text>
//             </View>
//           </View>

//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               justifyContent: "space-between",
//               marginRight: 5,
//             }}
//           >
//             <Text style={{ fontSize: 10, fontWeight: "bold" }}>Mode</Text>
//             <View
//               style={{
//                 flexDirection: "row",
//               }}
//             >
//               <FAIcons
//                 name={mode === "P-Consultation" ? "user-alt" : "video"}
//                 style={{ marginRight: 5 }}
//               />
//               <Text style={{ fontSize: 10 }}> {mode}</Text>
//             </View>
//           </View>

//           <View
//             style={{
//               flex: 1,
//               flexDirection: "column",
//               justifyContent: "space-between",
//               marginLeft: 5,
//             }}
//           >
//             <Text style={{ fontSize: 10, fontWeight: "bold" }}>Time</Text>
//             <View
//               style={{
//                 flexDirection: "row",
//               }}
//             >
//               <FAIcons name="clock" style={{ marginRight: 5 }} />
//               <Text style={{ fontSize: 10 }}> {time}</Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//     {/* LowerHalf */}
//     <View style={{ flexDirection: "row", alignSelf: "center" }}>
//       {/* Location */}
//       <View style={{ flexDirection: "row", padding: 10 }}>
//         <IonIcons name="location" style={{ alignSelf: "center" }} />
//         <Text style={{ alignSelf: "center", fontSize: 12 }}>{loc}</Text>
//       </View>
//       {/* Button Re-consultation */}
//       <View style={{ flexDirection: "row" }}>
//         <CustomButton
//           text="Re-Consult"
//           textstyle={{
//             color: "white",
//             fontSize: 12,
//             fontWeight: "bold",
//           }}
//           style={{
//             backgroundColor: "#2B8ADA",
//             borderRadius: 5,
//             padding: 20,
//             paddingVertical: 5,
//             alignSelf: "center",
//           }}
//         />
//       </View>
//       {/* Button Prescription */}
//       <TouchableOpacity style={{ flexDirection: "row", padding: 10 }}>
//         <FAIcons
//           name="prescription"
//           size={12}
//           style={{
//             alignSelf: "center",
//             color: "#2B8ADA",
//             borderColor: "#2B8ADA",
//             borderWidth: 1,
//             padding: 5,
//             borderRadius: 5,
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   </View>
// );

const ItemUpcoming = ({ name, img, spl, date, mode, time }) => (
  <TouchableOpacity
    style={{
      backgroundColor: "white",
      borderRadius: 10,
      padding: 5,
      margin: 5,
      flexDirection: "column",
      width: 290,
      height: 80,
    }}
  >
    <View
      style={{
        flexDirection: "row",
      }}
    >
      {/* Image */}
      <View
        style={{
          width: 80,
          flexDirection: "column",
          alignSelf: "center",
          margin: 5,
        }}
      >
        <Image
          source={img}
          style={{
            width: 60,
            height: 60,
            borderRadius: 10,
            alignSelf: "center",
          }}
        />
      </View>
      {/* Details */}
      <View style={{ width: 160, justifyContent: "space-evenly" }}>
        <Text style={{ fontSize: 15, fontWeight: "bold" }}>{name}</Text>
        <Text style={{ fontSize: 10, color: "gray" }}>{spl}</Text>
        <Text style={{ fontSize: 10, color: "#2B8ADA" }}>{mode}</Text>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          {time}
          {"-"}
          {date}
        </Text>
      </View>
      {/* Chat Button */}
      <TouchableOpacity style={{ alignSelf: "flex-start" }}>
        <Entypo
          name="chat"
          color={"white"}
          size={15}
          style={{
            backgroundColor: "#2B8ADA",
            padding: 5,
            borderRadius: 20,
          }}
        />
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

function PatientHome({ navigation }) {
  const renderRecentConsultations = ({ item }) => (
    <View
      style={{
        backgroundColor: "#E8F0FE",
        borderRadius: 10,
        padding: 5,
        margin: 5,
        flexDirection: "column",
        width: 350,
        height: 210,
      }}
    >
      {/* UpperHalf */}
      <View
        style={{
          flexDirection: "row",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
        }}
      >
        {/* Image */}
        <TouchableOpacity
          style={{
            width: 80,
            flexDirection: "column",
            alignSelf: "center",
            margin: 5,
          }}
          onPress={() => {
            navigation.navigate("DoctorDetails");
          }}
        >
          <Image
            source={item.img}
            style={{
              width: 80,
              height: 150,
              borderRadius: 10,
              alignSelf: "center",
            }}
          />
        </TouchableOpacity>
        {/* Details */}
        <View style={{ width: 250, justifyContent: "space-evenly" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: "gray" }}>{item.spl}</Text>

          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.exp}</Text>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>{item.deg}</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>Date</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FAIcons name="calendar-alt" style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 10 }}> {item.date}</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                marginRight: 5,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>Mode</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FAIcons
                  name={item.mode === "P-Consultation" ? "user-alt" : "video"}
                  style={{ marginRight: 5 }}
                />
                <Text style={{ fontSize: 10 }}> {item.mode}</Text>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                marginLeft: 5,
              }}
            >
              <Text style={{ fontSize: 10, fontWeight: "bold" }}>Time</Text>
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <FAIcons name="clock" style={{ marginRight: 5 }} />
                <Text style={{ fontSize: 10 }}> {item.time}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* LowerHalf */}
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        {/* Location */}
        <View style={{ flexDirection: "row", padding: 10 }}>
          <IonIcons name="location" style={{ alignSelf: "center" }} />
          <Text style={{ alignSelf: "center", fontSize: 12 }}>{item.loc}</Text>
        </View>
        {/* Button Re-consultation */}
        <View style={{ flexDirection: "row" }}>
          <CustomButton
            text="Re-Consult"
            textstyle={{
              color: "white",
              fontSize: 12,
              fontWeight: "bold",
            }}
            style={{
              backgroundColor: "#2B8ADA",
              borderRadius: 5,
              padding: 20,
              paddingVertical: 5,
              alignSelf: "center",
            }}
          />
        </View>
        {/* Button Prescription */}
        <TouchableOpacity style={{ flexDirection: "row", padding: 10 }}>
          <FAIcons
            name="prescription"
            size={12}
            style={{
              alignSelf: "center",
              color: "#2B8ADA",
              borderColor: "#2B8ADA",
              borderWidth: 1,
              padding: 5,
              borderRadius: 5,
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
  const renderUpcomingConsultations = ({ item }) => (
    <ItemUpcoming
      name={item.name}
      img={item.img}
      spl={item.spl}
      date={item.date}
      mode={item.mode}
      time={item.time}
    />
  );

  const renderSpeciality = ({ item }) => (
    <ItemSpeciality name={item.name} img={item.img} />
  );

  const renderSymptoms = ({ item }) => (
    <ItemSymptoms name={item.name} img={item.img} />
  );

  const renderListOfDoctors = ({ item }) => (
    <ItemDoctors
      name={item.name}
      img={item.img}
      spl={item.spl}
      exp={item.exp}
      deg={item.deg}
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
          nestedScrollEnabled={true}
        >
          <HeaderPatient showMenu={true} />
          {/* slideshow */}
          <View style={{ marginVertical: 10, width, height }}>
            <ScrollView
              pagingEnabled
              horizontal
              onScroll={change}
              showsHorizontalScrollIndicator={false}
              style={{
                width: width - 40,
                height,
                alignSelf: "center",
                marginTop: 10,
              }}
            >
              {slideshow.map((slideshow, index) => (
                <Image
                  key={index}
                  source={{ uri: slideshow }}
                  style={{ width: width - 40, height, resizeMode: "cover" }}
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
          {/* Buttons */}
          <View
            style={{
              flexDirection: "column",
              width: "80%",
              alignSelf: "center",
              borderRadius: 30,
              marginVertical: 10,
            }}
          >
            <CustomButton
              text="E-Consultation"
              textstyle={{ color: "white" }}
              style={{
                backgroundColor: "#2B8ADA",
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
            <CustomButton
              text="P-Consultation"
              textstyle={{ color: "white" }}
              style={{
                backgroundColor: "#17CC9C",
                borderRadius: 30,
                marginBottom: 10,
              }}
            />
          </View>
          {/* Recent Consultation */}
          <View style={styles.whiteBox}>
            {/* Heading */}
            <View style={styles.headingBox}>
              <Text style={{ color: "#2B8ADA" }}>Recent Consultations</Text>
              <Text
                style={{ color: "#2B8ADA", textDecorationLine: "underline" }}
                onPress={() => {}}
              >
                View All
              </Text>
            </View>
            {/* Blue Box */}
            <View style={{ flex: 1 }}>
              <FlatList
                data={dataRecentConsultation}
                horizontal={true}
                keyExtractor={(item) => item.name}
                renderItem={renderRecentConsultations}
              />
            </View>
          </View>
          {/* Upcoming Consultation */}
          <View style={styles.transparentBox}>
            {/* Heading */}
            <View style={styles.headingBox}>
              <Text style={{ color: "#2B8ADA" }}>Upcoming Consultations</Text>
              <Text
                style={{ color: "#2B8ADA", textDecorationLine: "underline" }}
                onPress={() => {}}
              >
                View All
              </Text>
            </View>
            {/* Transparent Box */}

            <FlatList
              data={dataUpcoming}
              keyExtractor={(item) => item.name}
              renderItem={renderUpcomingConsultations}
              horizontal={true}
            />
          </View>
          {/* Select Via Speciality */}
          <View style={styles.transparentBox}>
            {/* Heading */}
            <View style={styles.headingBox}>
              <Text style={{ color: "#2B8ADA" }}>Select Via Speciality</Text>
              <Text
                style={{ color: "#2B8ADA", textDecorationLine: "underline" }}
                onPress={() => {
                  console.log(Math.floor(width / 90));
                }}
              >
                View All
              </Text>
            </View>
            {/* Transparent Box */}
            <View style={{ alignSelf: "center", flex: 1 }}>
              <FlatList
                data={dataSpeciality}
                horizontal={false}
                keyExtractor={(item) => item.name}
                renderItem={renderSpeciality}
                numColumns={Math.floor(width / 90)}
              />
            </View>
          </View>
          {/* Consult Doctor Via Symptom */}
          <View style={[styles.whiteBox, { marginVertical: 10 }]}>
            {/* Heading */}
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                width: "90%",
                marginBottom: 10,
                alignSelf: "center",
              }}
            >
              <Text
                style={{ color: "#2B8ADA", fontSize: 14, fontWeight: "bold" }}
              >
                Consult Doctor Via Symptom
              </Text>
              <Text style={{ color: "gray", fontSize: 12 }}>
                Select a symptom to book in 1 step
              </Text>
            </View>
            {/* Transparent Box */}
            <View style={{ alignSelf: "center", flex: 1 }}>
              <FlatList
                data={dataSymptom}
                horizontal={false}
                keyExtractor={(item) => item.name}
                renderItem={renderSymptoms}
                numColumns={Math.floor(width / 90)}
              />
            </View>
          </View>
          {/* List Of Doctors */}
          <View style={styles.transparentBox}>
            {/* Heading */}
            <View style={styles.headingBox}>
              <Text style={{ color: "#2B8ADA" }}>List Of Doctors</Text>
              <Text
                style={{ color: "#2B8ADA", textDecorationLine: "underline" }}
                onPress={() => {
                  console.log(Math.floor(width / 90));
                }}
              >
                View All
              </Text>
            </View>
            {/* Transparent Box */}
            <View
              style={{ alignSelf: "center", flex: 1, flexDirection: "row" }}
            >
              <FlatList
                data={dataListOfDoctors}
                horizontal={true}
                keyExtractor={(item) => item.name}
                renderItem={renderListOfDoctors}
              />
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
  headingBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
    alignSelf: "center",
  },
  transparentBox: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#E8F0FE",
    padding: 10,
  },
  whiteBox: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: "white",
    padding: 10,
    marginBottom: 10,
  },
});
export default PatientHome;
