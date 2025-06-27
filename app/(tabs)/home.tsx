import { useAuthStore } from '@/store/useAuthStore'
import { router } from 'expo-router'
import React, { useEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const { user, token } = useAuthStore()

  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/space/fetch-spaces", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        })
        const data = await response.json();
        console.log("Here is spaces", data);
        
      } catch (error) {
        
      }
    }
    fetchSpaces()
  },[user, token])

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold mb-4">Welcome, {user?.name} 👋</Text>

      {/* Create / Join Actions */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg" onPress={() => router.push("/(screen)/createSpace")}>
          <Text className="text-white font-medium">Create Space</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-green-500 px-4 py-2 rounded-lg">
          <Text className="text-white font-medium">Join with Token</Text>
        </TouchableOpacity>
      </View>

      {/* Spaces List */}
      <Text className="text-lg font-semibold mb-2">Your Spaces</Text>
      {/* <ScrollView className="space-y-3">
        {spaces.map(space => (
          <TouchableOpacity
            key={space.id}
            className="bg-gray-100 p-4 rounded-lg"
          >
            <Text className="text-lg font-medium">{space.name}</Text>
            <Text className="text-xs text-gray-500">Created on {space.createdAt}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView> */}
    </SafeAreaView>
  )
}

export default Home
