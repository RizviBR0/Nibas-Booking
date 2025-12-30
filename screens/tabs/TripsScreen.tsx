import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function TripsScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Green Header Background */}
      <View style={[styles.greenHeader, { paddingTop: insets.top + 20 }]} />

      {/* Main Content Card */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
        >
          <Text style={styles.screenTitle}>Trips</Text>

          {/* Placeholder Box */}
          <View style={styles.placeholderBox} />

          {/* Empty State Text */}
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyTitle}>Build the perfect trip</Text>
            <Text style={styles.emptyDesc}>
              Explore homes, experiences, and services. When you book, your
              reservations will show up here.
            </Text>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Get started</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  greenHeader: {
    height: 180,
    backgroundColor: "#2B8761",
    justifyContent: "flex-start",
    // paddingTop handled dynamically
  },
  contentCard: {
    flex: 1,
    marginTop: -80, // Overlap
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
  },
  screenTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 24,
  },
  placeholderBox: {
    width: "100%",
    height: 200,
    backgroundColor: "#E5E7EB", // Gray placeholder
    borderRadius: 16,
    marginBottom: 32,
  },
  emptyStateContainer: {
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  emptyDesc: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: "#34D399",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
