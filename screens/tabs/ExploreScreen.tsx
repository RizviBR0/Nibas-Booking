import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { ChevronRight, Heart } from "lucide-react-native";

// Import SVG Icons
import SearchIcon from "../../assets/icons/search_icon.svg";
import HouseIcon from "../../assets/icons/house_icon.svg";
import RoomIcon from "../../assets/icons/room_icon.svg";
import HotelIcon from "../../assets/icons/hotel_icon.svg";

const { width } = Dimensions.get("window");

// Mock Data
const QUICK_PICKS = [
  "https://images.unsplash.com/photo-1616594039964-40891a921c2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1522771753035-4a53c6218159?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
];

const POPULAR_HOMES = [
  {
    id: "1",
    title: "Apartment in Center City",
    price: "200 BDT for 2 night",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    title: "Cozy Studio near Park",
    price: "150 BDT for 1 night",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Modern Loft",
    price: "400 BDT for 2 night",
    image:
      "https://images.unsplash.com/photo-1502005229766-52835791e80e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

const BEST_MATCH = [
  {
    id: "10",
    title: "Luxury King Suite",
    price: "200 BDT for 2 night",
    image:
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "11",
    title: "Spacious Family Home",
    price: "350 BDT for 2 night",
    image:
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
];

export default function ExploreScreen({ navigation }: any) {
  const [activeCategory, setActiveCategory] = useState("House");

  const categories = [
    { name: "House", icon: HouseIcon },
    { name: "Room", icon: RoomIcon },
    { name: "Hotel", icon: HotelIcon },
  ];

  const renderQuickPick = ({ item }: { item: string }) => (
    <View style={styles.quickPickItem}>
      <Image source={{ uri: item }} style={styles.quickPickImage} />
    </View>
  );

  const renderListingCard = ({ item }: { item: (typeof POPULAR_HOMES)[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ListingDetails", { listing: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Heart size={16} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Search Header */}
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <SearchIcon width={20} height={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search destinations"
              placeholderTextColor="#9CA3AF"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.name;
            return (
              <TouchableOpacity
                key={cat.name}
                style={styles.categoryItem}
                onPress={() => setActiveCategory(cat.name)}
              >
                <Icon width={32} height={32} />
                <Text style={styles.categoryText}>{cat.name}</Text>
                {isActive && <View style={styles.activeIndicator} />}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Quick Picks */}
        <View style={styles.section}>
          <View style={styles.standaloneSectionHeader}>
            <Text style={styles.sectionTitle}>Quick picks</Text>
          </View>
          <FlatList
            data={QUICK_PICKS}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderQuickPick}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Popular Homes */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular homes in Dhaka</Text>
            <ChevronRight size={20} color="#000" />
          </TouchableOpacity>
          <FlatList
            data={POPULAR_HOMES}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderListingCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
          />
        </View>

        {/* Best match for you */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Best match for you</Text>
            <ChevronRight size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.sectionSubtitle}>
            King bed. Air conditioning. Ceiling fan. Clothing storage.
            Essentials. Extra pillows and blankets.
          </Text>
          <FlatList
            data={BEST_MATCH}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={renderListingCard}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.horizontalList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#000",
  },
  categoriesContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  categoryItem: {
    alignItems: "center",
    paddingVertical: 10,
    width: 80,
  },
  categoryText: {
    fontSize: 12,
    marginTop: 5,
    color: "#000",
    fontWeight: "500",
  },
  activeIndicator: {
    position: "absolute",
    bottom: 0,
    width: 40,
    height: 3,
    backgroundColor: "#000",
    borderRadius: 2,
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  standaloneSectionHeader: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: "#6B7280",
    paddingHorizontal: 20,
    marginBottom: 15,
    lineHeight: 18,
  },
  horizontalList: {
    paddingHorizontal: 15, // Gap at start
  },
  quickPickItem: {
    marginHorizontal: 5,
    borderRadius: 35, // Circular
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#fff",
    // Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quickPickImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  card: {
    width: 280, // Fixed width for cards
    marginHorizontal: 5,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 5, // For shadow visibility
  },
  imageContainer: {
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: 180,
    borderRadius: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: 6,
    borderRadius: 20,
  },
  cardContent: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  cardPrice: {
    fontSize: 14,
    color: "#6B7280",
  },
});
