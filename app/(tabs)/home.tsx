import { useAuthStore } from '@/store/useAuthStore'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  const {user, token} = useAuthStore()
  

  return (
    <SafeAreaView>
    <View>
      <Text>User: {user?.name} and {user?.email} and {user?.id}</Text>
    </View>

    <View>
      <Text>Token: {token}</Text>
    </View>
    </SafeAreaView>
  )
}

export default Home