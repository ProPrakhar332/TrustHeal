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
import Header from '../Components/Header';
import {StyleSheet} from 'react-native';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
//Icons
import cheifComplaints from '../Icons/search.png';
import bodyScan from '../Icons/body-scan.png';
import diagnosis from '../Icons/diagnosis.png';
import medicine from '../Icons/medicine.png';
import investigation from '../Icons/searching.png';
import advice from '../Icons/doctor.png';
import followUp from '../Icons/calendar.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Investigation({navigation}) {
  const window = useWindowDimensions();
  const [Investigation, setInvestigation] = useState([]);
  const [investigationText, setinvestigationText] = useState('');

  const removeHandler = e => {
    setInvestigation(Investigation.filter(obj => obj.inv !== e));
    // console.log(questionareList);
  };

  const RenderInvestigation = () => {
    return Investigation.map((Investigation, index) => {
      return (
        <View
          style={{
            flexDirection: 'column',
            borderWidth: 1,
            borderTopWidth: 0,
            borderColor: '#d3d3d3',
          }}
          key={index}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              margin: 0,
              padding: 0,
            }}>
            {/* Serial No */}
            <View style={[styles.cellStyle, {flex: 0.3}]}>
              <Text style={styles.cellText}>{index + 1 + '.'}</Text>
            </View>
            {/* Serial No */}
            <View style={[styles.cellStyle]}>
              <Text style={styles.cellText}>{Investigation.inv}</Text>
            </View>
            {/* Actions */}
            <TouchableOpacity
              style={[styles.cellStyle, {flex: 0.3}]}
              onPress={() => {
                // console.log(questionareList.ques);
                removeHandler(Investigation.inv);
              }}>
              <FAIcon name="trash" color={'red'} size={12} />
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };

  const pressedProceed = async () => {
    if (Investigation != '') {
      let p = JSON.stringify(Investigation);
      await AsyncStorage.setItem('Investigation', p);
      console.log(await AsyncStorage.getItem('Investigation'));
      navigation.push('Advice');
    } else
      Alert.alert(
        'Incomplete Details!',
        'Please add Investigation before continuing!',
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
                  style={[{tintColor: '#2B8ADA'}]}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={advice} style={[{tintColor: '#5d5e61'}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <Image source={followUp} style={[{tintColor: '#5d5e61'}]} />
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
                <Text style={styles.viewHeadingText}>Investigation</Text>
              </TouchableOpacity>
              {/* Search Bar */}
              <View style={[styles.searchBar, {borderRadius: 5}]}>
                <TextInput
                  placeholder="Type Lab Test"
                  onChangeText={text => setinvestigationText(text)}
                  value={investigationText}
                  style={styles.searchBarText}
                  returnKeyType="done"
                  onSubmitEditing={() => {
                    let a = {
                      inv: investigationText,
                    };
                    Investigation.push(a);
                    setinvestigationText('');
                  }}
                />
              </View>

              {Investigation.length > 0 ? (
                <View style={styles.whiteBodyView}>
                  <View
                    style={{
                      marginBottom: 10,
                      borderBottomWidth: 1,
                      borderBottomColor: '#2b8ada',
                    }}>
                    <Text
                      style={{
                        fontSize: 13,
                        fontWeight: 'bold',
                        color: '#2b8ada',
                      }}>
                      Investigations
                    </Text>
                  </View>
                  <View>
                    <View
                      style={{
                        flexDirection: 'column',
                        borderWidth: 1,
                        borderColor: '#d3d3d3',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          margin: 0,
                          padding: 0,
                        }}>
                        <View style={[styles.cellHeading, {flex: 0.3}]}>
                          <Text style={styles.cellHeadingText}>S. No.</Text>
                        </View>
                        <View style={styles.cellHeading}>
                          <Text style={styles.cellHeadingText}>
                            Investigation
                          </Text>
                        </View>

                        <View
                          style={{
                            flex: 0.3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 1,
                            paddingVertical: 1,
                            backgroundColor: '#2b8ada',
                          }}>
                          <Text style={styles.cellHeadingText}>Actions</Text>
                        </View>
                      </View>
                    </View>
                    <RenderInvestigation />
                  </View>
                </View>
              ) : null}
              {/* Bottom Buttons*/}
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
                  text="Go Back"
                  textstyle={{color: '#2B8ADA', fontSize: 12}}
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#2B8ADA',
                    flex: 0.45,
                  }}
                  onPress={() => {
                    navigation.goBack();
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
  },
  searchIcon: {
    position: 'absolute',
    right: 0,
    paddingTop: 10,
    paddingHorizontal: 5,
  },
  bubble: {
    flexDirection: 'row',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    flex: 0.45,
  },
  bubbleText: {fontSize: 14, fontWeight: 'bold'},
  cellStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  cellHeading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#d3d3d3',
    paddingHorizontal: 1,
    paddingVertical: 1,
    backgroundColor: '#2b8ada',
  },
  cellHeadingText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 11,
    marginVertical: 5,
    color: 'white',
  },
  cellText: {textAlign: 'center', fontSize: 11, paddingVertical: 3},
  whiteBodyView: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
});

export default Investigation;
