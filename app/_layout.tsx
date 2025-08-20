import { getToken } from "@/api/storage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AuthContext from "./context/AuthContext";
export default function RootLayout() {
  const queryClient = new QueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const token = await getToken();
      console.log("🚀 ~ checkToken ~ token:", token);
      if (token) {
        setIsAuthenticated(true);
      }
      setIsReady(true);
    };
    checkToken();
  }, []);
  if (!isReady) {
    return <ActivityIndicator size="large" color="#FFd700"></ActivityIndicator>;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
          <Stack>
            <Stack.Screen
              name="loginpage"
              options={{ headerShown: false }} //title: "Home🏦",
            />
            <Stack.Screen
              name="commponents/Home/LoginScreen"
              options={{ headerShown: false }} //title: "Login🏦",
            />
            <Stack.Screen
              name="commponents/Home/Signupscreen"
              options={{ headerShown: false }} //title: "Become a client💳",
            />
            <Stack.Protected guard={isAuthenticated}>
              <Stack.Screen
                name="(protect)/(tabs)"
                options={{ headerShown: false }}
              ></Stack.Screen>
            </Stack.Protected>
          </Stack>
        </AuthContext.Provider>
      </QueryClientProvider>
    </SafeAreaView>
  );
}
