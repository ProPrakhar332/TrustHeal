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
import apiConfig from '../API/apiConfig';
import {
  SelectList,
  MultipleSelectList,
} from 'react-native-dropdown-select-list';

//icons
import waiting from '../Animations/waiting1.gif';
import generalmedicine from '../SpecialityIcons/generalmedicine.jpg';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import CustomButton from '../Components/CustomButton';

function AllSpeciality({navigation}) {
  const [isLoading, setisLoading] = useState(false);
  const [List, setList] = useState([]);
  const [DoctorsList, setDoctorsList] = useState(null);
  const [selectedSpeciality, setselectedSpeciality] = useState([]);
  const [consultationModeModal, setconsultationModeModal] = useState(false);
  const [DoctorItem, setDoctorItem] = useState(null);
  const layout = useWindowDimensions();

  useEffect(() => {
    const getAllSpeciality = async () => {
      setisLoading(true);
      await axios
        .get(
          apiConfig.baseUrl + '/suggest/specialization/dropdown?max=100&min=0',
        )
        .then(response => {
          if (response.status == 200) {
            let newArray = response.data.map(item => {
              return {
                key: item.specializationImage,
                value: item.specialization,
              };
            });
            //Set Data Variable
            setisLoading(false);
            setList(newArray);
          }
        })
        .catch(error => {
          setisLoading(false);
          Alert.alert('Error', `${error}`);
        });
      setisLoading(false);
    };

    getAllSpeciality();
  }, []);

  const renderSpeciality = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: 115,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 5,
          margin: 5,
        }}
        key={item.key}
        onPress={() => {
          CheckBoxPressed(item);
        }}>
        <CheckBoxIcon
          size={20}
          iconType="font-awesome"
          checked={selectedSpeciality.indexOf(item.value) != -1}
          checkedColor={'#2b8ada'}
          uncheckedColor={'gray'}
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
            color: 'black',
            fontSize: 12,
            marginVertical: 5,
          }}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };
  const CheckBoxPressed = item => {
    if (selectedSpeciality.indexOf(item.value) == -1)
      setselectedSpeciality([...selectedSpeciality, item.value]);
    else
      setselectedSpeciality(
        selectedSpeciality.filter(index => index != item.value),
      );
  };

  const getDoctors = () => {
    setisLoading(true);
    let x = '';
    selectedSpeciality.forEach(element => {
      x += '&speciality=' + element;
    });
    axios
      .get(apiConfig.baseUrl + '/patient/doctor/by/speciality?max=5&min=0' + x)
      .then(response => {
        if (response.status == 200) {
          setisLoading(false);
          console.log(response.data);
          setDoctorsList(response.data);
        }
      })
      .catch(error => {
        setisLoading(false);
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
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            // borderBottomColor: 'gray',
            // borderBottomWidth: 2,
          }}>
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
                fontSize: 18,
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
            <View style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}>
              {item.specialization.map(index => {
                return (
                  <Text
                    key={index}
                    style={[
                      {
                        textAlign: 'left',
                        color: 'gray',
                        fontSize: 12,
                        flex: 1,
                        fontWeight: 'bold',
                      },
                      selectedSpeciality.indexOf(index) != -1
                        ? {color: '#2b8ada'}
                        : null,
                    ]}>
                    {index}{' '}
                    {item.specialization.indexOf(index) !=
                    item.specialization.length - 1
                      ? ','
                      : ''}
                  </Text>
                );
              })}
            </View>

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
        {/* Fees Details */}
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 0.45,
              }}>
              <Text style={styles.feesDetailsLabel}>P-Consultation</Text>
              <Text style={styles.feesDetails}>₹ {item.pconsultationFees}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 0.45,
              }}>
              <Text style={styles.feesDetailsLabel}>E-Consultation</Text>
              <Text style={styles.feesDetails}>₹ {item.econsultationFees}</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 0.45,
              }}>
              <Text style={styles.feesDetailsLabel}>Follow Up Fees</Text>
              <Text style={styles.feesDetails}>₹ {item.followUpFees}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 0.45,
              }}>
              <Text style={styles.feesDetailsLabel}>Follow Up Days</Text>
              <Text style={styles.feesDetails}>{item.followUpDuration}</Text>
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
            text={'Book Appointment'}
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
              <Text style={{color: 'white', fontSize: 14}}>
                ₹ {DoctorItem.econsultationFees}
              </Text>
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
              <Text style={{color: 'white', fontSize: 14}}>
                ₹ {DoctorItem.pconsultationFees}
              </Text>
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
          <HeaderPatient showMenu={false} title={'All Speciality'} />
          {DoctorsList == null ? (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
              }}>
              <Text
                style={{
                  marginVertical: 20,
                  backgroundColor: '#2b8ada',
                  padding: 10,
                  color: 'white',
                  fontWeight: 'bold',
                  borderRadius: 10,
                }}>
                Select Speciality
              </Text>
              {selectedSpeciality != '' ? (
                <TouchableOpacity
                  style={{
                    zIndex: 3,
                    position: 'absolute',
                    top: layout.height - 250,
                    backgroundColor: '#17CC9C',
                    padding: 7,
                    paddingHorizontal: 15,
                    borderRadius: 5,
                    alignSelf: 'center',
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setDoctorsList(null);
                    getDoctors();
                  }}>
                  <FAIcons
                    name="search"
                    size={15}
                    color={'white'}
                    style={{alignSelf: 'center', marginRight: 5}}
                  />
                  <Text style={{color: 'white', fontWeight: 'bold'}}>
                    Find Doctors
                  </Text>
                </TouchableOpacity>
              ) : null}
              <View style={{alignSelf: 'center', height: layout.height - 200}}>
                <FlatList
                  data={List}
                  key={item => item.key}
                  renderItem={renderSpeciality}
                  numColumns={Math.round(layout.width / 130)}
                  style={{alignSelf: 'center'}}
                />
              </View>
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
                  {selectedSpeciality.length == 1
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
                  {selectedSpeciality.map(index => {
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
                    setDoctorsList(null);
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
                  <FlatList
                    data={DoctorsList}
                    keyExtractor={item => item.doctorId}
                    renderItem={renderListOfDoctors}
                  />
                </View>
              ) : (
                <Text
                  style={{alignSelf: 'center', color: 'black', marginTop: 50}}>
                  No Doctors available for the above speciality
                </Text>
              )}
            </View>
          )}
          {consultationModeModal ? <RenderModal /> : null}
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
});

export default AllSpeciality;
