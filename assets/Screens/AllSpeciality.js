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
  const [List, setList] = useState(null);
  const [nextList, setnextList] = useState(null);
  const [selected, setselected] = useState([]);
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
                active: false,
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
      <View
        style={{
          width: 115,
          backgroundColor: 'white',
          borderRadius: 10,
          padding: 5,
          margin: 5,
        }}
        key={item.key}>
        <CheckBoxIcon
          size={20}
          iconType="font-awesome"
          checked={item.active}
          onIconPress={() => {
            CheckBoxPressed(item);
          }}
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
      </View>
    );
  };

  CheckBoxPressed = item => {
    console.log(
      List.map(data => {
        if (data.key == item.key) {
          data.active = !data.active;
        }
      }),
    );
    //setList(x);
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
          <View style={{width: '95%', alignSelf: 'center'}}>
            <FlatList
              data={List}
              key={item => item.key}
              renderItem={renderSpeciality}
              numColumns={Math.round(layout.width / 130)}
            />
            <Text>
              {selected.map(index => {
                return index + '\n';
              })}
            </Text>
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
});

export default AllSpeciality;
