import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";

export default function RootLayout() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen
          name="index"
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
      </Stack>
    </QueryClientProvider>
  );
}
