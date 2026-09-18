import { Pressable, Text, StyleSheet } from 'react-native';

// Reusable pill button used across the app (mode toggle, screen switcher,
// register action, form submit). Keeping one Button component instead of
// duplicating TouchableOpacity/Text pairs everywhere.
export default function Button({ title, onPress, active, variant = 'default', disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.base,
        active && styles.active,
        variant === 'danger' && styles.danger,
        disabled && styles.disabled,
      ]}
    >
      <Text style={[styles.text, active && styles.textActive, disabled && styles.textDisabled]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#eef1f6',
    marginRight: 8,
    marginBottom: 8,
  },
  active: {
    backgroundColor: '#2b57d9',
  },
  danger: {
    backgroundColor: '#d92b2b',
  },
  disabled: {
    backgroundColor: '#d9dde5',
  },
  text: {
    color: '#33394a',
    fontWeight: '600',
    fontSize: 14,
  },
  textActive: {
    color: '#ffffff',
  },
  textDisabled: {
    color: '#8a8f9c',
  },
});
