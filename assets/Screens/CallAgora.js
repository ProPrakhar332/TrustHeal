import React, {useState, useEffect, useRef} from 'react';
import {Text, Alert} from 'react-native';
//import RtcEngine, {IRtcEngine, StreamFallbackOptions} from 'react-native-agora';
import AgoraUIKit, {PropsInterface} from 'agora-rn-uikit';

import apiConfig from '../API/apiConfig';
import dayjs from 'dayjs';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {PermissionsAndroid, Platform} from 'react-native';
import {
  ClientRoleType,
  createAgoraRtcEngine,
  IRtcEngine,
  ChannelProfileType,
} from 'react-native-agora';

export default function CallAgora(props) {
  const {route} = props;
  const {params} = route;
  const {consultationType, callID, userID, userName, userType} = params;
  const [videoCall, setVideoCall] = useState(false);
  const agoraEngineRef = useRef(); // Agora engine instance
  const [isJoined, setIsJoined] = useState(false); // Indicates if the local user has joined the channel
  const [remoteUid, setRemoteUid] = useState(0); // Uid of the remote user
  const [message, setMessage] = useState(''); // Message to the user

  useEffect(async () => {
    // Initialize Agora engine when the app starts
    if (consultationType == 'PHONE_CALL') {
      await getPermission();
      await setupVoiceSDKEngine();
      await join();
    }
  }, [consultationType]);

  const getPermission = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
    }
  };

  const setupVoiceSDKEngine = async () => {
    try {
      // use the helper function to get permissions
      if (Platform.OS === 'android') {
        await getPermission();
      }
      agoraEngineRef.current = createAgoraRtcEngine();
      const agoraEngine = agoraEngineRef.current;
      agoraEngine.registerEventHandler({
        onJoinChannelSuccess: () => {
          showMessage('Successfully joined the channel ' + channelName);
          setIsJoined(true);
        },
        onUserJoined: (_connection, Uid) => {
          showMessage('Remote user joined with uid ' + Uid);
          setRemoteUid(Uid);
        },
        onUserOffline: (_connection, Uid) => {
          showMessage('Remote user left the channel. uid: ' + Uid);
          setRemoteUid(0);
        },
      });
      agoraEngine.initialize({
        appId: apiConfig.AgoraAppId,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const join = async () => {
    if (isJoined) {
      return;
    }
    try {
      agoraEngineRef.current?.setChannelProfile(
        ChannelProfileType.ChannelProfileCommunication,
      );
      agoraEngineRef.current?.joinChannel(token, channelName, uid, {
        clientRoleType: ClientRoleType.ClientRoleBroadcaster,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const leave = () => {
    try {
      agoraEngineRef.current?.leaveChannel();
      setRemoteUid(0);
      setIsJoined(false);
      showMessage('You left the channel');
    } catch (e) {
      console.log(e);
    }
  };

  //video call
  const rtcCallback = {
    EndCall: async () => {
      if (userType == 'Doctor') {
        await statusUpdateDoctorDisconnect();
        Alert.alert(
          'Consultation Ended',
          'Please make sure to make prescription for the patient.',
        );
      } else {
        await statusUpdatePatientDisconnect();
      }
      props.navigation.goBack();
    },
    joinChannel: () => {
      if (userType == 'Doctor') statusUpdateDoctor();
      else if (userType == 'Patient') statusUpdatePatient();
    },
  };
  const statusUpdateDoctor = async () => {
    Alert.alert('Start', 'Consultation Started');
    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/consultation/join?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('\n\n\nMeeting going on status updated doctor\n\n\n');
      })
      .catch(response => {
        console.log(response);
      });
  };
  const statusUpdatePatient = async () => {
    Alert.alert('Start', 'Consultation Started');
    axios
      .post(
        apiConfig.baseUrl +
          '/patient/consultation/join?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('\n\n\nMeeting going on status updated patient\n\n\n');
      })
      .catch(response => {
        console.log(response);
      });
  };
  const statusUpdatePatientDisconnect = async () => {
    axios
      .post(
        apiConfig.baseUrl +
          '/patient/consultation/disconnect?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('Meeting going on status updated patient disconnected');
      })
      .catch(response => {
        console.log(response);
      });
  };
  const statusUpdateDoctorDisconnect = async () => {
    axios
      .post(
        apiConfig.baseUrl +
          '/doctor/consultation/disconnect?consultationId=' +
          callID,
      )
      .then(response => {
        if (response.status == 200)
          console.log('Meeting going on status updated doctor disconnected');
      })
      .catch(response => {
        console.log(response);
      });
  };

  useEffect(() => {
    const statusUpdateDoctor = async () => {
      Alert.alert('Start', 'Consultation Started');
      axios
        .post(
          apiConfig.baseUrl +
            '/doctor/consultation/join?consultationId=' +
            callID,
        )
        .then(response => {
          if (response.status == 200)
            console.log('\n\n\nMeeting going on status updated doctor\n\n\n');
        })
        .catch(response => {
          console.log(response);
        });
    };
    const statusUpdatePatient = async () => {
      Alert.alert('Start', 'Consultation Started');
      axios
        .post(
          apiConfig.baseUrl +
            '/patient/consultation/join?consultationId=' +
            callID,
        )
        .then(response => {
          if (response.status == 200)
            console.log('\n\n\nMeeting going on status updated patient\n\n\n');
        })
        .catch(response => {
          console.log(response);
        });
    };
    if (userType == 'Doctor') statusUpdateDoctor();
    else if (userType == 'Patient') statusUpdatePatient();
  }, [userType]);

  return (
    <AgoraUIKit
      connectionData={{
        appId: apiConfig.AgoraAppId,
        channel: callID,
        username: userName,
      }}
      rtcCallbacks={rtcCallback}
      settings={{
        displayUsername: true,
      }}
    />
  );
}