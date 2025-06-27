import { Ionicons } from '@expo/vector-icons';
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
    const insets = useSafeAreaInsets();
    
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#3b82f6", 
                tabBarInactiveTintColor: "#6b7280", 
                headerTitleStyle: {
                    color: "#1f2937", 
                    fontWeight: "600",
                },
                headerShadowVisible: false,
                tabBarStyle: {
                    backgroundColor: "#ffffff", 
                    borderTopWidth: 1,
                    borderTopColor: "#e5e7eb", 
                    paddingTop: 5,
                    paddingBottom: insets.bottom,
                    height: 60 + insets.bottom,
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: -2,
                    },
                    shadowOpacity: 0.1,
                    shadowRadius: 3,
                    elevation: 5,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "500",
                    marginTop: 2,
                }
            }}
        >
            <Tabs.Screen 
                name="home" 
                options={{
                    title: "Home",
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons 
                            name={focused ? 'home' : 'home-outline'} 
                            size={size} 
                            color={color} 
                        />
                    )
                }}  
            />

            <Tabs.Screen 
                name="profile" 
                options={{
                    title: "Profile",
                    tabBarIcon: ({color, size, focused}) => (
                        <Ionicons 
                            name={focused ? 'person' : 'person-outline'} 
                            size={size} 
                            color={color} 
                        />
                    )
                }}  
            />
        </Tabs>
    )
}