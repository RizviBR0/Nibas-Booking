import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Search, Heart, Map, MessageSquare, User } from "lucide-react-native";
import ExploreScreen from "../screens/tabs/ExploreScreen";
import WishlistScreen from "../screens/tabs/WishlistScreen";
import TripsScreen from "../screens/tabs/TripsScreen";
import MessagesScreen from "../screens/tabs/MessagesScreen";
import ProfileScreen from "../screens/tabs/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF385C",
        tabBarInactiveTintColor: "gray",
      }}
    >
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Search color={color} size={size} />,
          tabBarLabel: "Explore",
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Heart color={color} size={size} />,
          tabBarLabel: "Wishlist",
        }}
      />
      <Tab.Screen
        name="Trips"
        component={TripsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Map color={color} size={size} />,
          tabBarLabel: "Trips",
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MessageSquare color={color} size={size} />
          ),
          tabBarLabel: "Messages",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
          tabBarLabel: "Profile",
        }}
      />
    </Tab.Navigator>
  );
}
