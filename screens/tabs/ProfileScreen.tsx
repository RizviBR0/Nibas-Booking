import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "../../context/AuthContext";

export default function ProfileScreen() {
  const { signOut, user } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <Text style={{ marginBottom: 20 }}>User: {user?.email}</Text>
      <Button title="Sign Out" onPress={signOut} color="#FF385C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: { fontSize: 18, fontWeight: "500" },
});
