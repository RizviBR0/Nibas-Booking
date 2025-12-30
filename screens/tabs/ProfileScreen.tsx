import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useAuth } from "../../context/AuthContext";
import {
  Settings,
  ChevronRight,
  User,
  LogOut,
  CreditCard,
  Bell,
  Shield,
} from "lucide-react-native";

const ProfileIconPng = require("../../assets/icons/profile_icon.png");

export default function ProfileScreen() {
  const { signOut, user } = useAuth();

  const fullName = user?.user_metadata?.full_name || "User";
  const email = user?.email || "";

  const menuItems = [
    { icon: User, label: "Personal Information" },
    { icon: CreditCard, label: "Payments and Payouts" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Login & Security" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Image source={ProfileIconPng} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{fullName}</Text>
            <Text style={styles.userEmail}>{email}</Text>
            <TouchableOpacity style={styles.viewProfileBtn}>
              <Text style={styles.viewProfileText}>Show Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <Text style={styles.menuTitle}>Account Settings</Text>
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <TouchableOpacity key={index} style={styles.menuItem}>
                <View style={styles.menuItemLeft}>
                  <Icon size={24} color="#4B5563" />
                  <Text style={styles.menuItemLabel}>{item.label}</Text>
                </View>
                <ChevronRight size={20} color="#9CA3AF" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Sign Out Button */}
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <LogOut size={20} color="#EF4444" />
          <Text style={styles.signOutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    marginTop: 20,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 20,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  userEmail: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  viewProfileBtn: {
    marginTop: 8,
  },
  viewProfileText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    textDecorationLine: "underline",
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginVertical: 30,
    marginHorizontal: 24,
  },
  menuContainer: {
    paddingHorizontal: 24,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#000",
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemLabel: {
    fontSize: 16,
    color: "#374151",
    marginLeft: 16,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    paddingVertical: 15,
    marginHorizontal: 24,
    backgroundColor: "#FEE2E2",
    borderRadius: 12,
  },
  signOutText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#EF4444",
  },
});
