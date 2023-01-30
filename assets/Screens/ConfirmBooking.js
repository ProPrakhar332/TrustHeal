import React, {useState, useEffect} from 'react';
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
//icons

import doctor_m from '../Resources/doctor_m.png';
import CustomButton from '../Components/CustomButton';
import {SelectList} from 'react-native-dropdown-select-list';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const data = {
  name: 'Dr. Imran Singh',
  spl: 'Psychiatry',
  exp: '10 Years of experience',
  deg: 'MBBS, MD, FID, CCLHA',
  city: 'New Delhi',
  email: 'Imran@gmail.com',
  pres: '',
  age: 36,
  dob: '03/02/1973',
  img: doctor_m,
  doctorConsultationFeesDTO: {
    eConsulationFees: 500,
    followUpFees: 0,
    physicalConsulationFees: 800,
  },
  doctorEducationsDTOs: [
    {
      degree: 'MBBS',
      degreePath: 'string',
      doctorEducationPkId: 0,
      passingYear: '1986',
      specialization: ['Psychiatry', 'Diabetologist', 'General Physician'],
      totalExperiencedInMonths: 0,
      university: 'IGNOU',
    },
  ],
  doctorClinicDetailsDTOs: [
    {
      doctorclinicpkid: 1,
      clinicName: 'ABCD',
      clinicAddress: 'Ashok Road',
      specialInstruction: 'wear mask',
    },
    {
      doctorclinicpkid: 2,
      clinicName: 'XYZ',
      clinicAddress: 'rohtak road',
      specialInstruction: 'wear mask',
    },
    {
      doctorclinicpkid: 3,
      clinicName: 'QWERTY',
      clinicAddress: 'Rajpur Road',
      specialInstruction: 'wear mask',
    },
  ],
};
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
const dataRelation = [
  {key: 'Father', value: 'Father'},
  {key: 'Mother', value: 'Mother'},
  {key: 'Grand Father', value: 'Grand Father'},
  {key: 'Grand Mother', value: 'Grand Mother'},
  {key: 'Spouse', value: 'Spouse'},
  {key: 'Son', value: 'Son'},
  {key: 'Daughter', value: 'Daughter'},
];
const dataGender = [
  {key: 'Male', value: 'Male'},
  {key: 'Female', value: 'Female'},
  {key: 'Other', value: 'Other'},
];

