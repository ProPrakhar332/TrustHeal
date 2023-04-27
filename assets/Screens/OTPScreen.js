import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  View,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  useWindowDimensions,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  StatusBar,
} from 'react-native';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreLogs([
  "EventEmitter.removeListener('appStateDidChange', ...) ...",
]);
import CountryPicker from 'rn-country-picker';
import CustomButton from '../Components/CustomButton';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import BrandIcons from 'react-native-vector-icons/AntDesign';
import CountDown from 'react-native-countdown-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import waiting from '../Animations/waiting1.gif';
//import logo from '../Resources/TH_trans.png';
import logo from '../Resources/TH_trans1.png';
//import logo from '../Resources/Logo.jpg';

const FirstScreen = ({route, navigation}) => {
  const {nextScreen} = route.params;

  const [minLength, setMinLength] = useState(10);
  const [maxLength, setMaxLength] = useState(10);

  const pin1Ref = useRef(null);
  const pin2Ref = useRef(null);
  const pin3Ref = useRef(null);
  const pin4Ref = useRef(null);
  const [show, setShow] = useState(false);
  const [val, setVal] = useState(30);
  const [resend, setResend] = useState(false);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [privatePolicy, setprivatePolicy] = useState(false);
  const [notification, setnotification] = useState(false);
  const [mob, setMob] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [modalVisible, setModalVisible] = useState(false);
  const [wrongOTPMessage, setwrongOTPMessage] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const selectedValue = async value => {
    await AsyncStorage.setItem('countryCode', '+' + value);
    setCountryCode('+' + value);
    if (value == '91') {
      setMaxLength(10);
    } else {
      setMaxLength(15);
    }
  };
  const onFinishCount = () => {
    setShow(false);
    setResend(false);
  };

  const onResend = () => {
    console.log('Resend OTP requested');
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
    setShow(true);
    setResend(true);
    setVal(60);
    sendOTP();
  };

  const reset = () => {
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
    //pin1Ref.current.focus();
  };

  // useEffect(() => {
  //   countries.forEach(async item => {
  //     if (item.code == countryCode) {
  //       await AsyncStorage.setItem('countryName', item.name);
  //     }
  //   });
  // }, [countryCode]);

  const onContinuePressed = async () => {
    if (mob.length < minLength || mob.length > maxLength)
      Alert.alert('Invalid Mobile Number', 'Please enter valid mobile number!');
    else {
      //let countryCodeCache = await AsyncStorage.getItem("countryCode");
      //let no = countryCodeCache + "" + mob;
      //console.log(no);
      setwrongOTPMessage(false);
      // if (privatePolicy == false)
      //   Alert.alert(
      //     'Terms and Condition',
      //     'Please accept privacy policy with terms & condition before continuing',
      //   );
      // else {
      try {
        await AsyncStorage.setItem('mobileNumber', mob);
        sendOTP();
      } catch (e) {
        console.log(e);
        // }
      }
    }
  };
  const sendOTP = async () => {
    // let no = await AsyncStorage.getItem("mobileNumber");
    // console.log(no);
    setisLoading(true);
    axios
      .post(apiConfig.baseUrl + '/login/otp/generate?mobilenumber=' + mob)
      .then(function (response) {
        setisLoading(false);
        if (response.status == 200) {
          setModalVisible(true);
          setShow(true);
          setResend(true);
        }
      })
      .catch(function (error) {
        Alert.alert('Error', `${error}`);
        setisLoading(false);
      });
  };

  const onSubmitPressed = async () => {
    setwrongOTPMessage(false);
    if (pin1 == '' || pin2 == '' || pin3 == '' || pin4 == '')
      Alert.alert('Invalid OTP', 'Please feed in 4 digit OTP!');
    else {
      setisLoading(true);

      let x = '' + pin1 + pin2 + pin3 + pin4;
      // let no = await AsyncStorage.getItem("mobileNumber");
      // console.log(no);

      if (nextScreen == 'RegisterDoctor') {
        axios
          .post(apiConfig.baseUrl + '/login/doctor/otp/verify', {
            mobileNumber: mob,
            otp: x,
          })
          .then(async function (response) {
            setisLoading(false);
            console.log(response.status);
            if (response.status == 204) {
              setModalVisible(false);
              reset();
              navigation.navigate(nextScreen);
            } else if (response.status == 200) {
              setModalVisible(false);
              reset();
              //console.log(response.data);
              let y = response.data;
              // if (x.doctorConfigurationDTO != null) {
              //   x.isLastStepComplete = true;
              // }

              await AsyncStorage.setItem(
                'UserDoctorProfile',
                JSON.stringify(y),
              );

              if (y.profileStatus == 'VERIFIED') {
                setModalVisible(false);
                Alert.alert(
                  `Hey ${y.doctorName}`,
                  `Welcome to TrustHeal - Your Health Service Partner`,
                );
                navigation.navigate('DoctorHome', {doctorObj: y});
              } else if (y.profileStatus == 'INCOMPLETE') {
                setModalVisible(false);
                Alert.alert(
                  `Hey ${y.doctorName}`,
                  `Please complete your profile to continue your journey with TrustHeal.`,
                );
                navigation.navigate('DoctorRegistrationStep2');
              } else if (y.profileStatus == 'UNDER_VERIFICATION') {
                setModalVisible(false);
                Alert.alert(
                  `Hey ${y.doctorName}`,
                  `Your profile is under verification. We will inform you when your account has been verified`,
                );
                navigation.navigate('DoctorRegistrationStep2');
              } else if (y.profileStatus == 'IMPROPER') {
                setModalVisible(false);
                Alert.alert(
                  `Hey ${y.doctorName}`,
                  `${y.improperProfileReason}`,
                );
                navigation.navigate('DoctorRegistrationStep2');
              }
              // else if (y.profileStatus == 'DEACTIVATE') {
              //   setModalVisible(false);
              //   Alert.alert(
              //     `Hey ${y.doctorName}`,
              //     `Your account has been deactivated please contact admin.`,
              //   );
              // }
            }
          })
          .catch(function (error) {
            setisLoading(false);
            console.log(error);
            if (error == 'AxiosError: Request failed with status code 400') {
              //console.log(error);
              setwrongOTPMessage(true);
              reset();
            }
            if (error == 'AxiosError: Request failed with status code 401') {
              setModalVisible(false);
              Alert.alert(
                `Sorry!`,
                `Your account has been deactivated please contact admin.`,
              );
              reset();
            }
          });
      } else {
        axios
          .post(apiConfig.baseUrl + '/login/patient/otp/verify', {
            mobileNumber: mob,
            otp: x,
          })
          .then(async function (response) {
            setisLoading(false);
            console.log(response.data);
            if (response.status == 200) {
              setModalVisible(false);
              await AsyncStorage.setItem(
                'UserPatientProfile',
                JSON.stringify(response.data),
              );
              console.log(response.data);
              if (response.data.profileComplete == true) {
                Alert.alert(
                  `Hey ${response.data.patientName}`,
                  `Welcome to TrustHeal - Your Health Partner`,
                );
                navigation.navigate('PatientHome', {
                  patientObj: response.data,
                });
              } else {
                Alert.alert(
                  'Important',
                  `Please complete your profile before continuing`,
                );
                navigation.navigate('PatientRegistration1');
              }
            } else if (response.status == 204) {
              setModalVisible(false);
              console.log(response.data);
              Alert.alert(
                'New User!',
                `Please register yourself before continuing.`,
              );
              navigation.navigate('PatientRegistration1');
            }
          })
          .catch(function (error) {
            setisLoading(false);
            if (error == 'AxiosError: Request failed with status code 400') {
              //console.log(error);
              setwrongOTPMessage(true);
              reset();
            }
          });
      }
    }
  };
  const loginWithLinkedIn = () => {
    console.log('Login With LinkedIn');
  };
  const loginWithGoogle = () => {
    console.log('Login With Google');
  };
  const loginWithFacebook = () => {
    console.log('Login With Facebook');
  };
  const openURL = useCallback(async url => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, []);
  const viewTermsConditions = () => {
    openURL('https://www.google.com');
  };
  const viewPrivacyPolicy = () => {
    openURL('https://www.google.com');
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled={true}>
      <SafeAreaView
        style={{
          backgroundColor: '#2B8ADA',
          width: '100%',
        }}>
        <StatusBar animated={true} backgroundColor="#2B8ADA" />
        <ScrollView
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
            // marginTop: 50,
            //height: '100%',
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}>
            <Image
              source={logo}
              style={{
                width: '90%',
                resizeMode: 'contain',
                alignSelf: 'center',
                borderRadius: 50,
                margin: 20,
              }}></Image>

            <View style={{flex: 1, flexDirection: 'row', alignSelf: 'center'}}>
              {/* <CountryPicker
                disable={false}
                animationType={'slide'}
                language="en"
                containerStyle={styles.pickerStyle}
                pickerTitleStyle={styles.pickerTitleStyle}
                selectedCountryTextStyle={styles.selectedCountryTextStyle}
                countryNameTextStyle={styles.countryNameTextStyle}
                pickerTitle={'Country Picker'}
                searchBarPlaceHolder={'Search......'}
                hideCountryFlag={false}
                hideCountryCode={false}
                searchBarStyle={styles.searchBarStyle}
                countryCode={'91'}
                selectedValue={selectedValue}
              /> */}
              <TextInput
                placeholder="Enter Mobile Number"
                style={{
                  borderRadius: 10,
                  //borderBottomLeftRadius: 0,
                  //borderTopLeftRadius: 0,
                  padding: 15,
                  marginVertical: 10,
                  backgroundColor: 'white',
                  //width: '60%',
                  width: '80%',
                  fontSize: 15,
                }}
                onChangeText={text => setMob(text)}
                value={mob}
                keyboardType={'number-pad'}
                minLength={minLength}
                maxLength={maxLength}
                contextMenuHidden={true}></TextInput>
            </View>

            {/* <View style={{width: '80%', alignSelf: 'center'}}>
              <CheckBox
                //title="By signing in, you agree to Aarogya Terms and Conditions and Private Policy"
                title={
                  <Text>
                    By signing in, you agree to Aarogya{' '}
                    <Text
                      style={[styles.textLink]}
                      onPress={() => {
                        viewTermsConditions();
                      }}>
                      Terms and Conditions
                    </Text>{' '}
                    and{' '}
                    <Text
                      style={[styles.textLink]}
                      onPress={() => {
                        viewPrivacyPolicy();
                      }}>
                      Privacy Policy
                    </Text>
                  </Text>
                }
                containerStyle={styles.containerStyle}
                textStyle={{width: '80%', fontSize: 11}}
                checkedColor={'#2b8ada'}
                checked={privatePolicy}
                iconType={''}
                onPress={() => setprivatePolicy(!privatePolicy)}
              />
              {/* <CheckBox
                title={"Allow us to send WhatsApp for notification"}
                containerStyle={styles.containerStyle}
                textStyle={{ width: "80%", fontSize: 11 }}
                checkedColor={"#2b8ada"}
                checked={notification}
                onPress={() => setnotification(!notification)}
              /> 
            </View> */}
            <CustomButton
              text="Continue"
              textstyle={{
                color: 'white',
                fontSize: 15,
                // fontFamily: 'sans-serif-medium',
              }}
              style={{
                backgroundColor: '#2b8ada',
                width: '80%',
                alignSelf: 'center',
                marginVertical: 20,
                borderRadius: 5,
              }}
              onPress={onContinuePressed}></CustomButton>

            {/* Login with LinkedIn, Google, Facebook */}
            {/* <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithLinkedIn}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/linkedIn.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with LinkedIn</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithGoogle}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/google.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with Google</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "90%",
                  alignSelf: "center",
                  backgroundColor: "white",
                  marginTop: 10,
                }}
                onPress={loginWithFacebook}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "center",
                    backgroundColor: "white",
                    padding: 10,
                    borderRadius: 6,
                  }}
                >
                  <Image
                    source={require("../Resources/facebook.png")}
                    style={{ marginRight: "5%" }}
                  />
                  <Text style={{ fontSize: 12 }}>Login with Facebook</Text>
                </View>
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                alignSelf: "center",
                marginTop: 40,
              }}
            >
              <Text
                style={{
                  fontSize: 13,
                  color: "black",
                  fontWeight: "bold",
                  // fontFamily: "sans-serif-medium",
                }}
              >
                Don't have an account?{" "}
              </Text>
              <Text
                onPress={() => navigation.push(nextScreen)}
                style={{ color: "#2b8ada", fontWeight: "bold", fontSize: 13 }}
              >
                Register Now
              </Text>
            </View> */}
          </View>
        </ScrollView>
        {modalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View style={{height: '100%', backgroundColor: 'rgba(0,0,0,0.8)'}}>
              <View style={[styles.modalView, {flexDirection: 'column'}]}>
                <View
                  style={{
                    width: '100%',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 26,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      marginTop: 15,
                      color: 'black',
                    }}>
                    Enter OTP
                  </Text>
                  <FAIcon
                    name="window-close"
                    color="black"
                    size={26}
                    style={{position: 'absolute', top: 10, right: 10}}
                    onPress={() => {
                      setModalVisible(false);
                      reset();
                    }}
                  />
                </View>
                <View
                  style={{
                    width: '75%',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 13,
                      color: 'black',
                      marginVertical: 16,
                    }}>
                    Enter 4 digit OTP sent to your mobile number and Registered
                    email
                  </Text>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: 'bold',
                      color: 'black',
                    }}>
                    <FAIcon name="phone-alt" size={22} color="black" />
                    {'  '}
                    {mob}
                  </Text>
                </View>
                <View
                  style={{
                    marginVertical: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <View style={styles.TextInputView}>
                    <TextInput
                      ref={pin1Ref}
                      keyboardType={'number-pad'}
                      maxLength={1}
                      onChangeText={pin1 => {
                        setPin1(pin1);
                        if (pin1 != '') {
                          pin2Ref.current.focus();
                        }
                      }}
                      value={pin1}
                      style={styles.TextInputText}
                    />
                  </View>
                  <View style={styles.TextInputView}>
                    <TextInput
                      ref={pin2Ref}
                      keyboardType={'number-pad'}
                      maxLength={1}
                      onChangeText={pin2 => {
                        setPin2(pin2);
                        if (pin2 != '') {
                          pin3Ref.current.focus();
                        }
                      }}
                      value={pin2}
                      style={styles.TextInputText}
                    />
                  </View>
                  <View style={styles.TextInputView}>
                    <TextInput
                      ref={pin3Ref}
                      keyboardType={'number-pad'}
                      maxLength={1}
                      onChangeText={pin3 => {
                        setPin3(pin3);
                        if (pin3 != '') {
                          pin4Ref.current.focus();
                        }
                      }}
                      value={pin3}
                      style={styles.TextInputText}
                    />
                  </View>
                  <View style={styles.TextInputView}>
                    <TextInput
                      ref={pin4Ref}
                      keyboardType={'number-pad'}
                      maxLength={1}
                      onChangeText={pin4 => {
                        setPin4(pin4);
                      }}
                      value={pin4}
                      style={styles.TextInputText}
                    />
                  </View>
                </View>
                <CustomButton
                  text="Submit"
                  style={{
                    alignSelf: 'center',
                    width: '90%',
                    backgroundColor: '#2b8ada',
                  }}
                  textstyle={{color: 'white', fontSize: 16}}
                  onPress={onSubmitPressed}></CustomButton>
                <View
                  style={{
                    flexDirection: 'column',
                    alignSelf: 'center',
                    marginVertical: 10,
                    width: '95%',
                  }}>
                  {wrongOTPMessage == true ? (
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'red',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                        marginVertical: 3,
                      }}>
                      This otp is incorrect. Please recheck.
                    </Text>
                  ) : null}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'black',
                        alignSelf: 'center',
                        fontWeight: 'bold',
                      }}>
                      Didn't recieve the OTP.{' '}
                    </Text>
                    {resend === false ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: 'black',
                          alignSelf: 'center',
                          fontWeight: 'bold',
                          color: '#2b8ada',
                        }}
                        onPress={onResend}>
                        Resend OTP
                      </Text>
                    ) : null}
                  </View>

                  {show ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        marginTop: 10,
                      }}>
                      <Text style={{color: 'black', marginTop: 10}}>
                        Resend OTP after
                      </Text>

                      <CountDown
                        size={16}
                        until={val}
                        digitStyle={{
                          marginHorizontal: 2,
                          padding: 0,
                        }}
                        digitTxtStyle={{
                          color: '#2b8ada',
                          padding: 0,
                        }}
                        //separatorStyle={{paddingTop: 15, marginTop: 10}}
                        timeToShow={['M', 'S']}
                        timeLabels={{m: null, s: null}}
                        showSeparator={true}
                        onFinish={onFinishCount}
                      />

                      <Text style={{color: 'black', marginTop: 10}}>sec</Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </Modal>
        ) : null}
        {isLoading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                borderRadius: 20,
                width: 150,
                height: 150,
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <Image
                source={waiting}
                style={{
                  alignSelf: 'center',
                  width: 80,
                  height: 80,
                  // borderRadius: 150,
                }}
              />
              <Text
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  color: '#2B8ADA',
                  fontSize: 15,
                  fontWeight: 'bold',
                  width: '100%',
                  // padding: 10,
                }}>
                Please Wait...
              </Text>
            </View>
          </View>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#fe9703',
    margin: 50,
    alignSelf: 'center',
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
  pickerTitleStyle: {
    flexDirection: 'row',
    fontWeight: 'bold',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  pickerStyle: {
    height: 50,
    width: '30%',
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    marginRight: 1,
    fontSize: 15,
  },
  selectedCountryTextStyle: {
    paddingLeft: 5,
    fontWeight: 'bold',
    color: 'black',
    fontSize: 15,
    textAlign: 'right',
  },
  TextInputView: {
    marginVertical: 1,
    borderRadius: 5,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#2b8ada',
    backgroundColor: 'white',
    width: 61,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextInputText: {
    width: 40,
    height: 40,
    fontSize: 16,
    marginHorizontal: 10,
    textAlign: 'center',
    padding: 0,
    color: 'black',
  },
  countryNameTextStyle: {
    paddingLeft: 10,
    color: '#000',
    textAlign: 'right',
  },

  searchBarStyle: {
    flex: 1,
  },
  containerStyle: {
    backgroundColor: '#e8f0fe',
    marginVertical: 0,
    borderWidth: 0,
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    height: 440,
    bottom: 0,
    backgroundColor: 'white',
    borderTopRightRadius: 34,
    borderTopLeftRadius: 34,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default FirstScreen;
