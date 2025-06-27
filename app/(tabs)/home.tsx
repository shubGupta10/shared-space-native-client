import { useAuthStore } from '@/store/useAuthStore'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type SpaceType = {
  id: string
  name: string
  creator: string
  partner: string
  created_at: string
  token: string
}

const Home = () => {
  const { user, token } = useAuthStore()
  const [spaces, setSpaces] = useState<SpaceType[] | null>(null)
  const [loading, setLoading] = useState(true)

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
        const data = await response.json()
        setSpaces(data.spaces)
      } catch (error) {
        console.error("Failed to fetch spaces", error)
        Alert.alert("Error", "Failed to fetch spaces")
      } finally {
        setLoading(false)
      }
    }
    fetchSpaces()
  }, [user, token])

  const handleCopy = (token: string) => {
    Alert.alert("Copied!", `Token: ${token}`)
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      <Text className="text-2xl font-bold mb-6">Welcome, {user?.name} 👋</Text>

      {/* Create / Join Buttons */}
      <View className="flex-row justify-between mb-6">
        <TouchableOpacity
          className="flex-1 bg-blue-600 mr-2 py-3 rounded-xl shadow-sm items-center"
          onPress={() => router.push("/(screen)/createSpace")}
        >
          <Text className="text-white font-semibold text-base">Create Space</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 bg-green-600 ml-2 py-3 rounded-xl shadow-sm items-center"
          onPress={() => Alert.alert("Coming Soon", "Join with Token feature")}
        >
          <Text className="text-white font-semibold text-base">Join with Token</Text>
        </TouchableOpacity>
      </View>

      {/* Space List */}
      <Text className="text-xl font-semibold mb-3">Your Spaces</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#3b82f6" />
      ) : (
        <ScrollView className="space-y-4">
          {spaces?.length ? (
            spaces.map(space => (
              <View
                key={space.id}
                className="bg-gray-100 p-4 rounded-xl shadow-sm border border-gray-200"
              >
                <Text className="text-lg font-bold mb-1">{space.name}</Text>
                <Text className="text-sm text-gray-600 mb-2">Created at: {new Date(space.created_at).toLocaleDateString()}</Text>

                <TouchableOpacity
                  onPress={() => handleCopy(space.token)}
                  className="self-start border border-gray-500 px-3 py-1 rounded-full"
                >
                  <Text className="text-xs font-medium text-gray-700">Copy Token</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text className="text-gray-500 mt-10 text-center">No spaces found yet. Create one to get started!</Text>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default Home
