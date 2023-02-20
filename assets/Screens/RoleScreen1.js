import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Components/CustomButton';
import {useWindowDimensions, Button} from 'react-native';
import {useNavigation, StackActions} from '@react-navigation/native';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import DeviceInfo from 'react-native-device-info';

const RoleScreen = ({navigation}) => {
  const [check, setChecked] = useState(false);
  const [activeP, setactiveP] = useState(false);
  const [activeD, setactiveD] = useState(true);

  useEffect(() => {
    const onLoadSetData = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserDoctorProfile'));
      console.log('Doctor Object: ', x);
      let y = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      console.log('Patient Object: ', y);
      if (x != null && y == null) {
        if (x.profileCompleted == true && x.verified == true)
          navigation.navigate('DoctorHome', {doctorObj: x});
        else if (x.profileCompleted) {
          x.verified = true;
          await AsyncStorage.setItem('UserDoctorProfile', JSON.stringify(x));
          navigation.navigate('DoctorHome', {doctorObj: x});
        } else navigation.navigate('DoctorRegistrationStep2');

        // if(x.isLastStepComplete) {
        //   navigation.dispatch(StackActions.replace('DoctorHome', {doctorObj: x}));
        // } else {
        //   navigation.dispatch(StackActions.replace('DoctorRegistrationStep2'));
        // }
      } else if (x == null && y != null) {
        if (y.profileCompleted == true)
          navigation.navigate('PatientHome', {patientObj: y});
        else navigation.navigate('PatientRegistration1');
      }
    };
    onLoadSetData();
  }, []);

  const onPatient = () => {
    setactiveP(true);
    setactiveD(false);
  };

  const onDoctor = () => {
    setactiveD(true);
    setactiveP(false);
  };
  const window = useWindowDimensions();

  // const navigation1 = useNavigation();
  // const onJoinPress = (userID, userName) => {
  //     navigation1.navigate('CallPage', {
  //         userID: userID,
  //         userName: userName
  //     })
  // }

  // const fkg = async mob => {

  //   let x = JSON.parse(AsyncStorage.getItem('UserDoctorProfile'));
  //   let mob =x.mobileNumber;

  //   axios
  //     .get(apiConfig.baseUrl + '/doctor/by/mobilenumber?mobilenumber='+mob)
  //     .then(function (response) {
  //       if(response.status == 200)
  //       {

  //       }
  //     }).catch(function(error){

  //     });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#2B8ADA" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            height: '100%',
            width: '100%',
            alignItems: 'center',
          }}>
          <Image source={require('../Resources/Logo.jpg')} />
          {/* <Text
            style={{
              fontWeight: "bold",
              fontSize: 26,
              alignSelf: "center",
              textAlign: "center",
              color: "#2b8ada",
              marginVertical: 10,
            }}
          >
            Type of User
          </Text> */}

          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: '#2b8ada',
              borderRadius: 32.5,
            }}>
            <View style={activeD ? styles.tinyLogoBtnD : styles.tinyLogoBtn}>
              <TouchableOpacity
                onPress={() => {
                  onDoctor();
                }}>
                <Image
                  style={styles.img}
                  source={require('../Resources/doctor.png')}
                  //   resizeMode="contain"
                ></Image>
                <Text style={activeD ? styles.txtD : styles.txt}>Doctor</Text>
                <CustomButton
                  text="Select"
                  textstyle={
                    activeD
                      ? {color: '#2b8ada', fontWeight: 'bold'}
                      : {color: 'white', fontWeight: 'bold'}
                  }
                  style={
                    activeD
                      ? {backgroundColor: 'white', padding: 3}
                      : {backgroundColor: '#2b8ada', padding: 3}
                  }
                  onPress={() =>
                    navigation.push('OTPScreen', {
                      nextScreen: 'RegisterDoctor',
                    })
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={activeP ? styles.tinyLogoBtnP : styles.tinyLogoBtnPA}>
              <TouchableOpacity
                onPress={() => {
                  onPatient();
                }}>
                <Image
                  style={styles.img}
                  source={require('../Resources/patient.png')}
                  //   resizeMode="contain"
                ></Image>

                <Text style={activeP ? styles.txtP : styles.txtPA}>
                  Patient
                </Text>
                <CustomButton
                  text="Select"
                  textstyle={
                    activeP
                      ? {color: '#2b8ada', fontWeight: 'bold'}
                      : {color: 'white', fontWeight: 'bold'}
                  }
                  style={
                    activeP
                      ? {backgroundColor: 'white', padding: 3}
                      : {backgroundColor: '#2b8ada', padding: 3}
                  }
                  onPress={() => {
                    navigation.push('OTPScreen', {
                      nextScreen: 'PatientRegistration',
                    });

                    // navigation.navigate('CallPage', {
                    //   consultationType: 'VIDEO_CALL',
                    //   callID: '1',
                    //   userID: 'Patient',
                    //   userName: 'Patient',
                    // });

                    //navigation.navigate('PatientRegistration1');

                    // Alert.alert(
                    //   'Coming Soon',
                    //   'This section would be available in next phase!',
                    // );
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          {/* <Button title="Join As Oliver" onPress={() => { onJoinPress('oliver', 'Oliver') }} />
          <Button title="Join As Jack" onPress={() => { onJoinPress('jack', 'Jack') }} /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  tinyLogo: {
    margin: 20,
    marginTop: 30,
    width: 300,
    height: 300,
    borderRadius: 200,
    height: '30%',
    alignSelf: 'center',
  },
  tinyLogoBtn: {
    width: 160,
    marginVertical: 0.25,
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: 'white',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#2b8ada',
    margin: 5,
  },
  tinyLogoBtnD: {
    width: 160,
    marginVertical: 0.25,
    backgroundColor: '#2b8ada',
    borderRadius: 30,
    padding: 15,

    alignSelf: 'center',
  },
  txtD: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
  tinyLogoBtnP: {
    width: 160,
    marginVertical: 0.25,
    backgroundColor: '#2b8ada',
    borderRadius: 30,
    padding: 15,
    alignSelf: 'center',
  },
  tinyLogoBtnPA: {
    width: 160,
    marginVertical: 0.25,
    backgroundColor: 'white',

    borderRadius: 30,
    padding: 15,

    alignSelf: 'center',
  },
  txtP: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: 'white',
    margin: 5,
  },
  txtPA: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    textAlign: 'center',
    color: '#2b8ada',
    margin: 5,
  },
  logo: {
    width: 66,
    height: 58,
  },
  iconStyle: {
    fontSize: 40,
    marginTop: 30,
    color: 'black',
  },
  img: {
    width: 80,
    height: 80,
    alignSelf: 'center',
  },
});

export default RoleScreen;
