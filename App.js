import * as React from "react";
import { View, Text } from "react-native";
import Hello from "./src/components/Hello";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Hello />
      <Text>Universal React with Expo</Text>
    </View>
  );
}
