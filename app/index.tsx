import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import "./globals.css";

export default function Index() {
  return (
    <View
    className="flex-1 justify-center align-middle">
      <Text className="text-lg text-blue-500">HomePage</Text>
      <TouchableOpacity onPress={() => router.push("/(auth)/sign-up")}>
        <Text>Go to Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
