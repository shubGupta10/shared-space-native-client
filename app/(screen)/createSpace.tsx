import { useAuthStore } from '@/store/useAuthStore';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import uuid from 'react-native-uuid';

const CreateSpace = () => {
    const { token, user } = useAuthStore()
    const [formData, setFormData] = useState({
        token: uuid.v4(),
        name: "",
        creator: user?.id,
    })



    const handleCreateSpace = async () => {
        try {
            const response = await fetch("http://10.0.2.2:3000/space/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            })
            const data = await response.json();
            console.log("Here is data", data);
        } catch (error) {
            console.error("Failed to create space", error)
        }
    }

    return (
        <SafeAreaView className="flex-1 px-6 bg-white justify-center">
            <View className="mb-8">
                <Text className="text-2xl font-bold text-center">Create Your Space</Text>
            </View>


            <View className="mb-4">
                <Text className="mb-1">Name of Space</Text>
                <TextInput
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                    placeholder="Enter space name"
                    className="border-b border-gray-300 py-2"
                />

            </View>



            <TouchableOpacity
                onPress={handleCreateSpace}
                className="bg-blue-600 py-3 rounded-md mb-4"
            >
                <Text className="text-white text-center font-semibold">Create Space</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={() => router.push("/(auth)/sign-up")}>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default CreateSpace