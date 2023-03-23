import React, {useState, useEffect} from 'react';
import {
  Alert,
  useWindowDimensions,
  Dimensions,
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
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../Components/Header';
import HeaderPatient from '../Components/HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import MIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import apiConfig from '../API/apiConfig';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

//icons
//import generalmedicine from '../SpecialityIcons/generalmedicine.jpg';

import waiting from '../Animations/waiting1.gif';
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import CustomButton from '../Components/CustomButton';
import DoctorCard from '../Components/DoctorCard';

function AllSYmptoms({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [findMode, setfindMode] = useState(true);
  const [patientDet, setpatientDet] = useState(null);
  const [CategoryList, setCategoryList] = useState(null);
  const [CategorySymptomsList, setCategorySymptomsList] = useState(null);
  const [searchSymptomList, setsearchSymptomList] = useState([]);
  const [searchSpecialityList, setsearchSpecialityList] = useState([]);
  const [DisplaySpecialityList, setDisplaySpecialityList] = useState([]);
  const [showLabel, setshowLabel] = useState(true);
  const [DoctorsList, setDoctorsList] = useState(null);
  const layout = useWindowDimensions();

  const {width} = Dimensions.get('window');
  useEffect(() => {
    const getPatientDet = async () => {
      let x = JSON.parse(await AsyncStorage.getItem('UserPatientProfile'));
      setpatientDet(x);
    };

    const getCategory = async () => {
      axios
        .get(apiConfig.baseUrl + '/suggest/symptoms/category')
        .then(function (response) {
          console.log(
            '\n=========================== CATEGORIES DATA ====================================\n',
          );
          console.log(response.data);
          if (response.status == 200) {
            //console.log(response.data);
            setCategoryList(response.data.category);
            setisLoading(false);
          }
        })
        .catch(error => {
          setisLoading(false);
          Alert.alert('Error', `${error}`);
        });
    };
    setisLoading(true);
    getPatientDet();
    getCategory();
    setsearchSpecialityList([]);
    setsearchSymptomList([]);
  }, []);

  useEffect(() => {
    const getSymptoms = async () => {
      let p = [];

      for (let i = 0; i < CategoryList.length; ++i) {
        await axios
          .get(
            apiConfig.baseUrl +
              '/suggest/symptom/by/category?category=' +
              CategoryList[i],
          )
          .then(response => {
            console.log(
              `\n\n=======    ${CategoryList[i]} ===========\n\n`,
              response.data,
            );

            if (response.status == 200 && response.data != '') {
              response.data.forEach(element => {
                element.active = false;
              });

              p.push({
                category: CategoryList[i],
                symptoms: response.data,
                active: false,
              });
            }
          });
      }
      console.log(
        '===============  CATEGORIES WITH SYMPTOMS=================\n\n',
        p,
      );
      setCategorySymptomsList(p);
    };

    if (CategoryList != null) getSymptoms();
  }, [CategoryList]);

  const RenderSymptoms = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          width: '95%',
          alignSelf: 'center',
          marginTop: 20,
        }}>
        {CategorySymptomsList.map((item, index) => {
          return (
            <View
              style={{
                flexDirection: 'column',
                marginVertical: 5,
              }}
              key={item.category}>
              {/* Heading */}
              <TouchableOpacity
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  padding: 5,
                }}
                onPress={() => {
                  flip(index, item.active);
                }}>
                <View>
                  <Text
                    style={[
                      {
                        fontSize: 15,

                        fontWeight: 'bold',
                        marginVertical: 5,
                        paddingHorizontal: 10,
                      },
                      item.active ? {color: '#2b8ada'} : {color: 'gray'},
                    ]}>
                    {item.category}
                  </Text>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <FAIcons
                    name={item.active ? 'chevron-down' : 'chevron-right'}
                    size={20}
                    style={[
                      {
                        alignSelf: 'center',
                        justifyContent: 'center',
                        marginRight: 10,
                      },
                      item.active ? {color: '#2B8ADA'} : {color: 'black'},
                    ]}
                  />
                </View>
              </TouchableOpacity>
              {/* List of Symptoms */}
              {item.active ? (
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {item.symptoms.map((data, i) => {
                    return (
                      <TouchableOpacity
                        key={data.symptomImage}
                        style={[
                          {
                            flexDirection: 'column',
                            alignSelf: 'center',
                            width: 80,

                            justifyContent: 'space-evenly',
                            borderRadius: 15,
                            margin: 5,
                            padding: 5,
                          },
                          !data.active
                            ? {backgroundColor: '#379ae6'}
                            : {backgroundColor: '#17CC9C'},
                        ]}
                        onPress={() => {
                          selectSymptom(index, i, data.active);
                          if (data.active == true)
                            insertSymptom(data.symptom, data.specialty);
                          else deleteSymptom(data.symptom, data.specialty);
                        }}>
                        {/* <Image/> */}
                        <View style={{padding: 3}}>
                          <Image
                            source={{
                              uri: `${apiConfig.baseUrl}/file/admin/download?fileToken=${data.symptomImage}`,
                            }}
                            style={{height: 50, width: 50, alignSelf: 'center'}}
                          />
                        </View>
                        <View style={{padding: 3}}>
                          <Text
                            style={{
                              fontSize: 12,
                              alignSelf: 'center',
                              color: 'white',
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            {data.symptom}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              ) : null}
            </View>
          );
        })}
      </View>
    );
  };
  const flip = (index, active) => {
    let temp = [...CategorySymptomsList];
    temp[index].active = !active;
    setCategorySymptomsList(temp);
  };
  const selectSymptom = (index, i, active) => {
    let temp = [...CategorySymptomsList];
    temp[index].symptoms.forEach((item, a) => {
      if (a == i) item.active = !active;
    });
    setCategorySymptomsList(temp);
  };
  const insertSymptom = (symptoms, speciality) => {
    // if (!searchSymptomList.includes(symptoms))
    searchSymptomList.push(symptoms);
    // if (!searchSpecialityList.includes(speciality))
    searchSpecialityList.push(speciality);
    console.log(
      '============= Selected Symptoms are===========',
      searchSymptomList,
    );
    console.log(
      '============= Suggested Speciality are===========',
      searchSpecialityList,
    );
  };

  const deleteSymptom = (symptoms, speciality) => {
    if (searchSymptomList.includes(symptoms)) {
      let p = [...searchSymptomList];
      let index = searchSymptomList.indexOf(symptoms);
      p.splice(index, 1);
      setsearchSymptomList(p);
    }
    if (searchSpecialityList.includes(speciality)) {
      let p = [...searchSpecialityList];
      let index = searchSpecialityList.indexOf(speciality);
      p.splice(index, 1);
      setsearchSpecialityList(p);
    }
    console.log(
      '============= Selected Symptoms are===========',
      searchSymptomList,
    );
    console.log(
      '============= Suggested Speciality are===========',
      searchSpecialityList,
    );
  };

  const getDoctors = async () => {
    setisLoading(true);
    let x = '';
    let p = [...new Set(searchSpecialityList)];
    setDisplaySpecialityList(p);
    console.log('Fetching doctors with\n', p);

    p.forEach(element => {
      x += '&speciality=' + element;
    });
    await axios
      .get(apiConfig.baseUrl + '/patient/doctor/by/speciality?max=5&min=0' + x)
      .then(response => {
        if (response.status == 200) {
          setisLoading(false);
          console.log(response.data);
          setfindMode(false);
          setDoctorsList(response.data);
        }
      })
      .catch(error => {
        setisLoading(false);
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
          backgroundColor: '#2B8ADA',
          width: '100%',
        }}>
        <ScrollView
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: '#e8f0fe',
          }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <HeaderPatient showMenu={false} title={'All Symptoms'} />
          {findMode ? (
            <View>
              <View
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: '#2b8ada',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      padding: 5,
                    },
                    showLabel
                      ? {borderTopLeftRadius: 10, borderTopRightRadius: 10}
                      : {borderRadius: 10},
                  ]}
                  onPress={() => {
                    setshowLabel(!showLabel);
                  }}>
                  <View>
                    <Text
                      style={[
                        {
                          fontSize: 15,
                          fontWeight: 'bold',
                          marginVertical: 5,
                          paddingHorizontal: 10,
                          color: 'white',
                        },
                      ]}>
                      Selected Symptoms List
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <FAIcons
                      name={showLabel ? 'chevron-down' : 'chevron-right'}
                      size={20}
                      style={[
                        {
                          alignSelf: 'center',
                          justifyContent: 'center',
                          marginRight: 10,
                        },
                        {color: 'white'},
                      ]}
                    />
                  </View>
                </TouchableOpacity>
                {showLabel ? (
                  <View style={styles.whiteBodyView}>
                    {searchSymptomList != '' ? (
                      <View>
                        <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                          {searchSymptomList.map(index => {
                            return (
                              <Text
                                key={index}
                                style={{
                                  padding: 5,
                                  paddingHorizontal: 10,
                                  backgroundColor: '#17CC9C',
                                  color: 'white',
                                  borderRadius: 10,
                                  fontSize: 13,
                                  margin: 3,
                                }}>
                                {index}
                              </Text>
                            );
                          })}
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                          }}>
                          <TouchableOpacity
                            style={{
                              zIndex: 3,
                              flex: 0.45,
                              justifyContent: 'center',
                              backgroundColor: '#2b8ada',
                              padding: 7,
                              paddingHorizontal: 15,
                              borderRadius: 5,
                              alignSelf: 'center',
                              flexDirection: 'row',
                              marginVertical: 10,
                            }}
                            onPress={async () => {
                              // setDoctorsList(null);
                              await getDoctors();
                            }}>
                            <FAIcons
                              name="search"
                              size={15}
                              color={'white'}
                              style={{alignSelf: 'center', marginRight: 5}}
                            />
                            <Text
                              style={{
                                color: 'white',
                                fontWeight: 'bold',
                                fontSize: 12,
                              }}>
                              Find Doctors
                            </Text>
                          </TouchableOpacity>
                          {/* <TouchableOpacity
                            style={{
                              zIndex: 3,
                              flex: 0.45,
                              justifyContent: 'center',
                              borderColor: '#2b8ada',
                              borderWidth: 1,
                              padding: 7,
                              paddingHorizontal: 15,
                              borderRadius: 5,
                              alignSelf: 'center',
                              flexDirection: 'row',
                              marginVertical: 10,
                            }}
                            onPress={async () => {
                              // setDoctorsList(null);
                              // await getDoctors();
                              setsearchSpecialityList([]);
                              setsearchSymptomList([]);
                            }}>
                           
                            <Text
                              style={{
                                color: '#2b8ada',
                                fontWeight: 'bold',
                                fontSize: 12,
                              }}>
                              Clear All
                            </Text>
                          </TouchableOpacity> */}
                        </View>
                      </View>
                    ) : (
                      <View>
                        <Text
                          style={{
                            alignSelf: 'center',
                            fontSize: 12,
                            color: 'black',
                          }}>
                          Please select symptoms from the list below
                        </Text>
                      </View>
                    )}
                  </View>
                ) : null}
              </View>
              {CategorySymptomsList != null ? <RenderSymptoms /> : null}
            </View>
          ) : (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
              }}>
              {/* Filter */}
              <View
                style={{
                  backgroundColor: 'white',
                  borderRadius: 10,
                  marginTop: 20,
                }}>
                {/* Heading */}
                <Text
                  style={{
                    width: '100%',
                    padding: 10,
                    fontWeight: 'bold',
                    color: 'white',
                    backgroundColor: '#2b8ada',
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    fontSize: 15,
                  }}>
                  Showing results for{' '}
                  {DisplaySpecialityList.length == 1
                    ? 'speciality'
                    : 'specialities'}
                </Text>

                {/* Specialities */}
                <View
                  style={{
                    flexDirection: 'row',
                    width: '95%',
                    alignSelf: 'center',
                    flexWrap: 'wrap',
                    marginVertical: 5,
                  }}>
                  {DisplaySpecialityList.map(index => {
                    return (
                      <Text
                        key={index}
                        style={{
                          padding: 5,
                          paddingHorizontal: 7,
                          backgroundColor: '#17CC9C',
                          color: 'white',
                          borderRadius: 10,
                          fontSize: 13,
                          margin: 3,
                        }}>
                        {index}
                      </Text>
                    );
                  })}
                </View>

                {/* Edit Speciality */}
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2b8ada',
                    padding: 5,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    alignSelf: 'center',
                    flexDirection: 'row',
                    marginVertical: 10,
                  }}
                  onPress={async () => {
                    setfindMode(true);
                  }}>
                  {/* <FAIcons
                    name="plus"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  /> */}
                  <Text
                    style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>
                    Edit Speciality
                  </Text>
                </TouchableOpacity>
              </View>

              {DoctorsList != '' ? (
                <View>
                  {/* <FlatList
                    data={DoctorsList}
                    keyExtractor={item => item.doctorId}
                    renderItem={renderListOfDoctors}
                  /> */}
                  <DoctorCard DoctorsList={DoctorsList} />
                </View>
              ) : (
                <Text
                  style={{alignSelf: 'center', color: 'black', marginTop: 50}}>
                  No Doctors available for the above speciality
                </Text>
              )}
            </View>
          )}
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
                Loading...
              </Text>
            </View>
          </View>
        )}
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
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  feesDetails: {
    textAlign: 'left',
    fontSize: 12,
    color: 'gray',
  },
  feesDetailsLabel: {
    textAlign: 'left',
    fontSize: 13,
    color: 'gray',
    fontWeight: 'bold',
  },
  whiteBodyView: {
    backgroundColor: 'white',
    padding: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
  },
});

export default AllSYmptoms;
