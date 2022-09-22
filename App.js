import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
//Screens
import FirstScreen from "./assets/Screens/FirstScreen";
import RegisterScreen from "./assets/Screens/RegisterScreen";
import ProfileScreen from "./assets/Screens/DoctorProfile";
import EducationScreen from "./assets/Screens/Education";
import Affiliation from "./assets/Screens/Affiliation";
import Achievement from "./assets/Screens/Achievement";
import Interests from "./assets/Screens/Interests";
import Registration from "./assets/Screens/Registration";
import AddDocument from "./assets/Screens/AddDocument";
import RoleScreen from "./assets/Screens/RoleScreen";
import PatientRegistration from "./assets/Screens/PatientRegistration";
import PersonalDetailsDoctor from "./assets/Screens/PersonalDetailsDoctor";
import PersonalDetailsPatient from "./assets/Screens/PersonalDetailsPatient";
import FamilyMembers from "./assets/Screens/FamilyMember";
import MedicalRecord from "./assets/Screens/MedicalRecord";
import PatientConsult from "./assets/Screens/PatientConsult";
import PatientHome from "./assets/Screens/PatientHome";
import PatientHealthRecords from "./assets/Screens/PatientHealthRecords";
import PatientProfile from "./assets/Screens/PatientProfile";
import DoctorHome from "./assets/Screens/DoctorHome";
import DoctorPreviousPatient from "./assets/Screens/DoctorPreviousPatient";
import DoctorSchedulePlanner from "./assets/Screens/DoctorSchedulePlanner";
import DoctorTransactionHistory from "./assets/Screens/DoctorTransactionHistory";
import A from "./assets/Screens/AppointmentTransactionHistory";
//Icons
import home from "./assets/Resources/home.png";
import home_a from "./assets/Resources/home_a.png";
import consult from "./assets/Resources/consult.png";
import consult_a from "./assets/Resources/consult_a.png";
import health from "./assets/Resources/health.png";
import health_a from "./assets/Resources/health_a.png";
import profile from "./assets/Resources/profile.png";
import profile_a from "./assets/Resources/profile_a.png";
import profile_active from "./assets/Resources/profile_active.png";
import home_active from "./assets/Resources/home_active.png";
import appointment_transaction_history from "./assets/Resources/appointment_transaction_history.png";
import appointment_transaction_history_active from "./assets/Resources/appointment_transaction_history_active.png";
import previous_patient_history from "./assets/Resources/previous_patient_history.png";
import previous_patient_history_active from "./assets/Resources/previous_patient_history_active.png";
import schedule_planner from "./assets/Resources/schedule_planner.png";
import schedule_planner_active from "./assets/Resources/schedule_planner_active.png";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function PatientTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="PatientHome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? home_a : home;
          } else if (route.name === "Consult") {
            iconName = focused ? consult_a : consult;
          } else if (route.name === "HealthRecords") {
            iconName = focused ? health_a : health;
          } else if (route.name === "Profile") {
            iconName = focused ? profile_a : profile;
          }
          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{
                width: 25,
                height: 25,
                color: { color },
              }}
            ></Image>
          );
        },
        tabBarActiveTintColor: "limegreen",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={PatientHome}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Consult"
        component={PatientConsult}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="HealthRecords"
        component={PatientHealthRecords}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={PatientProfile}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
function DoctorTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="DoctorHome"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? home_active : home;
          } else if (route.name === "Transaction History") {
            iconName = focused
              ? appointment_transaction_history_active
              : appointment_transaction_history;
          } else if (route.name === "Previous Patient") {
            iconName = focused
              ? previous_patient_history_active
              : previous_patient_history;
          } else if (route.name === "Schedule Planner") {
            iconName = focused ? schedule_planner_active : schedule_planner;
          } else if (route.name === "Profile") {
            iconName = focused ? profile_active : profile;
          }
          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              style={{
                width: 25,
                height: 25,
                color: { color },
              }}
            ></Image>
          );
        },
        tabBarActiveTintColor: "orange",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={DoctorHome}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Transaction History"
        component={A}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Schedule Planner"
        component={DoctorSchedulePlanner}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Previous Patient"
        component={DoctorPreviousPatient}
        options={{ headerShown: true }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login/SignUp"
            component={FirstScreen}
            options={{ headerBackButtonMenuEnabled: false, headerShown: false }}
          />
          <Stack.Screen name="RegisterDoctor" component={RegisterScreen} />
          <Stack.Screen
            name="RegisterPatient"
            component={PatientRegistration}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Education" component={EducationScreen} />
          <Stack.Screen name="Affiliation" component={Affiliation} />
          <Stack.Screen name="Achievement" component={Achievement} />
          <Stack.Screen name="Interests" component={Interests} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="AddDocument" component={AddDocument} />
          <Stack.Screen name="Role" component={RoleScreen} />
          <Stack.Screen name="PatientProfile" component={PatientProfile} />
          <Stack.Screen
            name="PersonalDetailsPatient"
            component={PersonalDetailsPatient}
          />
          <Stack.Screen
            name="PersonalDetailsDoctor"
            component={PersonalDetailsDoctor}
          />
          <Stack.Screen name="FamilyMembers" component={FamilyMembers} />

          <Stack.Screen name="MedicalRecord" component={MedicalRecord} />
          <Stack.Screen
            name="PatientHome"
            component={PatientTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorHome"
            component={DoctorTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
