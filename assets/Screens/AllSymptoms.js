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
import generalmedicine from '../SpecialityIcons/generalmedicine.jpg';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import CustomButton from '../Components/CustomButton';

function AllSYmptoms({navigation}) {
  const [ListSymptoms, setListSymptoms] = useState(null);
  const [selectedSymptom, setselectedSymptom] = useState([]);
  const [Speciality, setSpeciality] = useState([]);
  const [SpecialitySearch, setSpecialitySearch] = useState([]);
  const [DoctorsList, setDoctorsList] = useState(null);
  const [showSymptoms, setshowSymptoms] = useState(true);
  const [showSpecialities, setshowSpecialities] = useState(false);
  const [showDoctorList, setshowDoctorList] = useState(false);
  const [consultationModeModal, setconsultationModeModal] = useState(false);
  const [DoctorItem, setDoctorItem] = useState(null);
  const layout = useWindowDimensions();

  useEffect(() => {
    const getAllSymptoms = async () => {
      await axios
        .get(apiConfig.baseUrl + '/suggest/symptom/dropdown?max=100&min=0')
        .then(response => {
          if (response.status == 200) {
            let newArray = response.data.map(item => {
              return {
                key: item.symptomImage,
                value: item.symptom,
              };
            });
            //Set Data Variable

            setListSymptoms(newArray);
          }
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
    };

    getAllSymptoms();
  }, []);

  const renderSymptom = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          {
            width: 115,
            backgroundColor: '#2b8ada',
            borderRadius: 10,
            padding: 5,
            margin: 5,
          },
          selectedSymptom.indexOf(item.value) != -1
            ? {backgroundColor: '#17CC9C'}
            : null,
        ]}
        onPress={() => {
          CheckBoxPressedSymptoms(item);
        }}
        key={item.value}>
        <CheckBoxIcon
          size={20}
          iconType="font-awesome"
          checked={selectedSymptom.indexOf(item.value) != -1}
          checkedColor={'white'}
          uncheckedColor={'white'}
        />
        <Image
          style={{
            alignSelf: 'center',
            width: 70,
            height: 70,
          }}
          source={{
            uri: `${apiConfig.baseUrl}/file/admin/download?fileToken=${item.key}`,
          }}
        />
        <Text
          style={{
            alignSelf: 'center',
            textAlign: 'center',
            color: 'white',
            fontSize: 14,
            marginVertical: 5,
          }}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  const CheckBoxPressedSymptoms = item => {
    if (selectedSymptom.indexOf(item.value) == -1)
      setselectedSymptom([...selectedSymptom, item.value]);
    else
      setselectedSymptom(selectedSymptom.filter(index => index != item.value));
  };

  const getSpecialityFromSymptoms = async () => {
    let x = '';
    selectedSymptom.forEach(element => {
      x += '&symptoms=' + element;
    });
    x.substring(1);
    console.log(x);
    axios
      .get(apiConfig.baseUrl + '/suggest/specialization/by/symptoms?' + x)
      .then(response => {
        if (response.status == 200) {
          console.log(response.data);

          let newArray = response.data.speciality.map(item => {
            return {
              key: item,
              value: item,
            };
          });
          setSpeciality(newArray);

          setshowSymptoms(false);
          setshowSpecialities(true);
        }
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };

  const renderSpeciality = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          {
            width: 115,

            borderRadius: 10,
            padding: 5,
            margin: 5,
            borderWidth: 2,
            borderColor: '#2b8ada',
          },
          SpecialitySearch.indexOf(item.value) != -1
            ? {backgroundColor: '#2b8ada'}
            : {backgroundColor: 'white'},
        ]}
        onPress={() => {
          CheckBoxPressedSpeciality(item);
        }}
        key={item.value}>
        <CheckBoxIcon
          size={15}
          iconType="font-awesome"
          checked={SpecialitySearch.indexOf(item.value) != -1}
          checkedColor={'white'}
          uncheckedColor={'gray'}
        />
        <Text
          style={[
            {
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 13,
              marginVertical: 5,
            },
            SpecialitySearch.indexOf(item.value) == -1
              ? {color: '#2b8ada'}
              : {color: 'white'},
          ]}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  const CheckBoxPressedSpeciality = item => {
    if (SpecialitySearch.indexOf(item.value) == -1)
      setSpecialitySearch([...SpecialitySearch, item.value]);
    else
      setSpecialitySearch(
        SpecialitySearch.filter(index => index != item.value),
      );
  };

  const getDoctorsFromSpeciality = async () => {
    let x = '';
    SpecialitySearch.forEach(element => {
      x += '&speciality=' + element;
    });
    axios
      .get(apiConfig.baseUrl + '/patient/doctor/by/speciality?max=5&min=0' + x)
      .then(response => {
        if (response.status == 200) {
          console.log(response.data);
          setDoctorsList(response.data);
          setshowSpecialities(false);
          setshowDoctorList(true);
        }
      })
      .catch(error => {
        Alert.alert('Error', `${error}`);
      });
  };
  const renderListOfDoctors = ({item}) => {
    return (
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 15,
          marginHorizontal: 5,
          // flexDirection: 'row',
          // flex: 1,
          marginTop: 10,
        }}
        key={item.doctorId}>
        <View style={{flexDirection: 'row', flex: 1}}>
          {/* Image */}
          <Image
            source={
              item.photoPath == 0
                ? defaultDoctor
                : {
                    uri: `${apiConfig.baseUrl}/file/download?fileToken=${item.photoPath}&userId=${item.doctorId}`,
                  }
            }
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              marginVertical: 5,
              borderRadius: 10,
              marginRight: 10,
              flex: 0.5,
            }}
          />
          {/* Details */}
          <View
            style={{
              alignSelf: 'center',
              justifyContent: 'space-evenly',
              marginBottom: 5,
              flex: 1,
            }}>
            {/* Name */}
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 14,
                color: 'black',
                flex: 1,
              }}>
              {item.doctorName}
            </Text>
            {/* Degree */}
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 12,
                color: 'gray',
                flex: 1,
              }}>
              {item.degrees.map(index => {
                return item.degrees.indexOf(index) != item.degrees.length - 1
                  ? index + ', '
                  : index;
              })}
            </Text>
            {/* Speciality */}
            <Text
              style={{
                textAlign: 'left',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#2b8ada',
                flex: 1,
              }}>
              {item.specialization.map(index => {
                return item.specialization.indexOf(index) !=
                  item.specialization.length - 1
                  ? index + ', '
                  : index;
              })}
            </Text>
            {/* Experience */}
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontSize: 12,
                flex: 1,
              }}>
              {Math.floor(item.totalExprienceInMonths / 12)}
              {' years of experience'}
            </Text>
            {/* City */}
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
              }}>
              <FAIcons
                name="map-marker-alt"
                size={15}
                color={'black'}
                style={{marginRight: 5, alignSelf: 'center'}}
              />
              <Text
                style={{
                  textAlign: 'left',
                  color: 'black',
                  fontSize: 12,
                  flex: 1,
                }}>
                {item.city}
              </Text>
            </View>
          </View>
        </View>
        {/* Buttons */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 10,
          }}>
          <CustomButton
            text={'View Profile'}
            textstyle={{color: '#2b8ada', fontSize: 12}}
            style={{
              borderColor: '#2b8ada',
              borderWidth: 2,
              padding: 5,
              borderRadius: 5,
              flex: 0.45,
            }}
            onPress={async () => {
              console.log(item.doctorName);
              await AsyncStorage.setItem('viewProfile', JSON.stringify(item));
              console.log(
                '======================== All Symptoms ====================================',
                item,
              );
              navigation.navigate('DoctorDetails');
            }}
          />
          <CustomButton
            text={'Consult Now'}
            textstyle={{color: 'white', fontSize: 12}}
            style={{
              backgroundColor: '#2b8ada',
              padding: 5,
              borderRadius: 5,
              flex: 0.45,
            }}
            onPress={() => {
              setconsultationModeModal(true);
              setDoctorItem(item);
            }}
          />
        </View>
      </View>
    );
  };
  const RenderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={consultationModeModal}
        onRequestClose={() => {
          setconsultationModeModal(!consultationModeModal);
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
                borderRadius: 10,
              },
            ]}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginBottom: 20,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 20,
                  padding: 5,
                  alignSelf: 'center',
                  color: 'black',
                }}>
                Consultation Mode
              </Text>
              <FAIcons
                name="window-close"
                color="black"
                size={20}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  alignSelf: 'center',
                }}
                onPress={() => {
                  setconsultationModeModal(false);
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                flex: 1,
                backgroundColor: '#2B8ADA',
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                marginBottom: 10,
              }}
              onPress={async () => {
                await AsyncStorage.setItem(
                  'bookSlot',
                  JSON.stringify(DoctorItem),
                );
                console.log(
                  '======================== All Symptoms ====================================',
                  DoctorItem,
                );
                navigation.navigate('SelectSlotsE');
                setconsultationModeModal(false);
              }}>
              <FAIcons name={'video'} color={'white'} size={16} />
              <Text style={{color: 'white', fontSize: 14}}>E-Consultation</Text>
              <Text style={{color: 'white', fontSize: 14}}>₹ 500</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '90%',
                alignSelf: 'center',
                flex: 1,
                backgroundColor: '#17CC9C',
                borderRadius: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                marginBottom: 10,
              }}
              onPress={async () => {
                await AsyncStorage.setItem(
                  'bookSlot',
                  JSON.stringify(DoctorItem),
                );
                console.log(
                  '======================== All Symptoms ====================================',
                  DoctorItem,
                );
                navigation.navigate('SelectSlotsP');
                setconsultationModeModal(false);
              }}>
              <FAIcons name={'users'} color={'white'} size={16} />
              <Text style={{color: 'white', fontSize: 14}}>P-Consultation</Text>
              <Text style={{color: 'white', fontSize: 14}}>₹ 400</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
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
          {showSymptoms ? (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                height: layout.height - 100,
              }}>
              <View style={{marginTop: 20}}>
                <FlatList
                  data={ListSymptoms}
                  key={item => item.key}
                  renderItem={renderSymptom}
                  numColumns={Math.round(layout.width / 130)}
                />
              </View>
              {selectedSymptom != '' ? (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2b8ada',
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    position: 'absolute',
                    marginTop: layout.height - 150,
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={async () => {
                    setSpecialitySearch([]);
                    await getSpecialityFromSymptoms();
                    // await getDoctorsFromSpeciality();
                  }}>
                  <FAIcons
                    name="search"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  />
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Suggest Speciality
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          ) : null}

          {showSpecialities ? (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                height: layout.height - 100,
              }}>
              <Text
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  marginTop: 20,
                  padding: 10,
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#2b8ada',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  fontSize: 15,
                }}>
                Symptoms
              </Text>
              <Text
                style={{
                  width: '95%',
                  alignSelf: 'center',
                  padding: 15,
                  fontSize: 12,
                  color: 'black',
                  backgroundColor: 'white',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                {selectedSymptom.map(index => {
                  return selectedSymptom.indexOf(index) !=
                    selectedSymptom.length - 1
                    ? index + ', '
                    : index;
                })}
              </Text>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: 'white',
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                <Text
                  style={{
                    textAlign: 'left',
                    backgroundColor: '#2b8ada',
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    padding: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    fontSize: 15,
                  }}>
                  Select Speciality
                </Text>
                <FlatList
                  data={Speciality}
                  key={item => item.key}
                  renderItem={renderSpeciality}
                  numColumns={Math.round(layout.width / 200)}
                  style={{
                    alignSelf: 'center',
                    backgroundColor: 'white',
                  }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  marginTop: layout.height - 150,
                  flexDirection: 'row',
                  width: '95%',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2b8ada',
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    alignSelf: 'center',
                    flex: 0.45,
                    flexDirection: 'column',
                  }}
                  onPress={async () => {
                    // await getSpecialityFromSymptoms();
                    //await getDoctorsFromSpeciality();
                    setshowSpecialities(false);
                    setSpeciality([]);
                    setselectedSymptom([]);
                    setSpecialitySearch([]);
                    setshowSymptoms(true);
                  }}>
                  <MIcons
                    name="emoticon-sick-outline"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  />
                  <Text
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      alignSelf: 'center',
                    }}>
                    Change Symptoms
                  </Text>
                </TouchableOpacity>
                {SpecialitySearch != '' ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#2b8ada',
                      padding: 7,
                      paddingHorizontal: 15,
                      borderRadius: 5,
                      alignSelf: 'center',
                      flex: 0.45,
                      flexDirection: 'column',
                    }}
                    onPress={async () => {
                      // await getSpecialityFromSymptoms();
                      await getDoctorsFromSpeciality();
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
                        alignSelf: 'center',
                      }}>
                      Find Doctors
                    </Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          ) : null}

          {showDoctorList ? (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                height: layout.height - 100,
              }}>
              <View
                style={{
                  marginTop: 20,
                  backgroundColor: 'white',
                  width: '95%',
                  alignSelf: 'center',
                  borderRadius: 10,
                }}>
                {/* Heading */}
                <Text
                  style={{
                    textAlign: 'left',
                    backgroundColor: '#2b8ada',
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 10,
                    padding: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    fontSize: 15,
                  }}>
                  Showing results for
                </Text>

                {/* Symptoms */}
                <Text
                  style={{
                    width: '90%',
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: '#2b8ada',
                    borderBottomWidth: 3,
                    paddingBottom: 2,
                    fontSize: 14,
                    borderColor: '#2b8ada',
                    fontWeight: 'bold',
                  }}>
                  Symptoms
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    width: '95%',
                    alignSelf: 'center',
                    padding: 5,
                    fontSize: 12,
                    color: 'black',
                    backgroundColor: 'white',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  {selectedSymptom.map(index => {
                    return selectedSymptom.indexOf(index) !=
                      selectedSymptom.length - 1
                      ? index + ', '
                      : index;
                  })}
                </Text>

                {/* Speciality */}
                <Text
                  style={{
                    width: '90%',
                    textAlign: 'center',
                    alignSelf: 'center',
                    color: '#2b8ada',
                    borderBottomWidth: 3,
                    paddingBottom: 2,
                    fontSize: 14,
                    borderColor: '#2b8ada',
                    fontWeight: 'bold',
                  }}>
                  Speciality
                </Text>
                <Text
                  style={{
                    marginVertical: 5,
                    width: '95%',
                    alignSelf: 'center',
                    padding: 5,
                    fontSize: 12,
                    color: 'black',
                    backgroundColor: 'white',
                    borderBottomRightRadius: 10,
                    borderBottomLeftRadius: 10,
                  }}>
                  {SpecialitySearch.map(index => {
                    return SpecialitySearch.indexOf(index) !=
                      SpecialitySearch.length - 1
                      ? index + ', '
                      : index;
                  })}
                </Text>
              </View>

              {DoctorsList != '' ? (
                <View>
                  <FlatList
                    data={DoctorsList}
                    keyExtractor={item => item.doctorId}
                    renderItem={renderListOfDoctors}
                  />
                </View>
              ) : (
                <Text
                  style={{alignSelf: 'center', color: 'black', marginTop: 50}}>
                  No Doctors available for the above symptom
                </Text>
              )}
              <View
                style={{
                  position: 'absolute',
                  marginTop: layout.height - 150,
                  flexDirection: 'row',
                  width: '95%',
                  alignSelf: 'center',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2b8ada',
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    alignSelf: 'center',
                    flexDirection: 'column',
                  }}
                  onPress={async () => {
                    // await getSpecialityFromSymptoms();
                    //await getDoctorsFromSpeciality();
                    setshowSymptoms(true);
                    setshowSpecialities(false);
                    setshowDoctorList(false);
                    setSpeciality([]);
                    setselectedSymptom([]);
                    setSpecialitySearch([]);
                    setDoctorsList([]);
                  }}>
                  <MIcons
                    name="emoticon-sick-outline"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  />
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Change Symptoms
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#2b8ada',
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    alignSelf: 'center',
                    flexDirection: 'column',
                  }}
                  onPress={async () => {
                    // await getSpecialityFromSymptoms();
                    //await getDoctorsFromSpeciality();
                    setshowSymptoms(false);
                    setshowSpecialities(true);
                    setshowDoctorList(false);
                    setSpecialitySearch([]);
                    setDoctorsList([]);
                  }}>
                  <FAIcons
                    name="stethoscope"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  />
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Change Speciality
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}

          {consultationModeModal ? <RenderModal /> : null}
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
});

export default AllSYmptoms;
