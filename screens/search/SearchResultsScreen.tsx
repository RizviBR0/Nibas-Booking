import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import {
  ArrowLeft,
  Heart,
  SlidersHorizontal,
  Star,
  BedDouble,
  Bath,
  Utensils,
  Tag,
} from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function SearchResultsScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const { location, guests } = route.params || {};
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  // Mock data to match the design EXACTLY for the demo
  const MOCK_RESULTS = [
    {
      id: "1",
      title: "Apartment in Mohammadpur",
      subtitle: "Basila, Mohammadpur",
      tagline: "Modern living | Prime Location",
      rating: 5.0,
      reviews: 35,
      price: 6000,
      nights: 3,
      beds: 1,
      baths: 1,
      kitchens: 1,
      images: [
        "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      isMostLoved: true,
    },
    {
      id: "2",
      title: "Luxury Suite in Gulshan",
      subtitle: "Gulshan 2, Dhaka",
      tagline: "Premium Views | City Center",
      rating: 4.8,
      reviews: 120,
      price: 15000,
      nights: 2,
      beds: 2,
      baths: 2,
      kitchens: 1,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      ],
      isMostLoved: true,
    },
  ];

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      setLoading(true);
      // Actual fetch implementation
      // const { data, error } = await supabase
      //   .from('listings')
      //   .select('*')
      //   .ilike('address', `%${location || ''}%`);

      // if (error) throw error;
      // if (data) setResults(data);

      // Using Mock for visual correctness as per user request
      setResults(MOCK_RESULTS);
    } catch (error) {
      console.log("Error fetching listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer, { paddingTop: insets.top + 20 }]}>
      <View style={styles.headerPill}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <ArrowLeft size={20} color="#000" />
        </TouchableOpacity>

        <View style={styles.headerInfo}>
          <Text style={styles.headerLocation}>
            {location || "Mohammadpur, Dhaka"}
          </Text>
          <Text style={styles.headerSubtext}>03-06 Sep, 2 guests</Text>
        </View>

        <TouchableOpacity style={styles.filterButton}>
          <SlidersHorizontal size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("ListingDetails", { listing: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.images[0] }} style={styles.cardImage} />
        {/* Helper Badge */}
        {item.isMostLoved && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Most loved</Text>
          </View>
        )}
        {/* Heart Icon */}
        <TouchableOpacity style={styles.heartButton}>
          <Heart size={24} color="#fff" />
        </TouchableOpacity>
        {/* Paginator Dots (Mock) */}
        <View style={styles.paginator}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>

      <View style={styles.cardContent}>
        <View style={styles.titleRow}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.ratingBox}>
            <Star
              size={14}
              color="#F59E0B"
              fill="#F59E0B"
              style={{ marginRight: 4 }}
            />
            <Text style={styles.ratingText}>
              {item.rating}({item.reviews})
            </Text>
          </View>
        </View>

        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <Text style={styles.tagline}>{item.tagline}</Text>

        <View style={styles.amenitiesRow}>
          <View style={styles.amenityItem}>
            <BedDouble size={16} color="#6B7280" />
            <Text style={styles.amenityText}>{item.beds} bed</Text>
          </View>
          <View style={styles.amenityItem}>
            <Bath size={16} color="#6B7280" />
            <Text style={styles.amenityText}>{item.baths} bath</Text>
          </View>
          <View style={styles.amenityItem}>
            <Utensils size={16} color="#6B7280" />
            <Text style={styles.amenityText}>{item.kitchens} kitchen</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            <Text
              style={{ textDecorationLine: "underline", fontWeight: "bold" }}
            >
              Tk{item.price}
            </Text>{" "}
            for {item.nights} nights
          </Text>
        </View>

        <Text style={styles.cancellation}>Free cancellation</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#2B8761" />
      {/* Search Header Background (Green top) */}
      <View style={styles.greenTop} />

      {renderHeader()}

      <View style={styles.contentContainer}>
        {/* Fees Tag */}
        <View style={styles.tagContainer}>
          <Tag
            size={16}
            color="#10B981"
            style={{ transform: [{ rotate: "90deg" }] }}
          />
          <Text style={styles.tagText}>Including all fees</Text>
        </View>

        <FlatList
          data={results}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFF6FF", // Light bg
  },
  greenTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 120, // Green header background height
    backgroundColor: "#2B8761",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContainer: {
    paddingTop: Platform.OS === "android" ? 40 : 60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 8,
    paddingHorizontal: 16,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  backButton: {
    padding: 4,
  },
  headerInfo: {
    flex: 1,
    alignItems: "center",
  },
  headerLocation: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtext: {
    fontSize: 12,
    color: "#6B7280",
  },
  filterButton: {
    padding: 4,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  tagContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 8,
  },
  tagText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  imageContainer: {
    height: 250,
    width: "100%",
    position: "relative",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  badge: {
    position: "absolute",
    top: 16,
    left: 16,
    backgroundColor: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#000",
  },
  heartButton: {
    position: "absolute",
    top: 16,
    right: 16,
  },
  paginator: {
    position: "absolute",
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "#fff",
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  cardContent: {
    padding: 16,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  ratingBox: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  tagline: {
    fontSize: 14,
    color: "#4B5563",
    marginBottom: 12,
  },
  amenitiesRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  amenityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  amenityText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#6B7280",
  },
  priceRow: {
    marginBottom: 4,
  },
  priceText: {
    fontSize: 16,
    color: "#000",
  },
  cancellation: {
    fontSize: 12,
    color: "#6B7280",
  },
});
