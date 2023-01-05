import React, {useState, useCallback} from 'react';
import {
  Text,
  ActivityIndicator,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  Linking,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

//icons
import doctor from '../Resources/doctor.png';
import waiting from '../Animations/waiting1.gif';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import dateformatter from '../API/dateformatter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const DoctorRegistrationStep1 = ({navigation}) => {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setdob] = useState('');
  const [Day, setDay] = useState('');
  const [Month, setMonth] = useState('');
  const [Year, setYear] = useState('');
  const [date, setdate] = useState('');
  const [age, setage] = useState(0);
  const [gender, setGender] = useState('');
  const [speciality, setSpeciality] = useState([]);
  const [showOtherSpeciality, setshowOtherSpeciality] = useState(false);
  const [Otherspeciality, setOtherSpeciality] = useState('');
  const [Language, setLanguage] = useState([]);
  const [PIN, setPIN] = useState('');
  const [city, setCity] = useState('');
  const [mobile, setmobile] = useState('');
  const [checkTerms, setCheckTerms] = useState(false);
  const [doctorId, setDoctorId] = useState(0);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [complete, setcomplete] = useState(0);

  const dataTitle = [
    {key: 'Dr.', value: 'Dr.'},
    {key: 'Mr.', value: 'Mr.'},
    {key: 'Mrs.', value: 'Mrs.'},
    {key: 'Ms.', value: 'Ms.'},
  ];

  const data = [
    {key: 'Dermatologist', value: 'Dermatologist'},
    {key: 'Dietician & Nutition', value: 'Dietician & Nutition'},
    {key: 'ENT', value: 'ENT'},
    {key: 'Endocrinologist', value: 'Endocrinologist'},
    {key: 'Gastoentrologist', value: 'Gastoentrologist'},
    {key: 'Gynecologist', value: 'Gynecologist'},
    {key: 'Lifestyle Diseases', value: 'Lifestyle Diseases'},
    {key: 'Ophthalmologist', value: 'Ophthalmologist'},
    {key: 'Pediatrician', value: 'Pediatrician'},
    {key: 'Physician', value: 'Physician'},
    {key: 'Psychiatrist', value: 'Psychiatrist'},
    {key: 'Psychological Counselling', value: 'Psychological Counselling'},
    {key: 'Other', value: 'Other'},
  ];
  const dataLang = [
    {key: 'English', value: 'English'},
    {key: 'Hindi', value: 'Hindi'},
    {key: 'Bengali', value: 'Bengali'},
    {key: 'Marathi', value: 'Marathi'},
    {key: 'Telgu', value: 'Telgu'},
    {key: 'Tamil', value: 'Tamil'},
    {key: 'Gujarati', value: 'Gujarati'},
    {key: 'Urdu', value: 'Urdu'},
    {key: 'Kannada', value: 'Kannada'},
    {key: 'Odia', value: 'Odia'},
    {key: 'Malayalam', value: 'Malayalam'},
    {key: 'Punjabi', value: 'Punjabi'},
    {key: 'Assamese', value: 'Assamese'},
    {key: 'Maithili', value: 'Maithili'},
    {key: 'Manipuri', value: 'Manipuri'},
  ];
  const dataGender = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
    {key: 'Other', value: 'Other'},
  ];

  const window = useWindowDimensions();
  const [termsView, setTermsView] = useState(false);

  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async date => {
    await AsyncStorage.setItem('dob', JSON.stringify(date).substring(1, 11));
    setdob(JSON.stringify(date).substring(1, 11));
    calculateAge();
    hideDatePicker();
  };
  const calculateAge = async () => {
    let tmep = await AsyncStorage.getItem('dob');
    var year = Number(tmep.substring(0, 4));
    var month = Number(tmep.substring(5, 7)) - 1;
    var day = Number(tmep.substring(8));
    var today = new Date();
    let x = today.getFullYear() - year;
    if (
      today.getMonth() < month ||
      (today.getMonth() == month && today.getDate() < day)
    ) {
      x = x - 1;
    }
    //console.log(x);
    await AsyncStorage.setItem('age', x + '');
    setage(x);
  };

  const SaveData = async () => {
    //console.log(JSON.stringify(splJson));
    //await AsyncStorage.setItem("dob", Year + "-" + Month + "-" + Day);
    // await AsyncStorage.setItem("city", city);
    // await AsyncStorage.setItem("email", email);
    // await AsyncStorage.setItem("fullName", name);
    // await AsyncStorage.setItem("gender", gender);
    // await AsyncStorage.setItem("mobileNumber", mobile);
    // await AsyncStorage.setItem("PIN", PIN);
    // await AsyncStorage.setItem("checkTerms", checkTerms + "");
    // await AsyncStorage.setItem("title", title);
    // const pp = await AsyncStorage.getAllKeys();
    // for (var i = 0; i < pp.length; ++i)
    //   console.log(pp[i] + "\t" + (await AsyncStorage.getItem(pp[i])));
  };

  const PostData = async () => {
    if (checkTerms == false)
      Alert.alert(
        'Please accept privacy policy with terms & condition before continuing',
      );
    else {
      setisLoading(true);
      let docObj = new Object();
      docObj.age = parseInt(await AsyncStorage.getItem('age'));
      docObj.city = city;
      docObj.countryName = await AsyncStorage.getItem('countryName');
      docObj.dob = dob;
      docObj.email = email;
      docObj.fullName = name;
      docObj.gender = gender;
      docObj.mobileNumber = mobile;
      docObj.pincode = PIN;
      docObj.profilephoto = '/aws/s3/pfp';
      docObj.termsAndCondition = checkTerms;
      docObj.title = title;
      console.log(JSON.stringify(docObj));

      if (Otherspeciality != '') speciality.push(Otherspeciality);

      // {
      //   age: await AsyncStorage.getItem('age'),
      //   city: city,
      //   countryName: await AsyncStorage.getItem('countryName'),
      //   dob: dob,
      //   email: email,
      //   fullName: name,
      //   gender: gender,
      //   mobileNumber: mobile,
      //   pincode: PIN,
      //   profilephoto: '/aws/s3/pfp',
      //   termsAndCondition: checkTerms,
      //   title: title,
      // }
      axios
        .post(apiConfig.baseUrl + '/doctor/generalinfo/save', docObj)
        .then(async function (response) {
          //set is loading
          setisLoading(false);
          if (response.status == 201) {
            Alert.alert(
              'Welcome to Arogya! Your General Information has been saved.',
            );
            let userObj = response.data;
            userObj.isLastStepComplete = false;
            await AsyncStorage.setItem(
              'UserDoctorProfile',
              JSON.stringify(userObj),
            );

            let d = JSON.parse(
              await AsyncStorage.getItem('UserDoctorProfile'),
            ).doctorId;
            await AsyncStorage.setItem(
              d + 'speciality',
              JSON.stringify(speciality),
            );
            await AsyncStorage.setItem(
              d + 'language',
              JSON.stringify(Language),
            );
            navigation.push('DoctorRegistrationStep2');
          }
        })
        .catch(function (error) {
          console.log(error);
          setisLoading(false);
          Alert.alert('Please try again later');
        });
    }
  };

  useEffect(() => {
    const onLoadSetData = async () => {
      setmobile(await AsyncStorage.getItem('mobileNumber'));
    };

    onLoadSetData();
  }, []);

  useEffect(() => {
    const progressBar = () => {
      var c = 0;
      if (name != '') ++c;
      if (title != '') ++c;
      if (email != '') ++c;
      if (dob != '') ++c;
      if (gender != '') ++c;
      if (speciality != '') ++c;
      if (showOtherSpeciality && Otherspeciality != '') ++c;
      if (Language != '') ++c;
      if (PIN != '') ++c;
      if (city != '') ++c;

      setcomplete(c / 10);
    };
    progressBar();
  }, [title, name, email, dob, gender, speciality, Language, PIN, city]);

  useEffect(() => {
    if (Year.length == 4) calculateAge();
  }, [Year]);

  useEffect(() => {
    if (speciality.length > 0) {
      var flag = 0;
      for (var i = 0; i < speciality.length; ++i) {
        if (speciality[i] == 'Other') flag = 1;
      }
      if (flag == 1) setshowOtherSpeciality(true);
      else {
        setshowOtherSpeciality(false);
        setOtherSpeciality('');
      }
    }
  }, [speciality]);

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
          // marginTop: 30,
        }}>
        <StatusBar animated={true} backgroundColor="#2B8ADA" />

        <ScrollView
          style={{
            width: '100%',
            height: '100%',
            alignSelf: 'center',
            padding: 10,
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          {/* progressBar */}
          <View
            style={{
              flex: 1,
              // elevation: 20,
              backgroundColor: 'white',
              width: '90%',
              height: 10,
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: window.width * 0.45 * complete,
                height: 10,
                borderRadius: 10,
                backgroundColor: '#2b8ada',
              }}></View>
          </View>
          <View style={{flex: 1}}>
            <View
              style={{
                borderWidth: 5,
                borderColor: 'white',
                backgroundColor: 'white',
                width: 100,
                height: 100,
                borderRadius: 150,
                alignSelf: 'center',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Image
                style={{
                  alignSelf: 'center',
                  width: 75,
                  height: 75,
                  marginVertical: 5,
                }}
                source={doctor}></Image>
            </View>
          </View>

          <View style={{width: '95%', alignSelf: 'center'}}>
            {/* Title Label */}
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>Title</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>

              <SelectList
                defaultOption={'Mr.'}
                placeholder={' '}
                setSelected={val => setTitle(val)}
                data={dataTitle}
                save="value"
                boxStyles={{backgroundColor: 'white', borderWidth: 0}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                badgeStyles={{backgroundColor: '#2b8ada'}}
              />
            </View>
            {/* Full Name Label */}
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>Full Name</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={text => setName(text)}
                value={name}></TextInput>
            </View>
            {/* Email Label */}
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>Email</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                onChangeText={text => setEmail(text)}
                keyboardType={'email-address'}
                value={email}></TextInput>
            </View>
            {/* Date of Birth Label */}
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>Date of Birth</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <Text
                  style={[
                    styles.textInput,
                    {backgroundColor: 'white', padding: 10},
                  ]}>
                  {dateformatter(dob)}
                </Text>
                <FAIcon
                  name="calendar-alt"
                  color={'gray'}
                  size={20}
                  style={{
                    marginHorizontal: 20,
                    position: 'absolute',
                    right: 0,
                  }}
                  onPress={showDatePicker}
                />
              </View>
            </View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              maximumDate={new Date()}
              minimumDate={new Date('1940-01-01')}
            />
            {/* Gender Label */}
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputLabel]}>Gender</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <SelectList
                labelStyles={{height: 0}}
                placeholder={' '}
                setSelected={val => setGender(val)}
                data={dataGender}
                save="value"
                boxStyles={{backgroundColor: 'white', borderWidth: 0}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                badgeStyles={{backgroundColor: '#2b8ada'}}
              />
            </View>
            {/* Speciality Label */}
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputLabel]}>Speciality</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <MultipleSelectList
                labelStyles={{height: 0}}
                placeholder={' '}
                setSelected={val => setSpeciality(val)}
                data={data}
                save="value"
                boxStyles={{backgroundColor: 'white', borderWidth: 0}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                badgeStyles={{backgroundColor: '#2b8ada'}}
              />
            </View>
            {showOtherSpeciality ? (
              <View style={{marginVertical: 10}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.inputLabel}>Other Speciality</Text>
                  <Text style={{color: 'red'}}>*</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholderTextColor={'gray'}
                  onChangeText={text => setOtherSpeciality(text)}
                  value={Otherspeciality}></TextInput>
              </View>
            ) : null}

            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginVertical: 10,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputLabel]}>Language</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <MultipleSelectList
                labelStyles={{height: 0}}
                placeholder={' '}
                setSelected={val => setLanguage(val)}
                data={dataLang}
                save="value"
                boxStyles={{backgroundColor: 'white', borderWidth: 0}}
                dropdownStyles={{backgroundColor: 'white'}}
                dropdownTextStyles={{color: '#2b8ada', fontWeight: 'bold'}}
                badgeStyles={{backgroundColor: '#2b8ada'}}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>PIN CODE</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                style={styles.textInput}
                placeholderTextColor={'gray'}
                maxLength={6}
                keyboardType={'number-pad'}
                onChangeText={text => {
                  setPIN(text);
                }}
                value={PIN}></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.inputLabel}>City</Text>
                <Text style={{color: 'red'}}>*</Text>
              </View>
              <TextInput
                style={[styles.textInput]}
                onChangeText={text => {
                  setCity(text);
                }}
                value={city}></TextInput>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={styles.inputLabel}>Mobile Number</Text>
              <TextInput
                style={[
                  styles.textInput,
                  {backgroundColor: '#D0E0FC', color: 'black'},
                ]}
                editable={false}
                value={mobile}></TextInput>
            </View>

            <View
              style={{
                marginVertical: 10,
                flexDirection: 'column',
              }}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 10,
                  marginVertical: 5,
                  marginLeft: 10,
                }}>
                All the fields are mandatory
              </Text>
              <View style={{width: '90%', justifyContent: 'flex-start'}}>
                <CheckBox
                  title={
                    <Text>
                      I agree to the{' '}
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
                  containerStyle={{
                    width: '100%',
                    backgroundColor: '#e8f0fe',
                    borderWidth: 0,
                    padding: 0,
                    margin: 0,
                  }}
                  textStyle={{
                    fontSize: 10,
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                  checkedColor={'#2b8ada'}
                  checked={checkTerms}
                  onPress={() => setCheckTerms(!checkTerms)}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              <CustomButton
                text="Proceed for Next"
                textstyle={{
                  color: 'white',
                  fontSize: 15,
                  fontWeight: 'bold',
                }}
                style={{
                  backgroundColor: '#2b8ada',
                  flex: 1,
                  marginBottom: 50,
                  marginVertical: 10,
                  padding: 10,
                  borderRadius: 10,
                }}
                onPress={async () => {
                  if (
                    email === '' ||
                    name === '' ||
                    gender === '' ||
                    speciality === '' ||
                    Language === '' ||
                    PIN === '' ||
                    title === '' ||
                    dob === ''
                  )
                    Alert.alert(
                      'Please fill in all the details before continuing!',
                    );
                  else {
                    var validRegex =
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
                    if (email.match(validRegex)) {
                      setTermsView(true);
                    } else Alert.alert('Please Enter Valid Email!');
                  }
                }}></CustomButton>

              {termsView ? (
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={termsView}
                  onRequestClose={() => {
                    setTermsView(!termsView);
                  }}>
                  <View
                    style={{
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <View
                      style={[
                        styles.modalView,
                        {
                          flexDirection: 'column',
                          borderRadius: 10,
                          height: 400,
                          width: '95%',
                        },
                      ]}>
                      <Image source={require('../Resources/accept.png')} />
                      <Text style={{fontWeight: 'bold'}}>
                        Terms of Services
                      </Text>
                      <Text>Lorem ipsum dolor sit amet, consectetur</Text>
                      <ScrollView style={{marginTop: 10}}>
                        <Text style={{fontWeight: 'bold'}}>Term 1</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>Term 2</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                        <Text style={{fontWeight: 'bold'}}>Term 3</Text>
                        <Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua. Ut enim ad minim veniam, quis
                          nostrud exercitation ullamco laboris nisi ut aliquip
                          ex ea commodo consequat. Duis aute irure dolor in
                          reprehenderit in voluptate velit esse cillum dolore eu
                          fugiat nulla pariatur. Excepteur sint occaecat
                          cupidatat non proident, sunt in culpa qui officia
                          deserunt mollit anim id est laborum.
                        </Text>
                      </ScrollView>
                      <View style={{flexDirection: 'row', marginTop: 20}}>
                        <CustomButton
                          text="Decline"
                          textstyle={{color: '#2B8ADA', fontSize: 13}}
                          style={{
                            borderWidth: 1,
                            borderColor: '#2B8ADA',
                            flex: 0.45,
                            marginRight: '5%',
                            alignSelf: 'center',
                            padding: 5,
                          }}
                          onPress={() => setTermsView(false)}
                        />
                        <CustomButton
                          text="Accept"
                          textstyle={{color: 'white', fontSize: 13}}
                          style={{
                            backgroundColor: '#2B8ADA',
                            flex: 0.45,
                            alignSelf: 'center',
                            padding: 5,
                          }}
                          onPress={() => {
                            PostData();

                            setTermsView(false);
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </Modal>
              ) : null}
            </View>
          </View>
        </ScrollView>

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
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  textInput: {
    width: '100%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
  },
  label: {
    width: '70%',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    color: '#2b8ada',
  },
  inputLabel: {fontSize: 14, marginBottom: 6, fontWeight: 'bold'},
  card: {
    margin: 20,
    backgroundColor: '#e6e3e3',
    alignSelf: 'center',
    width: '90%',
  },
  modalView: {
    position: 'absolute',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    marginVertical: 15,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  headingTriple: {
    fontSize: 12,
  },
  pickerStyle: {
    marginVertical: 10,
    alignSelf: 'center',
  },
  containerStyle: {
    backgroundColor: 'white',
    borderWidth: 0,
    alignSelf: 'flex-start',
  },
});

export default DoctorRegistrationStep1;
