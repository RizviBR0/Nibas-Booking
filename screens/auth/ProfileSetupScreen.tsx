import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { ArrowLeft } from "lucide-react-native";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

export default function ProfileSetupScreen({ navigation }: any) {
  const { refreshUser } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!firstName.trim()) {
      Alert.alert("Error", "Please enter your first name");
      return;
    }
    if (!lastName.trim()) {
      Alert.alert("Error", "Please enter your last name");
      return;
    }

    setLoading(true);

    try {
      // Get the current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        Alert.alert("Error", "User not found. Please try logging in again.");
        setLoading(false);
        return;
      }

      // Update the user's metadata with their name
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          full_name: `${firstName.trim()} ${lastName.trim()}`,
        },
      });

      if (updateError) {
        Alert.alert("Error", updateError.message);
        setLoading(false);
        return;
      }

      // Optionally, also store in a profiles table if you have one
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        updated_at: new Date().toISOString(),
      });

      if (profileError) {
        // If profiles table doesn't exist, just log the error but continue
        console.log("Profile update note:", profileError.message);
      }

      setLoading(false);

      // Refresh user data in AuthContext to trigger navigation to MainTabs
      await refreshUser();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="#0e121b" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Tell About Yourself</Text>
          <Text style={styles.subtitle}>Takes less than 20 seconds.</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="ex. Ashik"
              placeholderTextColor="#A1A1AA"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="ex. Prottoy"
              placeholderTextColor="#A1A1AA"
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.continueButton,
              (!firstName.trim() || !lastName.trim()) &&
                styles.continueButtonDisabled,
            ]}
            onPress={handleContinue}
            disabled={loading || !firstName.trim() || !lastName.trim()}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "Saving..." : "Continue"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  backButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#525866",
    lineHeight: 20,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: "#0e121b",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E2E4E9",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0e121b",
    backgroundColor: "#fff",
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: "#F2F4F7",
  },
  continueButton: {
    backgroundColor: "#34C786",
    borderRadius: 12,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  continueButtonDisabled: {
    backgroundColor: "#34C786",
    opacity: 0.6,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
