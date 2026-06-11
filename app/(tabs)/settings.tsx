import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

import { TextSizeSlider } from "@/components/settings/TextSizeSlider";
import { ThemeSelector } from "@/components/settings/ThemeSelector";
import { SettingsItem } from "@/components/settings/SettingsItem";
import { useTheme } from "@/components/shared/ThemeProvider";

export default function SettingsScreen() {
  const router = useRouter();
  const { themeMode, setThemeMode, textSize, setTextSize, theme, isDark } =
    useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor: theme.background,
            borderBottomColor: theme.cardBorder,
          },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={20}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
          Settings
        </Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Text Size Section */}
        <TextSizeSlider value={textSize} onValueChange={setTextSize} />

        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

        {/* Appearance Section */}
        <ThemeSelector
          currentTheme={themeMode as any}
          onSelectTheme={(t) => setThemeMode(t as any)}
        />

        <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

        {/* General Section */}
        <View
          style={[styles.generalSection, { backgroundColor: theme.background }]}
        >
          <View
            style={[
              styles.card,
              {
                backgroundColor: theme.background,
                borderColor: theme.cardBorder,
              },
            ]}
          >
            <SettingsItem
              icon="policy"
              label="Privacy Policy"
              onPress={() => {}}
            />
            <SettingsItem
              icon="info"
              label="Version"
              value="1.0.2"
              showChevron={false}
              isLast={true}
            />
          </View>
        </View>

        <View style={styles.footerSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f6f7f8",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    flex: 1,
    textAlign: "center",
    marginRight: 48, // Balance the back button
  },
  placeholder: {
    width: 48,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 24,
    marginVertical: 8,
  },
  generalSection: {
    paddingHorizontal: 24,
    marginTop: 8,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  footerSpacing: {
    height: 40,
  },
});
