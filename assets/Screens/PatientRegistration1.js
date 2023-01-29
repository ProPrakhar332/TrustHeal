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
import upload from '../Resources/upload.png';
import {CheckBox} from 'react-native-elements';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';

const PatientRegistration1 = ({navigation}) => {
  const [patientDto, setpatientDto] = useState([]);
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
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

  // useEffect(() => {
  //   async function fetchData() {
  //     const p = JSON.parse(
  //       await AsyncStorage.getItem("PatientInitialRegistrationDetails")
  //     );
  //     setTitle(p.patientTitle);
  //     setName(p.patientName);
  //     setEmail(p.patientEmail);
  //     setGender(p.patientGender);
  //     setCity(p.patientCity);
  //     setdob(p.patientDob);
  //     setAge(p.patientAge);
  //   }
  //   fetchData();
  // }, []);

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
                source={patient}></Image>
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
                <View style={{flexDirection: 'column', marginVertical: 10}}>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={styles.inputLabel}>Title</Text>

                      <SelectList
                        defaultOption={title}
                        placeholder={title}
                        setSelected={val => setTitle(val)}
                        data={dataTitle}
                        save="value"
                        boxStyles={[
                          {
                            backgroundColor: 'white',
                            borderWidth: 0,
                            backgroundColor: '#d0e0fc',
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
                    <View style={{flex: 0.45}}>
                      <Text style={styles.inputLabel}>Full Name</Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        onChangeText={text => setName(text)}
                        value={name}></TextInput>
                    </View>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={styles.inputLabel}>Email</Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        onChangeText={text => setEmail(text)}
                        value={email}
                        keyboardType={'email-address'}></TextInput>
                    </View>
                    <View style={{flex: 0.45}}>
                      <Text style={styles.inputLabel}>Gender</Text>

                      <SelectList
                        setSelected={val => setGender(val)}
                        data={dataGender}
                        placeholder={gender}
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

                  <View style={{flex: 1, width: '90%', alignSelf: 'center'}}>
                    <Text style={styles.inputLabel}>City</Text>
                    <TextInput
                      style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                      placeholderTextColor={'black'}
                      onChangeText={text => setCity(text)}
                      value={city}></TextInput>
                  </View>
                  <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={styles.inputLabel}>Date Of Birth</Text>
                      <View>
                        <TextInput
                          style={[
                            styles.textInput,
                            {backgroundColor: '#E8F0FE'},
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
                            right: 0,
                            bottom: 0,
                            marginRight: '5%',
                            marginBottom: '5%',
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
                    <View style={{flex: 0.45}}>
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
                <View style={{flexDirection: 'column', marginBottom: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
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
                    }}>
                    <View style={{flex: 0.45, marginRight: '5%'}}>
                      <Text style={styles.inputLabel}>Height ( in cm )</Text>
                      <TextInput
                        style={[styles.textInput, {backgroundColor: '#E8F0FE'}]}
                        placeholderTextColor={'black'}
                        value={Height}
                        maxLength={3}
                        keyboardType={'number-pad'}
                        onChangeText={text => setHeight(text)}></TextInput>
                    </View>
                    <View style={{flex: 0.45}}>
                      <Text style={styles.inputLabel}>Weight ( in kg )</Text>
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
                navigation.push('PatientHome');
              }}></CustomButton>
          </View>
        </ScrollView>
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
    padding: 5,
    backgroundColor: '#E8F0FE',
    borderRadius: 10,
    fontSize: 14,
    marginVertical: 5,
    color: 'black',
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: 'bold',
    marginTop: 10,
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
