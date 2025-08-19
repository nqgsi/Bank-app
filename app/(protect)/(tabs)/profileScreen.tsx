import instance from "@/api";
import AuthContext from "@/app/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import * as SecureStore from "expo-secure-store";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// const fetchProfile = async () => {
//     const token = await SecureStore.getItemAsync("token");
//     const res =
// }
const fetchProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data;
};

const ProfileScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token"); // clear token
    setIsAuthenticated(false); // update auth state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={{ color: "white" }}>Username: {data.username}</Text>
      <Text style={{ color: "white" }}>Balance: {data.balance}</Text>
      {/* Example if API returns image */}
      <Image
        source={{ uri: data.image }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#ffffffff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  title: { color: "#FFD700", fontSize: 22, marginBottom: 40 },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#ff0000ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: { color: "#ffffffff", fontSize: 18, marginLeft: 10 },
});
