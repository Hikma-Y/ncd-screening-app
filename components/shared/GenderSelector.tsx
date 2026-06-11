import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useTheme } from "./ThemeProvider";

type GenderSelectorProps = {
  value: number | null;
  onSelect: (value: number) => void;
};

export const GenderSelector = ({ value, onSelect }: GenderSelectorProps) => {
  const { fontScale, theme } = useTheme();
  return (
    <View style={{ flexDirection: "row", gap: 16, width: "100%" }}>
      {([0, 1] as const).map((g) => (
        <TouchableOpacity
          key={g}
          onPress={() => onSelect(g)}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: value === g ? "#137fec" : "#f1f5f9",
            backgroundColor: theme.background,
          }}
        >
          <Icon
            name={g === 0 ? "male" : "female"}
            size={40}
            color={value === g ? "#137fec" : "#94a3b8"}
          />
          <Text
            style={[
              {
                marginTop: 12,
                fontSize: 24 * fontScale,
                fontWeight: value === g ? "700" : "500",
                color: value === g ? "#137fec" : theme.textPrimary,
              },
            ]}
          >
            {g === 0 ? "Male" : "Female"}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
