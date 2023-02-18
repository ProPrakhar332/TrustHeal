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
import generalmedicine from '../SpecialityIcons/generalmedicine.jpg';
import CheckBoxIcon from 'react-native-elements/dist/checkbox/CheckBoxIcon';
import CustomButton from '../Components/CustomButton';

function AllSpeciality({navigation}) {
  const [List, setList] = useState([]);
  const [DoctorsList, setDoctorsList] = useState(null);
  const [selectedSpeciality, setselectedSpeciality] = useState([]);
  const layout = useWindowDimensions();

  useEffect(() => {
    const getAllSpeciality = async () => {
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

            setList(newArray);
          }
        })
        .catch(error => {
          Alert.alert('Error', `${error}`);
        });
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
    let x = '';
    selectedSpeciality.forEach(element => {
      x += '&speciality=' + element;
    });
    axios
      .get(apiConfig.baseUrl + '/patient/doctor/by/speciality?max=5&min=0' + x)
      .then(response => {
        if (response.status == 200) {
          console.log(response.data);
          setDoctorsList(response.data);
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
          flexDirection: 'row',
          flex: 1,
          marginTop: 10,
        }}
        key={item.doctorId}
        onPress={async () => {
          console.log(item.doctorName);
          await AsyncStorage.setItem('viewProfile', JSON.stringify(item));
          console.log(
            '======================== DOCTOR VIEW PROFILE ====================================',
            item,
          );
          navigation.navigate('DoctorDetails');
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
          <View style={{flexDirection: 'row'}}>
            {/* P-Fees */}
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontSize: 12,
                flex: 1,
              }}>
              500
            </Text>
            {/* E-Fees */}
            <Text
              style={{
                textAlign: 'left',
                color: 'black',
                fontSize: 12,
                flex: 1,
              }}>
              500
            </Text>
          </View>
        </View>
      </View>
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
                height: layout.height - 100,
              }}>
              <View style={{marginTop: 20}}>
                <FlatList
                  data={List}
                  key={item => item.key}
                  renderItem={renderSpeciality}
                  numColumns={Math.round(layout.width / 130)}
                />
              </View>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  marginTop: layout.height - 150,
                  backgroundColor: '#2b8ada',
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
            </View>
          ) : (
            <View
              style={{
                width: '95%',
                alignSelf: 'center',
                height: layout.height - 100,
              }}>
              <Text
                style={{
                  marginTop: 20,
                  padding: 10,
                  fontWeight: 'bold',
                  color: 'white',
                  backgroundColor: '#2b8ada',
                  borderTopRightRadius: 10,
                  borderTopLeftRadius: 10,
                  fontSize: 15,
                }}>
                Showing results for{' '}
                {selectedSpeciality.length == 1 ? 'speciality' : 'specialities'}
              </Text>
              <Text
                style={{
                  padding: 15,
                  fontSize: 12,
                  color: 'black',
                  backgroundColor: 'white',
                  borderBottomRightRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                {selectedSpeciality.map(index => {
                  return selectedSpeciality.indexOf(index) !=
                    selectedSpeciality.length - 1
                    ? index + ', '
                    : index;
                })}
              </Text>
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
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  marginTop: layout.height - 150,
                  backgroundColor: '#2b8ada',
                  padding: 7,
                  paddingHorizontal: 15,
                  borderRadius: 5,
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}
                onPress={async () => {
                  setDoctorsList(null);
                }}>
                <FAIcons
                  name="search"
                  size={15}
                  color={'white'}
                  style={{alignSelf: 'center', marginRight: 5}}
                />
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Select Speciality
                </Text>
              </TouchableOpacity>
            </View>
          )}
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
});

export default AllSpeciality;
