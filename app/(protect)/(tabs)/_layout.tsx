import AuthContext from "@/app/context/AuthContext";
import { Redirect, Tabs } from "expo-router";
import React, { useContext } from "react";

const ProtectedLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  if (!isAuthenticated) {
    return <Redirect href="/commponents/Home/LoginScreen" />;
  }
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "home", headerShown: false }}
      />
      <Tabs.Screen name="transaction" options={{ headerShown: false }} />
    </Tabs>
  );
};

export default ProtectedLayout;
