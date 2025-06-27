import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SignUp = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignUp = async () => {
    try {
          console.log("🟢 Sending data to:", `http://10.0.2.2:3000/auth/register`);
    console.log("📦 Payload:", formData);
      const response = await fetch("http://10.0.2.2:3000/auth/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      console.log('Response from server:', data);
    } catch (error) {
      console.error('Error occurred during sign up:', error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-6 bg-white justify-center">
      <View className="mb-8">
        <Text className="text-2xl font-bold text-center">Welcome to SignUp</Text>
      </View>

      <View className="mb-4">
        <Text className="mb-1">Name</Text>
        <TextInput
          value={formData.name}
          onChangeText={(text) => setFormData({ ...formData, name: text })}
          placeholder="Enter your name"
          className="border-b border-gray-300 py-2"
        />
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
        onPress={handleSignUp}
        className="bg-blue-600 py-3 rounded-md mb-4"
      >
        <Text className="text-white text-center font-semibold">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4" onPress={() => router.push("/(auth)/sign-in")}>
        <Text className="text-center text-gray-600">
          Already have an account?{' '}
          <Text className="text-blue-600 font-semibold">Sign In</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SignUp;
