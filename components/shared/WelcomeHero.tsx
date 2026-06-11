import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "./ThemeProvider";

export const WelcomeHero = () => {
  const { theme, fontScale } = useTheme();
  const colors = theme; //getTheme(theme === 'dark');

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.card,
          borderColor: colors.cardBorder,
          shadowColor: colors.shadow,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.textContent}>
          <Text
            style={[
              styles.title,
              { color: colors.textPrimary },
              { fontSize: styles.title.fontSize * fontScale },
            ]}
          >
            Welcome To Check Your Health!
          </Text>
          <Text
            style={[
              styles.subtitle,
              { color: colors.textSecondary },
              { fontSize: styles.subtitle.fontSize * fontScale },
            ]}
          >
            Please select a form below to check your health status.
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: colors.blue100,
              borderColor: colors.blue50,
              shadowColor: colors.shadow,
            },
          ]}
        >
          <MaterialIcons name="edit-note" size={56} color={colors.primary} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 32,
    padding: 24,
    marginBottom: 32,
    borderWidth: 1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  textContent: {
    flex: 1,
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
});
