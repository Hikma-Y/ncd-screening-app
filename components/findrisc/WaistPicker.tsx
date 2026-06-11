import React from "react";
import { View } from "react-native";
import { Picker } from "@react-native-picker/picker";

type WaistPickerProps = {
  value: number | null;
  onValueChange: (value: number | null) => void;
  gender: 0 | 1;
};

export const WaistPicker = ({
  value,
  onValueChange,
  gender,
}: WaistPickerProps) => (
  <View>
    <View
      style={{
        borderWidth: 1,
        borderColor: "#e2e8f0",
        borderRadius: 8,
        backgroundColor: "#f8fafc",
        overflow: "hidden",
      }}
    >
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={{ height: 56 }}
      >
        <Picker.Item
          label="Select measurement range"
          value={null}
          color="#94a3b8"
        />
        <Picker.Item
          label={gender === 0 ? "Men <94cm" : " Women <80cm"}
          value={0}
          color="#0f172a"
        />
        <Picker.Item
          label={gender === 0 ? "Men 94-102cm" : " Women 80-88cm"}
          value={3}
          color="#0f172a"
        />
        <Picker.Item
          label={gender === 0 ? "Men >102cm" : " Women >88cm"}
          value={4}
          color="#0f172a"
        />
      </Picker>
    </View>
  </View>
);
