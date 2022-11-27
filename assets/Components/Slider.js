import React, { useState } from "react";
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  Text,
  StyleSheet,
} from "react-native";

const { width } = Dimensions.get("window");
const height = width * 0.6;

const [states, setStates] = useState(0);

const change = ({ nativeEvent }) => {
  const slide = Math.ceil(
    nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
  );
  if (slide !== states) {
    setStates(slide);
  }
};

export default function Slider({ slideshow }) {
  return (
    <View style={{ marginVertical: 10, width, height }}>
      <ScrollView
        pagingEnabled
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
      >
        {slideshow.map((slideshow, index) => (
          <Image
            key={index}
            source={{ uri: slideshow }}
            style={{ width, height, resizeMode: "cover" }}
          ></Image>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
        }}
      >
        {slideshow.map((i, k) => (
          <Text
            key={k}
            style={
              k == states
                ? { color: "white", margin: 3 }
                : { color: "gray", margin: 3 }
            }
          >
            ⬤
          </Text>
        ))}
      </View>
    </View>
  );
}
