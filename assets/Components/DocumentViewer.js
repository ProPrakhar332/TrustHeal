import React, {useState, useEffect, useCallback} from 'react';
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
  PermissionsAndroid,
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
import RNFS from 'react-native-fs';
import FAIcon from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import Pdf from 'react-native-pdf';

function DocumentViewer({fileToken, userId, fileName}) {
  //viewing document
  const [docPath, setdocPath] = useState(null);
  const [docsModal, setdocsModal] = useState(true);
  const [zoom, setZoom] = useState(1);

  const onZoomIn = () => {
    if (zoom < 2.5) setZoom(zoom + 0.25);
  };
  const onZoomOut = () => {
    if (zoom > 1) setZoom(zoom - 0.25);
  };

  useEffect(() => {
    const downloadCache = async () => {
      let filePath = `file://${RNFS.CachesDirectoryPath}/`;
      let options = {
        fromUrl:
          apiConfig.baseUrl +
          '/file/download?fileToken=' +
          fileToken +
          '&userId=' +
          userId,
        toFile: filePath + fileName,
      };
      await RNFS.downloadFile(options)
        .promise.then(response => {
          if (response.statusCode == 200 || response.statusCode == 204) {
            console.log(filePath);
            setdocPath(filePath + fileName);
          } else
            Alert.alert(
              'Download Fail',
              `Unable to download file. ${response.statusCode}`,
            );
        })
        .catch(e => {
          Alert.alert('Error', `${e}`);
        });
    };
    downloadCache();
  }, []);

  return (
    <View>
      {docsModal ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={docsModal}
          onRequestClose={() => {
            setdocsModal(!docsModal);
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
                  borderBottomWidth: 1,
                  borderBottomColor: 'gray',
                }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    padding: 5,
                    color: 'black',
                  }}>
                  {fileName}
                </Text>
                <FAIcon
                  name="window-close"
                  color="black"
                  size={26}
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                  onPress={() => {
                    setdocsModal(false);
                    setdocPath(null);
                    setZoom(1);
                  }}
                />
              </View>
              <View style={{minHeight: 150, width: '100%'}}>
                <View
                  style={{
                    padding: 10,
                    width: '100%',
                    alignSelf: 'center',
                    borderRadius: 7,
                    marginVertical: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                  }}>
                  <Pdf
                    source={{
                      uri: docPath,
                    }}
                    style={{
                      width: '100%',
                      height: 275,
                      alignSelf: 'center',
                    }}
                    //onLoadComplete={() => console.log('fully loaded')}
                    scale={zoom}
                  />
                </View>
                <View style={{alignSelf: 'center', flexDirection: 'column'}}>
                  {/* Zoom Buttons */}
                  <View
                    style={{
                      flexDirection: 'row',
                      alignContent: 'center',
                      justifyContent: 'space-evenly',
                      width: '95%',
                    }}>
                    <TouchableOpacity>
                      <FAIcon
                        name="minus-circle"
                        size={20}
                        color={'gray'}
                        onPress={onZoomOut}
                      />
                    </TouchableOpacity>
                    <Text>
                      {zoom * 100}
                      {' %'}
                    </Text>
                    <TouchableOpacity>
                      <FAIcon
                        name="plus-circle"
                        size={20}
                        color={'gray'}
                        onPress={onZoomIn}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* <View
                    style={{
                      width: '85%',
                      alignSelf: 'center',
                      marginTop: 5,
                    }}>
                    <Text>File Name:- {fileName}</Text>
                  </View> */}
                  <CustomButton
                    textstyle={{color: 'white', fontSize: 12}}
                    text={'Download'}
                    style={{
                      backgroundColor: 'limegreen',
                      borderRadius: 10,
                    }}
                    onPress={async () => {
                      let fileName = docPath.split('/').pop();
                      //console.log(fileName);
                      await RNFS.copyFile(
                        docPath,
                        `file://${RNFS.DownloadDirectoryPath}/` + fileName,
                      );
                      Alert.alert(
                        'Downloaded',
                        `Document has been downloaded under the name of:- ${fileName}`,
                      );
                    }}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
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
  modalView: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    backgroundColor: 'white',
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default DocumentViewer;
