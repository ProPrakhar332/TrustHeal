import { Text, View, TextInput, StyleSheet } from "react-native";

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  return (
    <View style={[style, styles.container]}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        style={styles.input}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      ></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    width: "100%",
    borderColor: "#e8e8e8",
    borderRadius: 5,
    borderWidth: 1,
    marginVertical: 5,
  },
  input: {
    height: 30,
    fontSize: 15,
    width: "100%",
    textAlign: "center",
  },
});

export default CustomInput;
