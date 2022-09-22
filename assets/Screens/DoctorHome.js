import React from "react";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  Button,
  TouchableOpacity,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import CustomButtom from "../Components/CustomButton";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import { Icon } from "react-native-elements/dist/icons/Icon";

const FirstRoute = () => (
  <ScrollView>
    <View style={{ borderBottomWidth: 2, borderBottomColor: "white" }}>
      <View style={{ flexDirection: "column", backgroundColor: "#b8b8b8" }}>
        <View
          style={[
            styles.card,
            { backgroundColor: "#b8b8b8", borderBottomWidth: 0 },
          ]}
        >
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
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 24 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="location-arrow" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gurugram</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Skin Cancer</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", margin: 5, alignSelf: "center" }}>
          <CustomButtom
            text="3-Sept-2022"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
          <CustomButtom
            text="2:30 - 3:00pm"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <CustomButtom
            text="Done"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
          <CustomButtom
            text="Re-schedule"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
    <View style={{ borderBottomWidth: 2, borderBottomColor: "white" }}>
      <View style={{ flexDirection: "column", backgroundColor: "#b8b8b8" }}>
        <View
          style={[
            styles.card,
            { backgroundColor: "#b8b8b8", borderBottomWidth: 0 },
          ]}
        >
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
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 24 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="location-arrow" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gurugram</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Skin Cancer</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", margin: 5, alignSelf: "center" }}>
          <CustomButtom
            text="3-Sept-2022"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
          <CustomButtom
            text="2:30 - 3:00pm"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <CustomButtom
            text="Done"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
          <CustomButtom
            text="Re-schedule"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView>
    <View style={{ borderBottomWidth: 2, borderBottomColor: "white" }}>
      <View style={{ flexDirection: "column", backgroundColor: "#b8b8b8" }}>
        <View
          style={[
            styles.card,
            { backgroundColor: "#b8b8b8", borderBottomWidth: 0 },
          ]}
        >
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
              <FAIcon name="calendar" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Age : 24 years</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="location-arrow" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Gurugram</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="notes-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Skin Cancer</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "row", margin: 5, alignSelf: "center" }}>
          <CustomButtom
            text="3-Sept-2022"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
          <CustomButtom
            text="2:30 - 3:00pm"
            style={{
              backgroundColor: "orange",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white", fontWeight: "bold" }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            margin: 5,
            alignSelf: "center",
          }}
        >
          <CustomButtom
            text="Done"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
          <CustomButtom
            text="Re-schedule"
            style={{
              backgroundColor: "#59cf59",
              width: "40%",
              margin: 5,
              alignSelf: "center",
            }}
            textstyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const DoctorHome = ({ navigation }) => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "E-Consultation" },
    { key: "second", title: "Physical" },
  ]);
  const layout = useWindowDimensions();
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{}}
      style={{ backgroundColor: "#59cf59" }}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { height: layout.height - 50 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.card, { borderBottomWidth: 0 }]}>
          <View style={styles.cardImage}>
            <Image
              source={require("../Resources/doctor.jpg")}
              style={{
                width: 80,
                height: 80,
                borderRadius: 80,
                marginTop: 5,
              }}
            ></Image>
          </View>

          <View style={styles.cardDetails}>
            <View style={styles.cardRow}>
              <FAIcon name="user-md" size={15} color="white" />

              <Text style={styles.cardDetailsText}>Dr. Zara Ahmed</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="stethoscope" size={15} color="white" />
              <Text style={styles.cardDetailsText}>Cardiologist</Text>
            </View>
            <View style={styles.cardRow}>
              <FAIcon name="hand-holding-medical" size={15} color="white" />
              <Text style={styles.cardDetailsText}>19 Years Experience</Text>
            </View>
            <View style={styles.cardRow}>
              <Icon name="star" size={20} color="yellow" />
              <Icon name="star" size={20} color="yellow" />
              <Icon name="star" size={20} color="yellow" />
              <Icon name="star" size={20} color="yellow" />
              <Icon name="star-half" size={20} color="yellow" />
            </View>
          </View>
          <View style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity>
              <Image
                source={require("../Resources/bell2.png")}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: "yellow",
                }}
              ></Image>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            height: layout.height - 220,
          }}
        >
          <Text
            style={[
              styles.title,
              {
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                alignSelf: "flex-start",
              },
            ]}
          >
            Appointments
          </Text>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    borderBottomWidth: 2,
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

export default DoctorHome;
