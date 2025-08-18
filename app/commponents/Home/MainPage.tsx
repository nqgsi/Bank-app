// MainPage.tsx
import { getToken } from "@/api/storage";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const MainPage = () => {
  const { data } = useQuery({
    queryKey: ["userData"],
    queryFn: getToken,
  });
  console.log("🚀 ~ MainPage ~ data:", data?.image);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={data?.image}
            style={{ borderRadius: "100%", width: 70, height: 70 }}
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
        <Text style={styles.balance}>$ 7,896</Text>

        {/* Cards Section */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.cardsRow}
        >
          <View style={[styles.card, { backgroundColor: "#d6f0f5" }]}>
            <Text style={styles.cardTitle}>VISA</Text>
            <Text style={styles.cardBalance}>$ 2,290</Text>
            <Text style={styles.cardNumber}>•••• 6767</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#FFD700" }]}>
            <Text style={styles.cardTitle}>VISA</Text>
            <Text style={styles.cardBalance}>$ 5,566</Text>
            <Text style={styles.cardNumber}>•••• 4552</Text>
          </View>
        </ScrollView>

        {/* Finance Shortcuts */}
        <View style={styles.shortcuts}>
          <View style={styles.shortcutItem}>
            <Ionicons name="star-outline" size={28} color="#FFD700" />
            <Text style={styles.shortcutText}>My favorite</Text>
          </View>
          <View style={styles.shortcutItem}>
            <Ionicons name="wallet-outline" size={28} color="#FFD700" />
            <Text style={styles.shortcutText}>My budget</Text>
          </View>
          <View style={styles.shortcutItem}>
            <Ionicons name="analytics-outline" size={28} color="#FFD700" />
            <Text style={styles.shortcutText}>Finance analysis</Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <Ionicons name="home-outline" size={24} color="#FFD700" />
        <Ionicons name="card-outline" size={24} color="#fff" />
        <Ionicons name="add-circle-outline" size={32} color="#fff" />
        <Ionicons name="notifications-outline" size={24} color="#fff" />
        <Ionicons name="person-outline" size={24} color="#fff" />
      </View>
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
  logoText: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  balanceLabel: { color: "#aaa", fontSize: 14 },
  balance: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  cardsRow: { flexDirection: "row", marginBottom: 20 },
  card: {
    width: 160,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "bold" },
  cardBalance: { fontSize: 20, fontWeight: "bold", marginVertical: 10 },
  cardNumber: { fontSize: 14, color: "#333" },
  shortcuts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  shortcutItem: {
    backgroundColor: "#111",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    width: 100,
  },
  shortcutText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 8,
    textAlign: "center",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#111",
    borderTopWidth: 2,
    borderTopColor: "#8000ff", // purple highlight line
  },
});
