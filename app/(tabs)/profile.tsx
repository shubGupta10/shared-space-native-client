import { useAuthStore } from '@/store/useAuthStore'
import { router } from 'expo-router'
import React from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    Alert.alert(
      'Log out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive', 
          onPress: () => {
            logout()
            router.replace('/(auth)/sign-in') 
          } 
        },
      ],
      { cancelable: true }
    )
  }

  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-6">
      {/* Header */}
      <Text className="text-2xl font-bold mb-6">Your Profile</Text>

      {/* Profile Card */}
      <View className="bg-gray-100 p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <Text className="text-lg font-medium mb-2">Name</Text>
        <Text className="text-base text-gray-700 mb-4">{user?.name || '—'}</Text>

        <Text className="text-lg font-medium mb-2">Email</Text>
        <Text className="text-base text-gray-700">{user?.email || '—'}</Text>
      </View>

      {/* Logout Button */}
      <TouchableOpacity
        onPress={handleLogout}
        className="mt-auto bg-red-600 py-3 rounded-xl shadow-sm items-center"
      >
        <Text className="text-white font-semibold text-base">Log Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Profile
