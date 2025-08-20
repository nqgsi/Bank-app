import { getTransaction } from "@/api/auth";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const TransactionScreen = () => {
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);
  const [fromDate, setFromDate] = useState(new Date("2024-05-01"));
  const [toDate, setToDate] = useState(new Date("2025-12-31"));
  const [filterType, setFilterType] = useState("All");
  const [searchAmount, setSearchAmount] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransaction,
  });

  if (isLoading) return <Text style={{ color: "white" }}>Loading...</Text>;
  if (isError)
    return <Text style={{ color: "white" }}>Error loading data.</Text>;

  // API returns an array directly not the object
  const transactions = data || [];

  //  Filter transactions
  const filteredTransactions = transactions.filter((t: any) => {
    const tDate = new Date(t.createdAt);
    const inDateRange = tDate >= fromDate && tDate <= toDate;
    const typeMatch =
      filterType === "All" || t.type.toLowerCase() === filterType.toLowerCase();
    const amountMatch =
      searchAmount === "" || t.amount.toString().includes(searchAmount);
    return inDateRange && typeMatch && amountMatch;
  });

  //  Render each transaction
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.transactionCard}>
      <Text
        style={[
          styles.amount,
          { color: item.type === "deposit" ? "#4CAF50" : "#FF4C4C" },
        ]}
      >
        {item.type === "deposit" ? `+ ${item.amount}` : `- ${item.amount}`}
      </Text>
      <Text style={styles.date}>
        {new Date(item.createdAt).toLocaleDateString()}
      </Text>
      <Text style={styles.type}>{item.type}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
          <Text style={styles.pageTitle}>Transactions</Text>

          {/* Search by Amount */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search by amount..."
            placeholderTextColor="#888"
            keyboardType="numeric"
            value={searchAmount}
            onChangeText={setSearchAmount}
          />

          {/* Filter Buttons */}
          <View style={styles.filterContainer}>
            {["All", "Deposit", "Withdraw", "Transfer"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterBtn,
                  filterType === type && styles.activeFilterBtn,
                ]}
                onPress={() => setFilterType(type)}
              >
                <Text
                  style={[
                    styles.filterText,
                    filterType === type && styles.activeFilterText,
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Range */}
          <View style={styles.dateContainer}>
            <TouchableOpacity onPress={() => setShowFromPicker(true)}>
              <Text style={styles.dateText}>
                From: {fromDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowToPicker(true)}>
              <Text style={styles.dateText}>
                To: {toDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showFromPicker && (
            <DateTimePicker
              value={fromDate}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowFromPicker(false);
                if (date) setFromDate(date);
              }}
            />
          )}
          {showToPicker && (
            <DateTimePicker
              value={toDate}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setShowToPicker(false);
                if (date) setToDate(date);
              }}
            />
          )}

          {/* Transactions List */}
          {filteredTransactions.length > 0 ? (
            <FlatList
              data={filteredTransactions}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={{ marginTop: 20 }}
            />
          ) : (
            <Text style={{ color: "white", marginTop: 20 }}>
              No transactions found.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TransactionScreen;

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",
  },
  container: {
    width: "100%",
    alignItems: "center",
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
    textAlign: "center",
  },
  searchInput: {
    backgroundColor: "#1A1A1A",
    color: "white",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    width: "100%",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 15,
    justifyContent: "center",
  },
  filterBtn: {
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 15,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  filterText: {
    color: "#FFD700",
    fontSize: 14,
  },
  activeFilterBtn: {
    backgroundColor: "#FFD700",
  },
  activeFilterText: {
    color: "#000",
    fontWeight: "bold",
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 15,
  },
  dateText: {
    color: "#FFD700",
    fontSize: 14,
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  transactionCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#1A1A1A",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    width: "100%",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    width: "30%",
  },
  date: {
    color: "#bbb",
    fontSize: 14,
    width: "30%",
    textAlign: "center",
  },
  type: {
    color: "#FFD700",
    fontSize: 16,
    fontWeight: "600",
    width: "30%",
    textAlign: "right",
  },
});
