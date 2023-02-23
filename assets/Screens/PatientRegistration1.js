import React, {useState, useCallback} from 'react';
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Linking,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import dayjs from 'dayjs';
import dateformatter from '../API/dateformatter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

//icons
import patient from '../Resources/patient.png';
import patient_female from '../Resources/patient_female.png';
import upload from '../Resources/upload.png';
import waiting from '../Animations/waiting1.gif';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import DeviceInfo from 'react-native-device-info';

const PatientRegistration1 = ({navigation}) => {
  const [patientDto, setpatientDto] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setpincode] = useState('');
  const [dob, setdob] = useState('');
  const [age, setage] = useState('');
  const [mobno, setmobno] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [complete, setcomplete] = useState(0);

  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const [termsView, setTermsView] = useState(false);
  //geninfo
  const [showGenInfo, setShowGenInfo] = useState(true);
  const [GenInfoEdit, setGenInfoEdit] = useState(false);

  //Medical Registration Feild
  const [showOtherInfo, setshowOtherInfo] = useState(false);
  const [BloodGroup, setBloodGroup] = useState('');
  const [Occupation, setOccupation] = useState('');
  const [Weight, setWeight] = useState('');
  const [Height, setHeight] = useState('');
  const dataGender = [
    {key: 'Male', value: 'Male'},
    {key: 'Female', value: 'Female'},
    {key: 'Other', value: 'Other'},
  ];
  const dataTitle = [
    {key: 'Mr.', value: 'Mr.'},
    {key: 'Mrs.', value: 'Mrs.'},
    {key: 'Ms.', value: 'Ms.'},
  ];
  const dataBloodGroup = [
    {key: 'A+', value: 'A+'},
    {key: 'A-', value: 'A-'},
    {key: 'B+', value: 'B+'},
    {key: 'B-', value: 'B-'},
    {key: 'O+', value: 'O+'},
    {key: 'O-', value: 'O-'},
    {key: 'AB+', value: 'AB+'},
    {key: 'AB-', value: 'AB-'},
  ];

  useEffect(() => {
    const onLoadSetData = async () => {
      setmobno(await AsyncStorage.getItem('mobileNumber'));
    };

    onLoadSetData();
  }, []);

  //progress bar
  useEffect(() => {
    let c = 0;
    if (title != '') ++c;
    if (name != '') ++c;
    if (email != '') ++c;
    if (gender != '') ++c;
    if (city != '') ++c;
    if (pincode != '') ++c;
    if (dob != '') ++c;
    setcomplete(c / 7);
  }, [title, name, email, gender, city, pincode, dob]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const handleConfirm = date => {
    setdob(date);
    console.log(dayjs().diff(dayjs(date), 'year'));
    setage(dayjs().diff(dayjs(date), 'year'));

    hideDatePicker();
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

  const postData = async () => {
    setisLoading(true);
    let p = {
      age: age,
      allowWhatsAppNotification: false,
      bloodGroup: BloodGroup,
      city: city,
      dob: dayjs(dob).format('YYYY-MM-DD'),
      email: email,
      gender: gender,
      height: Height,
      locationPermissions: 'DONT_ALLOW',
      mobileNumber: mobno,
      occupation: Occupation,
      patientPhoto: 0,
      patientName: title + ' ' + name,
      pincode: pincode,
      termsAndConditions: true,
      weight: Weight,
      whatsAppNumber: 'string',
    };
    DeviceInfo.getIpAddress().then(ip => {
      p.phoneIp = ip;
    });

    let flag = 0;
    let patient = null;

    await axios
      .post(apiConfig.baseUrl + '/patient/save', p)
      .then(function (response) {
        if (response.status == 200) {
          //setisLoading(false);
          patient = response.data;

          flag = 1;
          //response.data.profileComplete = true;
          // AsyncStorage.setItem(
          //   'UserPatientProfile',
          //   JSON.stringify(response.data),
          // );
          // setisLoading(false);
          // Alert.alert(
          //   'Welcome to Arogya',
          //   'Your details have been saved successfully.',
          // );
          // navigation.navigate('PatientHome', {
          //   patientObj: JSON.stringify(response.data),
          // });
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log(error);
        Alert.alert('Error', `${error}`);
      });

    console.log(patient);

    if (flag == 1) {
      await axios
        .post(
          apiConfig.baseUrl +
            '/patient/profile/complete?patientId=' +
            patient.patientId,
        )
        .then(async response => {
          if (response.status == 200) {
            setisLoading(false);
            patient.profileComplete = true;
            await AsyncStorage.setItem(
              'UserPatientProfile',
              JSON.stringify(patient),
            );
            Alert.alert(
              'Welcome to Arogya',
              'Your details have been saved successfully.',
            );
            navigation.navigate('PatientHome', {
              patientObj: JSON.stringify(patient),
            });
          }
        })
        .catch(error => {
          setisLoading(false);
          Alert.alert('Error in Profile Complete', `${error}`);
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      enabled={true}>
      <SafeAreaView
        style={{
          backgroundColor: '#E8F0FE',
          width: '100%',
        }}>
        <ScrollView
          style={{
            width: '90%',
            alignSelf: 'center',
            marginVertical: 10,
          }}
          showsVerticalScrollIndicator={false}>
          {/* Progress Bar */}
          <View
            style={{
              flex: 1,
              // elevation: 20,
              backgroundColor: 'white',
              width: '90%',
              height: 15,
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 10,
            }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: window.width * complete * 0.85,
                height: 15,
                borderRadius: 10,
                backgroundColor: '#2b8ada',
              }}>
              <Text
                style={{
                  flex: 1,
                  color: 'white',
                  fontSize: 10,
                  alignSelf: 'center',
                }}>
                {Math.round(complete * 100)}%
              </Text>
            </View>
          </View>
          {/* Image */}
          <View>
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
                source={gender == 'Female' ? patient_female : patient}></Image>
            </View>
          </View>
          {/* General Info Label */}
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  borderRadius: 10,
                  padding: 5,
                  marginVertical: 10,
                },
                showGenInfo ? {borderRadius: 0, marginBottom: 0} : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showGenInfo
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  // setShowGenInfo(!showGenInfo);
                }}>
                <FAIcon
                  name="address-card"
                  size={15}
                  color={showGenInfo ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showGenInfo ? {color: '#2B8ADA'} : null,
                  ]}>
                  General Information
                </Text>

                <FAIcon
                  name={showGenInfo ? 'chevron-down' : 'chevron-right'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}
                  color={showGenInfo ? '#2B8ADA' : 'gray'}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* General Info Body */}
          {showGenInfo ? (
            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  {/* Title and FullName */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    {/* Title Sub-Label */}
                    <View style={{flex: 0.3, marginRight: '5%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Title</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>

                      <SelectList
                        placeholder={' '}
                        setSelected={val => setTitle(val)}
                        data={dataTitle}
                        save="value"
                        boxStyles={[
                          {
                            padding: 0,
                            backgroundColor: 'white',
                            borderWidth: 0,
                            backgroundColor: '#E8F0FE',
                          },
                        ]}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        badgeStyles={{backgroundColor: '#2b8ada'}}
                      />
                    </View>
                    {/* Full Name Sub-Label */}
                    <View style={{flex: 0.6}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Full Name</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        maxLength={50}
                        onChangeText={text => setName(text)}
                        value={name}></TextInput>
                    </View>
                  </View>
                  {/* Email */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flex: 0.9}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        maxLength={50}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType={'email-address'}></TextInput>
                    </View>
                  </View>
                  {/* DOB and Gender */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Date Of Birth</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE', flex: 1},
                          ]}
                          placeholderTextColor={'black'}
                          value={
                            dob != '' ? dayjs(dob).format('DD-MM-YYYY') : ''
                          }
                          editable={false}></TextInput>
                        <FAIcon
                          name="calendar-alt"
                          color={'gray'}
                          size={16}
                          style={{
                            position: 'absolute',
                            right: '5%',
                            // bottom: 0,
                            // marginRight: '5%',
                            // marginBottom: '5%',
                            alignSelf: 'center',
                          }}
                          onPress={() => {
                            showDatePicker();
                          }}
                        />
                        <DateTimePickerModal
                          isVisible={isDatePickerVisible}
                          mode="date"
                          display="spinner"
                          onConfirm={handleConfirm}
                          onCancel={hideDatePicker}
                          maximumDate={new Date()}
                          minimumDate={new Date('1940-01-01')}
                        />
                      </View>
                    </View>
                    {/* <View style={{flex: 0.45}}>
                      <Text style={styles.inputLabel}>Age</Text>
                      <Text
                        style={[
                          styles.textInput,
                          {
                            backgroundColor: '#E8F0FE',
                            paddingVertical: 8,
                            color: 'black',
                          },
                        ]}>
                        {age}
                      </Text>
                    </View> */}
                    <View style={{flex: 0.45}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Gender</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <SelectList
                        setSelected={val => setGender(val)}
                        data={dataGender}
                        placeholder={' '}
                        defaultOption={gender}
                        save="value"
                        boxStyles={[
                          {
                            backgroundColor: 'white',
                            borderWidth: 0,
                          },
                          {backgroundColor: '#E8F0FE'},
                        ]}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        badgeStyles={{backgroundColor: '#2b8ada'}}
                      />
                    </View>
                  </View>
                  {/* City and PIN */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>City</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        onChangeText={text => setCity(text)}
                        maxLength={50}
                        value={city}></TextInput>
                    </View>
                    <View style={{flex: 0.45}}>
                      <View style={{flexDirection: 'row'}}>
                        <Text style={styles.inputLabel}>Pin Code</Text>
                        <Text style={{color: 'red'}}>*</Text>
                      </View>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        maxLength={6}
                        keyboardType={'number-pad'}
                        onChangeText={text => setpincode(text)}
                        value={pincode}></TextInput>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {/* Other Information Label */}
          <View
            style={{
              width: '100%',
              alignSelf: 'center',
            }}>
            <View
              style={[
                {
                  flexDirection: 'row',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginVertical: 10,
                  padding: 5,
                },
                showOtherInfo
                  ? {
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      marginBottom: 0,
                    }
                  : null,
              ]}>
              <TouchableOpacity
                style={[
                  {flexDirection: 'row', width: '100%'},
                  showOtherInfo
                    ? {borderBottomWidth: 0.5, borderBottomColor: '#707070'}
                    : null,
                ]}
                onPress={() => {
                  if (!showOtherInfo) {
                    setshowOtherInfo(!showOtherInfo);
                  } else {
                    setshowOtherInfo(!showOtherInfo);
                  }
                }}>
                <FAIcon
                  name="info-circle"
                  size={15}
                  color={showOtherInfo ? '#2b8ada' : 'gray'}
                  style={{marginHorizontal: 5, alignSelf: 'center'}}
                />
                <Text
                  style={[
                    styles.label,
                    {width: '85%'},
                    showOtherInfo ? {color: '#2B8ADA'} : null,
                  ]}>
                  Other Details (Optional)
                </Text>
                <FAIcon
                  name={showOtherInfo ? 'chevron-down' : 'chevron-right'}
                  color={showOtherInfo ? '#2B8ADA' : 'gray'}
                  style={[styles.label, {width: '10%', fontSize: 20}]}></FAIcon>
              </TouchableOpacity>
            </View>
          </View>
          {/* Other Information Body */}
          {showOtherInfo ? (
            <View>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 10,
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                  marginBottom: 10,
                }}>
                <View style={{flexDirection: 'column'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Blood Group
                      </Text>
                      <SelectList
                        defaultOption={BloodGroup}
                        placeholder={' '}
                        setSelected={val => setBloodGroup(val)}
                        data={dataBloodGroup}
                        save="value"
                        boxStyles={[
                          {
                            backgroundColor: '#E8F0FE',
                            borderWidth: 0,
                          },
                        ]}
                        dropdownStyles={{backgroundColor: 'white'}}
                        dropdownTextStyles={{
                          color: '#2b8ada',
                          fontWeight: 'bold',
                        }}
                        badgeStyles={{backgroundColor: '#2b8ada'}}
                      />
                    </View>
                    <View style={{flex: 0.45}}>
                      <Text style={[styles.inputLabel, {marginTop: 0}]}>
                        Occupation
                      </Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        value={Occupation}
                        maxLength={30}
                        onChangeText={text => setOccupation(text)}></TextInput>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginBottom: 5,
                    }}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={styles.inputLabel}>Height (in cm)</Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        value={Height}
                        maxLength={3}
                        keyboardType={'number-pad'}
                        onChangeText={text => setHeight(text)}></TextInput>
                    </View>
                    <View style={{flex: 0.45}}>
                      <Text style={styles.inputLabel}>Weight (in kg)</Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        value={Weight}
                        maxLength={3}
                        keyboardType={'number-pad'}
                        onChangeText={text => setWeight(text)}></TextInput>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {/* Terms of usage */}
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
                    Terms & Conditions
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

          {/* Buttons */}
          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              marginVertical: 15,
            }}>
            <CustomButton
              text="Submit"
              textstyle={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
              }}
              style={{
                flex: 1,
                marginBottom: 50,
                marginVertical: 10,
                padding: 10,
                borderRadius: 10,
                backgroundColor: '#2b8ada',
              }}
              onPress={() => {
                if (complete == 1) {
                  if (checkTerms) postData();
                  else
                    Alert.alert(
                      'Terms and Condition',
                      'Please check Terms and Conditions and Privacy Policy before continuing',
                    );
                } else {
                  if (title == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please select title before continuing.',
                    );
                  else if (name == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please enter name before continuing.',
                    );
                  else if (email == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please enter email before continuing.',
                    );
                  else if (gender == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please select gender before continuing.',
                    );
                  else if (city == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please enter city name before continuing.',
                    );
                  else
                    Alert.alert(
                      'Incomplete Details',
                      'Please select date of birth before continuing.',
                    );
                }
              }}></CustomButton>
            <CustomButton
              text="Skip"
              textstyle={{
                color: '#2b8ada',
                fontSize: 16,
                fontWeight: 'bold',
              }}
              style={{
                flex: 1,
                marginBottom: 50,
                marginVertical: 10,
                padding: 10,
                borderRadius: 10,
                borderColor: '#2b8ada',
                borderWidth: 1,
              }}
              onPress={() => {
                navigation.push('PatientHome');
              }}></CustomButton>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B8ADA',
  },
  textLink: {
    textDecorationLine: 'underline',
    color: 'blue',
  },
  textInput: {
    paddingVertical: 5,
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
    fontSize: 14,
    marginVertical: 5,

    color: 'black',
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  label: {
    alignSelf: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    padding: 5,
  },
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

export default PatientRegistration1;
