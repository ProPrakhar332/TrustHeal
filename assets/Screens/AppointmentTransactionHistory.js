import React from "react";

import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import Header from "../Components/Header";

const FirstRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/pfp1.jpg")}
          style={{
            marginTop: 5,
            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          7 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Ankit Yadav</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $700</Text>
        </View>
        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Credited To : Canara Bank</Text>
        </View>
      </View>
    </View>

    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/pfp2.jpg")}
          style={{
            marginTop: 5,

            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          10 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Sumit Kumar</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $730</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Credited To : SBI</Text>
        </View>
      </View>
    </View>

    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/pfp3.jpg")}
          style={{
            marginTop: 5,

            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          17 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Pulkit Verma</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $400</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Credited To : ICICI Bank</Text>
        </View>
      </View>
    </View>

    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/pfp4.jpg")}
          style={{
            marginTop: 5,

            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          27 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Aman Singh</Text>
        </View>
        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $600</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>
            Credited To : Punjab National Bank
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const SecondRoute = () => (
  <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/pfp1.jpg")}
          style={{
            marginTop: 5,
            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          7 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Ankit Yadav</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $700</Text>
        </View>
        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Credited To : Canara Bank</Text>
        </View>
      </View>
    </View>

    <View style={[styles.card, { backgroundColor: "white" }]}>
      <View style={styles.cardImage}>
        <Image
          source={require("../Resources/mypfp.jpg")}
          style={{
            marginTop: 5,

            width: 80,
            height: 80,
            borderRadius: 80,
          }}
        ></Image>
        <Text style={[styles.cardDetailsText, { marginBottom: 5 }]}>
          27 days ago
        </Text>
      </View>

      <View style={styles.cardDetails}>
        <View style={styles.cardRow}>
          <FAIcon name="user" size={15} color="black" />

          <Text style={styles.cardDetailsText}>Name : Mr. Aman Singh</Text>
        </View>
        <View style={styles.cardRow}>
          <FAIcon name="money-bill-wave-alt" size={15} color="black" />
          <Text style={styles.cardDetailsText}>Received : $600</Text>
        </View>

        <View style={styles.cardRow}>
          <FAIcon name="piggy-bank" size={15} color="black" />
          <Text style={styles.cardDetailsText}>
            Credited To : Punjab National Bank
          </Text>
        </View>
      </View>
    </View>
  </ScrollView>
);

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});

const AppointmentTransactionHistory = () => {
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
      style={{ backgroundColor: "#2b8ada" }}
      labelStyle={{ fontWeight: "bold" }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            width: "100%",
            alignSelf: "center",
            height: layout.height - 120,
          }}
        >
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
  container: {
    backgroundColor: "#e8f0fe",
  },
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
    borderBottomColor: "gray",
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
    color: "black",
    fontSize: 15,
  },
  cardRow: {
    flexDirection: "row",
    margin: 3,
  },
});

export default AppointmentTransactionHistory;
