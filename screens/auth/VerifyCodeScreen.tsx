import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "lucide-react-native";
import { supabase } from "../../lib/supabase";

export default function VerifyCodeScreen({ navigation, route }: any) {
  // Support both email and phone verification
  const email = route.params?.email;
  const phone = route.params?.phone;
  const isPhoneVerification = !!phone;
  const identifier = email || phone;

  const [code, setCode] = useState(["", "", "", "", "", ""]); // 6 digits
  const [timer, setTimer] = useState(30);
  const inputs = useRef<TextInput[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text && index < 5) {
      // Update to 5
      inputs.current[index + 1].focus();
    }

    // Auto submit if last digit is filled
    if (index === 5 && text) {
      // Update to 5
      // Optional: trigger verify automatically
    }
  };

  const handleBackspace = (text: string, index: number) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      // Update valid length
      Alert.alert("Error", "Please enter a valid 6-digit code");
      return;
    }

    const { data, error } = await supabase.auth.verifyOtp(
      isPhoneVerification
        ? {
            phone,
            token: otp,
            type: "sms",
          }
        : {
            email,
            token: otp,
            type: "email",
          }
    );

    if (error) {
      Alert.alert("Verification Failed", error.message);
    } else {
      // Verification successful!
      // App.tsx will automatically show ProfileSetup screen since profile is not complete
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    const { error } = isPhoneVerification
      ? await supabase.auth.signInWithOtp({ phone })
      : await supabase.auth.signInWithOtp({ email });

    if (error) {
      Alert.alert("Error", error.message);
    } else {
      setTimer(30);
      Alert.alert("Success", "Code sent again!");
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
          <Text style={styles.title}>Verify Account</Text>
          <Text style={styles.description}>
            We've sent a 6-digit code to {identifier}{" "}
            {isPhoneVerification ? "via SMS" : "via email"}. Please enter it to
            verify your account.{" "}
            <Text style={styles.link} onPress={() => navigation.goBack()}>
              Change {isPhoneVerification ? "Phone" : "Email"}
            </Text>
          </Text>

          <View style={styles.otpContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => {
                  if (ref) inputs.current[index] = ref;
                }}
                style={[styles.otpInput, digit ? styles.otpInputFilled : null]}
                maxLength={1}
                keyboardType="number-pad"
                value={digit}
                onChangeText={(text) => handleInputChange(text, index)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace") {
                    handleBackspace(digit, index);
                  }
                }}
              />
            ))}
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              Send the code again after 00:{timer < 10 ? `0${timer}` : timer}
            </Text>
            <TouchableOpacity onPress={handleResend} disabled={timer > 0}>
              <Text
                style={[styles.resendLink, timer > 0 && { color: "#A1A1AA" }]}
              >
                Send again
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleVerify}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
    marginBottom: 40,
  },
  link: {
    color: "#0e121b", // Or underline style if preferred from design
    textDecorationLine: "underline",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8, // Reduced gap for 6 items
    marginBottom: 30,
  },
  otpInput: {
    width: 45, // Reduced width for 6 items
    height: 50,
    borderWidth: 1,
    borderColor: "#E2E4E9",
    borderRadius: 12,
    textAlign: "center",
    fontSize: 20,
    color: "#34C786", // Green text when typing
    backgroundColor: "#fff",
  },
  otpInputFilled: {
    borderColor: "#34C786", // Green border when filled could be nice, or stick to provided design which looks like it stays simple
  },
  timerContainer: {
    alignItems: "center",
  },
  timerText: {
    color: "#525866",
    marginBottom: 5,
  },
  resendLink: {
    color: "#0e121b",
    textDecorationLine: "underline",
    fontWeight: "500",
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
