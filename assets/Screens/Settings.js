import React from "react";
import { View, Text, Button } from "react-native";

function SettingScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Setting Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.push("Home")} />
      <Button
        title="Go to Profile"
        onPress={() => navigation.push("Profile")}
      />
    </View>
  );
}

export default SettingScreen;
