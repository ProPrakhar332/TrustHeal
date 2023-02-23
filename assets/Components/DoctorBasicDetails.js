import React, {useState, useEffect} from 'react';
import {
  Alert,
  useWindowDimensions,
  View,
  Modal,
  Text,
  TextInput,
  Button,
  Linking,
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
import Header from './Header';
import HeaderPatient from './HeaderPatient';
import FAIcons from 'react-native-vector-icons/FontAwesome5';
import apiConfig from '../API/apiConfig';
import defaultDoctor from '../Resources/doctor3x.png';
import defaultDoctor_female from '../Resources/doctor_female.png';

function DoctorBasicDetails({DocDet}) {
  return (
    <View style={{marginVertical: 10, alignSelf: 'center'}}>
      <View
        style={{
          alignSelf: 'center',
          padding: 3,
          borderColor: '#2b8ada',
          borderWidth: 5,
          borderRadius: 500,
          backgroundColor: 'white',
        }}>
        {DocDet == null || DocDet.photoPath == 0 ? (
          <Image
            // source={DocDet == null || DocDet.gender == "Male"?defaultDoctor:defaultDoctor_female}
            source={defaultDoctor}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 100,
            }}
          />
        ) : (
          <Image
            source={{
              uri: `${apiConfig.baseUrl}/file/download?fileToken=${DocDet.photoPath}&userId=${DocDet.doctorId}`,
            }}
            //source={doctor_m}
            style={{
              width: 100,
              height: 100,
              alignSelf: 'center',
              borderRadius: 100,
            }}
          />
        )}
      </View>
      {/* Name */}
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: 'black',
          marginTop: 2,
        }}>
        {DocDet != null ? DocDet.doctorName : null}
      </Text>
      {/* Experience */}
      <Text
        style={{
          // backgroundColor: '#2B8ADA',
          color: 'white',
          marginTop: 5,
          borderRadius: 10,
          alignSelf: 'center',
          fontWeight: 'bold',
          backgroundColor: '#2b8ada',
          padding: 3,
          paddingHorizontal: 15,
        }}>
        {DocDet != null
          ? Math.floor(DocDet.totalExperienceInMonths / 12)
          : null}
        {' years of experience'}
      </Text>
      {/* Specialization */}
      <Text
        style={{
          fontSize: 15,
          //backgroundColor: '#2b8ada',
          color: 'gray',
          alignSelf: 'center',
          marginTop: 5,
          fontWeight: 'bold',
          padding: 3,
          paddingHorizontal: 10,
          borderRadius: 5,
          textAlign: 'center',
          fontStyle: 'italic',
        }}>
        {DocDet != null
          ? DocDet.specialization.map(index => {
              return DocDet.specialization.indexOf(index) !=
                DocDet.specialization.length - 1
                ? index + ', '
                : index;
            })
          : null}
      </Text>
    </View>
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

export default DoctorBasicDetails;
