import { router } from "expo-router";
import React from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Top Logo */}
      <Image
        source={{
          uri: "https://static.vecteezy.com/system/resources/thumbnails/051/332/035/small_2x/golden-bank-building-icon-isolated-on-a-transparent-background-symbol-of-financial-institution-wealth-and-savings-png.png",
        }}
        style={styles.logoTop}
        resizeMode="contain"
      />

      {/* Middle Content */}
      <View style={styles.centerContent}>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/051/332/035/small_2x/golden-bank-building-icon-isolated-on-a-transparent-background-symbol-of-financial-institution-wealth-and-savings-png.png",
          }}
          style={styles.logoMiddle}
          resizeMode="contain"
        />
        <Text style={{ color: "#FDD700", marginBottom: 30 }}>Golden Bank</Text>
        {/* Log In Button */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push("/commponents/Home/LoginScreen")}
        >
          <Text style={styles.loginText}>Log in</Text>
        </TouchableOpacity>

        {/* Become Client Button */}
        <TouchableOpacity
          style={styles.clientButton}
          onPress={() => router.push("/commponents/Home/Signupscreen")}
        >
          <Text style={styles.clientText}>Become a client of the bank</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111", // dark background
    paddingTop: 50,
  },
  logoTop: {
    width: 100,
    height: 50,
    alignSelf: "center",
    marginBottom: 20,
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoMiddle: {
    width: 150,
    height: 80,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#FFD700", // gold
    paddingVertical: 15,
    paddingHorizontal: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  loginText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  clientButton: {
    backgroundColor: "#333",
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 50,
  },
  clientText: {
    color: "#fff",
    fontSize: 14,
  },
});
