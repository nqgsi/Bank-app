import { signupscreen } from "@/api/auth";
import { getToken, storeToken } from "@/api/storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";

import React, { useState } from "react";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signupcreen() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    image: "",
  });
  const [userImage, setuserImage] = useState<File | undefined>(undefined);
  const { mutate, isPending } = useMutation({
    mutationFn: signupscreen,
    onSuccess: async (data) => {
      console.log(data.token);

      storeToken(data.token);

      console.log("Sign up successfully:", data);
      console.log("stored Token", await getToken());
    },
    onError: (err) => {
      console.log(`somthing went wrong : ${err}`);
      if (isAxiosError(err)) {
        console.error("Axios error:", err.message);
        console.error("Status code:", err.response?.status);
        console.error("Response data:", err.response?.data);
      }
    },
  });

  const handlsubmit = () => {
    const formdata = new FormData();

    formdata.append("username", userInfo.username);
    formdata.append("password", userInfo.password);
    formdata.append("image", userInfo.image);
    mutate(formdata);
    console.log(userInfo);
  };

  const pickImage = async () => {
    // Request permission for the image
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUserInfo({ ...userInfo, image: result.assets[0].uri });
      setuserImage(result.assets[0].file);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Sign Up</Text>
      {userInfo.image && (
        <Image source={{ uri: userInfo.image }} style={styles.profileImage} />
      )}

      {/* Username */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setUserInfo({ ...userInfo, username: text })}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        onChangeText={(text) => setUserInfo({ ...userInfo, password: text })}
      />

      {/* Image Upload */}
      <TouchableOpacity style={styles.imageUploadButton} onPress={pickImage}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ marginRight: 20 }}>
            <AntDesign name="upload" size={24} color="#FFD700" />
          </View>
          <Text style={styles.imageUploadText}>
            {userInfo.image ? "Change Image" : "Upload Profile Image"}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signUpButton} onPress={handlsubmit}>
        <Text style={styles.signUpText}>Sign Up</Text>
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
  imageUploadButton: {
    backgroundColor: "#333",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  imageUploadText: {
    color: "#FFD700",
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 15,
  },
  signUpButton: {
    backgroundColor: "#FFD700",
    paddingVertical: 15,
    borderRadius: 50,
    marginTop: 10,
    alignItems: "center",
  },
  signUpText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

// https://react-bank-project.api.joincoded.com/auth/register
// https://react-bank-project.api.joincoded.com/mini-project/api/auth/register
