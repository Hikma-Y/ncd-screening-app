import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Question } from "../types";
import { Picker } from "@react-native-picker/picker";
import { RadioGroup } from "./RadioGroup";
import { GenderSelector } from "./GenderSelector";
import { useTheme } from "./ThemeProvider";

type SectionHeaderProps = {
  questionNumber: number;
  icon?: keyof typeof MaterialIcons.glyphMap;
  question: Question;
  value: number | null;
  style?: object;
  children?: React.ReactNode;
  items?: { label: string; value: string }[];
  onChange: (value: number) => void;
};

export const QuestionBox = ({
  questionNumber,
  value,
  icon,
  question,
  children,
  onChange,
}: SectionHeaderProps) => {
  const { fontScale, theme } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {icon && <MaterialIcons name={icon} size={24} color="#137fec" />}
      <Text
        style={[
          styles.questionText,
          { fontSize: styles.questionText.fontSize * fontScale },
          { color: theme.textPrimary },
        ]}
      >
        {questionNumber + ". " + question.questionText}
      </Text>
      {question?.description && (
        <Text style={styles.text}>{question?.description}</Text>
      )}
      {question?.options && (
        <QuestionOptions
          items={question.options}
          type={question.type}
          value={value}
          onChange={onChange}
        />
      )}
    </View>
  );
};
const QuestionOptions = ({
  type,
  items = [],
  value,
  onChange,
}: {
  type: "picker" | "yesno" | "gender" | "radio" | null;
  items: { label: string; value: number }[];
  value: number | null;
  onChange: (value: number) => void;
}) => {
  const { fontScale, theme } = useTheme();
  switch (type) {
    case "picker":
      return (
        <View
          style={[
            {
              borderWidth: 1,
              borderColor: "#e2e8f0",
              borderRadius: 8,
              backgroundColor: "#f8fafc",
              overflow: "hidden",
            },
            value ? styles.selectedOption : { borderColor: "#9ca3af" },
            { backgroundColor: theme.background },
          ]}
        >
          <Picker
            selectedValue={value as number | undefined}
            onValueChange={onChange}
            style={[
              {
                height: 56,
                fontSize: 24 * fontScale,
                color: value? styles.selectedOptionText.color : theme.textPrimary,
                backgroundColor: theme.background,
              },
            ]}
          >
            <Picker.Item
              label="Select measurement range"
              value={undefined}
              style={[
                styles.optionText,
                { fontSize: 24 * fontScale, color: theme.textPrimary },
              ]}
            />
            {items.map(({ label, value: val }) => (
              <Picker.Item
                key={label + val}
                label={label}
                value={val}
                style={[
                  styles.optionText,
                  {
                    fontSize: 24 * fontScale,
                    color: val === value ? "#137fec" : theme.textPrimary,
                  },
                  {
                    borderColor: val === value ? styles.selectedOption.borderColor : styles.option.borderColor,
                    borderWidth: 2,
                    backgroundColor: theme.background,
                  },
                ]}
              />
            ))}
          </Picker>
        </View>
      );
    case "gender":
      return <GenderSelector value={value} onSelect={onChange} />;
    case "yesno":
      return (
        <View
          style={[
            styles.optionsContainer,
            { backgroundColor: theme.background },
          ]}
        >
          {items.map(({ label, value: val }) => (
            <TouchableOpacity
              key={label + val}
              onPress={() => onChange(val)}
              style={[
                styles.option,
                value === val && styles.selectedOption,
                { backgroundColor: theme.background },
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  { color: theme.textPrimary },
                  value === val && styles.selectedOptionText,
                  { fontSize: styles.optionText.fontSize * fontScale },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    case "radio":
      return <RadioGroup options={items} value={value} onChange={onChange} />;
    default:
      return (
        <View style={styles.container}>
          {items.map(({ label, value }) => (
            <TouchableOpacity
              key={label + value}
              onPress={() => onChange(value)}
              style={[styles.option, value === value && styles.selectedOption]}
            >
              <Text
                style={[
                  styles.optionText,
                  value === value && styles.selectedOptionText,
                  { fontSize: styles.optionText.fontSize * fontScale },
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  text: {
    fontSize: 24,
    fontWeight: "500",
    color: "#475569",
  },
  questionText: {
    fontSize: 26,
    fontWeight: "500",
    color: "#0f172a",
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  option: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    backgroundColor: "#fff",
  },
  selectedOption: {
    borderColor: "#137fec",
    borderWidth: 2,
    backgroundColor: "#137fec1a",
  },
  optionText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#64748b",
  },
  selectedOptionText: {
    color: "#137fec",
  },
});
