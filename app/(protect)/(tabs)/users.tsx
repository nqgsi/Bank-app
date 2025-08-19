import instance from "@/api";
import { getUsers } from "@/api/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type User = {
  _id: string;
  username: string;
  balance: number;
  image?: string;
};

export default function UsersPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });
  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#ffffffff" />
      </View>
    );
  }

  const handleTransfer = (user: User) => {
    Alert.prompt("Transfer Amount", "Enter amount to transfer", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async (amount: any) => {
          const numericAmount = Number(amount);
          if (!numericAmount || numericAmount <= 0) {
            Alert.alert("Error", "Amount must be greater than 0");
            return;
          }
          try {
            await instance.put(`/transactions/transfer/${user.username}`, {
              //transfer fund
              amount: numericAmount,
            });
            Alert.alert("Success", "Transfer successful!");
            queryClient.invalidateQueries({ queryKey: ["users"] }); // this screen
            queryClient.invalidateQueries({ queryKey: ["profile"] }); // MainPage + ProfileScreen
          } catch (error) {
            Alert.alert("Error", "Transfer failed");
          }
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: User }) => (
    <View style={styles.card} key={item._id}>
      <Image
        source={{
          uri: item?.image
            ? item.image
            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{item.username}</Text>
      <Text style={styles.balance}>Balance: {item.balance}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleTransfer(item)}
      >
        <Text style={styles.buttonText}>Transfer</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      numColumns={1}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "#FFD700",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 4,
  },
  balance: {
    fontSize: 14,
    color: "#FFD700",
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#000",
    fontWeight: "bold",
  },
  loaderContainer: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    alignItems: "center",
    justifyContent: "center",
  },
});
