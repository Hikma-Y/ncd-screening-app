import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  SubmitButton,
  QuestionBox,
  IntroCard,
  ResultModal,
} from "@/components";
import { useRouter } from "expo-router";
import { calculateScore, validateForm } from "@/hooks";
import { Question } from "@/components/types";
import { RiskLevel } from "@/components/shared/ResultModal";
import { useTheme } from "@/components/shared/ThemeProvider";
import { MaterialIcons } from "@expo/vector-icons";

const QUESTIONS: Question[] = [
  {
    questionText: "Age",
    type: "yesno",
    options: [
      { label: "Under 35 years", value: 0 },
      { label: "35 years and above", value: 1 },
    ],
  },
  {
    questionText: "Gender",
    type: "gender",
    options: [
      { label: "Male", value: 0 },
      { label: "Female", value: 1 },
    ],
  },
  {
    questionText: "Do you sweat very little, even on hot days?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Have you gained weight for no apparent reason?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Do you suffer from dry skin?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Do you experience constipation or digestion problems?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Have your movements become slow?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Do you have a slow reaction speed?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Have you noticed any puffiness on your face?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Are your hands and feet often cold?",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Have you Have you gradually lost hearing ability?",
    type: "yesno",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText:
      "When speaking or singing, do you have to regularly clear your throat?",
    type: "yesno",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText:
      "Do you experience tingling, tickling or burning sensations without an apparent cause?",
    type: "yesno",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText:
      "Do you feel skin on you hands, elbows, or forearms has thickened?",
    type: "yesno",
    options: [
      { label: "Yes", value: 1 },
      { label: "No", value: 0 },
    ],
  },
];

const ThyroidTest = () => {
  const { fontScale, theme } = useTheme();
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: RiskLevel;
    recommendation: string;
  } | null>(null);
  const router = useRouter();

  const handleAnswer = (index: number, value: number | null) => {
    setAnswers((prev) => ({ ...prev, [index]: value }));
  };
  const handleSubmission = () => {
    if (validateForm(answers, QUESTIONS.length)) {
      /**
       * Total Score   Risk Level	    Recommendation
       *  0–4	        Low risk	      Reassurance + education
       *   5–8	      Mild risk	      Monitor symptoms / lifestyle advice
       *   9–13 	    Moderate risk	  Recommend TSH screening
       *   ≥14	      High risk	      Strong referral for thyroid testing
       */
      const score = calculateScore(answers);
      const getResultByScore = (score: number) => {
        if (score <= 4) {
          return {
            score: score,
            riskLevel: "low",
            recommendation: "Reassurance + education",
          };
        } else if (score <= 8) {
          return {
            score: score,
            riskLevel: "mild",
            recommendation: "Monitor symptoms / lifestyle advice",
          };
        } else if (score <= 13) {
          return {
            score: score,
            riskLevel: "moderate",
            recommendation: "Recommend TSH screening",
          };
        } else {
          return {
            score: score,
            riskLevel: "high",
            recommendation: "Strong referral for thyroid testing",
          };
        }
      };
      setResult(
        getResultByScore(score) as {
          score: number;
          riskLevel: RiskLevel;
          recommendation: string;
        }
      );
      setModalVisible(true);
    } else {
      alert("Please answer all questions before submitting the test.");
    }
  };

  const answeredCount = Object.values(answers).filter(
    (val) => val !== null
  ).length;

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Header
        title="Hypothyroidism Test"
        onBackPress={() => router.push("/(tabs)")}
        progress={(answeredCount / QUESTIONS.length) * 100}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <IntroCard
          title="Hypothyroidism Test"
          discussion="This test helps identify potential symptoms of hypothyroidism. Please answer the questions honestly to get an accurate assessment."
        />
        <View
          style={{
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            marginTop: 14,
            paddingHorizontal: 20,
          }}
        >
          <Text
            style={{
              fontSize: 24 * fontScale,
              color: theme.textPrimary,
              fontWeight: "bold",
              marginHorizontal: 10,
            }}
          >
            Hypothyroidism Test
          </Text>
          <TouchableOpacity onPress={() => setAnswers({})}>
            <MaterialIcons name="restart-alt" size={24} color={theme.textPrimary} />
          </TouchableOpacity>
        </View>
        <View style={styles.divider} />

        <View style={styles.section}>
          <View style={styles.symptomsHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Symptoms
            </Text>
            <Text style={styles.progressText}>
              {answeredCount} / {QUESTIONS.length}
            </Text>
          </View>

          {QUESTIONS.map((q, index) => (
            <QuestionBox
              key={index}
              questionNumber={index + 1}
              question={q}
              value={answers[index]}
              onChange={(val) => handleAnswer(index, val)}
            />
          ))}
        </View>

        <SubmitButton title="Submit" onPress={handleSubmission} />

        <Text style={styles.disclaimer}>
          This test is for informational purposes only and is not a medical
          diagnosis.
        </Text>
      </ScrollView>
      {result && (
        <ResultModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          type="thyroid"
          title={`${
            result.riskLevel.charAt(0).toUpperCase() +
            result?.riskLevel.slice(1)
          } Risk`}
          subtitle="Attention"
          riskLevel={result.riskLevel}
          scorePosition={((result?.score ?? 0) / 2) * 100} // Percentage (0-100) for the arrow indicator
          // scoreText="12-14 point range"
          nextSteps={[
            {
              icon: "restaurant",
              title: "Review BMI & Diet",
              description:
                "Consider reducing daily calorie intake and monitoring carbohydrates.",
            },
            {
              icon: "directions-run",
              title: "Physical Activity",
              description:
                "Aim for at least 30 minutes of moderate exercise daily.",
            },
          ]}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  scrollContent: {
    paddingTop: 100,
    paddingBottom: 80,
  },
  introContainer: {
    padding: 16,
    paddingTop: 24,
  },
  introText: {
    fontSize: 18,
    color: "#475569",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 32,
    marginHorizontal: 16,
  },
  symptomsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 8,
  },
  progressText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#137fec",
  },
  disclaimer: {
    textAlign: "center",
    fontSize: 14,
    color: "#94a3b8",
    marginTop: -16,
    paddingHorizontal: 32,
    lineHeight: 20,
  },
});

export default ThyroidTest;
