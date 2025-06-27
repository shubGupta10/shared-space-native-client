import { useAuthStore } from "@/store/useAuthStore";
import { Stack, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();

  const { user, token, setLoading } = useAuthStore();

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      setLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      const isAuthScreen = segments[0] === "(auth)";
      const isSignedIn = user && token;

      if (!isSignedIn && !isAuthScreen) {
        router.replace("/(auth)/sign-in");
      } else if (isSignedIn && isAuthScreen) {
        router.replace("/(tabs)/home");
      }

      setLoading(false);
    };

    checkAuthAndNavigate();
  }, [user, token, segments]);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <StatusBar style="dark" />
    </SafeAreaProvider>
  );
}