function ConfirmBoking({navigation}) {
  const [family, setfamily] = useState(false);
  const [selfp, setselfp] = useState(true);
  const [terms, setterms] = useState(false);
  const [symptoms, setsymptoms] = useState('');
  //form data
  const [formname, setformname] = useState('');
  const [formRelation, setformRelation] = useState('');
  const [formDob, setformDob] = useState('');
  const [formGender, setformGender] = useState('');
  const [formMob, setformMob] = useState('');
  const [formBloodGroup, setformBloodGroup] = useState('');
  const [formOccupation, setformOccupation] = useState('');
  const [formHeight, setformHeight] = useState('');
  const [formWeight, setformWeight] = useState('');
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
        <ScrollView
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}>
          <HeaderPatient showMenu={false} title="Confirm Booking" />
          {/* Top */}
          <View
            style={{
              marginVertical: 10,
              alignSelf: 'center',
              width: '90%',
              alignSelf: 'center',
              paddingBottom: 20,
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}>
            <Image
              source={data.img}
              style={{
                width: 100,
                height: 100,
                alignSelf: 'center',
                borderRadius: 5,
              }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 13,
                color: 'gray',
                alignSelf: 'center',
                marginVertical: 3,
              }}>
              {data.spl}
            </Text>
            <Text
              style={{
                backgroundColor: '#2B8ADA',
                color: 'white',
                borderRadius: 10,
                alignSelf: 'center',
                padding: 3,
                paddingHorizontal: 15,
              }}>
              {data.exp}
            </Text>
          </View>
          {/* Middle Text */}
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              borderBottomWidth: 1,
              borderColor: 'gray',
            }}>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 11, color: 'gray'}}>Type of Booking</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                Video Consultation
              </Text>
            </View>
            <View style={{marginBottom: 10}}>
              <Text style={{fontSize: 11, color: 'gray'}}>Date & Time</Text>
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                13 Sep 2022, 4:12 PM
              </Text>
            </View>
          </View>
          {/* Appointment For */}
          <View
            style={{
              marginBottom: 10,
              width: '90%',
              alignSelf: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 11, color: 'gray'}}>Appointment For</Text>
            <View style={{flexDirection: 'row'}}>
              <CustomButton
                text={'Add Family'}
                textstyle={[
                  {fontSize: 12},
                  family ? {color: 'white'} : {color: 'black'},
                ]}
                style={[
                  {
                    backgroundColor: 'white',
                    padding: 5,
                    paddingHorizontal: 20,
                    margin: 5,
                  },
                  family ? {backgroundColor: '#2B8ADA'} : null,
                ]}
                onPress={() => {
                  setfamily(!family);
                  setselfp(false);
                }}
              />
              <CustomButton
                text={'Rohit'}
                textstyle={[
                  {fontSize: 12},
                  selfp ? {color: 'white'} : {color: 'black'},
                ]}
                style={[
                  {
                    backgroundColor: 'white',
                    padding: 5,
                    paddingHorizontal: 20,
                    margin: 5,
                  },
                  selfp ? {backgroundColor: '#2B8ADA'} : null,
                ]}
                onPress={() => {
                  setselfp(!selfp);
                  setfamily(false);
                }}
              />
            </View>
          </View>
          {family ? (
            <View style={{width: '90%', alignSelf: 'center'}}>
              <Text
                style={{fontSize: 13, fontWeight: 'bold', marginBottom: 10}}>
                Provide general information about patient:
              </Text>

              {/* Form */}
              {/* Full Name */}
              <View style={{marginBottom: 10}}>
                <Text style={styles.fomrHeading}>Full Name</Text>
                <TextInput placeholder="Full Name" style={styles.formInput} />
              </View>
              {/* Relation */}
              <View style={{marginBottom: 10}}>
                <Text style={styles.fomrHeading}>Relation</Text>
                <SelectList
                  defaultOption={formRelation}
                  placeholder={'Relation'}
                  setSelected={val => setformRelation(val)}
                  data={dataRelation}
                  save="value"
                  boxStyles={[
                    {
                      backgroundColor: 'white',
                      borderWidth: 0,
                      borderRadius: 5,
                    },
                  ]}
                  dropdownStyles={{
                    backgroundColor: 'white',
                    zIndex: 1,
                  }}
                  dropdownTextStyles={{
                    color: '#2b8ada',
                    fontWeight: 'bold',
                  }}
                  badgeStyles={{backgroundColor: '#2b8ada'}}
                />
              </View>
              {/* Date of Birth */}
              <View style={{marginBottom: 10}}>
                <Text style={styles.fomrHeading}>Date of Birth</Text>
                <View style={{flexDirection: 'row'}}>
                  <TextInput
                    placeholder="DD/MM/YYYY*"
                    style={styles.formInput}
                  />
                  <FAIcons
                    name="calendar-alt"
                    size={15}
                    color={'gray'}
                    style={{
                      position: 'absolute',
                      right: 0,
                      margin: 10,
                      alignSelf: 'center',
                    }}
                  />
                </View>
              </View>
              {/* Gender */}
              <View style={{marginBottom: 10}}>
                <Text style={styles.fomrHeading}>Gender</Text>
                <SelectList
                  defaultOption={formGender}
                  placeholder={'Gender*'}
                  setSelected={val => setformGender(val)}
                  data={dataGender}
                  save="value"
                  boxStyles={[
                    {
                      backgroundColor: 'white',
                      borderWidth: 0,
                      borderRadius: 5,
                    },
                  ]}
                  dropdownStyles={{
                    backgroundColor: 'white',
                    zIndex: 1,
                  }}
                  dropdownTextStyles={{
                    color: '#2b8ada',
                    fontWeight: 'bold',
                  }}
                  badgeStyles={{backgroundColor: '#2b8ada'}}
                />
              </View>
              {/* Mobile Number */}
              <View style={{marginBottom: 10}}>
                <Text style={styles.fomrHeading}>Mobile Number</Text>
                <TextInput
                  placeholder="Mobile Number (Include Country Code Like +91)"
                  style={styles.formInput}
                />
              </View>
              <Text style={{fontWeight: 'bold', marginBottom: 5}}>
                Other Details:
              </Text>
              <View style={{marginBottom: 10, flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 5,
                  }}>
                  {/* Blood Group */}
                  <View style={{flexDirection: 'column', flex: 0.45}}>
                    <Text style={styles.fomrHeading}>Blood Group</Text>
                    <SelectList
                      defaultOption={formBloodGroup}
                      placeholder={' '}
                      setSelected={val => setformBloodGroup(val)}
                      data={dataBloodGroup}
                      save="value"
                      boxStyles={[
                        {
                          backgroundColor: 'white',
                          borderWidth: 0,
                          borderRadius: 5,
                        },
                      ]}
                      dropdownStyles={{
                        backgroundColor: 'white',
                        zIndex: 1,
                      }}
                      dropdownTextStyles={{
                        color: '#2b8ada',
                        fontWeight: 'bold',
                      }}
                      badgeStyles={{backgroundColor: '#2b8ada'}}
                    />
                  </View>
                  {/* Occupation */}
                  <View style={{flexDirection: 'column', flex: 0.45}}>
                    <Text style={styles.fomrHeading}>Occupation</Text>
                    <TextInput style={styles.formInput} />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    marginBottom: 5,
                  }}>
                  {/* Height */}
                  <View style={{flexDirection: 'column', flex: 0.45}}>
                    <Text style={styles.fomrHeading}>Height</Text>
                    <TextInput style={styles.formInput} />
                  </View>
                  {/* Weight */}
                  <View style={{flexDirection: 'column', flex: 0.45}}>
                    <Text style={styles.fomrHeading}>Weight</Text>
                    <TextInput style={styles.formInput} />
                  </View>
                </View>
              </View>
            </View>
          ) : null}
          {/* Symptoms */}
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: 11, color: 'black', marginBottom: 3}}>
              Give a brief description of your symptoms
            </Text>
            <View
              style={{
                height: 100,
                backgroundColor: 'white',
                marginTop: 2,
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Write something here"
                multiline={true}
                style={{fontSize: 12, padding: 10}}
                onChangeText={text => setsymptoms(text)}
                value={symptoms}
              />
            </View>
          </View>

          {/* Upload Documents */}
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text style={{fontSize: 11, color: 'gray'}}>
              Attach Related Document
            </Text>
            <View style={{flexDirection: 'row', marginVertical: 10}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'gray',
                  padding: 5,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                  marginRight: 10,
                }}>
                <FAIcons name="id-card" color={'white'} size={20} />
                <Text style={{fontSize: 11, color: 'white'}}>ID Proof</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'gray',
                  padding: 5,
                  paddingHorizontal: 15,
                  alignItems: 'center',
                }}>
                <FAIcons name="cloud-upload-alt" color={'white'} size={20} />
                <Text style={{fontSize: 11, color: 'white'}}>
                  Upload Documents
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <CheckBox
            title={'I agree to terms and conditions'}
            containerStyle={styles.containerStyle}
            textStyle={{width: '80%', fontSize: 11}}
            checkedColor={'#2b8ada'}
            checked={terms}
            onPress={() => setterms(!terms)}
          />
          <CustomButton
            text={'Book your Appointment'}
            textstyle={{color: 'white', fontSize: 13}}
            style={{
              backgroundColor: '#2b8ada',
              width: '90%',
              alignSelf: 'center',
              borderRadius: 10,
              marginVertical: 15,
              marginBottom: 30,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e8f0fe',
  },
  containerStyle: {
    backgroundColor: '#e8f0fe',
    marginVertical: 0,
    borderWidth: 0,
  },
  fomrHeading: {fontSize: 12, marginBottom: 5},
  formInput: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    paddingHorizontal: 10,
    width: '100%',
  },
});

export default ConfirmBoking;
