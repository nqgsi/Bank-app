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
          if (data.balance < amount) {
            Alert.alert("Error", "you dont have enough funds to transfer!");
          }
          try {
            await instance.put(`/transactions/transfer/${user.username}`, {
              //transfer fund
              amount: numericAmount,
            });
            Alert.alert("Success", "Transfer successful!");
            queryClient.invalidateQueries({ queryKey: ["users"] }); // this screen
            queryClient.invalidateQueries({ queryKey: ["profile"] }); // MainPage + ProfileScreen
            queryClient.invalidateQueries({ queryKey: ["transactions"] }); // this screen
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
        style={styles.avatarSquare}
      />
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.name}>
          {item.username}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleTransfer(item)}
        >
          <Text style={styles.buttonText}>Transfer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={{ backgroundColor: "black" }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        numColumns={1}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: "center", // center the cards
  },
  card: {
    backgroundColor: "#000",
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    width: "90%", // make it responsive
    flexDirection: "row", // horizontal layout
    alignItems: "center",
    shadowColor: "#FFD700",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },

  avatarSquare: {
    width: 80,
    height: 80,
    borderRadius: 8, // square with slight rounding
    borderWidth: 2,
    borderColor: "#FFD700",
    marginRight: 12,
  },

  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#FFD700",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
    height: 36,
    justifyContent: "center",
    alignSelf: "flex-start",
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
