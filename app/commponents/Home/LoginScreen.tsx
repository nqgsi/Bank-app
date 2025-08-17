// LoginScreen.js
import { login } from "@/api/auth";
import { getToken, storeToken } from "@/api/storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function LoginScreen() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      storeToken(data.token);
      console.log("Logged in successfully:", data);
      console.log("stored Token", await getToken());
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Log In</Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => mutate(userInfo)}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111",
    padding: 20,
  },
  backButton: {
    marginTop: 40,
    marginBottom: 20,
  },
  backText: {
    color: "#FFD700",
    fontSize: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#222",
    color: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
    alignItems: "center",
  },
  loginText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
