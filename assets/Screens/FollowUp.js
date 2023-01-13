import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {
  View,
  Alert,
  Text,
  Button,
  SafeAreaView,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  KeyboardAvoidingView,
} from 'react-native';
import CustomButton from '../Components/CustomButton';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import Header from '../Components/Header';
import {StyleSheet} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
//Icons
import cheifComplaints from '../Icons/search.png';
import bodyScan from '../Icons/body-scan.png';
import diagnosis from '../Icons/diagnosis.png';
import medicine from '../Icons/medicine.png';
import investigation from '../Icons/searching.png';
import advice from '../Icons/doctor.png';
import followUp from '../Icons/calendar.png';
import dayjs from 'dayjs';

function FollowUp({navigation}) {
  const window = useWindowDimensions();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setdate] = useState('');

  const showDatePicker = () => {
    //console.log("Pressed button");

    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = async date => {
    await AsyncStorage.setItem('dob', JSON.stringify(date).substring(1, 11));
    setdate(JSON.stringify(date).substring(1, 11));
    hideDatePicker();
  };

  const pressedProceed = async () => {
    await AsyncStorage.setItem('FollowUpDate', date);
    console.log(await AsyncStorage.getItem('FollowUpDate'));
    navigation.push('PrescriptionPreview');
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
            height: '100%',
            backgroundColor: '#E8F0FE',
          }}
          showsVerticalScrollIndicator={false}>
          {/* Header */}
          <Header title="Prescription" showMenu={false} />
          <View style={{flexDirection: 'row'}}>
            {/* Navigation Bar */}
            <View
              style={{
                flex: 0.15,
                flexDirection: 'column',
                justifyContent: 'space-around',
                borderRightWidth: 1,
                height: window.height - 80,
                padding: 1,
                alignItems: 'center',
                borderRightColor: 'gray',
              }}>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={cheifComplaints}
                  style={[{tintColor: '#5d5e61'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={bodyScan} style={[{tintColor: '#5d5e61'}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={diagnosis} style={[{tintColor: '#5d5e61'}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={medicine} style={[{tintColor: '#5d5e61'}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={investigation}
                  style={[{tintColor: '#5d5e61'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={advice} style={[{tintColor: '#5d5e61'}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={followUp} style={[{tintColor: '#2B8ADA'}]} />
              </TouchableOpacity>
            </View>
            {/* Page View */}
            <View style={styles.pageView}>
              {/* Heading */}
              <TouchableOpacity
                style={styles.viewHeadingView}
                onPress={() => {
                  navigation.goBack();
                }}>
                <FAIcon
                  name="chevron-left"
                  color={'#2B8ADA'}
                  size={15}
                  style={{marginRight: 5}}
                />
                <Text style={styles.viewHeadingText}>Follow Up</Text>
              </TouchableOpacity>
              {/* Search Bar */}
              <View style={[styles.searchBar, {borderRadius: 5}]}>
                <TextInput
                  placeholder="click on calendar icon"
                  editable={false}
                  onChangeText={text => setdate(text)}
                  value={dayjs(date).format('DD-MM-YYYY')}
                  style={styles.searchBarText}
                />
                <FAIcon
                  name="calendar-alt"
                  size={20}
                  color="gray"
                  style={styles.searchIcon}
                  onPress={showDatePicker}
                />
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  display="spinner"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                />
              </View>
              {/*Bottom Buttons*/}
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  bottom: 0,
                  position: 'absolute',
                  marginVertical: 10,
                  justifyContent: 'space-evenly',
                }}>
                <CustomButton
                  text="Proceed"
                  textstyle={{color: 'white', fontSize: 12}}
                  style={{
                    borderRadius: 10,
                    backgroundColor: '#2B8ADA',
                    flex: 0.45,
                  }}
                  onPress={pressedProceed}
                />
                <CustomButton
                  text="Save"
                  textstyle={{color: '#2B8ADA', fontSize: 12}}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#2B8ADA',
                    flex: 0.45,
                  }}
                  onPress={() => {
                    Alert.alert(
                      'All the details on this page are saved successfully',
                    );
                  }}
                />
              </View>
            </View>
          </View>
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
  pageView: {
    flex: 0.8,
    flexDirection: 'column',
    padding: 10,
  },
  viewHeadingView: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  viewHeadingText: {
    color: '#2B8ADA',
    fontSize: 15,
    fontWeight: 'bold',
  },
  searchBar: {
    width: '95%',
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#2B8ADA',
    backgroundColor: 'white',
    borderRadius: 25,
    alignSelf: 'center',
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginLeft: 5,
  },
  searchBarText: {
    width: '100%',
    color: 'black',
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    paddingRight: 20,
    alignSelf: 'center',
  },
  bubble: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
  },
  bubbleText: {fontSize: 14, fontWeight: 'bold'},
});

export default FollowUp;
