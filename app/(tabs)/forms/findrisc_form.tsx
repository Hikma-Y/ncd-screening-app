import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  IntroCard,
  QuestionBox,
  ResultModal,
  SubmitButton,
} from "@/components";
import { calculateScore, validateForm } from "@/hooks";
import { Question } from "@/components/types";
import { router } from "expo-router";
import { useTheme } from "@/components/shared/ThemeProvider";
import MaterialIcons from "@expo/vector-icons/build/MaterialIcons";

const QUESTIONS: Question[] = [
  {
    questionText: "Select your Age group",
    type: "radio",
    options: [
      { label: "Under 45 years", value: 0 },
      { label: "45-54 years", value: 2 },
      { label: "55-64 years", value: 3 },
      { label: "Over 64 years", value: 4 },
    ],
  },
  {
    questionText: "Body mass Index",
    type: "radio",
    options: [
      { label: "Lower than 25  kg/m²", value: 0 },
      { label: "25 - 30  kg/m²", value: 1 },
      { label: "Greater than 30  kg/m²", value: 3 },
    ],
  },
  {
    questionText: "Waist circumrference",
    type: "radio",
    options: [
      { label: "Men < 94 cm / Women < 80 cm", value: 0 },
      { label: "Men 94-102 cm / Women 80-88 cm", value: 3 },
      { label: "Men > 102 cm / Women > 88 cm", value: 4 },
    ],
  },
  {
    questionText: "Physical Activity (at least 30 min/day):",
    type: "yesno",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 2 },
    ],
  },
  {
    questionText: "Daily consumption of fruits, vegetables or berries",
    type: "yesno",
    options: [
      { label: "Yes", value: 0 },
      { label: "No", value: 1 },
    ],
  },
  {
    questionText: "History of antihypertensive drug treatment",
    type: "yesno",
    options: [
      { label: "Yes", value: 2 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "History of high blood glucose",
    type: "yesno",
    options: [
      { label: "Yes", value: 5 },
      { label: "No", value: 0 },
    ],
  },
  {
    questionText: "Family history of diabetes",
    type: "radio",
    options: [
      { label: "No", value: 0 },
      { label: "Yes, grandparent, aunt, uncle, or first cousin", value: 3 },
      { label: "Yes, parent, brother, sister or own child", value: 5 },
    ],
  },
];
export default function FindriscScreen({ navigation }: { navigation: any }) {
  // states of the form input
  const { fontScale, theme } = useTheme();
  const [form, setForm] = useState<Record<number, number | null>>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [result, setResult] = useState<{
    score: number;
    riskLevel: "low" | "mild" | "moderate" | "high";
    recommendation: string;
  } | null>(null);
  const answered = Object.values(form).filter((ans) => ans !== null).length;
  const progress = (answered / 8) * 100;

  // function to handle answer change on the form
  function handleAnswer(index: number, value: number | null) {
    setForm((prev) => ({ ...prev, [index]: value }));
  }

  const handleSubmission = (form: Record<number, number | null>) => {
    const isValid = validateForm(form, QUESTIONS.length);
    if (isValid) {
      const score = calculateScore(form);
      const getResultByScore = (score: number) => {
        /**
         * Total Score 20	Risk Level	Recommendation
         *   0–4	Low risk	Lifestyle education
         *  5–8	Mild risk	Diet & activity counseling
         *   9–12	Moderate risk	Recommend fasting glucose / HbA1c
         *  ≥13	High risk	Urgent referral for diabetes testing
         */
        if (score <= 4) {
          return {
            score: score,
            riskLevel: "low",
            recommendation: "Lifestyle education",
          };
        } else if (score <= 8) {
          return {
            score: score,
            riskLevel: "mild",
            recommendation: "Diet and Activity counseling",
          };
        } else if (score <= 12) {
          return {
            score: score,
            riskLevel: "moderate",
            recommendation: "Recommend Fasting glucose/ HbA1c",
          };
        } else {
          return {
            score: score,
            riskLevel: "high",
            recommendation: "Urgent referral for diabetes testing",
          };
        }
      };
      setResult(
        getResultByScore(score) as {
          score: number;
          riskLevel: "low" | "mild" | "moderate" | "high";
          recommendation: string;
        }
      );
      setModalVisible(true);
      setForm({}); // reset form after submission
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <Header
        title="FINDRISC Assessment"
        progress={progress}
        onBackPress={() => router.push("/(tabs)")}
      />
      <ScrollView contentContainerStyle={{ paddingVertical: 100 }}>
        <IntroCard
          title={"Diabetes Risk Assessment"}
          discussion="This form assesses your risk of developing Type 2 Diabetes within the next 10 years."
        />
        <View
          style={{
            height: "auto",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            marginTop: 24,
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
            FINDRISC Questions
          </Text>
          <TouchableOpacity onPress={() => setForm({})}>
            <MaterialIcons
              name="restart-alt"
              size={24}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
        </View>
        {QUESTIONS.map((question, index) => (
          <QuestionBox
            key={index}
            questionNumber={index + 1}
            question={question}
            value={form[index]}
            onChange={(value: number) => handleAnswer(index, value)}
          />
        ))}
        <SubmitButton
          title="Submit"
          onPress={() => {
            handleSubmission(form);
          }}
        />
      </ScrollView>

      {result && (
        <ResultModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          type="diabetes"
          title={
            result?.riskLevel.charAt(0).toUpperCase() +
            result?.riskLevel.slice(1) +
            " Risk"
          }
          subtitle="Attention"
          riskLevel={result?.riskLevel}
          scorePosition={((result?.score ?? 0) / 20) * 100} // Percentage (0-100) for the arrow indicator
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
}
