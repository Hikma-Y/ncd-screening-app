import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from './ThemeProvider';

type RadioOption = {
  label: string;
  value: number;
  description?: string;
};

type RadioGroupProps = {
  options: RadioOption[];
  value: number | null;
  onChange: (value: number) => void;
};

export const RadioGroup = ({ options, value, onChange }: RadioGroupProps) => {
  const {fontScale, theme} = useTheme()
  return (
  <View>
    {options.map((opt) => (
      <TouchableOpacity
        key={opt.value+opt.label}
        onPress={() => onChange(opt.value)}
        style={[
          styles.option, 
          value === opt.value && styles.selected,
          { backgroundColor: theme.background }
        ]}
      >
        <View style={[styles.radio, value === opt.value && styles.radioFilled]}>
          {value === opt.value && <View style={styles.radioDot} />}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={
            [
              styles.label, 
              {fontSize: styles.label.fontSize * fontScale}, 
              {color: theme.textPrimary}
            ]
          }>{opt.label}</Text>
          {opt?.description&& ( 
                               <Text style={[
                                 styles.description, 
                                 { fontSize: styles.description.fontSize * fontScale }
                               ]}>{opt.description}</Text>
                              )
          }
        </View>
      </TouchableOpacity>
    ))}
  </View>
);}

const styles = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
    marginBottom: 12,
  },
  selected: {
    borderColor: '#137fec',
    backgroundColor: '#137fec0d',
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e1',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  radioFilled: { borderColor: '#137fec', backgroundColor: '#137fec' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#fff' },
  label: { fontSize: 24, fontWeight: '500', color: '#334155' },
  description: { fontSize: 18, color: '#64748b', marginTop: 2 },
});
