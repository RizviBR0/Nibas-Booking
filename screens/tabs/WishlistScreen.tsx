import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function WishlistScreen() {
  const insets = useSafeAreaInsets();

  const wishlistItems = [
    {
      id: "1",
      title: "Bedroom",
      updated: "Today",
      images: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {/* Green Header Background */}
      <View style={[styles.greenHeader, { paddingTop: insets.top + 20 }]}>
        <View style={styles.headerContent}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity>
            <Text style={styles.editButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Card - Overlaps Header */}
      <View style={styles.contentCard}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 24, paddingBottom: 100 }}
        >
          <Text style={styles.screenTitle}>Wishlists</Text>

          {wishlistItems.map((item) => (
            <View key={item.id} style={styles.wishlistFolder}>
              <View style={styles.gridContainer}>
                {item.images.map((img, index) => (
                  <Image
                    key={index}
                    source={{ uri: img }}
                    style={styles.gridImage}
                  />
                ))}
              </View>
              <Text style={styles.folderTitle}>{item.title}</Text>
              <Text style={styles.folderSubtitle}>{item.updated}</Text>
            </View>
          ))}
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
    paddingHorizontal: 20,
    // paddingTop handled dynamically
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  editButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  contentCard: {
    flex: 1,
    marginTop: -80,
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
  wishlistFolder: {
    marginBottom: 24,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f0f0f0",
    padding: 4,
  },
  gridImage: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: "4%",
  },
  folderTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  folderSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
});
