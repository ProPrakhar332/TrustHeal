import React, { useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Platform,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native";
import CustomButton from "../Components/CustomButton";
import { SafeAreaView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
export default function SchedulePlanner() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(
    new Date().getHours() + ":" + new Date().getMinutes()
  );

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Empty");
  const [offset, setOffset] = useState(30);
  const [selectedLanguage, setSelectedLanguage] = useState();

  const FirstRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.TabContainer}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#59cf59",
            flexDirection: "row",
            padding: 15,
          }}
        >
          <CustomButton
            text={time}
            onPress={() => showMode("time")}
            style={{ backgroundColor: "white", margin: 5 }}
          ></CustomButton>

          <CustomButton
            text={time}
            onPress={() => showMode("time")}
            style={{ backgroundColor: "white", margin: 5 }}
          ></CustomButton>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            display="spinner"
            onChange={onChange}
            positiveButtonLabel="OK!"
          ></DateTimePicker>
        )}

        <View
          style={{
            flex: 1,
            backgroundColor: "#59cf59",
            flexDirection: "row",
            padding: 15,
          }}
        >
          <Picker
            style={{
              width: 120,
              backgroundColor: "white",
            }}
            mode="dialog"
            ref={pickerRef}
            selectedValue={selectedLanguage}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedLanguage(itemValue);
              setOffset(itemValue);
            }}
          >
            <Picker.Item label="10 min" value="10" />
            <Picker.Item label="15 min" value="15" />
            <Picker.Item label="20 min" value="20" />
            <Picker.Item label="25 min" value="25" />
            <Picker.Item label="30 min" value="30" />
            <Picker.Item label="35 min" value="35" />
            <Picker.Item label="40 min" value="40" />
            <Picker.Item label="45 min" value="45" />
            <Picker.Item label="50 min" value="50" />
            <Picker.Item label="55 min" value="55" />
            <Picker.Item label="60 min" value="60" />
          </Picker>
        </View>
      </View>
    </ScrollView>
  );

  const SecondRoute = () => (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.card, { backgroundColor: "grey" }]}></View>
    </ScrollView>
  );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "first", title: "E-Consultation" },
    { key: "second", title: "Physical" },
  ]);
  const layout = useWindowDimensions();
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{}}
      style={{ backgroundColor: "orange" }}
    />
  );

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(!show);
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime = tempDate.getHours() + ":" + tempDate.getMinutes();
    setText(fDate + "\n" + fTime);
    setTime(fTime);
    console.log(fDate);
    console.log(fTime);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  TabContainer: {
    marginTop: 10,
    alignSelf: "center",
    flexDirection: "row",
  },
});
