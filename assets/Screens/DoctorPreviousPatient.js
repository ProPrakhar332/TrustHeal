import React from "react";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import FAIcon from "react-native-vector-icons/FontAwesome5";
//icons
import prescription from "../Resources/prescription.png";
import refer from "../Resources/refer.png";
import report from "../Resources/report.png";
const PreviousPatientHistory = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={{
          flexDirection: "column",
          backgroundColor: "grey",
          borderBottomColor: "white",
          borderBottomWidth: 10,
        }}
      >
        <View style={[styles.card, { backgroundColor: "grey" }]}>
          <View style={styles.cardImage}>
            <Image
              source={require("../Resources/mypfp.jpg")}
              style={{
                marginTop: 10,
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
            ></Image>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardRow}>
              <FAIcon name="user" size={15} color="white" />

              <Text style={styles.cardDetailsText}>Name : Mr. Ankit Yadav</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Skin Cancer</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 24 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="male" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gender : Male</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={prescription}
              style={{
                width: 50,
                height: 50,
                boundaryRadius: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Prescription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={report}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={refer}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Refer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          backgroundColor: "grey",
          borderBottomColor: "white",
          borderBottomWidth: 10,
        }}
      >
        <View style={[styles.card, { backgroundColor: "grey" }]}>
          <View style={styles.cardImage}>
            <Image
              source={require("../Resources/pfp1.jpg")}
              style={{
                marginTop: 10,
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
            ></Image>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardRow}>
              <FAIcon name="user" size={15} color="white" />

              <Text style={styles.cardDetailsText}>Name : Mr. Sumit Kumar</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Acne</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 21 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="male" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gender : Male</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={prescription}
              style={{
                width: 50,
                height: 50,
                boundaryRadius: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Prescription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={report}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={refer}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Refer
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          backgroundColor: "grey",
          borderBottomColor: "white",
          borderBottomWidth: 10,
        }}
      >
        <View style={[styles.card, { backgroundColor: "grey" }]}>
          <View style={styles.cardImage}>
            <Image
              source={require("../Resources/pfp3.jpg")}
              style={{
                marginTop: 10,
                width: 80,
                height: 80,
                borderRadius: 80,
              }}
            ></Image>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardRow}>
              <FAIcon name="user" size={15} color="white" />

              <Text style={styles.cardDetailsText}>Name : Mr. Aman Verma</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Atopic Dermatitis</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 29 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="male" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gender : Male</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={prescription}
              style={{
                width: 50,
                height: 50,
                boundaryRadius: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Prescription
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={report}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Report
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ margin: 10 }}>
            <Image
              source={refer}
              style={{
                width: 50,
                height: 50,
                alignSelf: "center",
              }}
            />
            <Text style={{ alignSelf: "center", color: "white", fontSize: 15 }}>
              Refer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "orange",
    margin: 10,
    alignSelf: "center",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "orange",
    width: "100%",
    alignSelf: "center",
  },
  cardImage: {
    flex: 0.3,
    alignItems: "center",
  },
  cardDetails: {
    flex: 0.7,
    padding: 10,
    alignContent: "flex-start",
  },
  cardDetailsText: {
    marginLeft: 5,
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  cardRow: {
    flexDirection: "row",
    margin: 3,
  },
});

export default PreviousPatientHistory;
