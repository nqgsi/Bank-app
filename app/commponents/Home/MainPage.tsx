import instance from "@/api";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Fetch user profile
const fetchProfile = async () => {
  const res = await instance.get("/auth/me");
  return res.data;
};

type UserData = {
  image: string;
  balance: number;
  username?: string;
};

const MainPage = () => {
  const { data, refetch } = useQuery<UserData>({
    queryKey: ["userData"],
    queryFn: fetchProfile,
  });

  const [showActions, setShowActions] = useState(false);

  const handleDeposit = () => {
    Alert.prompt("Deposit Amount", "Enter amount to deposit", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async (amount) => {
          const numericAmount = Number(amount);
          if (!numericAmount || numericAmount <= 0) {
            Alert.alert("Error", "Amount must be greater than 0");
            return;
          }
          try {
            await instance.put("/transactions/deposit", {
              // deposit fund
              amount: numericAmount,
            });

            Alert.alert("Success", "Deposit successful!");
            refetch();
          } catch (error) {
            Alert.alert("Error", "Deposit failed");
          }
        },
      },
    ]);
  };

  const handleWithdraw = () => {
    Alert.prompt("Withdraw Amount", "Enter amount to withdraw", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async (amount) => {
          const numericAmount = Number(amount);
          if (!numericAmount || numericAmount <= 0) {
            Alert.alert("Error", "Amount must be greater than 0");
            return;
          }
          try {
            await instance.put("/transactions/withdraw", {
              // withdrwa fund
              amount: numericAmount,
            });
            Alert.alert("Success", "Withdraw successful!");
            refetch();
          } catch (error) {
            Alert.alert("Error", "Withdraw failed");
          }
        },
      },
    ]);
  };

  const handleTransfer = () => {
    Alert.prompt("Transfer Amount", "Enter amount to transfer", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "OK",
        onPress: async (amount) => {
          const numericAmount = Number(amount);
          if (!numericAmount || numericAmount <= 0) {
            Alert.alert("Error", "Amount must be greater than 0");
            return;
          }
          try {
            await instance.put("/transactions/transfer", {
              //transfer fund
              amount: numericAmount,
            });
            Alert.alert("Success", "Transfer successful!");
            refetch();
          } catch (error) {
            Alert.alert("Error", "Transfer failed");
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{
              uri: data?.image
                ? data.image
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            }}
            style={{ borderRadius: 100, width: 70, height: 70 }}
          />
          <Image
            source={{
              uri: "https://static.vecteezy.com/system/resources/thumbnails/051/332/035/small_2x/golden-bank-building-icon-isolated-on-a-transparent-background-symbol-of-financial-institution-wealth-and-savings-png.png",
            }}
            style={{ width: 50, height: 50 }}
          />
          <Ionicons name="search-outline" size={24} color="#fff" />
        </View>

        {/* Balance */}
        <Text style={styles.balanceLabel}>Your balance</Text>
        <Text style={styles.balance}>$ {data?.balance ?? 0}</Text>

        {/* Golden Card */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsRow}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setShowActions(!showActions)}
          >
            <View
              style={[
                styles.card,
                { backgroundColor: "#FFD700", width: 220, height: 140 },
              ]}
            >
              <Text style={[styles.cardTitle, { fontSize: 20 }]}>VISA</Text>
              <Text style={[styles.cardBalance, { fontSize: 26 }]}>
                $ {data?.balance ?? 0}
              </Text>
              <Text style={[styles.cardNumber, { fontSize: 16 }]}>
                •••• 4552
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Card Actions (Deposit, Withdraw, Transfer) */}
        {showActions && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionBtn} onPress={handleDeposit}>
              <Text style={styles.actionText}>Deposit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleWithdraw}>
              <Text style={styles.actionText}>Withdraw</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={handleTransfer}>
              <Text style={styles.actionText}>Transfer</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  scroll: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  balanceLabel: { color: "#aaa", fontSize: 14 },
  balance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardsRow: { flexDirection: "row", marginBottom: 20 },
  card: {
    borderRadius: 25,
    padding: 20,
    marginRight: 15,
    justifyContent: "center",
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardBalance: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  cardNumber: { fontSize: 14, color: "#333" },
  actionsContainer: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 15,
    marginTop: 15,
  },
  actionBtn: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 12,
    marginVertical: 5,
    alignItems: "center",
  },
  actionText: { fontSize: 16, fontWeight: "bold", color: "#000" },
  shortcuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
});
