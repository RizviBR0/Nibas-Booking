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
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import { ChevronDown, ArrowLeft, X, Search } from "lucide-react-native";
import { countryList, Country } from "../../lib/countries";

export default function PhoneAuthScreen({ navigation }: any) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryList.find((c) => c.code === "BD") || countryList[0]
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = countryList.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial_code.includes(searchQuery)
  );

  const renderCountryItem = ({ item }: { item: Country }) => (
    <TouchableOpacity
      style={styles.countryItem}
      onPress={() => {
        setSelectedCountry(item);
        setModalVisible(false);
      }}
    >
      <Text style={styles.countryItemFlag}>{item.flag}</Text>
      <Text style={styles.countryItemName}>{item.name}</Text>
      <Text style={styles.countryItemCode}>{item.dial_code}</Text>
    </TouchableOpacity>
  );

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
              <TouchableOpacity
                style={styles.countryPicker}
                onPress={() => setModalVisible(true)}
              >
                <View style={styles.flagPlaceholder}>
                  <Text style={{ fontSize: 18 }}>{selectedCountry.flag}</Text>
                </View>
                <Text style={styles.countryCode}>
                  {selectedCountry.dial_code}
                </Text>
                <ChevronDown
                  size={16}
                  color="#0e121b"
                  style={{ marginLeft: 4 }}
                />
              </TouchableOpacity>

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
            onPress={() => {
              /* Handle Continue */
            }}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <ArrowLeft size={24} color="#0e121b" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Country</Text>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.searchContainer}>
            <Search size={20} color="#667085" style={{ marginRight: 10 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search country"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <FlatList
            data={filteredCountries}
            renderItem={renderCountryItem}
            keyExtractor={(item) => item.code}
            style={styles.list}
          />
        </SafeAreaView>
      </Modal>
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
    minWidth: 100,
    justifyContent: "space-between",
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
  // Modal Styles
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F4F7",
    margin: 16,
    paddingHorizontal: 16,
    height: 44,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  countryItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F4F7",
  },
  countryItemFlag: {
    fontSize: 24,
    marginRight: 16,
  },
  countryItemName: {
    flex: 1,
    fontSize: 16,
    color: "#0e121b",
  },
  countryItemCode: {
    fontSize: 16,
    color: "#525866",
  },
});
