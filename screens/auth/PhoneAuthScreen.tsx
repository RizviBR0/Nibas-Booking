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
import { ArrowLeft, X } from "lucide-react-native";
import { supabase } from "../../lib/supabase";

export default function PhoneAuthScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleContinue = async () => {
    if (!phoneNumber || phoneNumber.length < 6) {
      Alert.alert("Error", "Please enter a valid phone number");
      return;
    }

    const fullPhoneNumber = `+880${phoneNumber.replace(/\s/g, "")}`;

    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({
      phone: fullPhoneNumber,
      options: {
        shouldCreateUser: true,
      },
    });

    setLoading(false);

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      navigation.navigate("VerifyCode", { phone: fullPhoneNumber });
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
            style={styles.closeButton}
          >
            <X size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Let's Get Started</Text>
          <Text style={styles.description}>
            Enter your phone number and receive a verification code to login or
            register your Nibas Account.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputRow}>
              <View style={styles.countryPicker}>
                <View style={styles.flagPlaceholder}>
                  <Text style={{ fontSize: 18 }}>🇧🇩</Text>
                </View>
                <Text style={styles.countryCode}>+880</Text>
              </View>

              <TextInput
                style={styles.phoneInput}
                placeholder="000 000 0000"
                placeholderTextColor="#A1A1AA"
                keyboardType="phone-pad"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleContinue}
            disabled={loading}
          >
            <Text style={styles.continueButtonText}>
              {loading ? "Sending..." : "Continue"}
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
  closeButton: {
    padding: 5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0e121b",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#525866",
    lineHeight: 20,
    marginBottom: 30,
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
  inputRow: {
    flexDirection: "row",
    height: 50,
  },
  countryPicker: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E4E9",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    minWidth: 80, // Reduced from 100 since no arrow
    justifyContent: "center",
    backgroundColor: "#F9FAFB", // Slight bg to show it's read-only/static
  },
  flagPlaceholder: {
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  countryCode: {
    fontSize: 14,
    color: "#0e121b",
    fontWeight: "500",
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E2E4E9",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: "#0e121b",
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
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
