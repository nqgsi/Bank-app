import { fetchProfile, updateProfile } from "@/api/auth";
import AuthContext from "@/app/context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import * as SecureStore from "expo-secure-store";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const { setIsAuthenticated } = useContext(AuthContext);

  const { data, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
  const [image, setImage] = useState<string | null>(null);
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    mutationKey: ["profile"],
  });
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("token");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Profile Card */}
      <View style={styles.card}>
        <TouchableOpacity
          onPress={pickImage}
          style={{ position: "absolute", top: 15, right: 15 }}
        >
          <AntDesign name="edit" size={24} color="white" />
        </TouchableOpacity>

        <Image
          source={{
            uri: image
              ? image // picked image
              : data?.image
              ? data.image // server image
              : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png", // fallback
          }}
          style={styles.avatar}
        />

        <Text style={styles.username}>{data?.username}</Text>
        <Text style={styles.balance}>Balance: ${data?.balance}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    width: "90%",
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: "#FFD700",
    marginBottom: 15,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 5,
  },
  balance: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 25,
  },
  logoutBtn: {
    flexDirection: "row",
    backgroundColor: "#FF4C4C",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
});
