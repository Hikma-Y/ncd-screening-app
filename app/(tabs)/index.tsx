import React from "react";
import {
  ScrollView,
  View,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Header } from "@/components/shared/Header";
import { WelcomeHero } from "@/components/shared/WelcomeHero";
import { AssessmentCard } from "@/components";
import { useTheme } from "@/components/shared/ThemeProvider";
import { ThyroidIcon } from "@/components";

export default function HomeScreen() {
  const { isDark, theme: colors} = useTheme();
  const router = useRouter();

  const handleCardPress = (screen: "/(tabs)/findrisc_form" | "/(tabs)/thyroid_test") => {
    router.push(screen);
  };


  const handleSettings = () => {
    router.push("/(tabs)/settings");
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      <Header title="Health Assessment" onSettingsPress={handleSettings} />

      <ScrollView
        contentContainerStyle={[
          styles.main,
          { paddingHorizontal: 20, paddingTop: 100 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <WelcomeHero />

        <View style={styles.cardsContainer}>
          {/* FINDRISC Card */}
          <AssessmentCard
            title="FINDRISC Assessment"
            subtitle="Assess your risk of developing Type 2 Diabetes within the next 10 years based on scientifically validated questions."
            tag="Diabetes Risk"
            icon="monitor-heart"
            backgroundColor={isDark ? '#1e3a8a30' : '#dbeafe'}
            iconColor="#137fec"
            tagBgColor={isDark ? '#1e40af30' : '#eff6ff'}
            tagTextColor={isDark ? '#93c5fd' : '#2563eb'}
            buttonBgColor={colors.blue100}
            buttonTextColor={colors.textPrimary}
            overlayIcon="monitor-heart"
            overlayColor="#137fec"
            onPress={() => handleCardPress("/(tabs)/forms/findrisc_form")}
          />

          {/* Thyroid Card */}
          <AssessmentCard
            title="Hypothyroidism Test"
            subtitle="Evaluate potential symptoms of an underactive thyroid gland. This check helps identify if you need to consult a specialist."
            tag="Thyroid Health"
            icon={<ThyroidIcon size={50} color="#9333ea" />}
            backgroundColor={isDark ? '#7e22ce30' : '#f3e8ff'}
            iconColor="#9333ea"
            tagBgColor={isDark ? '#6b21a830' : '#faf5ff'}
            tagTextColor={isDark ? '#c4b5fd' : '#7c3aed'}
            buttonBgColor={isDark ? '#fff' : '#0f172a'}
            buttonTextColor={isDark ? '#0f172a' : '#fff'}
            overlayIcon={<ThyroidIcon size={140} color="#9333ea" />}
            overlayColor="#9333ea"
            onPress={() => handleCardPress("/(tabs)/forms/thyroid_test")}
          />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  main: { flexGrow: 1 },
  cardsContainer: { gap: 24 },
});
