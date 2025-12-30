import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  Image,
  Platform,
} from "react-native";
import {
  Search,
  X,
  Bell,
  Navigation,
  Sun,
  Building,
  Plus,
  Minus,
  MapPin,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react-native";
import { useAuth } from "../../context/AuthContext";

const { width } = Dimensions.get("window");
const ProfileIconPng = require("../../assets/icons/profile_icon.png");

// Mock Data for Calendar Navigation
const CALENDAR_DATA = [
  { year: 2025, month: 8, name: "August 2025", startOffset: 4, days: 31 },
  { year: 2025, month: 9, name: "September 2025", startOffset: 0, days: 30 },
  { year: 2025, month: 10, name: "October 2025", startOffset: 2, days: 31 },
  { year: 2025, month: 11, name: "November 2025", startOffset: 5, days: 30 },
];

const generateMonthDays = (startDayOffset: number, daysInMonth: number) => {
  const days = [];
  // Empty slots for start offset
  for (let i = 0; i < startDayOffset; i++) {
    days.push(null);
  }
  // Days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  return days;
};

const WEEK_DAYS = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SearchModalScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  // State
  const [step, setStep] = useState<"where" | "when" | "who">("where");
  const [location, setLocation] = useState("");
  const [searchText, setSearchText] = useState("");

  // When Tab State
  const [dateTab, setDateTab] = useState<"Dates" | "Months" | "Flexible">(
    "Dates"
  );
  const [currentMonthIndex, setCurrentMonthIndex] = useState(0);
  const [monthCount, setMonthCount] = useState(1);
  const [activeFlexible, setActiveFlexible] = useState<
    "Weekend" | "Week" | "Month"
  >("Weekend");

  // Guest State
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const name = user?.user_metadata?.first_name || "Ashik Prottoy";

  const handleSelectLocation = (loc: string) => {
    setLocation(loc);
    setSearchText(loc);
    setStep("when");
  };

  const handleNext = () => {
    if (step === "when") setStep("who");
    else if (step === "who") {
      navigation.navigate("SearchResults", {
        location: location || "Mohammadpur, Dhaka",
        guests: guests,
      });
    }
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex > 0) setCurrentMonthIndex(currentMonthIndex - 1);
  };

  const handleNextMonth = () => {
    if (currentMonthIndex < CALENDAR_DATA.length - 1)
      setCurrentMonthIndex(currentMonthIndex + 1);
  };

  const updateGuest = (type: keyof typeof guests, increment: boolean) => {
    setGuests((prev) => {
      const newValue = increment ? prev[type] + 1 : prev[type] - 1;
      return { ...prev, [type]: Math.max(0, newValue) };
    });
  };

  const renderWhere = () => {
    const isExpanded = step === "where";

    if (!isExpanded) {
      return (
        <TouchableOpacity
          style={styles.collapsedCard}
          onPress={() => setStep("where")}
        >
          <Text style={styles.collapsedLabel}>Where</Text>
          <View style={styles.collapsedValueContainer}>
            {location ? (
              <>
                <MapPin size={16} color="#000" style={{ marginRight: 4 }} />
                <Text style={styles.collapsedValue}>{location}</Text>
              </>
            ) : (
              <Text style={styles.addBtnText}>Add destination</Text>
            )}
          </View>
        </TouchableOpacity>
      );
    }

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>I want to go</Text>

        <View style={styles.searchBox}>
          <Search size={20} color="#6B7280" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.input}
            placeholder="Search destinations"
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={false}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText("")}>
              <X size={20} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>

        <Text style={styles.suggestionTitle}>Suggested destination</Text>

        <TouchableOpacity
          style={styles.suggestionItem}
          onPress={() => handleSelectLocation("Nearby")}
        >
          <View style={[styles.iconBox, { backgroundColor: "#ECFDF5" }]}>
            <Navigation size={24} color="#10B981" fill="#ECFDF5" />
          </View>
          <View>
            <Text style={styles.suggestionName}>Nearby</Text>
            <Text style={styles.suggestionDesc}>Find what's Around you</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.suggestionItem}
          onPress={() => handleSelectLocation("Cox's Bazar")}
        >
          <View style={[styles.iconBox, { backgroundColor: "#FFF7ED" }]}>
            <Sun size={24} color="#F97316" />
          </View>
          <View>
            <Text style={styles.suggestionName}>Cox's Bazar</Text>
            <Text style={styles.suggestionDesc}>
              Great for a weekend getway
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.suggestionItem}
          onPress={() => handleSelectLocation("Dhaka")}
        >
          <View style={[styles.iconBox, { backgroundColor: "#EFF6FF" }]}>
            <Building size={24} color="#3B82F6" />
          </View>
          <View>
            <Text style={styles.suggestionName}>Dhaka</Text>
            <Text style={styles.suggestionDesc}>
              Great for an official and business meeting
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const renderWhen = () => {
    const isExpanded = step === "when";

    if (!isExpanded) {
      return (
        <TouchableOpacity
          style={styles.collapsedCard}
          onPress={() => setStep("when")}
        >
          <Text style={styles.collapsedLabel}>When</Text>
          <View style={styles.addBtn}>
            <CalendarIcon size={16} color="#000" style={{ marginRight: 8 }} />
            <Text style={styles.addBtnText}>03 Sep - 06 Sep</Text>
          </View>
        </TouchableOpacity>
      );
    }

    const currentMonth = CALENDAR_DATA[currentMonthIndex];

    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>When</Text>

        {/* Tab Switcher */}
        <View style={styles.tabContainer}>
          {["Dates", "Months", "Flexible"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                dateTab === tab && styles.activeTabButton,
              ]}
              onPress={() => setDateTab(tab as any)}
            >
              <Text
                style={[
                  styles.tabText,
                  dateTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dates Tab: Single Month Navigation */}
        {dateTab === "Dates" && (
          <View>
            {/* Month Navigation Header */}
            <View style={styles.monthNavHeader}>
              <TouchableOpacity
                onPress={handlePrevMonth}
                disabled={currentMonthIndex === 0}
              >
                <ChevronLeft
                  size={24}
                  color={currentMonthIndex === 0 ? "#E5E7EB" : "#000"}
                />
              </TouchableOpacity>
              <Text style={styles.monthTitle}>{currentMonth.name}</Text>
              <TouchableOpacity
                onPress={handleNextMonth}
                disabled={currentMonthIndex === CALENDAR_DATA.length - 1}
              >
                <ChevronRight
                  size={24}
                  color={
                    currentMonthIndex === CALENDAR_DATA.length - 1
                      ? "#E5E7EB"
                      : "#000"
                  }
                />
              </TouchableOpacity>
            </View>

            {/* Day Grid */}
            <View style={styles.weekHeader}>
              {WEEK_DAYS.map((d) => (
                <Text key={d} style={styles.weekDayText}>
                  {d}
                </Text>
              ))}
            </View>
            <View style={styles.daysGrid}>
              {generateMonthDays(
                currentMonth.startOffset,
                currentMonth.days
              ).map((day, i) => (
                <View key={i} style={styles.dayCell}>
                  {day !== null ? (
                    <>
                      {/* Backgrounds */}
                      {currentMonth.month === 8 && day === 3 && (
                        <View style={styles.selectedDayBg} />
                      )}
                      {currentMonth.month === 9 && day >= 3 && day <= 6 && (
                        <View style={styles.selectedRangeBg} />
                      )}

                      {/* Single Text with Conditional Styles */}
                      <Text
                        style={[
                          styles.dayText,
                          currentMonth.month === 8 &&
                            day === 3 &&
                            styles.selectedDayText,
                          currentMonth.month === 9 &&
                            day >= 3 &&
                            day <= 6 &&
                            styles.selectedRangeText,
                        ]}
                      >
                        {day}
                      </Text>
                    </>
                  ) : null}
                </View>
              ))}
            </View>
          </View>
        )}

        {dateTab === "Months" && (
          <View style={{ paddingTop: 20 }}>
            <View style={styles.monthRow}>
              <Text style={styles.rowLabelLarge}>Month(s)</Text>
              <View style={styles.stepper}>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setMonthCount(Math.max(1, monthCount - 1))}
                >
                  <Minus size={20} color="#6B7280" />
                </TouchableOpacity>
                <Text style={styles.stepperValue}>{monthCount}</Text>
                <TouchableOpacity
                  style={styles.stepperBtn}
                  onPress={() => setMonthCount(monthCount + 1)}
                >
                  <Plus size={20} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.monthInfoRow}>
              <Text style={styles.rowLabel}>Day one</Text>
              <Text style={styles.rowValueUnderline}>Mon, Sep 01</Text>
            </View>
            <View style={styles.monthInfoRow}>
              <Text style={styles.rowLabel}>Last day</Text>
              <Text style={styles.rowValueUnderline}>Wed, Oct 01</Text>
            </View>
          </View>
        )}

        {dateTab === "Flexible" && (
          <View style={{ paddingTop: 20 }}>
            <Text style={styles.subLabel}>Stay time</Text>
            <View
              style={[
                styles.tabContainer,
                {
                  marginBottom: 24,
                  padding: 0,
                  backgroundColor: "transparent",
                },
              ]}
            >
              {["Weekend", "Week", "Month"].map((opt) => (
                <TouchableOpacity
                  key={opt}
                  style={[
                    styles.flexOptionBtn,
                    activeFlexible === opt && styles.activeFlexOption,
                  ]}
                  onPress={() => setActiveFlexible(opt as any)}
                >
                  <Text
                    style={[
                      styles.flexOptionText,
                      activeFlexible === opt && styles.activeFlexOptionText,
                    ]}
                  >
                    {opt}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.subLabel}>I'm Flexible</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: -20, paddingHorizontal: 20 }}
            >
              {["September", "October", "November", "December"].map((m, i) => (
                <View key={m} style={styles.flexibleMonthCard}>
                  <CalendarIcon
                    size={24}
                    color="#6B7280"
                    style={{ marginBottom: 8 }}
                  />
                  <Text style={styles.flexMonthName}>{m}</Text>
                  <Text style={styles.flexYear}>2025</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  const renderWho = () => {
    const isExpanded = step === "who";

    if (!isExpanded) {
      return (
        <TouchableOpacity
          style={styles.collapsedCard}
          onPress={() => setStep("who")}
        >
          <Text style={styles.collapsedLabel}>Who</Text>
          <View style={styles.addBtn}>
            <Plus size={16} color="#000" style={{ marginRight: 4 }} />
            <Text style={styles.addBtnText}>Add guests</Text>
          </View>
        </TouchableOpacity>
      );
    }

    // Expanded Who
    return (
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Who</Text>

        {/* Adults */}
        <View style={styles.guestRow}>
          <View>
            <Text style={styles.guestLabel}>Adults</Text>
            <Text style={styles.guestSubLabel}>Ages 13 or above</Text>
          </View>
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => updateGuest("adults", false)}
              style={styles.stepperBtn}
            >
              <Minus size={20} color={guests.adults > 0 ? "#000" : "#E5E7EB"} />
            </TouchableOpacity>
            <Text style={styles.stepValue}>{guests.adults}</Text>
            <TouchableOpacity
              onPress={() => updateGuest("adults", true)}
              style={styles.stepperBtn}
            >
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Children */}
        <View style={styles.guestRow}>
          <View>
            <Text style={styles.guestLabel}>Children</Text>
            <Text style={styles.guestSubLabel}>Ages 2-12</Text>
          </View>
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => updateGuest("children", false)}
              style={styles.stepperBtn}
            >
              <Minus
                size={20}
                color={guests.children > 0 ? "#000" : "#E5E7EB"}
              />
            </TouchableOpacity>
            <Text style={styles.stepValue}>{guests.children}</Text>
            <TouchableOpacity
              onPress={() => updateGuest("children", true)}
              style={styles.stepperBtn}
            >
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Infants */}
        <View style={styles.guestRow}>
          <View>
            <Text style={styles.guestLabel}>Infants</Text>
            <Text style={styles.guestSubLabel}>Under 2</Text>
          </View>
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => updateGuest("infants", false)}
              style={styles.stepperBtn}
            >
              <Minus
                size={20}
                color={guests.infants > 0 ? "#000" : "#E5E7EB"}
              />
            </TouchableOpacity>
            <Text style={styles.stepValue}>{guests.infants}</Text>
            <TouchableOpacity
              onPress={() => updateGuest("infants", true)}
              style={styles.stepperBtn}
            >
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Pets */}
        <View style={styles.guestRow}>
          <View>
            <Text style={styles.guestLabel}>Pets</Text>
            <Text style={[styles.guestSubLabel, styles.underlined]}>
              Bringing a pet?
            </Text>
          </View>
          <View style={styles.stepperContainer}>
            <TouchableOpacity
              onPress={() => updateGuest("pets", false)}
              style={styles.stepperBtn}
            >
              <Minus size={20} color={guests.pets > 0 ? "#000" : "#E5E7EB"} />
            </TouchableOpacity>
            <Text style={styles.stepValue}>{guests.pets}</Text>
            <TouchableOpacity
              onPress={() => updateGuest("pets", true)}
              style={styles.stepperBtn}
            >
              <Plus size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <View style={styles.curveBackground} />

      <View
        style={[styles.headerContentContainer, { paddingTop: insets.top + 20 }]}
      >
        <View style={styles.userInfo}>
          <Image source={ProfileIconPng} style={styles.avatar} />
          <View>
            <Text style={styles.welcomeText}>Welcome to Nibas,</Text>
            <Text style={styles.userName}>{name}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Bell size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.scrollWrapper}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {renderWhere()}
          {renderWhen()}
          {renderWho()}

          {step !== "where" && (
            <TouchableOpacity style={styles.searchButton} onPress={handleNext}>
              {step === "who" && (
                <Search size={20} color="#fff" style={{ marginRight: 8 }} />
              )}
              <Text style={styles.searchButtonText}>
                {step === "who" ? "Search" : "Next"}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.clearButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.clearButtonText}>Clear all</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  curveBackground: {
    position: "absolute",
    top: 0,
    left: -(width * 0.25),
    width: width * 1.5,
    height: 220,
    backgroundColor: "#2B8761",
    borderBottomLeftRadius: width,
    borderBottomRightRadius: width,
    zIndex: 0,
  },
  headerContentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingTop: Platform.OS === "android" ? 60 : 80,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#fff",
  },
  welcomeText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
  },
  userName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  notificationButton: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  scrollWrapper: {
    flex: 1,
    zIndex: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 140,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12, // Reduced radius slightly to match compact height
    paddingHorizontal: 16,
    paddingVertical: 8, // Significantly reduced padding
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  suggestionTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
    marginBottom: 16,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 2,
  },
  suggestionDesc: {
    fontSize: 12,
    color: "#6B7280",
  },
  collapsedCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  collapsedLabel: {
    fontSize: 16,
    color: "#6B7280",
  },
  collapsedValueContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  collapsedValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
  },
  addBtnText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  searchButton: {
    backgroundColor: "#34D399",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    shadowColor: "#34D399",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  clearButton: {
    marginTop: 16,
    alignItems: "center",
    paddingBottom: 20,
  },
  clearButtonText: {
    color: "#4B5563",
    fontSize: 14,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    padding: 4,
    marginBottom: 24,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 16,
  },
  activeTabButton: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
  },
  activeTabText: {
    color: "#000",
    fontWeight: "600",
  },
  // Calendar Navigation
  monthNavHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  weekDayText: {
    width: width / 9,
    textAlign: "center",
    fontSize: 12,
    color: "#9CA3AF",
  },
  daysGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  dayCell: {
    width: width / 9,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  dayText: {
    fontSize: 14,
    color: "#000",
  },
  selectedDayBg: {
    position: "absolute",
    width: 32,
    height: 32,
    backgroundColor: "#000",
    borderRadius: 16,
    zIndex: -1,
  },
  selectedDayText: {
    color: "#fff",
  },
  selectedRangeBg: {
    position: "absolute",
    width: "100%",
    height: 32,
    backgroundColor: "#34D399",
    borderRadius: 16,
    zIndex: -1,
  },
  selectedRangeText: {
    color: "#fff",
  },
  monthRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 32,
  },
  rowLabelLarge: {
    fontSize: 16,
    color: "#000",
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 4,
  },
  stepperBtn: {
    padding: 8,
  },
  stepperValue: {
    fontSize: 16,
    fontWeight: "600",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
  monthInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  rowLabel: {
    fontSize: 16,
    color: "#4B5563",
  },
  rowValueUnderline: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textDecorationLine: "underline",
  },
  subLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 16,
  },
  flexOptionBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  activeFlexOption: {
    borderColor: "#000",
    borderWidth: 2,
  },
  flexOptionText: {
    fontSize: 14,
    color: "#000",
  },
  activeFlexOptionText: {
    fontWeight: "bold",
  },
  flexibleMonthCard: {
    width: 100,
    height: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  flexMonthName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  flexYear: {
    fontSize: 12,
    color: "#6B7280",
  },
  // Guest Row Styles
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  guestLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 4,
  },
  guestSubLabel: {
    fontSize: 14,
    color: "#6B7280",
  },
  underlined: {
    textDecorationLine: "underline",
  },
  stepperContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 4,
  },
  stepBtn: {
    padding: 8,
  },
  stepValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: "center",
  },
});
