import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import ExploreScreen from "../screens/tabs/ExploreScreen";
import WishlistScreen from "../screens/tabs/WishlistScreen";
import TripsScreen from "../screens/tabs/TripsScreen";
import MessagesScreen from "../screens/tabs/MessagesScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";

// Import SVG Icons
import ExploreIcon from "../assets/icons/explore_icon.svg";
import WishlistIcon from "../assets/icons/wishlist_icon.svg";
import TripsIcon from "../assets/icons/trips_icon.svg";
import ChatIcon from "../assets/icons/chat_icon.svg";
const ProfileIconPng = require("../assets/icons/profile_icon.png");

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#2B8761", // Greenish color from design (Explore text color looks green)
        tabBarInactiveTintColor: "#9CA3AF", // Gray
        tabBarStyle: {
          height: 80, // Taller tab bar
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ExploreIcon width={24} height={24} color={color} />
          ),
          tabBarLabel: "Explore",
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <WishlistIcon width={24} height={24} color={color} />
          ),
          tabBarLabel: "Wishlist",
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TripsIcon width={24} height={24} color={color} />
          ),
          tabBarLabel: "Trips",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <ChatIcon width={24} height={24} color={color} />
          ),
          tabBarLabel: "Chat",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={ProfileIconPng}
              style={{ width: 24, height: 24, borderRadius: 12 }}
            />
          ),
          tabBarLabel: "Me",
        }}
      />
    </Tab.Navigator>
  );
}
