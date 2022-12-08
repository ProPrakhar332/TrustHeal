import * as React from "react";
import { View, Text, Button, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
//Screens
import OTPScreen from "./assets/Screens/OTPScreen";
import Location from "./assets/Screens/Location";
import RegisterScreen from "./assets/Screens/DoctorRegistration1";
import ProfileScreen from "./assets/Screens/DoctorProfile";
import EducationScreen from "./assets/Screens/Education";
import Affiliation from "./assets/Screens/Affiliation";
import Achievement from "./assets/Screens/Achievement";
import Interests from "./assets/Screens/Interests";
import Registration from "./assets/Screens/Registration";
import AddDocument from "./assets/Screens/AddDocument";
import RoleScreen from "./assets/Screens/RoleScreen1";
import PatientRegistration from "./assets/Screens/PatientRegistration";
import PatientRegistration1 from "./assets/Screens/PatientRegistration1";
import PersonalDetailsDoctor from "./assets/Screens/PersonalDetailsDoctor";
import PersonalDetailsPatient from "./assets/Screens/PersonalDetailsPatient";
import FamilyMembers from "./assets/Screens/FamilyMember";
import MedicalRecord from "./assets/Screens/MedicalRecord";
import PConsultation from "./assets/Screens/P-Consultation";
import EConsultation from "./assets/Screens/E-Consultation";

import PatientConsult from "./assets/Screens/PatientConsult";
import PatientHome from "./assets/Screens/PatientHome";
import MyAppointment from "./assets/Screens/MyAppointments";
import PatientHealthRecords from "./assets/Screens/PatientHealthRecords";
import PatientProfile from "./assets/Screens/PatientProfile";
import DoctorHome from "./assets/Screens/DoctorHome";
import DoctorDetails from "./assets/Screens/DoctorDetails";
import PatientPayment from "./assets/Screens/PatientPayment";
import Support from "./assets/Screens/Support";
import SelectSlotsP from "./assets/Screens/SelectSlotsP";
import SelectSlotsE from "./assets/Screens/SelectSlotsE";
import ConfirmBooking from "./assets/Screens/ConfirmBooking";

import SupportPatient from "./assets/Screens/SupportPatient";
import DoctorRegistration2 from "./assets/Screens/DoctorRegistrationStep2";
import AppointmentTransactionHistory from "./assets/Screens/AppointmentTransactionHistory";
import ScheduleHospitalAvailability from "./assets/Screens/ScheduleHospitalAvailability";

import Prescription from "./assets/Screens/Prescription";
import About from "./assets/Screens/About";

import CheifComplaints from "./assets/Screens/CheifComplaints";
import BodyScan from "./assets/Screens/BodyScan";
import Diagnosis from "./assets/Screens/Diagnosis";
import Medication from "./assets/Screens/Medication";
import Investigation from "./assets/Screens/Investigation";
import Advice from "./assets/Screens/Advice";
import FollowUp from "./assets/Screens/FollowUp";
import PrescriptionPreview from "./assets/Screens/PrescriptionPreview";
//Icons
import home from "./assets/Resources/home(1).png";
import home_a from "./assets/Resources/home_active.png";
import consult from "./assets/Resources/consult.png";
import consult_a from "./assets/Resources/consult_a.png";
import health from "./assets/Resources/health.png";
import health_a from "./assets/Resources/health_a.png";
import profile from "./assets/Resources/earnings.png";
import profile_a from "./assets/Resources/profile_a.png";
import profile_active from "./assets/Resources/earnings_a.png";
import home_active from "./assets/Resources/home_active.png";
import appointment_transaction_history from "./assets/Resources/hospital.png";
import appointment_transaction_history_active from "./assets/Resources/hospital_a.png";
import previous_patient_history from "./assets/Resources/patienthistory.png";
import previous_patient_history_active from "./assets/Resources/patienthistory_a.png";
import schedule_planner from "./assets/Resources/calendar.png";
import schedule_planner_active from "./assets/Resources/calendar_a.png";
import Header from "./assets/Components/Header";
import consulting from "./assets/Resources/consulting.png";
import salary from "./assets/Resources/salary.png";
import user from "./assets/Resources/user.png";
import support from "./assets/Resources/support.png";
import back from "./assets/Resources/back3.png";

//patient bottom nav
import home_p from "./assets/PatientDasboard/home.jpg";
import support_p from "./assets/PatientDasboard/support.jpg";
import consult_p from "./assets/PatientDasboard/consult.jpg";
import history_p from "./assets/PatientDasboard/history.jpg";

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
            iconName = home_p;
          } else if (route.name === "Support") {
            iconName = support_p;
          } else if (route.name === "Consult") {
            iconName = consult_p;
          } else if (route.name === "HealthRecords") {
            iconName = history_p;
          } else if (route.name === "Profile") {
            iconName = focused ? user : user;
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
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#2B8ADA",
        tabBarStyle: {
          backgroundColor: "#2B8ADA",
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={PatientHome}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Support"
        component={SupportPatient}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Consult"
        component={PatientConsult}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="HealthRecords"
        component={PatientHealthRecords}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={PatientProfile}
        options={{ headerShown: false }}
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
          } else if (route.name === "Manage Schedule") {
            iconName = focused ? consulting : consulting;
          } else if (route.name === "Check Earning") {
            iconName = focused ? salary : salary;
          } else if (route.name === "Support") {
            iconName = focused ? support : support;
          } else if (route.name === "Profile") {
            iconName = focused ? user : user;
          }
          return (
            <Image
              source={iconName}
              style={{
                width: 20,
                height: 20,
                color: { color },
              }}
            ></Image>
          );
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#2B8ADA",
        tabBarStyle: {
          backgroundColor: "#2B8ADA",
        },
        tabBarLabelStyle: {
          fontSize: 10,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={DoctorHome}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Manage Schedule"
        component={ScheduleHospitalAvailability}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Check Earning"
        component={AppointmentTransactionHistory}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Support"
        component={Support}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
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
            component={OTPScreen}
            options={{ headerBackButtonMenuEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Location"
            component={Location}
            options={{ headerBackButtonMenuEnabled: false, headerShown: false }}
          />
          <Stack.Screen
            name="Prescription"
            component={Prescription}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="About"
            component={About}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />

          <Stack.Screen
            name="CheifComplaints"
            component={CheifComplaints}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="BodyScan"
            component={BodyScan}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="Diagnosis"
            component={Diagnosis}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="Medication"
            component={Medication}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="Investigation"
            component={Investigation}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="Advice"
            component={Advice}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="FollowUp"
            component={FollowUp}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />
          <Stack.Screen
            name="PrescriptionPreview"
            component={PrescriptionPreview}
            options={{
              headerShown: false,
              headerBackButtonMenuEnabled: false,
            }}
          />

          <Stack.Screen
            name="RegisterDoctor"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="P-Consultation"
            component={PConsultation}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: {
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="E-Consultation"
            component={EConsultation}
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: "black",
              },
              headerTitleStyle: {
                color: "white",
              },
            }}
          />
          <Stack.Screen
            name="PatientRegistration"
            component={PatientRegistration}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PatientRegistration1"
            component={PatientRegistration1}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Education" component={EducationScreen} />
          <Stack.Screen name="Affiliation" component={Affiliation} />
          <Stack.Screen name="Achievement" component={Achievement} />
          <Stack.Screen name="Interests" component={Interests} />
          <Stack.Screen name="Registration" component={Registration} />
          <Stack.Screen name="AddDocument" component={AddDocument} />
          <Stack.Screen
            name="Role"
            component={RoleScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PatientProfile"
            component={PatientProfile}
            options={{ headerShown: false }}
          />
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
            name="MyAppointment"
            component={MyAppointment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorHome"
            component={DoctorTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorDetails"
            component={DoctorDetails}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="PatientPayment"
            component={PatientPayment}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConfirmBooking"
            component={ConfirmBooking}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectSlotsE"
            component={SelectSlotsE}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectSlotsP"
            component={SelectSlotsP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DoctorRegistrationStep2"
            component={DoctorRegistration2}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

export default App;
