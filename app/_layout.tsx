import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home🏦" }} />
      <Stack.Screen
        name="commponents/Home/LoginScreen"
        options={{ title: "Login🏦" }}
      />{" "}
      <Stack.Screen
        name="commponents/Home/Signupscreen"
        options={{ title: "Become a client💳" }}
      />
    </Stack>
  );
}
