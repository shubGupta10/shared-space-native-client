import { useAuthStore } from '@/store/useAuthStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignIn = () => {
  const {setUser, setToken} = useAuthStore()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleSignIn = async () => {
    try {
      const response = await fetch("http://10.0.2.2:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json();
      setUser(data.user)
      setToken(data.token)
      router.push("/(tabs)/home")
    } catch (error) {
      console.error("Failed to login", error)
    }

  }

  return (
    <SafeAreaView className="flex-1 px-6 bg-white justify-center">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-center">Welcome to SignIn</Text>
      </View>


      <View className="mb-4">
        <Text className="mb-1">Email</Text>
        <TextInput
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          placeholder="Enter your email"
          keyboardType="email-address"
          className="border-b border-gray-300 py-2"
        />
      </View>

      <View className="mb-6">
        <Text className="mb-1">Password</Text>
        <TextInput
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          placeholder="Enter your password"
          secureTextEntry
          className="border-b border-gray-300 py-2"
        />
      </View>

      <TouchableOpacity
        onPress={handleSignIn}
        className="bg-blue-600 py-3 rounded-md mb-4"
      >
        <Text className="text-white text-center font-semibold">Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={() => router.push("/(auth)/sign-up")}>
        <Text className="text-center text-gray-600">
          Already have an account?{' '}
          <Text className="text-blue-600 font-semibold">Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignIn