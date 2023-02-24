import React, {useState} from 'react';
import {
  Text,
  Alert,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  useWindowDimensions,
} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import CustomButton from '../Components/CustomButton';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';
import dayjs from 'dayjs';
import dateformatter from '../API/dateformatter';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import HeaderPatient from '../Components/HeaderPatient';

//icons
import patient from '../Resources/patient.png';
import upload from '../Resources/upload.png';
import waiting from '../Animations/waiting1.gif';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import axios from 'axios';
import apiConfig from '../API/apiConfig';
import {fileUpload} from '../API/apiConfig';
import DeviceInfo from 'react-native-device-info';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const PatientProfileEdit = ({navigation}) => {
  const [patientDto, setpatientDto] = useState(null);
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
  const [patientId, setpatientId] = useState('');
  const [photoPath, setphotoPath] = useState(null);

  const [checkTerms, setCheckTerms] = useState(false);

  const window = useWindowDimensions();
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
      let x = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      setpatientDto(x);
      console.log(x);
      setTitle(x.patientName.substring(0, x.patientName.indexOf(' ')));
      setName(x.patientName.substring(x.patientName.indexOf(' ') + 1));
      setEmail(x.email);
      setdob(x.dob);
      setGender(x.gender);
      setCity(x.city);
      setpatientId(x.patientId);
      setphotoPath(x.photoPath);
      setpincode(x.pinCode == null ? x.pincode : x.pinCode);
      x.profileComplete = true;
      await AsyncStorage.setItem('UserPatientProfile', JSON.stringify(x));
      //other details
      setBloodGroup(x.bloodGroup != null ? x.bloodGroup : ' ');
      setOccupation(x.occupation != null ? x.occupation : ' ');
      setHeight(x.height != null ? x.height : ' ');
      setWeight(x.weight != null ? x.weight : ' ');
    };

    onLoadSetData();
  }, []);

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

  const chooseProfileImage = async () => {
    Alert.alert(
      'Upload Profile Picture',
      'Select option for uploading profile picture',
      [
        {
          text: 'Open Library',
          onPress: () => {
            launchImageLibrary({mediaType: 'photo'}, async response => {
              console.log(response);
              if (response.didCancel) console.log('Cancel');
              else if (response.errorCode) {
                Alert.alert('Error', response.errorMessage);
              } else {
                if (response.assets[0].fileSize <= 2097152) {
                  await postpfp(response.assets[0]);
                  //setpfpuri(response.assets[0].uri);
                } else
                  Alert.alert(
                    'Max Size',
                    'The file exceeds the maximum limit of 2MB.',
                  );
              }
            });
          },
        },
        {
          text: 'Open Camera',
          onPress: () => {
            requestCameraPermission();
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        await launchcamera();
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const launchcamera = async () => {
    launchCamera(
      {mediaType: 'photo', cameraType: 'front', saveToPhotos: true},
      async response => {
        console.log(response);
        if (response.didCancel) console.log('Cancel');
        else if (response.errorCode) {
          Alert.alert('Error', response.errorMessage);
        } else {
          if (response.assets[0].fileSize <= 2097152) {
            await postpfp(response.assets[0]);
          } else
            Alert.alert(
              'Max Size',
              'The file exceeds the maximum limit of 2MB.',
            );
        }
      },
    );
  };
  const postpfp = async pickerResult => {
    try {
      console.log('==============Inside post pfp==========');

      let ext = '.' + pickerResult.fileName.split('.').pop();

      delete pickerResult.fileName;
      pickerResult.size = pickerResult.fileSize;
      delete pickerResult.fileSize;

      pickerResult.name = patientDto.patientId + '_ProfilePhoto' + ext;
      console.log(pickerResult.name);
      console.log(pickerResult);

      let formData = new FormData();
      formData.append('directoryNames', 'PATIENT_PHOTO');
      formData.append('file', pickerResult);
      formData.append('userId', patientDto.patientId);
      if (patientDto.photoPath != null)
        formData.append('fileToken', patientDto.photoPath);
      const {error, response} = await fileUpload(formData);

      if (error != null) {
        console.log('======error======');
        console.log(error);
        Alert.alert(
          'Error',
          'There was a problem in uploading profile picture. Please try again.',
        );
      } else {
        console.log('======response======');
        console.log(response.fileToken);
        setphotoPath(response.fileToken);
        patientDto.photoPath = response.fileToken;
        await AsyncStorage.setItem(
          'UserPatientProfile',
          JSON.stringify(patientDto),
        );
      }
    } catch (e) {
      console.log(e);
    }
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
      patientId: patientId,
      patientName: name,
      patientPhoto: photoPath,
      pincode: pincode,
      termsAndConditions: true,
      weight: Weight,
      whatsAppNumber: mobno,
    };
    DeviceInfo.getIpAddress().then(ip => {
      p.phoneIp = ip;
    });

    axios
      .post(apiConfig.baseUrl + '/patient/update', p)
      .then(async function (response) {
        if (response.status == 200) {
          await AsyncStorage.setItem(
            'UserPatientProfile',
            JSON.stringify(response.data),
          );
          setisLoading(false);
          Alert.alert('Done', 'Your details have been saved successfully.');
          navigation.navigate('PatientProfile', {
            patientObj: JSON.stringify(response.data),
          });
        }
      })
      .catch(error => {
        setisLoading(false);
        console.log(error);
        Alert.alert('Error', `${error}`);
      });
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
            width: '100%',
            alignSelf: 'center',
          }}
          showsVerticalScrollIndicator={false}>
          <HeaderPatient showMenu={false} title={'Edit Profile'} />

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
                marginVertical: 20,
              }}>
              {photoPath == null ? (
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 75,
                    height: 75,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  source={patient}></Image>
              ) : (
                <Image
                  style={{
                    alignSelf: 'center',
                    width: 75,
                    height: 75,
                    width: 100,
                    height: 100,
                    borderRadius: 100,
                  }}
                  source={{
                    uri: `${apiConfig.baseUrl}/file/download?fileToken=${photoPath}&userId=${patientDto.patientId}`,
                  }}></Image>
              )}
              <TouchableOpacity onPress={chooseProfileImage}>
                <FAIcon
                  name="camera"
                  size={20}
                  color={'white'}
                  style={{
                    top: -25,
                    right: -30,
                    padding: 10,
                    backgroundColor: 'gray',
                    borderRadius: 100,
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{width: '90%', alignSelf: 'center'}}>
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
                    setShowGenInfo(!showGenInfo);
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
                          placeholder={title == '' ? ' ' : title}
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
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
                          placeholder={gender}
                          //                          defaultOption={gender}
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
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
                    style={[
                      styles.label,
                      {width: '10%', fontSize: 20},
                    ]}></FAIcon>
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
                          placeholder={BloodGroup}
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
                          placeholderTextColor={'black'}
                          value={Occupation}
                          maxLength={30}
                          onChangeText={text =>
                            setOccupation(text)
                          }></TextInput>
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
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
                          placeholderTextColor={'black'}
                          value={Height}
                          maxLength={3}
                          keyboardType={'number-pad'}
                          onChangeText={text => setHeight(text)}></TextInput>
                      </View>
                      <View style={{flex: 0.45}}>
                        <Text style={styles.inputLabel}>Weight (in kg)</Text>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
                          ]}
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
            {/* Buttons */}
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                marginVertical: 15,
              }}>
              <CustomButton
                text="Save Changes"
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
                  else if (dob == '')
                    Alert.alert(
                      'Incomplete Details',
                      'Please select date of birth before continuing.',
                    );
                  else postData();
                }}></CustomButton>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2B8ADA',
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

export default PatientProfileEdit;